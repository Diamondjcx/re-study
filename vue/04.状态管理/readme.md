### 状态管理vuex

每一个Vuex里面有一个全局的Store，包含应用中的状态。单一的，一个应用仅会包含一个Store实例

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
  `
})
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```

Mutation：Vuex通过提交mutation的方式修改store，有一个事件类型和一个回调函数  同步事务

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

Action：异步，里面执行异步操作，完事之后通过store.commit('increment')来触发mutation
一个Action中可以触发多个mutation  类似一个灵活好用的中间件

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





声明Store类，挂载Store
Store具体实现：
    创建响应式的state，保存mountations、actions和getters
    实现commit根据用户传入type执行对应的mountation
    实现dispatch根据用户传入type执行对应action，同事传递上下文
    实现getters，按照getters定义对state做派生