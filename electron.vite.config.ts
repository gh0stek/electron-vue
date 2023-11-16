import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { fileURLToPath } from 'url'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    plugins: [
      vue(),
      vueJsx(),

      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
      vuetify({
        styles: {
          configFile: 'src/styles/variables/_vuetify.scss'
        }
      }),
      Pages({}),
      Layouts(),
      Components({
        dirs: ['src/@core/components'],
        dts: true
      }),
      AutoImport({
        imports: ['vue', 'vue-router', '@vueuse/core', 'vue-i18n', 'pinia'],
        vueTemplate: true
      }),
      DefineOptions()
    ],
    define: { 'process.env': {} },
    resolve: {
      alias: {
        '@renderer': fileURLToPath(new URL('src/renderer/src', import.meta.url)),
        '@': fileURLToPath(new URL('src/renderer/src', import.meta.url)),
        '@core': fileURLToPath(new URL('src/renderer/src/@core', import.meta.url)),
        '@layouts': fileURLToPath(new URL('src/renderer/src/@layouts', import.meta.url)),
        '@configured-variables': fileURLToPath(
          new URL('src/renderer/src/styles/variables/_template.scss', import.meta.url)
        ),
        '@axios': fileURLToPath(new URL('src/renderer/src/plugins/axios', import.meta.url)),
        apexcharts: fileURLToPath(new URL('node_modules/apexcharts-clevision', import.meta.url))
      }
    },
    build: {
      chunkSizeWarningLimit: 5000
    },
    optimizeDeps: {
      exclude: ['vuetify'],
      entries: ['.src/renderer/src/**/*.vue']
    }
  }
})
