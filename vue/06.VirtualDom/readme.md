# Virtual DOM

## 概述

对`DOM`的抽象，`JavaScript`对象，按照`DOM`结构来实现树形结构对象，轻量级的对`DOM`的描述

为什么要使用？

**（1）** 性能优化：尽可能少的操作`DOM`。浏览器对`DOM`的定义很复杂，`DOM`相对较慢。如果频繁操作，会造成浏览器的重绘重排
所以需要一层抽象，在`patch`过程中尽可能一次性的将差异更新到DOM中

**（2）** 抽象了原本的渲染过程，实现了跨平台的能力；浏览器、安卓、IOS、小程序、各种GUI等
 
## Virtual DOM 创建

`snabbdom.js`的抽象方式

我们自己实现的抽象方式

```javascript 
{
  type, // String DOM 节点类型，如 'div'
  data, // Object, 包括 props、style等DOM节点的各种属性
  children // Array, 子节点
}
```

```javascript 
// 接受一定参数，返回一个对象，这个对象就是DOM的抽象
function vnode(type, key, data, children, text, elm) {
  const element = {
    type, key, data, children, text, elm
  }
  return element
} 
```

## Virtual DOM树 创建

使用`h`函数创建。
`React`通过`babel`将`jsx`转换为`h`函数渲染
`Vue`是使用`vue-loader`将模板转为`h`函数形式

```javascript 
function h(tag, props, ...children) {
  return {
    tag,
    props: props || {},
    children: children.flat()
  }
}
```

## Virtual DOM 渲染

```javascript
function render (vdom) {
  // 如果是字符串或者数字，创建一个文本节点
  if (typeof vdom === 'string' || typeof vdom === 'number') {
    return document.createTextNode(vdom)
  }
  const { tag, props, children} = vdom
  // 创建真实DOM
  const element = document.createElement(tag)
  // 设置属性
  setProps(element, props)
  // 遍历子节点，并获取创建真实DOM，插入到当前节点
  children.map(render).forEach(element.appendChild.bind(element))
  // 在虚拟DOM中缓存真实DOM节点
  vdom.dom = element;
  // 返回DOM 节点
  return element
}

function setProps (element, props) {
  Object.entries(props).forEach(([key, value]) =>{
    setProp(element, key, value)
  })
}

function setProp () {
  element.setAttribute(
    // className使用class代替
    key === 'className' ? 'class' : key,
    value
  )
}
// 使用
const vdom = <div>Hello word!!!</div>
const app = document.getElementById('app')
const ele = render(vdom)
app.appendChild(ele)
```

## Virtual DOM diff

对比新老`VDOM`的变化，然后将变化更新到视图上；`diff`函数，返回一个`patches`（补丁）

```javascript
const before = h('div', {}, 'before text')
const after = h('div', {}, 'after text')
const patches = diff(before, after)
```

> 最开始出现的是 virtual-dom 这个库，是大家好奇 React 为什么这么快而搞鼓出来的。它的实现是非常学院风格，通过深度优先搜索与 in-order tree 来实现高效的 diff 。它与 React 后来公开出来的算法是很不一样。
然后是 cito.js 的横空出世，它对今后所有虚拟 DOM 的算法都有重大影响。它采用两端同时进行比较的算法，将 diff 速度拉高到几个层次。
紧随其后的是 kivi.js，在 cito.js 的基出提出两项优化方案，使用 key 实现移动追踪以及及基于 key 的最长自增子序列算法应用（算法复杂度 为O(n^2)）。
但这样的 diff 算法太过复杂了，于是后来者 snabbdom 将 kivi.js 进行简化，去掉编辑长度矩离算法，调整两端比较算法。速度略有损失，但可读性大大提高。再之后，就是著名的vue2.0 把sanbbdom整个库整合掉了。