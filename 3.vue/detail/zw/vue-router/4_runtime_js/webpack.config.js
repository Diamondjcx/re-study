const fs = require("fs");
const path = require("path");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  mode: "development",
  // context: path.resolve(process.cwd(),"./src"),

  entry: './src/main.js',
  output: {
    filename: "[name]-[contenthash:8].js",
    chunkFilename: "[name]~main.[contenthash:8].js",
    path: path.resolve(process.cwd(), "./dist"),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    // runtimeChunk: {
    //   name: entrypoint  => `runtime-${entrypoint.name}`,
    // },
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(process.cwd(), "./dist")],
    }),
  ],
};
