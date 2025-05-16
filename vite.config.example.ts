import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  // https://vitejs.dev/guide/static-deploy#github-pages
  base: '/byteark-player-react/',
  plugins: [react()],
  build: {
    outDir: './dist/example',
  },
});
