var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    vendor: ['lodash', 'vue', 'axios', 'vuex'],
    viewer: './src/js/viewer.js',
    config: './src/js/config.js',
    'live-config': './src/js/live-config.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js?id=[hash:8]'
  },
  module: {
    rules: [
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?id=[hash:8]',
          outputPath: '/fonts/'
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?id=[hash:8]',
          outputPath: '/images/'
        }
      },
      {
        test: /\.(webm)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?id=[hash:8]',
          outputPath: '/videos/'
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: process.env.NODE_ENV === 'production'
        }
      },
      {
        test: /\.scss$/,
        use: process.env.NODE_ENV === 'production' ? ExtractTextPlugin.extract({

          fallback: "style-loader",
          use: "css-loader!resolve-url-loader!sass-loader?sourceMap"
        }) : ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'config': path.join(__dirname, 'config', process.env.NODE_ENV)
    },
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    contentBase: path.join(__dirname, 'dist'),
    port: 8080,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    // new CopyWebpackPlugin([
    //   {
    //     from: 'src/static',
    //     to: 'static'
    //   }
    // ]),
    new HtmlWebpackPlugin({
      filename: 'viewer.html',
      template: 'src/ejs/viewer.ejs',
      chunks: ['vendor', 'viewer']
    }),
    new HtmlWebpackPlugin({
      filename: 'config.html',
      template: 'src/ejs/config.ejs',
      chunks: ['vendor', 'config']
    }),
    new HtmlWebpackPlugin({
      filename: 'live-config.html',
      template: 'src/ejs/live-config.ejs',
      chunks: ['vendor', 'live-config']
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/vendor.js?id=[hash:8]',
      minChunks: Infinity
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = false;//'#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin('css/[name].css?id=[hash:8]'),
    new webpack.DefinePlugin({
      'process': {
        'env': {
          'NODE_ENV': '"production"',
          'API_BASE': JSON.stringify('https://xt.streamlabs.com')
        }
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        drop_console: true,
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
} else {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process': {
        'env': {
          'API_BASE': JSON.stringify('https://streamlabs.dev')
        }
      }
    })
  ])
}
