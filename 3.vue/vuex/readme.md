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