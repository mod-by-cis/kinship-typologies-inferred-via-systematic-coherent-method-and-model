// ./watch-for-rebuild.ts
const folderToWatch = "../docs/";
const watchExtensions = [".ts", ".tsx"];

const QUIET_TIME_MS = 5000;
const MIN_INTERVAL_BETWEEN_BUILDS_MS = 30000;
const MAX_CONSECUTIVE_BUILDS = 10;

let lastChangeTime = 0;
let lastBuildTime = 0;
let debounceTimer: number | undefined;
let recentBuilds: number[] = []; // Timestamps

const runBuild = async () => {
  const now = Date.now();

  // Zabezpieczenie: czy build był za wcześnie?
  if (now - lastBuildTime < MIN_INTERVAL_BETWEEN_BUILDS_MS) {
    console.log(`[watcher] Build zablokowany – zbyt wcześnie (czekaj 30s)...`);
    return;
  }

  // Zabezpieczenie: zbyt wiele buildów z rzędu
  recentBuilds.push(now);
  recentBuilds = recentBuilds.filter(
    (t) => now - t <= MAX_CONSECUTIVE_BUILDS * MIN_INTERVAL_BETWEEN_BUILDS_MS
  );
  if (recentBuilds.length >= MAX_CONSECUTIVE_BUILDS) {
    console.error(`[watcher] Zbyt wiele buildów z rzędu – przerywam.`);
    Deno.exit(1);
  }

  lastBuildTime = now;
  console.log("\n[watcher] Uruchamiam build...");
  const cmd = new Deno.Command("deno", {
    args: ["task", "build"],
    stdout: "piped",
    stderr: "piped",
  });
  const { stdout, stderr } = await cmd.output();
  if (stdout.length) console.log(new TextDecoder().decode(stdout));
  if (stderr.length) console.error(new TextDecoder().decode(stderr));
};

console.log(`[watcher] Czekam na zmiany w ${folderToWatch}...`);

for await (const event of Deno.watchFs(folderToWatch, { recursive: true })) {
  if (
    event.kind === "modify" ||
    event.kind === "create" ||
    event.kind === "remove"
  ) {
    const relevant = event.paths.some((path) =>
      watchExtensions.some((ext) => path.endsWith(ext))
    );
    if (!relevant) continue;

    lastChangeTime = Date.now();
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const now = Date.now();
      const silenceDuration = now - lastChangeTime;

      if (silenceDuration >= QUIET_TIME_MS) {
        runBuild();
      } else {
        console.log(`[watcher] Za wcześnie – brak 5s ciszy.`);
      }
    }, QUIET_TIME_MS);
  }
}
