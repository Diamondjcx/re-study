# vue2

1. beforeCreate & created

<!-- 实例化 Vue 的阶段，在 initState 的前后，initState 的作用是初始化 props、data、methods、watch、computed 等

beforeCreate：不能获取到 props、data 中定义的值，也不能调用 methods

created：props、data -->

bC: new Vue() - 实例挂载功能
c: data、props、method、computed - 数据操作、不涉及到 vdom 和 dom

2. beforeMount & mounted

<!-- 是在 DOM 挂载前后

beforeMount：DOM 挂载之前

mounted: DOM 挂载之后 -->

mounted 钩子函数的执行顺序也是先子后父。

bM: vDom - 数据操作，但是不可涉及 dom
m: Dom - 任何操作

3. beforeUpdate & updated

数据更新的时候

<!--
beforeUpdate：渲染 Watcher 的 before 函数中

update：watcher 已经渲染并且组件已经 mounted -->

bU: vDom 更新了的，dom 未更新是旧的 - 可以更新数据
u: dom 已经更新了 — 谨慎操作数据

4. beforeDestroy & destroyed

组件销毁阶段

<!--
beforeDestroy：销毁最开始的时候执行

destroyed： 销毁完之后执行 -->

bD: 实例 vm 尚未被销毁 — 清空 eventBus、reset store、clear 计时器
d: 实例已经被销毁 - 收尾

5. activated & deactivated

专门为 keep-alive 组件定制

总结：
created 中可以访问到数据
mounted 中可以访问到 DOM
destroy：做一些定时器销毁工作

# vue3

setup 函数 组合式 api===》beforeCreate & created

（1） onBeforeMount
在挂载之前被调用，渲染函数 render 首次被调用

（2） onMounted
组件挂载时调用

（3） onBeforeUpdate
数据更新时调用，发生在虚拟 DOM 打补丁之前。

（4） onUpdated
因数据更改导致的虚拟 DOM 重新渲染和打补丁时调用

（5） onBeforeUnmount
在卸载组件实例之前调用，此阶段的实例依旧是正常的。

（6） onUnmounted
卸载组件实例后调用，调用此钩子时，组件实例的所有指令都被解除绑定，所有事件侦听器都被移除，所有子组件实例被卸载。

# vue2 和 vue3 生命周期的区别

https://blog.51cto.com/echohye/6453643
