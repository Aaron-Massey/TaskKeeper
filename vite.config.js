import { defineConfig } from "vite";

export default defineConfig({
  build: {
    minify: false,
    sourcemap: true,
    cssMinify: false,
    reportCompressedSize: false,
    target: "esnext",
    modulePreload: false,
    rollupOptions: {
      treeshake: false,
    },
  },

  server: {
    port: 3000,
    strictPort: true,
    open: true, // Opens browser automatically
  },
});
