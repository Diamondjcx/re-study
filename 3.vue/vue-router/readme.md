# vue-router 简介

某种模式匹配的路径，映射到同个组件。

```html
模式	                            匹配路径	                  $route.params
/user/:username	                  /user/evan	                { username: 'evan' }
/user/:username/post/:post_id	    /user/evan/post/123	        { username: 'evan', post_id: '123' }
```


# vue-router 使用

## 嵌套路由

## 编程式导航

## 


# vue-router 原理
更新视图但不重新请求页面。
 
## 前端路由  

直接找到与地址相匹配的组件或者对象，并将其渲染出来

改变地址而不向服务器发送请求有三种方式
浏览器：hash  history
非浏览器node环境： abstract（非browser）

### hash

```javascript
http://www.xxx.com/#/login
```

'#'hash后面的变化，并不会导致浏览器向服务端发出请求，每次hash值变化，还会触发hashchange这个事件，通过这个事件，我们就知道hash值发生了哪些变化，然后我们便可以通过监听hashchange来实现更新页面部分内容的操作

```javascript
function matchAndUpdate () {
   // todo 匹配 hash 做 dom 更新操作
}

window.addEventListener('hashchange', matchAndUpdate)
```


### history

pushState和replaceState，通过这两个API可以改变url地址且不会发送请求

单页面的url不会多出'#'，会变得更加美观。但因为没有'#'号，所以当用户刷新页面之类的操作，浏览器还是会给服务器发送请求，为了避免出现这种情况，所以要服务端进行支持，需要把所有路由都重定向到根页面。

## Vue路由

###  install

Vue通过use方法，加载VueRouter中的install方法。install方法完成Vue实例对VueRouter的挂载过程。

```javascript
export function install (Vue) {
 // ...
  // 混入 beforeCreate 钩子
  Vue.mixin({
    beforeCreate () {
      // 在option上面存在router则代表是根组件 
      if (isDef(this.$options.router)) {
        this._routerRoot = this
        this._router = this.$options.router
        // 执行_router实例的 init 方法
        this._router.init(this)
        // 为 vue 实例定义数据劫持
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        // 非根组件则直接从父组件中获取
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
      registerInstance(this, this)
    },
    destroyed () {
      registerInstance(this)
    }
  })
 
  // 设置代理，当访问 this.$router 的时候，代理到 this._routerRoot._router
  Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
  })
  // 设置代理，当访问 this.$route 的时候，代理到 this._routerRoot._route
  Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
  })
 
  // 注册 router-view 和 router-link 组件
  Vue.component('RouterView', View)
  Vue.component('RouterLink', Link)

  // Vue钩子合并策略
  const strats = Vue.config.optionMergeStrategies
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created
  // ...
}
```

在构造Vue实例的时候，我们会传入router对象：

```javascript
new Vue({
  router
})
```
此时Router会挂载到Vue的根组件this.$options选项中

为了能让_router的变化能及时响应页面的更新，所以接着又调用了Vue.util.defineReactive 方法来进行get和set的响应数据定义。



为Vue全局实例注册2个属性$router和$route；以及组件RouterView和RouterLink

### new VueRouter(options)


通过new VueRouter({...})我们创建了一个 VueRouter 的实例。VueRouter中通过参数mode来指定路由模式

```javascript
switch (mode) {
      case 'history':
        this.history = new HTML5History(this, options.base)
        break
      case 'hash':
        this.history = new HashHistory(this, options.base, this.fallback)
        break
      case 'abstract':
        this.history = new AbstractHistory(this, options.base)
        break
      default:
        if (process.env.NODE_ENV !== 'production') {
          assert(false, `invalid mode: ${mode}`)
        }
    }
```


### HashHistory

替换路由

#### HashHistory.push()
**HashHistory.push() **将新路由添加到浏览器访问历史的栈顶

```javascript
1 $router.push() //调用方法

2 HashHistory.push() //根据hash模式调用,设置hash并添加到浏览器历史记录（添加到栈顶）（window.location.hash= XXX）

3 History.transitionTo() //监测更新，更新则调用History.updateRoute()

4 History.updateRoute() //更新路由

5 {app._route= route} //替换当前app路由

6 vm.render() //更新视图

```

#### HashHistory.replace()
并不是将新路由添加到浏览器访问历史的栈顶，而是替换掉当前的路由

```javascript
replace (location: RawLocation, onComplete?: Function, onAbort?: Function) {
  this.transitionTo(location, route => {
    replaceHash(route.fullPath)
    onComplete && onComplete(route)
  }, onAbort)
}
  
function replaceHash (path) {
  const i = window.location.href.indexOf('#')
  window.location.replace(
    window.location.href.slice(0, i >= 0 ? i : 0) + '#' + path
  )
}
```


### HTML5History
HTML5History.pushState()和HTML5History.replaceState()

在HTML5History中添加对修改浏览器地址栏URL的监听是直接在构造函数中执行的，对HTML5History的popstate 事件进行监听：

```javascript
window.addEventListener('popstate', handleRoutingEvent)
    this.listeners.push(() => {
      window.removeEventListener('popstate', handleRoutingEvent)
    })
```







