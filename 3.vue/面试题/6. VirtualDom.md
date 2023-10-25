# 是什么？

js 对象描述真实 DOM，对真实 DOM 的抽象

# 为什么需要？

由于直接操作 DOM 性能低 js 层的操作效率高，将 DOM 操作转化为对象操作，最终通过 diff 算法对比差异进行更新 DOM

# 优点

减少对真实 DOM 的操作
不依赖真实平台环境，实现跨平台

# 如何生成

模版编写组件 template
模板被编译器编译为渲染函数 render
挂载过程调用 render 函数，返回虚拟 dom
patch 过程中进一步转化为真实 dom

# 如何做 diff

挂载 记录第一次生成的 VDOM -oldVnode
响应式数据变化时，重新 render，生成新的 VDOM- newVnode
使用 oldVnode 与 newVnode 做 diff 操作，将更改的部分更新到真实 DOM 上，转换为最小量的 dom 操作，高效更新视图
