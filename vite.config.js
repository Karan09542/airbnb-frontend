import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/cls
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      "/user": import.meta.env.VITE_BASE_URL || "http://localhost:8000",
      "/hotel": import.meta.env.VITE_BASE_URL || "http://localhost:8000",
      "/content": import.meta.env.VITE_BASE_URL || "http://localhost:8000",
      "/book": import.meta.env.VITE_BASE_URL || "http://localhost:8000",
    }
  }
})
