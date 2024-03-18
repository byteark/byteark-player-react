import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // https://vitejs.dev/guide/static-deploy#github-pages
  base: '/byteark-player-react/',
  plugins: [react()],
  build: {
    outDir: './dist/example'
  }
})
