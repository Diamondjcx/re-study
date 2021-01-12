# Promise

## what && why
异步编程解决方案

语法上：对象，可以获取异步操作的消息。本意上：是承诺，过一段时间会给一个结果。

三种状态：pending、fulfiled、rejected，状态一旦改变，就不会再变。创建promise实例后，会立即执行。

```javascript
// 当参数a大于10且参数fn2是一个方法时 执行fn2
function fn1(a, fn2) {
    if (a > 10 && typeof fn2 == 'function') {
        fn2()
    }
}
fn1(11, function() {
    console.log('this is a callback')
})
```

解决问题：

- 回调地域，代码难以维护，常常第一个函数的输出是第二个函数的输入这种现象
- 支持多个并发的请求，获取并发请求中的数据
- 解决异步问题

## Promise用法

构造函数，有all reject resolve 方法，原型上有then、catch方法

### 构造函数，可以new

```javascript 
let p = new Promise((resolve, reject) => {
    //做一些异步操作
    setTimeout(() => {
        console.log('执行完成');
        resolve('我是成功！！');
    }, 2000);
});
```

接收一个参数，函数，需要传入两个参数
- resolve：异步操作执行成功后的回调函数
- reject：异步操作执行失败后的回调函数

### then链式操作用法

用维护状态、传递状态方式来使得回调函数能够及时调用，比传递callback函数简单、灵活。

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

### reject的用法

```javascript
let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    let num = Math.cell(Math.random()*10)
    if (num <= 5) {
      resolve(num)
    } else {
      rehect('数字太大了')
    }
  }, 2000)
})

p.then((data) => {
  console.log('resolved', data)
},(err) => {
  console.log('rejected',err)
})

```

### catch的用法

```javascript
p.then((data) => {
    console.log('resolved',data);
}).catch((err) => {
    console.log('rejected',err);
});
```

在执行resolve的回调，如果异常了，不会报错卡死js，而是会进到catch方法中

```javascript
p.then((data) => {
    console.log('resolved',data);
    console.log(somedata); //此处的somedata未定义
})
.catch((err) => {
    console.log('rejected',err);
});
```

### all

谁跑得慢，以谁为准执行回调。all接收一个数组参数，里面的值最终返回Promise对象

Promise的all方法提供了并行执行异步操作的能力，并且在所有异步操作执行完后才执行回调

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