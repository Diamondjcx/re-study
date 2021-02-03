# ES6

## let/const

let/const 声明变量，替代 var

### let

1、创建块级作用域

```javascript
{
  let x = 0
}
{
  let x = 1
}
console.log(x)
// 4 Uncaught ReferenceError: x is not defined 访问不到
```

应用： if/for 关键字结合 let/const 创建的块级作用域

与 var 区别

```javascript
for(var i =0; i< 10; i++>) {

}
console.log(i); // 10
var i = 0; //只执行一次

for(let i =0 ;i<10; i++>) {

}
console.log(i); // i is node defined
// 会创建块级作用域，还会将它绑定到每个循环中，确保上个循环结束时进行重新赋值

{
  let i =0;
}
{
  let i = 1
}
{
  let i = 2
}
```

2、暂时性死区：先声明后使用

一开始形成了封闭作用域，在声明变量之前无法使用，弥补 var 变量提升缺陷

```javascript
if (true) {
  name = 'abc' // 报错

  let name
}
```

3、不存在变量提升

```javascript
console.log(a) // 报错

let a = 10
```

4、不允许重复声明

### const

1、const 声明变量时必须赋值，否则会报错

```javascript
const x // 报错
```

2、const 声明变量不能改变，如果声明的是一个引用类型，则不能改变他的内存地址；指向的内存地址不能改变

```javascript
const obj = { a: 1 }
obj.b = 2 // success
obj = { c: 3 } // 报错
```

总结：声明后不会改变的变量使用 const，大写或者单词间使用下划线

## 箭头函数

与 function 关键字的区别

1、箭头函数没有 arguments（使用更好的语法，剩余运算符替代）

2、没有 prototype 属性，不能用作构造函数（不能使用 new 关键字调用）

3、函数体内的 this 是定义时所在的对象，而不是使用时所在的对象

- this 对象的指向是可变的，但是在箭头函数中，它是固定的

```javascript
function foo() {
  setTimeout(() => {
    console.log('id:', this.id)
  }, 100)
}

var id = 21

foo.call({ id: 42 })
// id: 42
```

箭头函数总是指向函数定义生效时所在的对象

- 箭头函数可以让 setTimeout 里面的 this，绑定定义时所在的作用域，而不是指向运行时所在的作用域

```javascript
function Timer() {
  this.s1 = 0
  this.s2 = 0
  // 箭头函数
  setInterval(() => this.s1++, 1000)
  // 普通函数
  setInterval(function () {
    this.s2++
  }, 1000)
}

var timer = new Timer()

setTimeout(() => console.log('s1: ', timer.s1), 3100)
setTimeout(() => console.log('s2: ', timer.s2), 3100)
// s1: 3
// s2: 0
```

- 箭头函数可以让 this 指向固定化，有利于封装回调函数

```javascript
var handler = {
  id: '123456',

  init: function () {
    document.addEventListener(
      'click',
      (event) => this.doSomething(event.type), // 箭头函数没有自己的this，内部的this就是外层代码块的this
      false
    )
  },

  doSomething: function (type) {
    console.log('Handling ' + type + ' for ' + this.id)
  },
}
```

箭头函数没有自己的 this，引用外层的 this
举例：下面代码中有一个 this

```javascript
function foo() {
  return () => {
    return () => {
      return () => {
        console.log('id:', this.id)
      }
    }
  }
}

var f = foo.call({ id: 1 })

var t1 = f.call({ id: 2 })()() // id: 1
var t2 = f().call({ id: 3 })() // id: 1
var t3 = f()().call({ id: 4 }) // id: 1
```

- 除了 this，arguments、super、new.target 也不存在，指向外层函数对象

```javascript
function foo() {
  setTimeout(() => {
    console.log('args:', arguments)
  }, 100)
}

foo(2, 4, 6, 8)
// args: [2, 4, 6, 8]
```

- 没有自己的 this，不能用 call()、apply()、bind()改变 this 的指向

```javascript
;(function () {
  return [(() => this.x).bind({ x: 'inner' })()]
}.call({ x: 'outer' }))
// ['outer']
```

