# 流程

1. 初始化参数：shell webpack.config.js
2. 开始编译：初始化一个 Comiler 对象，加载所有的配置，开始执行编译
3. 确定入口：根据 entry 中的配置，找出所有的入口文件
4. 编译模块：从入口文件开始，调用所有的 laoder，再去递归的找依赖
5. 完成模块编译：得到每个模块被翻译后的最终内容以及他们之间的依赖关系
6. 输出资源：根据得到依赖关系，组装成一个个包含多个 module 的 chunk
7. 输出完成：根据配置，确定要输出的文件

# loader

webpack 只能理解 JavaScript 和 JSON 文件，loader 模块转换器，将非 js 模块转化为 webpack 能识别的 js 模块

```
style-loader
css-loader
less-loader
sass-loader
ts-loader
babel-loader
file-loader
eslint-loader

```

# plugin

扩展插件，webpack 运行的各个阶段，都会广播对应的时间，插件去监听对应的事件。

### 我们常说的 chunk 和 bundle 的区别是什么？（import！！！）

1. Chunk

Chunk 是 webpack 打包过程中 Modules 的集合，是（打包过程中）的概念

Webpack 的打包是从一个入口模块开始，入口模块引用其他模块，其他模块引用其他模块.....

webpack 通过引用关系逐个打包模块，这些 module 就形成了一个 chunk

如果有多个入口模块，可能会产出多条打包路径，每条路径都会形成一个 chunk

2. Bundle

是我们最终输出的一个或者多个打包好的文件

3. Chunk 和 Bundle 的关系是什么？

大多数情况下，一个 chunk 会生产一个 bundle，但是也有例外

chunk 是过程 Bundle 是结果

但是如果加了 sourcemap，一个 entry 一个 chunk 对应两个 bundle

Chunk 是过程中代码块，Bundle 是打包结果输出的代码块，Chunk 在构建完成就呈现为 Bundle

# 热更新

可以理解为模块热替换，指在应用程序运行过程中，替换、添加、删除模块，而无需重新刷新整个应用

当我们改完代码之后，webpack 会重新打包，并将新代码发送给浏览器，浏览器会将新代码替换老代码 ，不刷新浏览器的情况下，更新页面

- 通过`webpack-dev-server`创建两个服务器：提供静态资源的服务（express）和 Socket 服务
- express server 负责直接提供静态资源的服务（打包后的资源直接被浏览器请求和解析）
- socket server 是一个 websocket 的长连接，双方可以通信
- 当 socket server 监听到对应的模块发生变化时，会生成两个文件.json（manifest 文件）和.js 文件（update chunk）
- 通过长连接，socket server 可以直接将这两个文件主动发送给客户端（浏览器）
- 浏览器拿到两个新的文件后，通过 HMR runtime 机制，加载这两个文件，并且针对修改的模块进行更新

# 分包是怎么分的，怎么配置的

splitchunk 在 webpack 中是以什么样的方式起作用的，webpack 整个构建流程
打出一个 chunk 和多个 chunk 是怎么来的，多个 entry
页面路由的入口定义了多个 entry 多个 entry 来打包

依赖了 echarts，不想将 echarts 打入到我们的包中，单独打包
考察 entry 有多少种方式？
vue-cli 到 webpack 做了什么事？

分包方式，分别用在了哪些场景？
