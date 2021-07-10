# 组件之间的通信

1、props / $emit

2、$children / $parent

3、provide / reject

4、ref

5、eventBus

6、Vuex

7、localStorage / sessionStorage

8、$attrs / $listeners

### 1、props / $emit

父组件通过`props`的方式向子组件传递数据，子组件通过`$emit`向父组件通信

**(1)** 父组件向子组件传值

```html
// section父组件
<template>
  <div class="section">
    <com-article :articles="articleList"></com-article>
  </div>
</template>

<script>
  import comArticle from './test/article.vue'
  export default {
    name: 'HelloWorld',
    components: { comArticle },
    data() {
      return {
        articleList: ['红楼梦', '西游记', '三国演义'],
      }
    },
  }
</script>
```

```html
// 子组件 article.vue
<template>
  <div>
    <span v-for="(item, index) in articles" :key="index">{{item}}</span>
  </div>
</template>

<script>
  export default {
    props: ['articles'],
  }
</script>
```

> 总结：prop 只可以从上一级组件传递给下一级组件，所谓单项数据流。而且 prop 只读，不可修改

**(2)** 子组件向父组件传值

通过`$emit`绑定事件,将值作为参数传递给父组件

```html
// 父组件中
<template>
  <div class="section">
    <com-article
      :articles="articleList"
      @onEmitIndex="onEmitIndex"
    ></com-article>
    <p>{{currentIndex}}</p>
  </div>
</template>

<script>
  import comArticle from './test/article.vue'
  export default {
    name: 'HelloWorld',
    components: { comArticle },
    data() {
      return {
        currentIndex: -1,
        articleList: ['红楼梦', '西游记', '三国演义'],
      }
    },
    methods: {
      onEmitIndex(idx) {
        this.currentIndex = idx
      },
    },
  }
</script>
```

```html
<template>
  <div>
    <div
      v-for="(item, index) in articles"
      :key="index"
      @click="emitIndex(index)"
    >
      {{item}}
    </div>
  </div>
</template>

<script>
  export default {
    props: ['articles'],
    methods: {
      emitIndex(index) {
        this.$emit('onEmitIndex', index)
      },
    },
  }
</script>
```

### 2、$children / $parent

父组件通过`$children`访问子组件的实例
子组件通过`$parent`访问父组件的实例

```html
// 父组件中
<template>
  <div class="hello_world">
    <div>{{msg}}</div>
    <com-a></com-a>
    <button @click="changeA">点击改变子组件值</button>
  </div>
</template>

<script>
  import ComA from './test/comA.vue'
  export default {
    name: 'HelloWorld',
    components: { ComA },
    data() {
      return {
        msg: 'Welcome',
      }
    },

    methods: {
      changeA() {
        // 获取到子组件A
        this.$children[0].messageA = 'this is new value'
      },
    },
  }
</script>
```

```html
// 子组件中
<template>
  <div class="com_a">
    <span>{{messageA}}</span>
    <p>获取父组件的值为: {{parentVal}}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        messageA: 'this is old',
      }
    },
    computed: {
      parentVal() {
        return this.$parent.msg
      },
    },
  }
</script>
```

> `$children`是数组 `$parent`是对象

### 3、provide/ inject

父组件通过`provide`提供变量，然后在子组件通过 inject 来注入变量，可以嵌套很深

举例：A.vue、B.vue、C.vue 其中 C 是 B 的子组件，B 是 A 的子组件

```html
// A.vue

<template>
  <div>
    <comB></comB>
  </div>
</template>

<script>
  import comB from '../components/test/comB.vue'
  export default {
    name: 'A',
    provide: {
      for: 'demo',
    },
    components: {
      comB,
    },
  }
</script>
```

```html
// B.vue

<template>
  <div>
    {{demo}}
    <comC></comC>
  </div>
</template>

<script>
  import comC from '../components/test/comC.vue'
  export default {
    name: 'B',
    inject: ['for'],
    data() {
      return {
        demo: this.for,
      }
    },
    components: {
      comC,
    },
  }
</script>
```

```html
// C.vue
<template>
  <div>{{demo}}</div>
</template>

<script>
  export default {
    name: 'C',
    inject: ['for'],
    data() {
      return {
        demo: this.for,
      }
    },
  }
</script>
```

### 3、ref / refs

在普通 DOM 元素上使用，引用指向的是 DOM 元素，如果在子组件上，指向的是子组件的实例，可以通过实例直接调用组件的方法或访问数据

```javascript
// 子组件 A.vue

export default {
  data() {
    return {
      name: 'Vue.js',
    }
  },
  methods: {
    sayHello() {
      console.log('hello')
    },
  },
}
```

```html
// 父组件 app.vue

<template>
  <component-a ref="comA"></component-a>
</template>
<script>
  export default {
    mounted() {
      const comA = this.$refs.comA
      console.log(comA.name) // Vue.js
      comA.sayHello() // hello
    },
  }
</script>
```

