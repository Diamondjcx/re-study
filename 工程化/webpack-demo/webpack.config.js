const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin') // 生成html，然后将打包文件自动引入到index.html中
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  mode: 'development',
 entry: {
   index: './src/index.js',
   print: './src/print.js',
 },
 devtool: 'inline-source-map',
 devServer: {
    contentBase: './dist',
 },
 plugins: [
  // new CleanWebpackPlugin(),
  new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
  new HtmlWebpackPlugin({
    title: 'Development',
  }),
],
  output: {
   filename: '[name].bundle.js',
   path: path.resolve(__dirname, 'dist'),
   publicPath: '/'
  },
  
};