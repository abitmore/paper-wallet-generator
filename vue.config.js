const path = require('path');
const webpack = require('webpack');

function resolveSrc(_path) {
  return path.join(__dirname, _path)
}

module.exports = {
  configureWebpack: {
    // Set up all the aliases we use in our app.
    resolve: {
      alias: {
        'src': resolveSrc('src'),
        'assets': resolveSrc('src/assets'),
      }
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6
      }),
    ],
  },
  css: {
    // sourceMap: true
    sourceMap: process.env.NODE_ENV !== 'production'
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    },
    electronBuilder: {
      nodeModulesPath: [
        '../../node_modules',
        './node_modules'
      ],
      builderOptions: {
        npmRebuild: false,
        productName: 'PaperWallet',
        appId: 'top.paperwallet.app',
        compression: 'store',
        artifactName: '${name}-${os}-${arch}-${version}.${ext}',
        directories: {
          output: 'build/target'
        },
        win: {
          target: 'nsis',
          icon: 'build/icons/icon.ico'
        },
        nsis: {
          perMachine: true,
          oneClick: false,
          allowToChangeInstallationDirectory: true
        },
        mac: {
          category: 'public.app-category.finance',
          icon: 'build/icons/icon.icns'
        },
        dmg: {
          background: 'build/background.tif',
          icon: 'build/icons/icon.icns',
          contents: [
            {
              x: 130,
              y: 220
            },
            {
              x: 410,
              y: 220,
              type: 'link',
              path: '/Applications'
            }
          ]
        },
        linux: {
          category: 'Utilites',
          target: [
            'deb',
            'AppImage',
            'snap'
          ],
          synopsis: 'Paper Crypto Wallet generator offline',
          icon: 'build/icons/icon.icns'
        }
      }
    },
    cordovaPath: 'src-cordova'
  },

  publicPath: '',
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined
};
