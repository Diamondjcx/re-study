/**
 * webpack的基础配置
 */

 module.export = {
   entry: "./src/index.js", // 入口文件
   output: "./dist", // 输出结构
   mode: "production", // 打包环境
   module: {  
    rules: [
      // loader模块处理
      {
        test: /\.css$/,
        use: "style=loader"
      }
    ]
   },
   plugins: [new HtmlWebpackPlugin()] // 插件配置
 }