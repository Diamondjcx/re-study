const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin') // 生成html，然后将打包文件自动引入到index.html中
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
 entry: {
   index: './src/index.js',
   print: './src/print.js',
 },
 plugins: [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    title: '管理输出',
  }),
],
  output: {
   filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};