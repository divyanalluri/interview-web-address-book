import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: `http://localhost:4000`,
        changeOrigin: true,
      },
    },
    open: true,
  },
  plugins: [react()],
  build: {
    outDir: 'dist', // Directory to output the bundled files
    sourcemap: true, // Generate source maps for debugging
    rollupOptions: {
      input: {
        main: '/src/main.tsx', // Entry point for your application
      },
      output: {
        format: 'es', // Module format (can be 'es', 'cjs', or 'iife')
        chunkFileNames: 'chunks/[name].[hash].js', // Output naming for chunks
        assetFileNames: 'assets/[name].[hash].[ext]', // Output naming for assets
      },
    },
  },
})
