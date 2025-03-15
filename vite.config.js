import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // Update the base path for custom domain deployment
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue': 'vue/dist/vue.esm-bundler.js'
    }
  },
  assetsInclude: ['**/*.PNG', '**/*.png'],
  build: {
    // Ensure assets are properly resolved
    assetsDir: 'assets',
    // Generate source maps for easier debugging
    sourcemap: true,
    // Optimize CSS to avoid path issues
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        // Ensure consistent file naming
        manualChunks: undefined
      }
    }
  }
})
