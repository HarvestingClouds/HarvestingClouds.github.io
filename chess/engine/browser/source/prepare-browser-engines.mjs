import { createHash } from "node:crypto";
import { readFile, mkdir, writeFile, rename, rm, copyFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { build } from "vite";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const lock = JSON.parse(await readFile(join(root, "lib", "engine", "browser-engines.json"), "utf8"));
const target = join(root, "public", "engine", "browser");
const download = process.argv.includes("--download");
async function ensure(destination, file, url) {
  const valid = bytes => bytes.length === file.bytes && createHash("sha256").update(bytes).digest("hex") === file.sha256;
  let existing;
  try { existing = await readFile(destination); } catch (error) { if (error.code !== "ENOENT") throw error; }
  if (existing && valid(existing)) return;
  if (!download) throw new Error(`Missing or invalid ${file.name}. Run npm run source:browser-engines --workspace @knight-school/web.`);
  console.log(`Downloading ${file.name} (${(file.bytes / 1e6).toFixed(1)} MB)…`);
  const response = await fetch(url, { signal: AbortSignal.timeout(240000) });
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (!valid(bytes)) throw new Error(`Integrity verification failed: ${file.name}. No unverified asset was installed.`);
  const temporary = `${destination}.download`;
  try { await writeFile(temporary, bytes); await rename(temporary, destination); }
  finally { await rm(temporary, { force: true }); }
}
for (const [id, engine] of Object.entries(lock.engines)) {
  const directory = join(target, id);
  await mkdir(directory, { recursive: true });
  for (const file of engine.files) {
    const destination = join(directory, file.name);
    const base = file.name.endsWith(".js") ? "https://raw.githubusercontent.com" : "https://media.githubusercontent.com/media";
    const url = `${base}/manthedan/0x88/${lock.portCommit}/public/${id}/${file.name}`;
    await ensure(destination, file, url);
  }
}
await ensure(join(target, "viridithas", "NETWORK-CC0.txt"), {
  name: "NETWORK-CC0.txt", bytes: 7048, sha256: "a2010f343487d3f7618affe54f789f5487602331c0a8d03f49e9a7c547cf0499",
}, "https://raw.githubusercontent.com/cosmobobak/viridithas-networks/1040c3ee/LICENSE");
for (const [id, archiveRoot, upstream, name] of [
  ["plentychess", "plentychess-emscripten-single-thread-corresponding-source", "plentychess-50ad9f1b523063cbbbf599fe0547f42870fe2906", "GPL-3.0.txt"],
  ["viridithas", "viridithas-wasip1-scalar-simd128-corresponding-source", "viridithas-0631113e2215714c54d397cce9a8caebc5e6f8ee", "viridithas/LICENSE-MIT.txt"],
]) {
  const archive = lock.engines[id].files.find(file => file.name.endsWith(".tar.gz"));
  const extracted = spawnSync("tar", ["-xOf", join(target, id, archive.name), `${archiveRoot}/upstream/${upstream}/LICENSE`], { encoding: "utf8" });
  if (extracted.error) throw extracted.error;
  if (extracted.status !== 0 || !extracted.stdout.trim()) throw new Error(`Cannot preserve ${id} license: ${extracted.stderr}`);
  await writeFile(join(target, name), extracted.stdout);
}
const runtime = resolve(dirname(fileURLToPath(import.meta.resolve("@bjorn3/browser_wasi_shim"))), "..");
for (const license of ["MIT", "APACHE"]) await copyFile(join(runtime, `LICENSE-${license}`), join(target, `WASI-LICENSE-${license}.txt`));
const source = join(target, "source");
await mkdir(source, { recursive: true });
for (const name of ["browser-worker.ts", "browser-engines.json", "browser-transport.ts"]) await copyFile(join(root, "lib", "engine", name), join(source, name));
await copyFile(fileURLToPath(import.meta.url), join(source, "prepare-browser-engines.mjs"));
await writeFile(join(target, "manifest.json"), JSON.stringify(lock, null, 2));
await build({
  configFile: false, publicDir: false, root, logLevel: "warn",
  build: {
    outDir: target, emptyOutDir: false,
    lib: { entry: join(root, "lib", "engine", "browser-worker.ts"), name: "KnightSchoolBrowserEngine", formats: ["iife"], fileName: () => "worker.js" },
  },
});
const workerVersion = createHash("sha256").update(await readFile(join(target, "worker.js"))).digest("hex").slice(0, 16);
const configPath = join(root, "public", "engine-config.json");
const config = JSON.parse(await readFile(configPath, "utf8"));
for (const [id, transport] of Object.entries(config.engines)) {
  if (!lock.engines[id] || transport.type !== "worker") continue;
  const [path, query] = transport.url.split("?");
  const parameters = new URLSearchParams(query);
  if (path !== "./engine/browser/worker.js" || parameters.get("engine") !== id) continue;
  parameters.set("v", workerVersion);
  transport.url = `${path}?${parameters}`;
}
await writeFile(configPath, JSON.stringify(config, null, 2) + "\n");
console.log("Verified PlentyChess 8 and Viridithas 20 browser assets and corresponding source; built single-thread Worker adapter.");
