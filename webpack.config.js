const path = require('path')
const webpack = require('webpack')
const offlinePlugin = require('offline-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './docs'),
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.output = {
    path: path.resolve(__dirname, './docs'),
    filename: '[name].[hash].js'
  }
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.tpl',
      inject: true,
      minify: {
        // removeComments: true,
        // collapseWhitespace: true,
        // removeAttributeQuotes: true
      },
      chunks: ['main'],
      chunksSortMode: 'dependency'
    }),
    new cleanWebpackPlugin(['docs'], {
      root: path.resolve('./')
    }),
    new copyWebpackPlugin([
      { from: './img/favicon.ico', to: 'favicon.ico'}
    ]),
    new offlinePlugin({
      Caches: {
        main: [
          'index.html',
          '**.js'
        ],
        additional: [':externals:']
      },
      externals: [
        'https://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css',
        'https://cdn.bootcss.com/highlight.js/9.7.0/styles/atom-one-dark.min.css'
      ],
      ServiceWorker: {
        events: true
      },
      AppCache: null
    })
  ])
}
