# webpack 的原理与实战

## JS中的模块化
ES6 之前 CommonJs  AMD
## CommonJs

Node.js 基于V8引擎，事件驱动I/O的服务端JS运行环境。 CommonJS的模块化规范

每个JS文件就是一个模块，require函数 和module.exports 对象来对模块进行导入和导出

```js
// <!-- index.js -->
require("./moduleA");
var m = require("./moduleB");
console.log(m)

// <!-- moduleA.js -->
var m = require("./moduleB");
setTimeout(() => console.log(m), 1000)


// moduleB.js
var m = new Date().getTime();
module.exports = m;
```

## AMD

web开发者所熟知的JS运行环境就是浏览器。

AMD Asyncchronous module definition 异步的模块定义，不同于CommonJS规范的同步加载,AMD正如其名所有模块默认都是异步加载，早期为了满足web开发的需要，因为如果再web端也是用同步加载，那么页面再解析脚本文件的过程中可能使页面暂停响应。

```js
// index.js
require(['moduleA', 'moduleB'], function (moduleA, moduleB) {
  console.log(moduleB)
})

// moduleA.js
define(function(require) {
  var m = require('moduleB');
  setTimeout(() => console.log(m), 1000)
})

// moduleB.js
define(function (require) {
  var m = new Date().getTime();
  return m;
})
```
如果想要使用AMD规范，我们还需要添加一个符合AMD规范的加载器脚本在页面中，符合AMD规范实现的库很多，比较有名的就是require.js

## ESModule

CommonJS规范和AMD规范有这么几个特点：
1、语言上层的运行环境中实现的模块化规范，模块化规范由环境自己定义。
2、相互之间不能共用模块。例如不能在Node.js运行AMD模块，不能直接在浏览器运行CommonJS模块

在ES6之后，JS有了语言层面的模块化导入导出关键词与语法以及与之匹配的ESModule规范。使用ESmodule规范，我们可以通过import和export 两个关键词来对模块进行导入与导出

```js
// index.js
import './moduleA';
import m from './moduleB';
console.log(m)

// moduleA.js
import m from './moduleB';
setTimeout(() =>console.log(m),1000)

// moduleB.js
var m = new Date().getTime();
export default m;

```
每个JS运行环境都有一个解析器，否则这个环境也不认识JS语法。它的作用就是用ECMAScript的规范去解释JS语法，也就是处理和执行语言本身的内容。

在解析器的上层，每个运行环境都会在解释器的基础上封装一些环境相关的API。

Node.js
global
process

浏览器
window对象
document对象

小程序
wx
swan

ESModle就属于JS Core层面的规范，而AMD, CommonJS 是运行环境的规范。想要使运行环境支持ESModule 其实是比较简单的，只需要升级自己环境中的JS Core解释引擎到足够的版本，引擎层面就能认识这种语法，从而不认为这是个语法错误，运行环境中只需要做一些兼容工作即可。


## 后模块化的编译时代

web端受制于用户使用的浏览器版本，不能随心所欲使用JS的最新特性。为了能让我们新代码也运行在用户的老浏览器中，出现很多工具，能静态将高版本规范的代码便以为低版本规范的代码-babel

babel：能把JS Core中高版本规范的语法，也能按照相同语义在静态阶段转为低版本规范的语法，即使是早期的浏览器，内置的JS解释器也能看懂。

然而，不幸的是，对于模块化相关的import 和export 关键字；babel最终会将它编译为包含require 和 exports 的CommonJS规范。

这就造成了另一个问题，这样带有模块化关键词的模块，编译之后还是没办法直接运行在浏览器中，因为浏览器端并不能运行CommonJs的模块。为了能在WEB端直接使用CommonJS规范的模块，除了编译之外，我们还需要一个步骤--打包（bundle）

打包工具的作用，就是将模块化内部实现的细节抹平，无论是AMD还是CommonJS模块化规范的模块，经过打包处理之后能变成直接运行在WEB 或 Node.js 的内容


