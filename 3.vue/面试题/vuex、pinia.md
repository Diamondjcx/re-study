# vuex

## 概念

数据共享，跨组件通信

## 状态修改

1. 组件中 commit -> mutation-＞修改状态
2. 组件中 dispatch() -> action(为了解决接口的复用问题，封装公共的逻辑）->commit() -mutation->修改状态

## 缺点

模块和状态的名字冲突。
数据不够扁平化、调用的时候过长。
更改状态 mutation 和 action 的选取。
模块需要增加 namespaced
对 TS 支持井不友好

## 原理

1. 对于 Vuex3 核心就是通过 new Vue 创建了一个 Vue 实例，进行数据共享
2. 对于 Vuex4 核心就是通过创建一个响应式对象进行数据共享 reactive()

## mutaion 和 action 区别

在 action 中可以处理异步逻辑，可以获取数据后将结果提交给 mutation, mutation 中则是修改 state.
在 action 中可以多次进行 commit 操作，括 action 中也可以调用 action.
在非 mutation 中修改数据，在严格模式下会发生异岸 dispatch 时会将 action 包装成 promise

# pinia

1. 与 Vuex 相比，Pinia 不仅提供了一个更简单的 API，也提供了符合组合式 API 风格的 API，最重要的是，搭配 TypeScript 一起使用时有非常可靠的类型推断支持。（简单 api、符合组合式风格、搭配 typeScript）
2. 轻量 1kb
