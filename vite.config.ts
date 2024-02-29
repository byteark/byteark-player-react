import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  base: '',
  plugins: [react(), viteTsconfigPaths()],
  server: {
    // Do not the browser opens upon server start.
    open: false,
    port: 3000
  }
})
