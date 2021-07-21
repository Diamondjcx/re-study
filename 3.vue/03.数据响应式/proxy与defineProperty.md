# Object.defineProperty VS Proxy

**(1)** Object.defineProperty 只能劫持对象的属性，而 Proxy 是直接代理对象

由于 Object.defineProperty 只能对属性进行劫持，需要遍历对象的每个属性，如果属性值也是对象，则需要深度遍历。而 Proxy 是直接代理对象，不需要遍历操作

Proxy 是在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，可以对外界的访问进行过滤和改写。

**(2)**当对数组进行操作(push\shift\splice)，会触发对应的方法名称和 length 变化，可以借此进行操作

Proxy 不需要那么多 hack，无压力监听数组的变化

Proxy 通过 set(target, propKey, value, receiver) 拦截对象属性的设置，是可以拦截到对象的新增属性的

**(3)**Proxy 支持 13 种拦截操作，这是 defineProperty 所不具有的。

**(4)**新标准性能红利

Proxy 作为新标准，从长远来看，JS 引擎会继续优化 Proxy，但 getter 和 setter 基本不会再有针对性优化。

# 总结

1. Object.defineProperty 并非不能监控数组下标的变化，Vue2.x 中无法通过数组索引来实现响应式数据的自动更新是 Vue 本身的设计导致的，不是 defineProperty 的锅。
2. Object.defineProperty 和 Proxy 本质差别是，defineProperty 只能对属性进行劫持，所以出现了需要递归遍历，新增属性需要手动 Observe 的问题。
3. Proxy 作为新标准，浏览器厂商势必会对其进行持续优化，但它的兼容性也是块硬伤，并且目前还没有完整的 polyfill 方案。
