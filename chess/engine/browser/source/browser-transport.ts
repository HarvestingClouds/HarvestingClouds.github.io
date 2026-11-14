import type { EngineWorker } from "./stockfish";

export async function checkedEngineAsset(url: URL, expected: { bytes: number; sha256: string }): Promise<ArrayBuffer> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url.pathname}: HTTP ${response.status}. Upload all bundled engine files.`);
  const bytes = await response.arrayBuffer();
  if (bytes.byteLength !== expected.bytes) throw new Error(`${url.pathname}: incomplete or incorrect engine asset.`);
  const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", bytes));
  if (Array.from(digest, value => value.toString(16).padStart(2, "0")).join("") !== expected.sha256) {
    throw new Error(`${url.pathname}: SHA-256 integrity verification failed. Re-upload the matching engine package.`);
  }
  return bytes;
}

/** Synchronous WASM cannot consume "stop" while searching; cancel its owned Worker instead. */
export function browserTransport(url: string): EngineWorker {
  const settings = new Map<string, string>();
  let disposed = false, searching = false, current: Worker;
  const transport: EngineWorker = {
    onmessage: null, onerror: null, onmessageerror: null,
    terminate() { disposed = true; current.terminate(); },
    postMessage(command) {
      if (disposed) throw new Error("Browser engine worker was terminated.");
      const option = /^setoption name (.+?) value /.exec(command);
      if (option) settings.set(option[1], command);
      if (command === "stop" && searching) {
        searching = false; current.terminate();
        try {
          current = spawn(); current.postMessage("uci");
          for (const setting of settings.values()) current.postMessage(setting);
          current.postMessage("isready");
        } catch (cause) {
          transport.onerror?.(new ErrorEvent("error", { message: `Could not recreate browser engine: ${cause instanceof Error ? cause.message : String(cause)}` }));
          return;
        }
        // This is cancellation acknowledgment, not a searched move or evaluation.
        queueMicrotask(() => { if (!disposed) transport.onmessage?.(new MessageEvent("message", { data: "bestmove (none)" })); });
        return;
      }
      if (command.startsWith("go ")) searching = true;
      current.postMessage(command);
    },
  };
  function spawn() {
    const worker = new Worker(url);
    worker.onmessage = event => {
      if (disposed || worker !== current) return;
      if (typeof event.data === "string" && event.data.startsWith("bestmove ")) searching = false;
      transport.onmessage?.(event);
    };
    worker.onerror = event => { if (!disposed && worker === current) transport.onerror?.(event); };
    worker.onmessageerror = event => { if (!disposed && worker === current) transport.onmessageerror?.(event); };
    return worker;
  }
  current = spawn();
  return transport;
}
