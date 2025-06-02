import { serveDir } from "jsr:@std/http@^1.0.17/file-server";

Deno.serve({ port: 8008 }, (req) => {
  const pathname = new URL(req.url).pathname;
  console.log(pathname);
  return serveDir(req, { fsRoot: "./docs" });
});

//Deno.serve({ port: 8008 }, (req) => {
//  const url = new URL(req.url);
//  return serveDir(req, {
//    fsRoot: "./docs/dist",
//    urlRoot: "",
//    showDirListing: true,
//  });
//});
