beforeCreate & created

  实例化Vue的阶段，在initState的前后，initState的作用是初始化props、data、methods、watch、computed等

  beforeCreate：不能获取到props、data中定义的值，也不能调用methods

  created：props、data

beforeMount & mounted

  是在DOM挂载前后

  beforeMount：DOM挂载之前

  mounted: DOM挂载之后

  mounted 钩子函数的执行顺序也是先子后父。

beforeUpdate & updated

  数据更新的时候

  beforeUpdate：渲染Watcher的before函数中

  update：watcher已经渲染并且组件已经mounted

beforeDestroy & destroyed

  组件销毁阶段

  beforeDestroy：销毁最开始的时候执行

  destroyed： 销毁完之后执行

activated & deactivated

  专门为keep-alive组件定制

总结：
  created中可以访问到数据
  mounted中可以访问到DOM
  destroy：做一些定时器销毁工作
