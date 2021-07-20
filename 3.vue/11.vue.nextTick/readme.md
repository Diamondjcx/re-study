答题思路：

1. nextTick 是啥？下一个定义
2. 为什么需要它呢？用异步更新队列实现原理解释
3. 在什么地方用它呢？ 平时开发时使用它的地方
4. 介绍一下如何使用 nextTick
5. 源码层面

## Vue.nextTick([callback, context])

下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 dom
// 修改数据
vm.msg = 'hello'

// DOM 还没有更新
Vue.nextTick(function () {
// DOM 更新了
})

回答范例：

1. nextTick 是 Vue 提供的一个全局 API，由于 vue 异步更新策略导致我们对数据的修改不会立刻体现 dom 变化上，此时如果想要立即获取更新后的 dom 状态，就需要使用这个方法
2. Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。nextTick 方法会在队列中加入一个回调函数，确保该函数在前面的 dom 操作完成后才调用
3. 所以当我们想在修改数据后立即看到 dom 执行结果就需要用到 nextTick 方法
4. 当数据变化之后，重新渲染 echarts 时，就会使用 nextTick，传入一个回调函数进去，在里面执行 dom 操作即可
5. 我也有简单了解 nextTick 实现，它会在 callbacks 里面加入我们传入的函数，然后用 timerFunc 异步调用它们，首选的异步方式会是 Promise。这让我明白了为什么可以在 nextTick 中看到 dom 操作结果