import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Set base path for GitHub Pages deployment in production build
  base: command === 'build' ? '/react-split-flap/' : '/',
  // Enable hot reload for local package development
  server: {
    watch: {
      // Watch files in the parent directory (the package source)
      ignored: ['!**/node_modules/**', '!**/.yalc/**'],
    },
  },
  // Optimize dependencies - exclude local package from pre-bundling
  optimizeDeps: {
    exclude: ['react-split-flap'],
  },
}))
