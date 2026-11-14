import { WASI, OpenFile, File, ConsoleStdout, PreopenDirectory } from "@bjorn3/browser_wasi_shim";
import lock from "./browser-engines.json";
import { checkedEngineAsset } from "./browser-transport";

type EmscriptenModule = { ccall(name: string, result: null, types: string[], args: string[]): void };
type FactoryOptions = {
  wasmBinary: Uint8Array; getPreloadedPackage(): ArrayBuffer;
  locateFile(name: string): string; print(line: string): void; printErr(line: string): void;
};
declare const self: {
  location: Location; postMessage(message: string): void; importScripts(url: string): void;
  onmessage: ((event: MessageEvent) => void) | null;
  PlentyChess?: (options: FactoryOptions) => Promise<EmscriptenModule>;
};
const id = new URL(self.location.href).searchParams.get("engine");
if (id !== "plentychess" && id !== "viridithas") throw new Error("Unknown bundled browser engine.");
const definition = lock.engines[id];
const options = new Map<string, string>();
let position = "position startpos", native: EmscriptenModule | undefined, compiled: WebAssembly.Module | undefined;
let stderr = "", failed = false;

function output(line: string) {
  if (line.startsWith("option name Threads type spin ")) {
    line = line.replace(/default \d+/, "default 1").replace(/min \d+/, "min 1").replace(/max \d+/, "max 1");
  }
  self.postMessage(line);
}
async function asset(name: string): Promise<ArrayBuffer> {
  const expected = definition.files.find(file => file.name === name);
  if (!expected) throw new Error(`Unknown ${id} asset: ${name}`);
  return checkedEngineAsset(new URL(`${id}/${name}`, self.location.href), expected);
}
async function initialize() {
  if (id === "viridithas") {
    compiled = await WebAssembly.compile(await asset("viridithas.wasm"));
    return;
  }
  const [wasm, data, glue] = await Promise.all([
    asset("plentychess-emscripten.wasm"), asset("plentychess-emscripten.data"), asset("plentychess-emscripten.js"),
  ]);
  const url = URL.createObjectURL(new Blob([glue], { type: "text/javascript" }));
  try { self.importScripts(url); } finally { URL.revokeObjectURL(url); }
  if (!self.PlentyChess) throw new Error("PlentyChess factory is missing from the verified browser build.");
  native = await self.PlentyChess({
    wasmBinary: new Uint8Array(wasm), getPreloadedPackage: () => data,
    locateFile: name => new URL(`plentychess/${name}`, self.location.href).href,
    print: output, printErr: line => { stderr = String(line).slice(-2000); },
  });
}
const startup = initialize();
// Install the rejection handler immediately, even before the first UCI message.
void startup.catch(cause => { failed = true; setTimeout(() => { throw cause instanceof Error ? cause : new Error(String(cause)); }, 0); });

function collector(consume: (line: string) => void) {
  const decoder = new TextDecoder();
  let pending = "";
  return new ConsoleStdout(bytes => {
    pending += decoder.decode(bytes, { stream: true });
    const lines = pending.split(/\r?\n/); pending = lines.pop() || "";
    lines.forEach(consume);
  });
}
async function wasiRun(commands: string[], consume: (line: string) => void) {
  if (!compiled) throw new Error("Viridithas WASM has not initialized.");
  const wasi = new WASI(["viridithas", ...commands, "quit"], [], [
    new OpenFile(new File([])), collector(consume), collector(line => { stderr = line.slice(-2000); }),
    new PreopenDirectory(".", new Map<string, File>()),
  ]);
  const instance = await WebAssembly.instantiate(compiled, { wasi_snapshot_preview1: wasi.wasiImport });
  const memory = instance.exports.memory, start = instance.exports._start;
  if (!(memory instanceof WebAssembly.Memory) || typeof start !== "function") throw new Error("Viridithas has invalid WASI exports.");
  const code = wasi.start({ exports: { memory, _start: () => start() } });
  if (code !== 0) throw new Error(`Viridithas exited with code ${code}: ${stderr}`);
}
async function command(line: string) {
  if (line.length > 20000 || /[\r\n]/.test(line)) throw new Error("Invalid browser-engine command.");
  if (/^setoption name Threads value (?!1$)/.test(line)) throw new Error("Bundled browser engines support exactly one thread.");
  await startup;
  if (id === "plentychess") {
    if (!native) throw new Error("PlentyChess has not initialized.");
    native.ccall("command", null, ["string"], [line]);
    return;
  }
  const setting = /^setoption name (.+?) value (.*)$/.exec(line);
  if (setting) { options.set(setting[1], line); return; }
  if (line.startsWith("position ")) { position = line; return; }
  if (line === "uci") await wasiRun(["uci"], output);
  else if (line === "isready") await wasiRun(["uci", ...options.values(), "isready"], value => { if (value === "readyok") output(value); });
  else if (line.startsWith("go ")) {
    await wasiRun(["uci", ...options.values(), position, line], value => {
      if (value.startsWith("info ") || value.startsWith("bestmove ")) output(value);
    });
  } else if (line !== "ucinewgame" && line !== "stop" && line !== "quit") throw new Error(`Unsupported browser-engine command: ${line}`);
}
let queue = Promise.resolve();
self.onmessage = event => {
  if (failed) return;
  queue = queue.then(() => {
    if (failed) return;
    if (typeof event.data !== "string") throw new Error("Browser engines require text UCI commands.");
    return command(event.data);
  }).catch(cause => {
    failed = true;
    const detail = cause instanceof Error ? cause.message : String(cause);
    setTimeout(() => { throw new Error(`${id}: ${detail}${stderr ? ` (${stderr})` : ""}`); }, 0);
  });
};
