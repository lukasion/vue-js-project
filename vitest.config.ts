import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import viteConfig from './vite.config'

export default defineConfig({
  ...viteConfig,
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    coverage: {
      reporter: ['text', 'json', 'html']
    }
  }
})
