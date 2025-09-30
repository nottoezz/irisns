import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/irisns/",
  // server for local testing
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true
  }
})
