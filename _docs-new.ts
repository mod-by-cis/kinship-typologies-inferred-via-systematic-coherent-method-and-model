// _docs.ts
import { serveDir } from "jsr:@std/http@^1.0.17";

Deno.serve({port:8008}, (req) => {
  const pathname = new URL(req.url).pathname;
  console.log(pathname);
  return serveDir(req, { fsRoot: "./docs/new" })
});
