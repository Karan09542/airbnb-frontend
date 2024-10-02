import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/cls
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    // proxy: {
    //   "/user": "http://localhost:8000",
    //   "/hotel": "http://localhost:8000",
    //   "/content": "http://localhost:8000",
    //   "/book": "http://localhost:8000",
    // }
    proxy: {
      "/user": "https://airbnb-backend-flax.vercel.app",
      "/hotel": "https://airbnb-backend-flax.vercel.app",
      "/content": "https://airbnb-backend-flax.vercel.app",
      "/book": "https://airbnb-backend-flax.vercel.app",
    }
  }
})
