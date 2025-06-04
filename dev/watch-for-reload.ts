const clients = new Set<WebSocket>();
const DEBOUNCE_MS = 15_000;
let lastReloadTime = 0;

async function runBuild() {
  console.log("[reload-watcher] Buduję projekt...");
  const cmd = new Deno.Command("deno", {
    args: ["task", "build"],
    stdout: "piped",
    stderr: "piped",
  });
  const { stdout, stderr } = await cmd.output();
  if (stdout.length) console.log(new TextDecoder().decode(stdout));
  if (stderr.length) console.error(new TextDecoder().decode(stderr));
}

function broadcastReload() {
  const now = Date.now();
  if (now - lastReloadTime < DEBOUNCE_MS) {
    console.log("[reload-watcher] Reload throttled.");
    return;
  }
  lastReloadTime = now;
  console.log("[reload-watcher] Wysyłam sygnał reload do klientów.");
  for (const ws of clients) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send("reload");
    }
  }
}

const watcher = Deno.watchFs("./docs", { recursive: true });

Deno.serve({
  port: 35729,
  handler: /*async*/ (req) => {
    const url = new URL(req.url);

    if (url.pathname === "/ws") {
      const { socket, response } = Deno.upgradeWebSocket(req);
      socket.onopen = () => {
        console.log("[reload-watcher] WebSocket klient podłączony.");
        clients.add(socket);
      };
      socket.onclose = () => {
        console.log("[reload-watcher] WebSocket klient rozłączony.");
        clients.delete(socket);
      };
      socket.onerror = (e) => {
        console.error("[reload-watcher] WebSocket error:", e);
        clients.delete(socket);
      };
      return response;
    }

    return new Response("Reload watcher server");
  },
});

(async () => {
  for await (const event of watcher) {
    if (
      event.kind === "modify" ||
      event.kind === "create" ||
      event.kind === "remove"
    ) {
      const relevant = event.paths.some((path) =>
        path.endsWith(".ts") || path.endsWith(".tsx")
      );
      if (!relevant) continue;

      await runBuild();
      broadcastReload();
    }
  }
})();
