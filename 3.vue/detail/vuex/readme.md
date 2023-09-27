# Vuex介绍

## 核心概念

### State

单一状态树  ---- 对应Vue中的data

### Getters

需要从store中的state中派生出一些状态--- 对应Vue中的computed

### Mutations

更改Vuex的store中的状态唯一方法是提交mutation。

遵守Vue的响应规则：

1、最好提前在store中初始化好所有所需属性
2、当需要再对象上添加新属性时，
  使用Vue.set(obj, 'newProp', 123) 或者
  以新对象替换老对象，例如利用对象展开运算符
  ```javascript
  state.obj = { ...state.obj, newProp: 123 }
  ```

Mutation必须是同步函数
Vuex可以通过devtool监听数据变化。
每一条mutation被记录，devtools都需要捕捉到前一状态和后一状态的快照。如果mutation中异步函数中的回调是不可追踪的。devtools不知道什么时候回调函数实际上被调用。

### Actions

提交的是mutation，而不是直接变更状态
可以包含任意异步操作


# Vuex原理

Vuex是一个专门为Vue.js应用程序开发的状态管理模式。

Vue的插件

每一个Vue的插件都有一个install方法。

## vuex的store是如何挂载注入到组件中呢？

1、在Vue项目中安装使用Vuex

```javascript
import Vuex from 'vuex';
Vue.use(vuex);// vue的插件机制
```

2、利用Vue的插件机制，使用Vuex.use(vuex),会调用Vuex的install方法，装载Vuex

```javascript
// src/store.js
export function install (_Vue) {
  if (Vue && _Vue === Vue) {
    return
  }
  Vue = _Vue
  applyMixin(Vue)
}
```

3、applyMixin方法使用vue混入机制，vue的生命周期beforeCreate钩子函数前混入vuexInit方法

```javascript
// src/mixins.js
// 对应applyMixin方法
export default function (Vue) {
  const version = Number(Vue.version.split('.')[0])

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit })
  } else {
    const _init = Vue.prototype._init
    Vue.prototype._init = function (options = {}) {
      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit
      _init.call(this, options)
    }
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */
 // vuexInit方法实现了store注入vue组件实例 并注册了vuex store的引用属性$store
  function vuexInit () {
    const options = this.$options
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store
    }
  }
}

```

## vuex的state和getters是如何映射到各个组件实例中响应式更新状态呢？

store实现的源码在src/store.js   resetStoreVM核心方法

```javascript
// src/store.js
function resetStoreVM (store, state, hot) {
  // 省略无关代码
  Vue.config.silent = true
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed
  })
}
```
Vuex的state状态是响应式，借助Vue的data响应式，将state存入Vue实例组件的data中。
Vuex的getters则是借助于Vue的计算属性computed实现数据实时监听。


使用了vue自身的响应式设计，依赖监听、依赖收集都属于vue对对象Property set get方法的代理劫持


# Vuex和Vue

更改数据 mutations->methods
获取数据 getters -> computed
数据     state->data

通过 dispatch 可以触发 actions 中的方法
actions 中的 commit 可以触发 mutations 中的方法。

mutation 和 action 就相当于vue中的 method 

# 源码





Vue中的使用

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
// vue的插件，通过使用use 执行vuex的install方法，将vuex注入到vue中
Vue.use(Vuex)
// 创建vuex的实例对象
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
```


Vuex使用的rollup进行打包


找到入口文件  src/index.js  

找到install方法  src/store.js中

创建实例对象 new Vuex.Store  src/store.js 中 创建Store构造函数方法

resetStoreVM 核心原理