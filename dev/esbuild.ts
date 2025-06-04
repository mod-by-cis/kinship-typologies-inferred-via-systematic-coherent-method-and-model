import * as esbuild from "https://deno.land/x/esbuild@v0.25.5/mod.js";

await esbuild.build({
  entryPoints: ["docs/main.tsx"],
  bundle: true,
  outfile: "docs/gen/main.js",
  format: "esm",
  minify: true,
  sourcemap: "inline",
  target: ["esnext"],
  jsxFactory: "h",
  jsxFragment: "Fragment",
  loader: { ".ts": "ts", ".tsx": "tsx" },
  logLevel: "info",
});

esbuild.stop();
