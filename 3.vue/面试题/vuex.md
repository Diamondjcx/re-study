### State

单一状态树 ---- 对应 Vue 中的 data

### Getters

需要从 store 中的 state 中派生出一些状态--- 对应 Vue 中的 computed

### Mutations

更改 Vuex 的 store 中的状态唯一方法是提交 mutation。

遵守 Vue 的响应规则：

1、最好提前在 store 中初始化好所有所需属性
2、当需要再对象上添加新属性时，
使用 Vue.set(obj, 'newProp', 123) 或者
以新对象替换老对象，例如利用对象展开运算符

```javascript
state.obj = { ...state.obj, newProp: 123 };
```

Mutation 必须是同步函数
Vuex 可以通过 devtool 监听数据变化。
每一条 mutation 被记录，devtools 都需要捕捉到前一状态和后一状态的快照。如果 mutation 中异步函数中的回调是不可追踪的。devtools 不知道什么时候回调函数实际上被调用。

### Actions

提交的是 mutation，而不是直接变更状态
可以包含任意异步操作

更改数据 mutations->methods
获取数据 getters -> computed
数据 state->data

通过 dispatch 可以触发 actions 中的方法
actions 中的 commit 可以触发 mutations 中的方法。

mutation 和 action 就相当于 vue 中的 method
