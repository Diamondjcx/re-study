'use strict'
require('./check-versions')() // 检查node和npm版本

process.env.NODE_ENV = 'production' // 指定环境变量

const ora = require('ora') // 一个美美的loading插件
const rm = require('rimraf') // rm -rf Node版本的unix命令
const path = require('path') // node自带的文件路径插件
const chalk = require('chalk') // 控制台高亮
const webpack = require('webpack')
const config = require('../config') // 配置入口
const webpackConfig = require('./webpack.prod.conf') // webpack配置

const spinner = ora('building for production...')
spinner.start()

// config 三套环境 并行并且互相隔离的入口
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err

    // webpack编译的开始
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
