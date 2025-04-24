import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  root: '.',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
    open: true
  },
  resolve: {
    alias: {
      // Map the dist/nomnoml.js import to the source files
      '../dist/nomnoml.js': resolve(__dirname, 'src/index.ts'),
    }
  },
  // Configure TypeScript
  esbuild: {
    loader: 'tsx',
    include: /\.(tsx?|jsx?)$/,
  },
  // Configure source maps for better debugging
  css: {
    devSourcemap: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  }
}) 