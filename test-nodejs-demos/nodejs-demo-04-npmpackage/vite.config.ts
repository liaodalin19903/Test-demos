import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: 'dist',  // 自定义构建输出项目
    target: 'es2020',
    lib: {
      entry: 'src/index.ts',  // 入口文件
      formats: ['es', 'cjs']
    }
  }
})