import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', // 使用 jsdom 模拟浏览器环境
  },
})
