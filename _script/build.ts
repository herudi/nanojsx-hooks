import { denoPlugin, esbuild } from "./deps.ts";

try {
  await esbuild.build({
    entryPoints: ["./src/app.tsx"],
    bundle: true,
    outfile: "./public/bundle.js",
    format: "iife",
    minify: true,
    plugins: [denoPlugin()],
  });
  Deno.exit(0);
} catch (error) {
  esbuild.stop();
  Deno.exit(1);
}
