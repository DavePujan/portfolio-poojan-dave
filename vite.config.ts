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
          if (id.includes('node_modules/three') || id.includes('node_modules/@react-three')) {
            return 'three-chunk'
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
