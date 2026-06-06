import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/gsap')) {
            return 'gsap-chunk'
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
