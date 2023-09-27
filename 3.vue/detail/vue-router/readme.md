# Vue 路由

### install

Vue 通过 use 方法，加载 VueRouter 中的 install 方法。install 方法完成 Vue 实例对 VueRouter 的挂载过程。

```javascript
export function install(Vue) {
  // ...
  // 混入 beforeCreate 钩子
  Vue.mixin({
    beforeCreate() {
      // 在option上面存在router则代表是根组件
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        // 执行_router实例的 init 方法
        this._router.init(this);
        // 为 vue 实例定义数据劫持
        Vue.util.defineReactive(this, "_route", this._router.history.current);
      } else {
        // 非根组件则直接从父组件中获取
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed() {
      registerInstance(this);
    },
  });

  // 设置代理，当访问 this.$router 的时候，代理到 this._routerRoot._router
  Object.defineProperty(Vue.prototype, "$router", {
    get() {
      return this._routerRoot._router;
    },
  });
  // 设置代理，当访问 this.$route 的时候，代理到 this._routerRoot._route
  Object.defineProperty(Vue.prototype, "$route", {
    get() {
      return this._routerRoot._route;
    },
  });

  // 注册 router-view 和 router-link 组件
  Vue.component("RouterView", View);
  Vue.component("RouterLink", Link);

  // Vue钩子合并策略
  const strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter =
    strats.beforeRouteLeave =
    strats.beforeRouteUpdate =
      strats.created;
  // ...
}
```

在构造 Vue 实例的时候，我们会传入 router 对象：

```javascript
new Vue({
  router,
});
```

此时 Router 会挂载到 Vue 的根组件 this.$options 选项中

为了能让\_router 的变化能及时响应页面的更新，所以接着又调用了 Vue.util.defineReactive 方法来进行 get 和 set 的响应数据定义。

为 Vue 全局实例注册 2 个属性$router和$route；以及组件 RouterView 和 RouterLink

### new VueRouter(options)

通过 new VueRouter({...})我们创建了一个 VueRouter 的实例。VueRouter 中通过参数 mode 来指定路由模式

```javascript
switch (mode) {
  case "history":
    this.history = new HTML5History(this, options.base);
    break;
  case "hash":
    this.history = new HashHistory(this, options.base, this.fallback);
    break;
  case "abstract":
    this.history = new AbstractHistory(this, options.base);
    break;
  default:
    if (process.env.NODE_ENV !== "production") {
      assert(false, `invalid mode: ${mode}`);
    }
}
```
