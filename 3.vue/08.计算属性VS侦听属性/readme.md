# 计算属性和watch

## computed和watch

computed是计算属性，类似于过滤器，对绑定到视图的数据进行处理，并监听变化进而执行对应的方法

计算属性是基于它们的依赖进行缓存的。只在相关依赖发生改变时才会重新求值。

watch是一个侦听的动作，用来观察和相应Vue实例上数据变动。

```javascript
<div id="watch-example">
  <p>
    Ask a yes/no question:
    <input v-model="question">
  </p>
  <p>{{ answer }}</p>
</div>

```

```javascript
<!-- 因为 AJAX 库和通用工具的生态已经相当丰富，Vue 核心代码没有重复 -->
<!-- 提供这些功能以保持精简。这也可以让你自由选择自己更熟悉的工具。 -->
<script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>
<script>
var watchExampleVM = new Vue({
  el: '#watch-example',
  data: {
    question: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  },
  created: function () {
    // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
    // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
    // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
    // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
    // 请参考：https://lodash.com/docs#debounce
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
  },
  methods: {
    getAnswer: function () {
      if (this.question.indexOf('?') === -1) {
        this.answer = 'Questions usually contain a question mark. ;-)'
        return
      }
      this.answer = 'Thinking...'
      var vm = this
      axios.get('https://yesno.wtf/api')
        .then(function (response) {
          vm.answer = _.capitalize(response.data.answer)
        })
        .catch(function (error) {
          vm.answer = 'Error! Could not reach the API. ' + error
        })
    }
  }
})
</script>

```

在这个示例中，允许我们执行异步操作（访问一个API），限制我们执行改操作的频率，并在我们得到最终结果前，设置中间状态。computed无法做到

## computed和watch用法异同

同：都起到监听/依赖一个数据，并进行处理，vue对监听器的实现

异：computed主要对于同步数据处理；watch主要用于观测某个值的变化去完成一段开销较大的复杂业务逻辑。优先使用computed

## watch的高级用法

**（1）**handler 方法和immediate属性


```html
<div id="demo">{{ fullName }}</div>

```

```javascript
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      console.log('第一次没有执行～')
      this.fullName = val + ' ' + this.lastName
    }
  }
})

```

第一次定义的时候立即执行

```javascript
  watch: {
    firstName: {
      handler(val) {
        console.log('第一次执行了～')
        this.fullName = val + ' ' + this.lastName
      },
      // 代表在watch里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true
    }
  }

```

**（2）**deep属性，开启深度监听

```html
<div id="app">
  <div>obj.a: {{obj.a}}</div>
  <input type="text" v-model="obj.a">
</div>

```

```javascript
var vm = new Vue({
  el: '#app',
  data: {
    obj: {
    	a: 1
    }
  },
  watch: {
    obj: {
      handler(val) {
       console.log('obj.a changed')  // 并没有打印
      },
      immediate: true
    }
  }
})

```
设置deep属性，深度遍历

```javascript
  watch: {
    obj: {
      handler(val) {
       console.log('obj.a changed')
      },
      immediate: true，
      deep: true  // 设置deep，深度遍历
    }
  }

```
使用字符串形式，直接监听某个属性

```javascript
  watch: {
    'obj.a': {
      handler(val) {
       console.log('obj.a changed')
      },
      immediate: true
      // deep: true
    }
  }

```

## 总结

都是vue对监听器的实现 计算属性本质上是一个computed watch，侦听属性本质上是一个user watch