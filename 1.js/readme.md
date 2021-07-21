# JavaScript

## 执行上下文/作用域链/闭包

### 介绍一下 JavaScript 的执行上下文

### 介绍一下 JavaScript 的作用域链

### 介绍一下 JavaScript 的闭包是什么，已经应用的场景

## this/call/apply/bind

### 介绍一下 JavaScript 里的 this

### 如何改变 this 的指向

### 如何实现 call 和 apply

### 如何实现一个 bind

## 原型/继承

### 介绍一下 JavaScript 的原型

### 原型链是什么

### 如何利用原型实现继承

## Promise

### Promise 是什么

### 如何实现一个 Promise（Promise A+）

### async await

## 深浅拷贝

### 介绍一下 JavaScript 的深浅拷贝

### 如何实现浅拷贝

### 如何实现深拷贝

### 实现深拷贝需要注意哪些问题

### 如何解决循环引用的问题

## 事件机制/Event Loop

### 如何实现一个事件的发布订阅

### 介绍一下事件循环

### 宏任务和微任务有什么区别

## 函数式编程

## service worker

## web worker

## 常用方法

### 数组方法

### ES6 后的

# CSS 基础

## position

## 行内元素/块状元素

## flex

### 介绍一下 flex 布局

### 如何用 flex 实现九宫格布局

### flex：1 指的是什么 flex 属性默认值是什么

### 分别介绍一下 flex-shrink 和 flex-basis 属性

### grid 也一起看下

## 1px

### 介绍一下 rem 方案和 vw 方案，分别有什么优点和缺点

### rem 方案的 font-size 是挂在哪的

### rem 方案时移动端字体是怎么处理的

## 重绘回流

### 介绍一下重绘和回流

### 如何避免重绘和回流

## 居中/常见布局

## 层叠上下文 说一下 z-index

## Sass/Less

# 框架

## MVVM

### 介绍一下 MVVM,和有什么区别

### ViewModel 有什么好处

## 生命周期

### nextTick 是如何实现的

### 父子组件挂载时，生命周期的顺序是怎么样的呢？

## 数据绑定

### Vue 的双向绑定是如何实现的呢

#### 数据劫持

#### 发布订阅

### Vue2 中关于数组和对象数据观察时有做什么特殊处理吗？（重写数组的方法）

### defineProperty 和 proxy 有什么区别

### Vue 中的数据为什么频繁变化只会更新一次

## 状态管理

### 什么是状态管理，为什么需要状态管理

### 介绍一下 Vuex 和 Redux

### Vuex 和 Redux 有什么区别

### 如果让你实现一个简单的状态管理，要如何实现

## 组件通信

### 父子组件如何进行通信

### 爷孙组件如何进行通信

### 兄弟组件如何进行通信

## Virtual DOM

### Virtual DOM 是什么

### 为什么需要 Virtual DOM

### Vue 的 Virtual DOM 解决了什么问题

## diff

### 介绍一下 Vue 的 diff 策略

### 介绍一下 React 的 diff 策略

### Vue 的 diff 策略和 React 的 diff 策略有什么不同

### key 有什么用

## Vue computed/watch 原理

### computed 是如何实现的

### watch 是如何实现的

### computed 的时候可以引用其他 computed 属性，是如何实现的

## Vue mixin

### Vue 的 mixin 是什么

### 为什么 Vue 没有高阶组件

## Vue 和 React 有什么不同

### 现在有一个项目，你是如何考虑是使用 Vue 还是 React

### 从多个角度具体说一下 Vue 和 React 有什么区别

# 工程化

## webpack

### 介绍一下 webpack 的构建流程

### webpack 和 rollup 有什么相同和不同点

### 介绍一下 Loader

#### 常用的 loader 有哪些，有什么作用

#### 介绍一两个 loader 的思路

### 介绍一些 Plugin

#### 常用的 Plugin 有哪些，有什么作用

#### 介绍一两个 Plugin 的思路

### webpack 热更新是如何实现的

### webpack 层面如何做性能优化

### 介绍一下 webpack 的 dll

### 介绍一下 webpack 的 tree-shaking

### 介绍一下 webpack 的 scope hosting

## babel

### 介绍一下 babel 的原理

## 模板引擎

### 如何实现一个最简模板引擎

## 前端发布

### 一个前端页面是如何发布到线上的

### cdn

### 增量发布

## weex

### 介绍一下 week 的原理

### 为什么 weex 比 H5 快

### week 有什么缺点

# 性能优化

## 打包优化

### webpack

#### loader

#### dll

#### 压缩代码

#### tree shaking

#### scope hosting

#### code splitting

### 图片 base64，cdn

## 网络优化

### dns

### cdn

### 缓存

### preload/prefetch/懒加载

### ssr

## 代码优化

### loading/骨架屏

### web worker

### 虚拟列表

### 懒加载

### dom/style 批量更新

# 网络

## HTTP

### 常见的状态码有哪些

### 304 表示什么，和 302 有什么区别

### 介绍一下 HTTP 缓存策略

### Connection 为 keep-alive 表示什么

## DNS

### 介绍一下 DNS

## TCP

### 三次握手

### 四次握手

## HTTPS

### 介绍一下 HTTPS 的工作原理

### HTTPS 和 HTTP 有什么区别

## CDN

### 介绍一下 CDN 是什么以及它的应用场景

### CDN 的回源是什么

## 一个老套但经典的问题

### 从输入 URL 到页面展示，发生了什么

# 设计模式

## 介绍一下了解的设计模式以及应用场景

## Vue/React 中有应用什么设计模式

# 数据结构

## 介绍一下栈/队列/链表

## 用 JavaScript 实现栈/队列/链表

## 树

# 算法

## 各种常见排序算法的思路和复杂度

## 二叉树的前序/中序/后序遍历

## 深度优先/广度优先的思路和应用场景

## 动态规划

## diff

# 安全

## XSS

## CSRF

## HTTPS

## 风控策略

## 可信前端

## 前端-服务端安全策略

# Node

# 项目/业务

## 介绍一下你做的最好的项目

## 你在这个项目中担任一个怎么样的角色，起到什么样的作用

## 这个项目中遇到了什么难点，是如何解决的

# 其它

## 如何看待前端和后端

## Serverless

## HR 面试
