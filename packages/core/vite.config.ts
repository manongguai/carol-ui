/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      outputDir: ['es', 'lib'],
      entryRoot: 'packages',
      tsConfigFilePath: './tsconfig.json',
      compilerOptions: {
        skipLibCheck: true,
        composite: true,
        baseUrl: '.',
        paths: {
          '@/*': ['./packages/*']
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./packages', import.meta.url))
    }
  },
  test: {
    globals: true,
    environment: 'jsdom'
  },
  build: {
    cssCodeSplit: false,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'packages/index.ts'),
      name: 'CarolUI',
      // the proper extensions will be added
      fileName: 'index',
      formats: ['es', 'umd', 'cjs']
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].js',
          dir: 'es',
          preserveModules: true,
          preserveModulesRoot: 'packages',
          globals: {
            vue: 'Vue'
          },
          exports: 'named'
        },
        {
          format: 'umd',
          name: 'CarolUI', // 这里设置全局变量名
          dir: 'dist',
          globals: {
            vue: 'Vue'
          },
          exports: 'named'
        },
        {
          format: 'cjs',
          dir: 'lib',
          preserveModules: true,
          entryFileNames: '[name].js',
          preserveModulesRoot: 'packages',
          globals: {
            vue: 'Vue'
          },
          exports: 'named'
        }
      ]
      // output: {
      //   // Provide global variables to use in the UMD build
      //   // for externalized deps
      //   globals: {
      //     vue: 'Vue'
      //   }
      // }
    }
  }
})
