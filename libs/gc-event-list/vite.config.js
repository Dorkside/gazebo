import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('event-')
        }
      }
    }),
    tsconfigPaths({root: '../..'})
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    minify: false,
    outDir: '../../dist/libs/gc-event-list/',
    lib: {
      entry: './src/main.ce.js',
      name: 'index',
      fileName: 'index'
    }
  },
  define: { 'process.env.NODE_ENV': '"production"' }
})
