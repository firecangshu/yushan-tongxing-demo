import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// 与善同行 Demo - Vite 配置
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
    open: false,
  },
})
