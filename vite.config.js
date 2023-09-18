/// <reference types="vitest" />
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'index.js'),
      name: 'MyLodash',
      // the proper extensions will be added
      fileName: 'my-lodash',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          myLodash: 'MyLodash',
        },
      },
    },
  },
})
