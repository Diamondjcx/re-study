1. beforeCreate & created

实例化 Vue 的阶段，在 initState 的前后，initState 的作用是初始化 props、data、methods、watch、computed 等

beforeCreate：不能获取到 props、data 中定义的值，也不能调用 methods

created：props、data

2. beforeMount & mounted

是在 DOM 挂载前后

beforeMount：DOM 挂载之前

mounted: DOM 挂载之后

mounted 钩子函数的执行顺序也是先子后父。

3. beforeUpdate & updated

数据更新的时候

beforeUpdate：渲染 Watcher 的 before 函数中

update：watcher 已经渲染并且组件已经 mounted

4. beforeDestroy & destroyed

组件销毁阶段

beforeDestroy：销毁最开始的时候执行

destroyed： 销毁完之后执行

5. activated & deactivated

专门为 keep-alive 组件定制

总结：
created 中可以访问到数据
mounted 中可以访问到 DOM
destroy：做一些定时器销毁工作
