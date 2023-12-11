import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
const pathSrc = path.resolve(__dirname, 'src')

import Unocss from 'unocss/vite'
import {
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

import AutoImport from 'unplugin-auto-import/vite'
// https://vitejs.dev/config/
export default ({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd())
  return defineConfig({
    define: {
      'process.env': viteEnv
    },
    server: {
      port: 8023,
      proxy: {
        [viteEnv.VITE_APP_BASE_API]: {
          target: viteEnv.VITE_APP_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp(`^${viteEnv.VITE_APP_BASE_API}`), ''),
        },
      }
    },
    base: './',
    resolve: {
      alias: {
        '~/': `${pathSrc}/`,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/styles/element/index.scss" as *;`,
        },
      },
    },
    plugins: [
      vue(),
      Unocss({
        presets: [
          presetUno(),
          presetAttributify(),
          presetIcons({
            scale: 1.2,
            warn: true,
          }),
        ],
        transformers: [
          transformerDirectives(),
          transformerVariantGroup(),
        ]
      }),
      AutoImport({
        imports: ['vue', 'vue-router'],
        dts: './src/auto-import.d.ts'
      })
    ],
  })
}