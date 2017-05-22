const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = {
  devtool: 'source-map',
  entry: {
    chindow: './public/chindow',
    dashboard: './public/js/dashboard',
  },
  output: {
    path: path.resolve(__dirname, 'public/build'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'preact'],
        },
      }, {
        test: /\.css?$/,
        exclude: /public\/chindow\/styles\/?\w*\.css/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader',
        }),
      }, {
        test: /public\/chindow\/styles\/?\w*\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|otf)$/,
        loader: 'url-loader?limit=100000',
      },
    ],
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    new ExtractTextPlugin('styles.bundle.css'),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /styles\.bundle\.css$/,
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
      },
    }),
  ],
};
