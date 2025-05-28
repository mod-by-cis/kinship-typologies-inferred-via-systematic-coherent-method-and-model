// docs-server.ts
import { serveDir } from "jsr:@std/http@1.0.17/file-server";

Deno.serve((req) => {
  const pathname = new URL(req.url).pathname;
  console.log(pathname);
  return serveDir(req, { fsRoot: "./docs" })
});
