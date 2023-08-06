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

- chunk

代码块，一个chunk由多个模块组合而成，用户代码合并与分割

- module

模块，在webpack里一切皆模块，一个模块对应着一个文件，会从配置的entry开始递归找出所有依赖的模块

当webpack处理到不认识的模块时，需要在webpack中的module处进行配置，当检测到是什么格式的模块，使用什么loader来处理

```javascript
module: {
  rules: [
    {
      test: /\.xxx$/, // 指定匹配规则
      use: {
        loader: 'xxx-loader' // 指定使用的loader
      }
    }
  ]
}
```

- loader
  - file-loader 处理静态资源模块
  原理是把打包入口中识别出的资源模块，移动到输出目录，并且返回一个地址名称

  使用场景：当我们需要模块，仅仅是从源代码挪移到打包目录，就可以使用file-loader来处理，txt，svg，csv，excel，图片资源等

  ```javascript
  module: {
    rules:[
      test: /\.(png|jpe?g|gif)$/,
      use: {
        loader: "file-loader",
        options: { // options额外配置，比如资源名称 placeholder 占位符 [name]老资源模块的名称 [ext]老资源模块的后缀
          name: "[name]_hash.[ext]",
          // 打包后的存放位置
          outputPath: "images/"
        }
      }
    ]
  }
  ```
    - 样式处理：

    css-loader  分析css模块之间的关系，并合成一个css

    loader执行顺序：从后往前

    style-loader会把css-loader生成的内容，以style挂载到页面的header部分

  - plugins
   
   可以在webpack运行到某个阶段的时候，帮你做一些事情，类似于生命周期的概念

   扩展插件，在webpack构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。作用于整个构建过程

   - HtmlWebpackPlugin

   会在打包结束后，自动生成一个html文件，并把打包生成的js模块引入到该html中

   - clean-webpack-plugin

   