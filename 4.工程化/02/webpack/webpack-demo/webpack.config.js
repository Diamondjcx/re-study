const path = require("path");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); 
// const FileSizePlugin = require("./plugin");

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: path.resolve(__dirname, 'loader.js')
      }
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin()
    // new FileSizePlugin()
    // new FileSizePlugin()
  ]
}