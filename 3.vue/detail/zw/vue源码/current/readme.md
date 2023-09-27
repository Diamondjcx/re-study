## 主要内容
### Vue2.x 响应式 (0-10分钟，概念说明)
#### 手写迷你版 (10-70分钟)
#### 看一看源码/列大纲 (70-120分钟)
### Vue2.x 和 Vue3.x 的对比
- Vue 3.x 中使用了 Proxy 作为响应式，天生的代理，不用考虑属性重写、数组这些2.x 中hack的情况；
- diff, 增加了最大递增子序列的算法，让我移动节点，更高效；
- 架构采用 monorepo 的方式，分层清晰，同时把编译部分也进行了一些拆解；
- vue3 对编译的内容，进行了重写，template -- render 函数。
    - vue2 正则， vue3 状态机; -- [ast 编译原理]
    - patchFlag, 标记哪些元素包含哪些属性
    - 静态提升
- vue3 使用 blockTree, 对比需要改变的，优化性能，如果你要用 jsx 的写法，就不会优化，但是可以自己去标记。
- ts 重构。
- compiler 拆成了四个包。方便你去重写。
- vue2 options API -- vue3 composition API
- vue3，使用了 rollup 打包，支持 treeshaking。
- 实例化方式也有区别；


### Vue3.x 响应式

#### 手写迷你版

##### 描述步骤
```js
let count = ref(0);
effect(() => { console.log(count.value)});
```
effect 的内部函数，会执行。run();
触发了refNum.value 去收集依赖；
track 的过程。
-- targetMap() 添加副作用函数


```js
setInterval(() => {
    count.value++
}, 1000)
```

trigger 
targetMap 取出对应的activeEffect对象
执行 run 方法。

#### 看一看源码/列大纲

- mpvue
    - fork vue2.x compiler

##### reactivity

- ref 相关
    - isRef
    - ToRef
    - ShallowRef

- reactive 相关
    - reactive,
    - readonly,
    - isReactive,
    - isReadonly,
    - isShallow,
    - isProxy,
    - shallowReactive,
    - shallowReadonly,
    - markRaw,
    - toRaw,

- effect 相关


##### Vue3.x diff
[a,b,c,d]
[d,a,b,c]

全局搜“传说中的diff算法”

## 扯淡
- 看面试题的用处，是帮你去总结和巩固你的知识点。
- 《JavaScript 设计模式与开发实践》-- 曾探。js, ui 没关系。
- 《head first 设计模式》, 《大话设计模式》, 《设计模式之禅》 -- Java
- 《架构整洁之道》

## 问题
- 如何去读源码，有哪些方法？
    1. 多种方位，了解源码的多种大纲。
    2. 带着问题和脉络，先把源码中一条路理顺。
    3. 然后一点一点去扩展。

- 什么是好代码，单纯从代码的角度来说
    1. 良好的注释的合理的拆分；
    2. 优雅的使用方式；
```js
// list --> tree
// let obj = {}
// for(){
//     if xx
//     else
//     map(item => {
//         item.push()
//     })
// }

function transformToTree(list) {
    return list.filter(Boolean)
            .map(item => item.xxxx)
            .reduce((total, item) => xxxxxx , {})
}

```
    3. 拍案的设计；
    4. 一致性、规范性的体现。


- 怎么学习？
  - 如何在海量的学习资料里，甄别对自己有用的内容；
  - 如何给自己制定合理的学习计划，让自己处在“学习区”；（舒适区、学习区、恐惧区）
  - 如何把知识有效内化，熟练使用，短时间内形成经验；
  - 如何东西领导、企业、市场以及国家的走向与导向，让技术快速变现。
