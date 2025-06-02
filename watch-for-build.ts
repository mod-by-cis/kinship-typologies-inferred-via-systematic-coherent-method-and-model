// watch.ts
const folderToWatch = "./www/";
const watchExtensions = [".ts", ".tsx"];

const debounce = (fn: () => void, delay = 100) => {
  let timer: number | undefined;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
};

const runBuild = debounce(async () => {
  console.log("\n[watcher] Zmiana wykryta — uruchamiam build...");
  const cmd = new Deno.Command("deno", {
    args: ["task", "build"],
    stdout: "piped",
    stderr: "piped",
  });
  const { stdout, stderr } = await cmd.output();
  if (stdout.length) console.log(new TextDecoder().decode(stdout));
  if (stderr.length) console.error(new TextDecoder().decode(stderr));
});

console.log(`[watcher] Obserwuję *.ts i *.tsx w ${folderToWatch}...`);
for await (const event of Deno.watchFs(folderToWatch, { recursive: true })) {
  if (
    event.kind === "modify" ||
    event.kind === "create" ||
    event.kind === "remove"
  ) {
    const relevant = event.paths.some((path) =>
      watchExtensions.some((ext) => path.endsWith(ext))
    );
    if (relevant) runBuild();
  }
}
