import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import path, { resolve } from 'path'

export default defineConfig({
  main: {
    resolve: {
      alias: {
        '@main': path.resolve(__dirname, 'src/main'),
        '@preload': path.resolve(__dirname, 'src/preload'),
        '@renderer': path.resolve(__dirname, 'src/main'),
        '@shared': path.resolve(__dirname, 'src/shared')
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    resolve: {
      alias: {
        '@main': path.resolve(__dirname, 'src/main'),
        '@preload': path.resolve(__dirname, 'src/preload'),
        '@renderer': path.resolve(__dirname, 'src/main'),
        '@shared': path.resolve(__dirname, 'src/shared')
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@main': path.resolve(__dirname, 'src/main'),
        '@preload': path.resolve(__dirname, 'src/preload'),
        '@renderer': path.resolve(__dirname, 'src/main'),
        '@shared': path.resolve(__dirname, 'src/shared')
      }
    },
    plugins: [react()]
  }
})