不适用场合

1、定义对象的方法

```javascript
const cat = {
  lives: 9,
  jumps: () => {
    this.lives--
  },
}
cat.jumps()
```

因为对象构不成单独的作用域，所以此时的 this 指向的是 window，普通函数，this 指向的是 cat

```javascript
globalThis.s = 21

const obj = {
  s: 42,
  m: () => console.log(this.s),
}

obj.m() // 21 指向的是window
```

等同于

```javascript
globalThis.s = 21
globalThis.m = () => console.log(this.s)

const obj = {
  s: 42,
  m: globalThis.m,
}

obj.m() // 21
```

2、需要动态 this 的时候，不应使用箭头函数

```javascript
var button = document.getElementById('press')
button.addEventListener('click', () => {
  this.classList.toggle('on')
})
```

箭头函数使得 this 指向 window，点击按钮会报错。普通函数，this 指向被点击的按钮对象

## iterator 迭代器

可迭代的数据结构，ES6 在内部部署了[Symbol.iterator]属性

- Array
- Map
- Set
- String
- TypeArray
- 函数的 arguments 对象
- NodeList 对象

iterator 迭代器是一个对象，它具有一个 next 方法

```javascript
let arr = [1, 2, 3]
let iterator = arr[Symbol.iterator]()
iterator.next() //value: 1, done: false}
iterator.next() // value: 1, done: false}
iterator.next() // value: 1, done: false}
iterator.next() // value: undefined, done: true}
```

所谓迭代器，就是一个具有 next()方法的对象，每次调用 next()都会返回一个结果对象，该结果对象有两个属性，value 表示当前的值，done 表示遍历是否结束

- 可迭代的数据结构会有一个[Symbol.iterator]方法
- [Symbol.iterator]执行后返回一个 iterator 对象
- iterator 对象有一个 next 方法
- 执行一次 next 方法(消耗一次迭代器)会返回一个有 value,done 属性的对象

## 解构赋值

解构赋值可以直接使用对象的某个属性，而不需要通过属性访问的形式使用。

```javascript
let {
  title: titleOne, // abc
  test: [{ title: titleTwo }], //test
} = {
  title: 'abc',
  test: [
    {
      title: 'test',
    },
  ],
}
```

数组解构的原理其实就是消耗数组的迭代器，把生成对象的 value 属性的值赋值给对应的变量

## 剩余/扩展运算符

使用 3 个点(...)，后面跟着一个含有 iterator 接口的数据结构

- 扩展运算符：

```javascript
let arr = [1, 2, 3, 4, 5]
let arr2 = [...arr, 6, 7, 8] // [1,2,3,4,5,6,7,8]
```

扩展运算符可以替代数组原型的 concat 方法

- 剩余运算符
  替代了以前的 arguments

  ```javascript
  function func(a, b, c) {
    console.log(arguments[0], arguments[1], arguments[2])
  }
  func(1, 2, 3)
  function funcs(...rest) {
    console.log(rest) //[1,2,3]
  }
  // rest是形参，承载了所有的函数参数，可以随意取名
  ```

```javascript
let [first, ...arr] = [1, 2, 3, 4]
// first: 1
// arr: [2, 3, 4]

let [...arr, last] = [1,2,3,4,5]; // 报错
```

剩余运算符和数组解构赋值一起使用时，必须放在最后一个，利用数组的迭代器，会消耗 3 个点后面数组的所有迭代器

- 在对象中使用扩展运算符

```javascript
let obj = {
  a: 1,
  b: 2,
  c: 3,
}
let obj2 = {
  ...obj,
  d: 4,
}
// obj2: {a:1,b:2,c:3,d:4}
```

和 Object.assign 区别在于，Object.assign 会触发对象的 setter 函数，扩展符不会

## for...of 循环

允许遍历一个含有 iterator 接口的数据结构与 for ..in 的区别

- for...of 只能用在可迭代对象上，获取的是迭代器返回的 value 值，for...in 可以获取所有对象的键名
- for..in 会遍历对象的整个原型链，性能差，for..of 只遍历当前对象
- 对于数组的遍历，for...in 会返回数组中所有可枚举的属性（原型链上可枚举的属性）for..of 只返回数组的下标对应的属性值

