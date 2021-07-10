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
