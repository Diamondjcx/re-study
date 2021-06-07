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

4. Split Chunk

不同文件进行分割，第三方包分开打包

```javascript
optimization: {
  runtimeChunk: 'single'
}
```

5. 这段配置会产生几个 chunk

这段代码会输出几个 chunk 和一个 module
1、entry index
2、entry other
3、runtimeChunk:'single'
4、splitChunks: common
5、splitChunks: vendor

commons:{
chunks:'initial',
minChunks:2 // 如果有 2 个文件都引用了，要单独打包
}

### Plugin 和 Loader 分别是做什么的？ 怎么工作的？

1、Loader

模块转换器，将非 js 模块转化为 webpack 能识别的 js 模块

本质上，webpack loader 将所有类型的文件，转换为应用程序的**_依赖图_**可以直接引用模块

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

# 实现一个自己的打包工具

webpack

本质上，webpack 是一个现代 js 应用程序的静态模块打包器

当 webpack 处理应用程序的时候，它会递归的构建一个依赖关系图，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle

1、ESmodule

```js
import axios from 'axios'
export default axios
```

## 概览

1. 找到一个入口文件
2. 解析这个入口文件，提取他的依赖
3. 解析入口文件依赖的依赖，递归的去创建一个文件间的依赖图，描述所有文件的依赖关系
4. 把所有文件打包成一个文件

## 开始开发!!!!

1. 新建几个 js 源文件

- name.js
- message.js
- entry.js

2. 肉眼观察三个文件的依赖关系

entry 依赖 message, message 依赖 name

3. 开始编写自己的打包工具,mywebpack.js

```js
const fs = require('fs')

function createAsset(filename) {
  const content = fs.readFileSync(filename, 'utf-8')
  console.log(content)
}

createAsset('./source/entry.js')
```

4. 分析 ast，思考如何能够解析出 entry.js 依赖

4.1 File -> program
4.2 program -> body 里面是我们各种语法的描述
4.3 ImportDeclaration 引入的声明
4.4 ImportDeclaration source 属性，source.value 就是引入文件的地址'./message.js'

5. 生成 entry.js 的 ast

babylon 一个解析 babel 的 js 解析工具

```js
const fs = require('fs')
const babylon = require('babylon')

function createAsset(filename) {
  const content = fs.readFileSync(filename, 'utf-8')

  const ast = babylon.parse(content, {
    sourceType: 'module',
  })

  console.log(ast)
}
```

6. 解析 AST，找到 entry.js 的 ImportDeclaration Node

```js
const fs = require('fs')
const babylon = require('babylon')
const traverse = require('babel-traverse').default

function createAsset(filename) {
  const content = fs.readFileSync(filename, 'utf-8')

  const ast = babylon.parse(content, {
    sourceType: 'module',
  })

  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      console.log(node)
    },
  })

  console.log(content)
}
```

7. 找到 entry.js 的依赖

```js
function createAsset(filename) {
  const content = fs.readFileSync(filename, 'utf-8')

  const ast = babylon.parse(content, {
    sourceType: 'module',
  })

  const dependencies = []
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value)
    },
  })
  console.log(dependencies)
}
```

8. 优化 createAsset ，使其能够区分文件

因为要获取所有文件的依赖，所以咱们需要一个 id 来标识所有文件

这里咱们用一个简单的自增 number，这样遍历的每个文件 id 就唯一了

先获取到 entry.js 的 id filename 以及 dependencies

```js
function createAsset(filename) {
  const content = fs.readFileSync(filename, 'utf-8')

  const ast = babylon.parse(content, {
    sourceType: 'module',
  })

  const dependencies = []
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value)
    },
  })
  const id = ID++

  return {
    id,
    filename,
    dependencies,
  }
}

const mainAsset = createAsset('./source/entry.js')

console.log(mainAsset)
```

9. 我们获取到单个文件的依赖了，接下来尝试建立依赖图

新增一个函数 createGraph, 把 createAsset 调用移入 createGraph

entry 的路径需要动态的，所以 createGraph 接收一个参数 entry

```js
function createGraph() {
  const mainAsset = createAsset(entry)
  return mainAsset
}

const graph = createGraph('./source/entry.js')

console.log(graph)
```

10. 上面存储的都是相对路径，想办法把他们转为绝对路径

有了绝对路径，我们才能获取到各个文件的 asset

```js
function createGraph() {
  const mainAsset = createAsset(entry)
  const allAsset = [mainAsset]

  for (let asset of allAsset) {
    const dirname = path.dirname(asset.filename)

    asset.dependencies.forEach((relativePath) => {
      const absolutePath = path.join(dirname, relativePath)

      const childAsset = createAsset(absolutePath)
    })
  }
}
```

11. 我们需要一个 map，记录 depend 中的相对路径 和 childAsset 的对应关系

因为我们后面要做依赖的引入，需要这样的一个对应关系

```js
function createGraph() {
  const mainAsset = createAsset(entry)
  const allAsset = [mainAsset]

  for (let asset of allAsset) {
    const dirname = path.dirname(asset.filename)

    asset.mapping = {}

    asset.dependencies.forEach((relativePath) => {
      const absolutePath = path.join(dirname, relativePath)

      const childAsset = createAsset(absolutePath)

      asset.mapping[relativePath] = childAsset.id
    })
  }
}
```

12. 那么接下来就要开始遍历所有文件了

```js
function createGraph() {
  const mainAsset = createAsset(entry)
  const allAsset = [mainAsset]

  for (let asset of allAsset) {
    const dirname = path.dirname(asset.filename)

    asset.mapping = {}

    asset.dependencies.forEach((relativePath) => {
      const absolutePath = path.join(dirname, relativePath)

      const childAsset = createAsset(absolutePath)

      asset.mapping[relativePath] = childAsset.id

      allAsset.push(childAsset)
    })
  }
  return allAsset
}
```

这个输出就是咱们一直提到的依赖图 !!!

13. 新增一个 bundle 方法

```js
function bundle(graph) {}

const graph = createGraph('./source/entry.js')
const result = bundle(graph)
console.log(result)
```

14. 创建整体的结果代码

因为他需要接收参数，且需要立即执行，所以用一个自执行函数来包裹。

自执行函数接收的参数是？ 是 module， 是每一个文件模块

```js
function bundle(graph) {
  let modules = ''

  graph.forEach((module) => {
    modules += `${module.id}:[
      
    ]`
  })

  const result = `
    (function () {

    })({${modules}})
  `
}
```

15. 编译所有源代码

```js
const { code } = babel.transformFromAst(ast, null, {
  presets: ['env'],
})
```

16. 把编译后的代码，加入咱们的 result 中

CommonJS 的规范要求：

1. module 变量代表当前模块

这个变量是一个对象，她的 exports 属性是对外的接口。module.exports，加载某个模块，其实就是加载该模块的 module.exports 属性

2. require 方法用于加载模块
