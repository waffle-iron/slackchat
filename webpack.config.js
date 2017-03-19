const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
  entry: "./public/chindow",
  output: {
    path: path.resolve(__dirname, "public/chindow"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        options: {
          presets: ["es2015"]
        }
      }, {
        test: /\.css?$/,
        loaders: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new UglifyJSPlugin()
  ]
};
