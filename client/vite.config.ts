import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import terser from '@rollup/plugin-terser';

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
  plugins: [
    react(),
    terser() // Apply the Terser plugin
  ],
  build: {
    minify: 'terser', // Specify 'terser' as the minifier
  },
  optimizeDeps: {
    esbuildOptions: {
      minify: true // Ensure minification for optimized dependencies
    }
  }
});
