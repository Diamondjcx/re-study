# Promise

## what && why

异步编程解决方案

语法上：对象，可以获取异步操作的消息。本意上：是承诺，过一段时间会给一个结果。

三种状态：pending、fulfiled、rejected，状态一旦改变，就不会再变。创建 promise 实例后，会立即执行。

```javascript
// 当参数a大于10且参数fn2是一个方法时 执行fn2
function fn1(a, fn2) {
  if (a > 10 && typeof fn2 == 'function') {
    fn2()
  }
}
fn1(11, function () {
  console.log('this is a callback')
})
```

解决问题：

- 回调地域，代码难以维护，常常第一个函数的输出是第二个函数的输入这种现象
- 支持多个并发的请求，获取并发请求中的数据
- 解决异步问题

## Promise 用法

构造函数，有 all reject resolve 方法，原型上有 then、catch 方法

### 构造函数，可以 new

```javascript
let p = new Promise((resolve, reject) => {
  //做一些异步操作
  setTimeout(() => {
    console.log('执行完成')
    resolve('我是成功！！')
  }, 2000)
})
```

接收一个参数，函数，需要传入两个参数

- resolve：异步操作执行成功后的回调函数
- reject：异步操作执行失败后的回调函数

### then 链式操作用法

用维护状态、传递状态方式来使得回调函数能够及时调用，比传递 callback 函数简单、灵活。

```javascript
p.then((data) => {
  console.log(data)
})
  .then((data) => {
    console.log(data)
  })
  .then((data) => {
    console.log(data)
  })
```

### reject 的用法

```javascript
let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    let num = Math.cell(Math.random() * 10)
    if (num <= 5) {
      resolve(num)
    } else {
      rehect('数字太大了')
    }
  }, 2000)
})

p.then(
  (data) => {
    console.log('resolved', data)
  },
  (err) => {
    console.log('rejected', err)
  }
)
```

把 promise 状态置为 rejected，这样我们在 then 中就能捕捉到，然后执行“失败”情况的回调

### catch 的用法

```javascript
p.then((data) => {
  console.log('resolved', data)
}).catch((err) => {
  console.log('rejected', err)
})
```

在执行 resolve 的回调，如果异常了，不会报错卡死 js，而是会进到 catch 方法中

```javascript
p.then((data) => {
  console.log('resolved', data)
  console.log(somedata) //此处的somedata未定义
}).catch((err) => {
  console.log('rejected', err)
})
```

### all

谁跑得慢，以谁为准执行回调。all 接收一个数组参数，里面的值最终返回 Promise 对象

Promise 的 all 方法提供了并行执行异步操作的能力，并且在所有异步操作执行完后才执行回调

```javascript
let Promise1 = new Promise(function(resolve, reject){})
let Promise2 = new Promise(function(resolve, reject){})
let Promise3 = new Promise(function(resolve, reject){})

let p = Promise.all([Promise1, Promise2, Promise3])

p.then(funciton(){
  // 三个都成功则成功
}, function(){
  // 只要有失败，则失败
})

```

执行多个异步操作，并且在一个回调中处理所有的返回数据。

场景：一些游戏类的素材比较多的应用，打开网页时，预先加载需要用到的各种资源如图片、flash 以及各种静态文件。所有的都加载完后，我们再进行页面的初始化

### race 谁跑得快，以谁为准执行回调

场景：给某个异步请求设置超时时间，并且在超时后执行相应的操作

```javascript
// 请求某个图片资源
function requestImg() {
  var p = new Promise((resolve, reject) => {
    var img = new Image()
    img.onload = function () {
      resolve(img)
    }
    img.src = '图片路径'
  })
  return p
}

// 延时函数，用于给请求计时
function timeout() {
  var p = new Promise((resolve, rejct) => {
    setTimeout(() => {
      rejet('图片请求超时')
    }, 5000)
  })
}

Promise.race([requestImg(), timeout()])
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  })
```
