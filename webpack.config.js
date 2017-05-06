const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


let ENV = {
  'process.env': {
    'NODE_ENV': JSON.stringify(process.env.NODE_ENV) || 'development',
    'development': true,
    'SC_SOCKET_URL': JSON.stringify('http://localhost:9090')
  }
}

if (process.env.NODE_ENV === 'production') {
  ENV['process.env'].SC_SOCKET_URL = JSON.stringify('http://138.197.149.23:9090')
}


module.exports = {
  devtool: 'source-map',
  entry: {
    chindow: "./public/chindow",
    dashboard: "./public/js/dashboard"
  },
  output: {
    path: path.resolve(__dirname, "public/build"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        options: {
          presets: ["es2015", "preact"]
        }
      }, {
        test: /\.css?$/,
        exclude: /public\/chindow\/styles\/?\w*\.css/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      }, {
        test: /public\/chindow\/styles\/?\w*\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin(ENV),
    new ExtractTextPlugin('styles.bundle.css'),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /styles\.bundle\.css$/,
      cssProcessorOptions: { discardComments: {removeAll: true } }
    })
  ]
};
