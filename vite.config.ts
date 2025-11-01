import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// ✅ One config for both Vite and Vitest
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
})
