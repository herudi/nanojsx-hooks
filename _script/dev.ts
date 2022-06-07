import { denoPlugin, esbuild, serve, serveFile } from "./deps.ts";

const clients = [] as any;

try {
  await esbuild.build({
    entryPoints: ["./src/app.tsx"],
    bundle: true,
    outfile: "./public/bundle.js",
    format: "iife",
    banner: {
      js:
        ' (() => new EventSource("/_dev").onmessage = () => location.reload())();',
    },
    watch: {
      onRebuild(error) {
        clients.forEach((controller: any) =>
          controller.enqueue(`data: reload\n\n`)
        );
        clients.length = 0;
        console.log(error ? error : "...");
      },
    },
    plugins: [denoPlugin()],
  });
  serve(async (request) => {
    const { pathname } = new URL(request.url);
    if (pathname === "/_dev") {
      const response = new ReadableStream({
        start(controller) {
          clients.push(controller);
        },
        cancel() {
          console.log("canceled");
        },
      }).pipeThrough(new TextEncoderStream());
      return new Response(response, {
        headers: {
          "Content-Type": "text/event-stream",
        },
      });
    }
    return await serveFile(
      request,
      "./public" + (pathname === "/" ? "/index.html" : pathname),
    );
  }, { port: 8080 });
  setTimeout(() => {
    const open = {
      darwin: ["open"],
      linux: ["xdg-open"],
      windows: ["cmd", "/c", "start"],
    };
    if (clients.length === 0) {
      Deno.run({ cmd: [...open[Deno.build.os], "http://localhost:8080"] });
    }
  }, 2000);
} catch (error) {
  esbuild.stop();
  Deno.exit(1);
}
