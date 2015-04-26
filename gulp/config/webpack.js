var paths           = require('./')
var webpack         = require('webpack')
var webpackManifest = require('../lib/webpackManifest')

module.exports = function(env) {

  var jsSrc = paths.sourceAssets + '/scripts/'
  var jsDest = paths.publicAssets + '/scripts/'
  var publicPath = 'assets/scripts/'

  var webpackConfig = {
    entry: {
      app: [jsSrc + 'app.jsx']
    },

    output: {
      path: jsDest,
      filename: env === 'production' ? '[name]-[hash].js' : '[name].js',
      publicPath: publicPath
    },

    plugins: [],

    resolve: {
      extensions: ['', '.js', '.jsx']
    },

    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader?experimental',
          exclude: /node_modules/
        },
        {
          test: /\.jsx$/,
          loader: 'jsx-loader?harmony',
          exclude: /node_modules/
        }
      ]
    }
  }

  if(env !== 'test') {
    // Factor out common dependencies into a shared.js
    webpackConfig.plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        name: 'shared',
        filename: env === 'production' ? '[name]-[hash].js' : '[name].js',
      })
    )
  }

  if(env === 'development') {
    webpackConfig.devtool = 'source-map'
    webpack.debug = true
  }

  if(env === 'production') {
    webpackConfig.plugins.push(
      new webpackManifest(publicPath, 'public'),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.NoErrorsPlugin()
    )
  }

  return webpackConfig
}