## Promise

### 回调函数

1、使用回调函数处理异步请求相当于把你的回调置于一个黑盒，虽然声明了等到收到响应后执行提供的回调函数，可是并不知道这个第三方库会在什么具体具体会怎么执行回调函数

使用第三方库

```javascript
ajax('http://localhost:3000', () => {
  console.log('我扣了1000块')
})
```

收到响应后，执行后面的回调打印字符串，但是如果这个第三方库有类似超时重试的功能，可能会执行多次你的回调函数，如果是一个支付功能，你就会发现你扣的钱可能就不止 1000 元了-.-

2、回调函数中再嵌套回调函数会导致代码难以维护，回调地狱

```javascript
ajax('http://localhost:3000', () => {
  ajax('http://localhost:3001', () => {
    ajax('http://localhost:3002', () => {
      console.log('我扣了1000块')
    })
  })
})
```

回调函数的缺点
1、多重嵌套，导致回调地域
2、代码跳跃，并非人类习惯的思维模式
3、信任问题，你不能把你的回调完全寄托与第三方库，因为你不知道第三方库到底会怎么执行回调（多次执行）
4、第三方库可能没有提供错误处理
5、不清楚回调是否都是异步调用的（可以同步调用 ajax，在收到响应前会阻塞整个线程，会陷入假死状态，非常不推荐）

### Promise

```javascript
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('I have been resolved')
  }, 2000)
})

promise.then((res) => {
  console.log(res) // 2秒后打印字符串
})
```

1、多重嵌套，导致回调地狱

链式调用

```javascript
axios
  .get('http://localhost:3000')
  .then((res) => axios.get('http://localhost:3001'))
  .then((res) => axios.get('http://localhost:3002'))
```

2、代码跳跃，并非人类习惯的思维模式

Promise 使得能够同步思维书写代码，上述的代码就是先请求 3000 端口，得到响应后再请求 3001，再请求 3002，再请求 3003，而书写的格式也是符合人类的思维，从先到后

3、信任问题，你不能把你的回调完全寄托与第三方库，因为你不知道第三方库到底会怎么执行回调（多次执行）

Promise 本身是一个状态机，具有以下 3 个状态

pending（等待）
fulfilled（成功）
rejected（拒绝）

当请求发送没有得到响应的时候为 pending 状态，得到响应后会 resolve(决议)当前这个 Promise 实例,将它变为 fulfilled/rejected(大部分情况会变为 fulfilled)
当请求发生错误后会执行 reject(拒绝)将这个 Promise 实例变为 rejected 状态
一个 Promise 实例的状态只能从 pending => fulfilled 或者从 pending => rejected，即当一个 Promise 实例从 pending 状态改变后，就不会再改变了（不存在 fulfilled => rejected 或 rejected => fulfilled）
而 Promise 实例必须主动调用 then 方法，才能将值从 Promise 实例中取出来（前提是 Promise 不是 pending 状态），这一个“主动”的操作就是解决这个问题的关键，即第三方库做的只是改变 Promise 的状态，而响应的值怎么处理，这是开发者主动控制的，这里就实现了控制反转，将原来第三方库的控制权转移到了开发者上

```javascript
axios.get('http://localhost:3000') // 当收到响应时，这个promise的状态会变为resolve，但是拿到值需要用户主动调用then方法

axios.get('http://localhost:3000').then((res) => {
  // 主动调用then方法获取值后，用户可以自己决定拿这个值干什么
})
```

4、第三方库可能没有提供错误处理

Promise 的 then 方法会接受 2 个函数，第一个函数是这个 Promise 实例被 resolve 时执行的回调，第二个函数是这个 Promise 实例被 reject 时执行的回调，而这个也是开发者主动调用的
使用 Promise 在异步请求发送错误的时候，即使没有捕获错误，也不会阻塞主线程的代码（准确的来说，异步的错误都不会阻塞主线程的代码）
