# webpack

## 1. Wbpack 中的 Module 是指什么？

webpack 前端模块体系

webpack 支持 ESModule， CommonJS, AMD, Assests.(iamge, font, video, audio, json)

1. ESM

关键字 export， 允许将 ESM 中内容暴露给其他模块

关键字 import 引入文件

```js
import { aa } from './a.js'

export { bb }
```

// package.json

type module -> ESM
type commonjs -> CommonJS

2. CommonJS

module.exports, 允许将 CommonJS 中的内容暴露给其他模块

require

### 所以 webpack modules， 如何表达自己的各种依赖关系？

- ESM import 语句
- CommonJS require
- AMD define require
- css/sass/less @import

### 我们常说的 chunk 和 bundle 的区别是什么？（import！！！）

1、Chunk

Chunk 是 webpack 打包过程中 Modules 的集合，是（打包过程中）的概念

Webpack 的打包是从一个入口模块开始，入口模块引用其他模块，其他模块引用其他模块.....

webpack 通过引用关系逐个打包模块，这些 module 就形成了一个 chunk

如果有多个入口模块，可能会产出多条打包路径，每条路径都会形成一个 chunk

2、Bundle

是我们最终输出的一个或者多个打包好的文件

3、Chunk 和 Bundle 的关系是什么？

大多数情况下，一个 chunk 会生产一个 bundle，但是也有例外

chunk 是过程 Bundle 是结果

但是如果加了 sourcemap，一个 entry 一个 chunk 对应两个 bundle

Chunk 是过程中代码块，Bundle 是打包结果输出的代码块，Chunk 在构建完成就呈现为 Bundle

4、Split Chunk

不同文件进行分割，第三方包分开打包

```javascript
optimization: {
  runtimeChunk: 'single'
}
```

5、这段配置会产生几个 chunk

### Plugin 和 Loader 分别是做什么的？ 怎么工作的？

1、Loader

模块转换器，将非 js 模块转化为 webpack 能识别的 js 模块

本质上，webpack loader 将所有类型的文件，转换为应用程序的**_依赖图_**可以直接饮用模块

2、Plugin

扩展插件，webpack 运行的各个阶段，都会广播对应的时间，插件去监听对应的事件。

3、Compiler

对象，包含了 webpack 环境的所有配置信息，包括 options loader，plugins webpack 启动的时候实例化，它在全局是唯一的，可以把它理解为 webpack 的实例

4、Compliation

包含了当前的模块资源，编译生成资源

webpack 在开发模式下运行的时候，每当检测到一个文件变化，就会创建一次新的 Comliation

### 能简单描述一下 webpack 的打包过程吗？

1. 初始化参数：shell webpack.config.js
2. 开始编译：初始化一个 Comiler 对象，加载所有的配置，开始执行编译
3. 确定入口：根据 entry 中的配置，找出所有的入口文件
4. 编译模块：从入口文件开始，调用所有的 laoder，再去递归的找依赖
5. 完成模块编译：得到每个模块被翻译后的最终内容以及他们之间的依赖关系
6. 输出资源：根据得到依赖关系，组装成一个个包含多个 module 的 chunk
7. 输出完成：根据配置，确定要输出的文件
