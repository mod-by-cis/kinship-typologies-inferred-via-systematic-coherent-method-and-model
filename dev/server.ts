import { serveDir } from "jsr:@std/http@^1.0.17/file-server";

Deno.serve({ port: 8008 }, async (req) => {
  const res = await serveDir(req, {
    fsRoot: "./docs",
  });

  const newHeaders = new Headers(res.headers);
  newHeaders.set("Cache-Control", "no-store");
  newHeaders.set("Pragma", "no-cache");
  newHeaders.set("Expires", "0");

  console.log(new URL(req.url).pathname);

  return new Response(res.body, {
    status: res.status,
    headers: newHeaders,
  });
});

//Deno.serve({ port: 8008 }, (req) => {
//  const url = new URL(req.url);
//  return serveDir(req, {
//    fsRoot: "./docs/dist",
//    urlRoot: "",
//    showDirListing: true,
//  });
//});
