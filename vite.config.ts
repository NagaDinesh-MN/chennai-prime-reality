// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/tanstack/vite";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
const lovableConfig = defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    plugins: [mcpPlugin()],
  },
});

// Vercel (and other standard static hosts) set VERCEL=1 in the build environment.
// The default config targets Cloudflare Workers, which fails there with
// "Rollup failed to resolve import cloudflare:work". On Vercel we instead emit a
// plain client-side SPA build to dist/ with no Cloudflare/worker code at all.
export default process.env.VERCEL
  ? (async () => {
      const [{ default: react }, { default: tailwindcss }, { default: tsConfigPaths }, { tanstackStart }] =
        await Promise.all([
          import("@vitejs/plugin-react"),
          import("@tailwindcss/vite"),
          import("vite-tsconfig-paths"),
          import("@tanstack/react-start/plugin/vite"),
        ]);

      const { defineConfig: viteDefineConfig } = await import("vite");
      return viteDefineConfig({
        plugins: [
          tsConfigPaths(),
          tailwindcss(),
          tanstackStart({ spa: { enabled: true } }),
          react(),
        ],
        resolve: {
          dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-start"],
        },
        build: {
          outDir: "dist",
        },
      });
    })()
  : lovableConfig;
