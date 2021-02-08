# webpack

模块打包工具

从入口模块出发，识别出源码中的模块化导入语句，递归地找出入口文件的所有依赖，将入口和其所有的依赖打包到一个单独的文件中

1、参数解析
2、找到入口文件
3、调用loader编译文件
4、遍历AST,收集依赖
5、生成chunk
6、输出文件

- webpack 默认支持js模块、json模块
- 支持CommonJS、  Es module、 AMD等模块类型

## 配置详解
/**
 * webpack的基础配置
 */

```javascript
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
 ```

 - entry:

 指定webpack打包入口文件：Webpack执行构建的第一步将从entry开始，可抽象成输入

 ```javascript
  //单⼊⼝ SPA，本质是个字符串
  entry:{
    main: './src/index.js'
  }
  // ==相当于简写===
  entry:"./src/index.js"
  //多⼊⼝ entry是个对象
  entry:{
    index:"./src/index.js",
    login:"./src/login.js"
  }
 ```
- output:
  
  打包转换后的文件输出到磁盘位置输出结果，在webpack经过一系列处理并得出最终想要的代码后输出结果

  ```javascript
  output: {
    filename: "bundle.js",//输出⽂件的名称
    path: path.resolve(__dirname, "dist")//输出⽂件到磁盘的⽬录，必须是绝对路径
  },
    
    //多⼊⼝的处理
  output: {
    filename: "[name][chunkhash:8].js",//利⽤占位符，⽂件名称不要重复
    path: path.resolve(__dirname, "dist")//输出⽂件到磁盘的⽬录，必须是绝对路径
  },
  ```

- mode

设置mode可以自动触发webpack内置的函数，达到优化的效果

用来指定当前的构建环境
  - production
  - development
  - none
开发阶段的开启会有利于热更新的处理，识别哪个模块变化
生成阶段的开启会有帮助模块压缩，处理副作用等一些功能

- loader

处理任意类型的文件，并且将它们转换成一个让webpack可以处理的有效模块

模块解析，模块转换器，用于把模块原内容按照需求转换成新内容

webpack是模块打包工具，而模块不仅仅是js，还可以是css，图片或者其他格式

但是webpack默认只知道如何处理js和json模块，那么其他格式的模块处理，和处理方式就需要loader了

常见的loader 

```
style-loader
css-loader
less-loader
sass-loader
ts-loader
babel-loader
file-loader
eslint-loader
...

```