const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MyPlugin = require('./plugin-loader/my-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: './src/react.js',
  output: {
    path: path.resolve(__dirname, 'output'),
    filename: 'main.js',
    publicPath: '/' // 导入静态资源时的路径前缀，本教程使用相对路径，可不配置
  },
  devServer: {
    port: 8000,
    hot: true
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: {
        loader: 'babel-loader',
      }
    }, {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader']
    }, {
      test: /\.mobile$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', {
        loader: './plugin-loader/my-loader',
        options: {
          size: 750
        }
      }]
    }]
  },
  plugins: [
    // new MyPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          filename: 'vendor.js',
          chunks: 'all',
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/
        },
      }
    }
  }
}