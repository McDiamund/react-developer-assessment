import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true, // optional: allows using describe/it/test without import
    setupFiles: './src/setupTests.ts', // optional: where you set up jest-dom
  },
})
