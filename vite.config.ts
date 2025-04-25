import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [react()],
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        webapp: resolve(__dirname, 'webapp/index.ts'),
        lib: resolve(__dirname, 'src/index.ts'),
        cli: resolve(__dirname, 'src/cli.ts')
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'webapp') return 'webapp.js'
          if (chunkInfo.name === 'cli') return 'nomnoml-cli.js'
          return 'nomnoml.js'
        },
        format: 'iife',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          jszip: 'JSZip'
        }
      },
      external: ['react', 'react-dom', 'jszip']
    }
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
    include: ['react', 'react-dom', 'dagre'],
    exclude: ['fs', 'path']
  }
}) 