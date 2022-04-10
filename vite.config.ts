import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import * as path from 'path'
import htmlPlugin from 'vite-plugin-html-config'
import legacy from '@vitejs/plugin-legacy'
import mockServer from 'vite-plugin-mock-server'
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env: any = loadEnv(mode, process.cwd())
  const plugins = []
  const platform: any = loadEnv(mode, process.cwd(), 'C_PLATFORM')
  const htmlPluginOpt: any = {
    metas: [],
  }

  if (env == 'production') {
    plugins.push(
      require('autoprefixer')({
        overrideBrowserslist: [
          'Android 4.1',
          'iOS 7.1',
          'Chrome > 31',
          'ff > 31',
          'ie >= 8',
          '> 1%',
        ],
        grid: true,
      })
    )
    plugins.push(require('postcss-flexbugs-fixes'))
  }

  if (platform.C_PLATFORM === 'mobile') {
    htmlPluginOpt.metas = [
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no',
      },
    ]
    htmlPluginOpt.style = 'body{font-size:calc(100vw / 18.75)}'
  } else {
    htmlPluginOpt.metas = [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0',
      },
    ]
  }
  return {
    plugins: [
      vueJsx(),
      vue(),
      htmlPlugin(htmlPluginOpt),
      legacy({
        targets: ['> 0.25%, not dead'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        polyfills: ['es.promise.finally', 'es/map', 'es/set'],
        modernPolyfills: ['es.promise.finally'],
      }),
      mockServer({
        logLevel: 'info',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      postcss: {
        plugins,
      },
      // preprocessorOptions: {
      //   styl: {
      //     additionalData:`$mobileRootFontSize = calc(100vw / 18.75)`
      //   }
      // }
    },
    define: {
      'process.env': process.env,
    },
    build: {
      outDir: platform === 'mobile' ? 'mobile_dist' : 'pc_dist',
    },
  }
})
