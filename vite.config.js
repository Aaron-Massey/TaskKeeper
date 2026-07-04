
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // build: {
  //   sourcemap: true,
  // },

  server: {
    port: 3000,
    strictPort: true,
    open: true // Opens browser automatically
  }
});