### 5、eventBus

事件总线，沟通桥梁，所有组件的共同事件中心，可以向该注册中心发送事件或接收事件，所以组件都可以通知其他组件。项目较大，难以维护的灾难

**（1）** 初始化
创建一个事件总线

```javascript
// event-bus.js

import Vue from 'vue'
export const EventBus = new Vue()
```

**（2）** 发送事件
additionNum 和 showNum, 这两个组件可以是兄弟组件也可以是父子组件；这里我们以兄弟组件为例:

```html
<template>
  <div>
    <show-num-com></show-num-com>
    <addition-num-com></addition-num-com>
  </div>
</template>

<script>
  import showNumCom from './showNum.vue'
  import additionNumCom from './additionNum.vue'
  export default {
    components: { showNumCom, additionNumCom },
  }
</script>
```

```html
// addtionNum.vue 中发送事件

<template>
  <div>
    <button @click="additionHandle">+加法器</button>
  </div>
</template>

<script>
  import { EventBus } from './event-bus.js'
  console.log(EventBus)
  export default {
    data() {
      return {
        num: 1,
      }
    },

    methods: {
      additionHandle() {
        EventBus.$emit('addition', {
          num: this.num++,
        })
      },
    },
  }
</script>
```

**（3）** 接收事件

```html
// showNum.vue 中接收事件

<template>
  <div>计算和: {{count}}</div>
</template>

<script>
  import { EventBus } from './event-bus.js'
  export default {
    data() {
      return {
        count: 0,
      }
    },

    mounted() {
      EventBus.$on('addition', (param) => {
        this.count = this.count + param.num
      })
    },
  }
</script>
```

**（4）** 移除事件监听者

```javascript
import { eventBus } from 'event-bus.js'
EventBus.$off('addition', {})
```

### 6、Vuex

集中式存储管理应用的所有组件的状态
多个视同依赖同一个状态、来自不同视图的行为需要变更同一个状态

各个模块
1、state：用于数据的存储，是 store 中的唯一数据源
2、getters：如 vue 中的计算属性一样，基于 state 数据的二次包装，常用于数据的筛选和多个数据的相关性计算
3、mutations：类似函数，改变 state 数据的唯一途径，且不能用于处理异步事件
4、actions：类似于 mutation，用于提交 mutation 来改变状态，而不直接变更状态，可以包含任意异步操作
5、modules：类似于命名空间，用于项目中将各个模块的状态分开定义和操作，便于维护

### 7、localStorage / sessionStorage

比较混乱，不易维护

window.localStorage.getItem(key)获取数据 通过 window.localStorage.setItem(key,value)存储数据

JSON.parse() / JSON.stringify() 做数据格式转换 localStorage / sessionStorage 可以结合 vuex, 实现数据的持久保存,同时使用 vuex 解决数据和状态混乱问题.

### 8、$attrs 与 $listeners

隔代传值

```html
// app.vue // index.vue

<template>
  <div>
    <child-com1
      :name="name"
      :age="age"
      :gender="gender"
      :height="height"
      title="程序员成长指北"
    ></child-com1>
  </div>
</template>
<script>
  const childCom1 = () => import('./childCom1.vue')
  export default {
    components: { childCom1 },
    data() {
      return {
        name: 'zhang',
        age: '18',
        gender: '女',
        height: '158',
      }
    },
  }
</script>
```

```html
// childCom1.vue

<template class="border">
  <div>
    <p>name: {{ name}}</p>
    <p>childCom1的$attrs: {{ $attrs }}</p>
    <child-com2 v-bind="$attrs"></child-com2>
  </div>
</template>
<script>
  const childCom2 = () => import('./childCom2.vue')
  export default {
    components: {
      childCom2,
    },
    inheritAttrs: false, // 可以关闭自动挂载到组件根元素上的没有在props声明的属性
    props: {
      name: String, // name作为props属性绑定
    },
    created() {
      console.log(this.$attrs)
      // { "age": "18", "gender": "女", "height": "158", "title": "程序员成长指北" }
    },
  }
</script>
```

```html
// childCom2.vue

<template>
  <div class="border">
    <p>age: {{ age}}</p>
    <p>childCom2: {{ $attrs }}</p>
  </div>
</template>
<script>
  export default {
    inheritAttrs: false,
    props: {
      age: String,
    },
    created() {
      console.log(this.$attrs)
      // { "gender": "女", "height": "158", "title": "程序员成长指北" }
    },
  }
</script>
```

## 父子组件之间的通信

## 非父子组件之间的通信（兄弟、隔代）

## 总结

父子组件之间的通信：`props`; `$parent / $children`; `provide / inject` ; `ref` ; `$attrs / $listeners`
兄弟组件通信: `eventBus` ; `Vuex`
跨级通信: `eventBus`；`Vuex`；`provide / inject` ; `ref` ; `$attrs / $listeners`
