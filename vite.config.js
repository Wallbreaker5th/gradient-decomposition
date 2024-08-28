import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.bilibili.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      "/i0hdslb": {
        target: "https://i0.hdslb.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/i0hdslb/, ''),
      },
      "/i1hdslb": {
        target: "https://i1.hdslb.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/i1hdslb/, ''),
      },
      "/i2hdslb": {
        target: "https://i2.hdslb.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/i2hdslb/, ''),
      }
    }
  }
})
