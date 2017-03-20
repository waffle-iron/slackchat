const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

let ENV = {
  'process.env': {
    'NODE_ENV': JSON.stringify(process.env.NODE_ENV) || 'development',
    'SC_SOCKET_URL': JSON.stringify('http://localhost:9090')
  }
}

if (process.env.NODE_ENV === 'production') {
  ENV['process.env'].SC_SOCKET_URL = JSON.stringify('http://138.197.149.23:9090')
}


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
    new UglifyJSPlugin(),
    new webpack.DefinePlugin(ENV)
  ]
};
