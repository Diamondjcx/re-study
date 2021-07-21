### 状态管理 vuex

每一个 Vuex 里面有一个全局的 Store，包含应用中的状态。单一的，一个应用仅会包含一个 Store 实例

```javascript
const app = new Vue({
  el: '#app',
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `,
})
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count() {
      return this.$store.state.count
    },
  },
}
```

Mutation：Vuex 通过提交 mutation 的方式修改 store，有一个事件类型和一个回调函数 同步事务

```javascript
const store = new Vuex.Store({
    state: {
        count: 1
    },
    mutations: {
        increment(state) {
            state.count++
        }
    }
})

触发：store.commit('increment')
```

Action：异步，里面执行异步操作，完事之后通过 store.commit('increment')来触发 mutation
一个 Action 中可以触发多个 mutation 类似一个灵活好用的中间件

```javascript
	actions: {
		// get token
		getToken({ commit, dispatch }, params) {
			return client.post('/Account/GetToken', { data: params }).then((data) => {
				if (data.issuccess) {
					commit('GET_TOKEN', data)
				}
				return data
			})
        },
    }
```

声明 Store 类，挂载 Store
Store 具体实现：
创建响应式的 state，保存 mountations、actions 和 getters
实现 commit 根据用户传入 type 执行对应的 mountation
实现 dispatch 根据用户传入 type 执行对应 action，同时传递上下文
实现 getters，按照 getters 定义对 state 做派生

Vuex 实现了一个单向数据流，在全局拥有一个 State 存放数据，当组件要更改 State 中的数据时，必须通过 Mutation 提交修改信息， Mutation 同时提供了订阅者模式供外部插件调用获取 State 数据的更新。而当所有异步操作(常见于调用后端接口异步获取更新数据)或批量的同步操作需要走 Action ，但 Action 也是无法直接修改 State 的，还是需要通过 Mutation 来修改 State 的数据。最后，根据 State 的变化，渲染到视图上。
