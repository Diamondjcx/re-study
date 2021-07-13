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
function sum(x, y, z) {
  return x + y + z
}
const numbers = [1, 2, 3]

//不使用延展操作符
console.log(sum.apply(null, numbers))

//使用延展操作符
console.log(sum(...numbers)) // 6
```

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

1、使用回调函数处理异步请求相当于把你的回调置于一个黑盒，虽然声明了等到收到响应后执行提供的回调函数，可是并不知道这个第三方库会在什么时候具体会怎么执行回调函数

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

3、信任问题，你不能把你的回调完全寄托于第三方库，因为你不知道第三方库到底会怎么执行回调（多次执行）

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

```javascript
axios.get('http://localhost:3000').then(
  (res) => {
    // do something
  },
  (err) => {
    // 错误处理
  }
)

// Promise提供catch方法也是相同的效果
axios
  .get('http://localhost:3000')
  .then((res) => {
    // do something
  })
  .catch((res) => {
    // 错误处理
  })
```

5、不清楚回调是否都是异步调用的

Promise 在设计的时候保证所有响应的处理回调都是异步调用的，不会阻塞代码的执行，Promise 将 then 方法的回调放入一个叫微任务的队列中（MicroTask），确保这些回调任务在同步任务执行完以后再执行

```javascript
let promise = new Promise((resolve) => {
  resolve(Promise.reject('报错了'))
})

setTimeout(() => {
  console.log(promise)
})

// Uncaught (in promise) 报错了   rejected
```

很多人认为 promise 中调用了 resolve 函数则这个 promise 一定会进入 fulfilled 状态，但是这里可以看到，即使调用了 resolve 函数，仍返回了一个拒绝状态的 Promise，原因是因为如果再一个 promise 的 resolve 函数中又传入了一个 Promise，会展开传入的这个 promise

这里因为传入了一个拒绝状态的 promise,resolve 函数展开这个 promise 后,就会变成一个拒绝状态的 promise

等同于

```javascript
// let promise = new Promise(resolve => {
//   resolve(Promise.reject('报错了'))
// })

let promise = Promise.reject('报错了')

setTimeout(() => {
  console.log(promise)
})
```

async await

```javascript
async function getInfo() {
  let res1 = await axios.get('http://localhost:8087/mock.json')
  let res2 = await axios.get('http://localhost:8087/mock2.json') // 等到收到mock.json相应结果后再发出请求
  let res3 = await axios.get('http://localhost:8087/mock3.json') // 等到收到mock2.json相应结果后再发出请求

  // 等到收到mock3.json相应结果后再发出请求
  // do something after response
}
```

### ES6 Module

AMD CMD：浏览器端
CommonJs：服务端

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script type="module">
      import { test } from './module.js'
      test()
    </script>
  </body>
</html>

<!-- 跨域 -->
```

ES6 Module 使用 import 关键字导入模块，export 关键字导出模块

1、ES6 Module 是静态的，也就是说它是在编译阶段运行，和 var 以及 function 一样具有提升效果（这个特点使得它支持 tree shaking）

2、自动采用严格模式（顶层的 this 返回 undefined）

3、ES6 Module 支持使用 export {<变量>}导出具名的接口，或者 export default 导出匿名的接口

module.js 导出：

```javascript
let x = 10
let y = 20

export { x } // 导出一个变量的引用
export default y // 导出的是一个值
```

a.js 导入：

```javascript
import { x } from './module.js'

import y from './module.js'
```

在 a.js 中使用 import 导入这 2 个变量的后，在 module.js 中因为某些原因 x 变量被改变了，那么会立刻反映到 a.js，而 module.js 中的 y 变量改变后，a.js 中的 y 还是原来的值

module.js

```javascript
let x = 10
let y = 20

setTimeout(() => {
  x = 100
  y = 200
}, 1000)

export { x } // 导出一个变量的引用
export default y // 导出的是一个值
```

a.js 导入：

```javascript
import { x } from './module.js'

import y from './module.js'

console.log(x, y)

setTimout(() => {
  console.log(x, y) // 100 20  y的值并没有改变
}, 1000)
```

如果将变量指定为 default 进行导出，则可以使用 import 直接导出，但是依然是引用

module.js

```javascript
let x = 10
let y = 20

setTimeout(() => {
  x = 100
  y = 200
}, 1000)

export { x } // 导出一个变量的引用
export { y as default }
```

a.js 导入：

```javascript
import { x } from './module.js'

import y from './module.js' // 依然是变量的引用
```

ES6 Module 和 CommonJs 区别

- CommonJs 输出的是一个值的拷贝,ES6 Module 通过 export {<变量>}输出的是一个变量的引用,export default 输出的是一个值

- CommonJs 运行在服务器上,被设计为运行时加载,即代码执行到那一行才回去加载模块,而 ES6 Module 是静态的输出一个接口,发生在编译的阶段

- CommonJs 在第一次加载的时候运行一次并且会生成一个缓存,之后加载返回的都是缓存中的内容

#### import()

ES6 Module 静态编译的特点，导致无法动态加载，但是会有一些需要动态加载模块的需求，可以使用 import 作为一个函数实现动态加载模块，返回一个 Promise，Promise 被 resolve 时的值为输出的模块

```javascript
if (true) {
  import('./module.js').then((res) => {
    console.log(res)
  })
}
```

使用 import 方法改写上面的 a.js 使得它可以动态加载(使用静态编译的 ES6 Module 放在条件语句会报错,因为会有提升的效果,并且也是不允许的),可以看到输出了 module.js 的一个变量 x 和一个默认输出

Vue 中路由的懒加载的 ES6 写法就是使用了这个技术,使得在路由切换的时候能够动态的加载组件渲染视图

### 函数默认值

ES6 允许在函数的参数中设置默认值

es5

```javascript
function func(a) {
  return a || 1
}
func() //1  会有问题，假如传递一个空字符串或者0 会直接执行为1
```

es6

```javascript
function func(a = 1) {
  return a
}
func() // 1
```

如果使用了函数的默认参数，在函数的参数区域（括号里面），会作为一个单独的块级作用域，并且拥有 let/const 方法的一些热性，比如暂时性死区

```javascript
let x = 1
function func(y = x) {
  // 没有传递参数，使用函数默认参数，y就会寻找x的值，沿着词法作用域在外层找到了值为1的变量x
  let x = 2
  console.log(y) // 1
}
func()
```

```javascript
let w = 1,
  z = 2

{
  x = w + 1 // 2
  y = x + 1 // 3
  z = z + 1 // 报错 z is not defined   相当于暂时性死区   声明之前直接使用会报错
}

function func(x = w + 1, y = x + 1, z = z + 1) {
  console.log(x, y, z) // z is not defined
}

func()

let w = 1,
  z = 2

function func(x = w + 1, y = x + 1, z = z + 1) {
  console.log(x, y, z)
}

func(10, 20, 30) // 10 20 30
```

```javascript
function bar(func = () => foo) {
  let foo = 'inner'
  console.log(func())
}
bar() // foo is not defined  暂时性死区
```

### 函数默认值配合解构赋值

```javascript
function func({ x = 10 } = {}, { y } = { y: 10 }) {
  console.log(x, y)
}
func({}, {}) // 10 undefined 传入空对象，不会使用默认值，会尝试从{}解构x，解构不出来，x有默认值，y没有默认值
func(undefined, {}) // 10 undefined 第一个参数会使用默认值，从默认值{}解构x，解构不出来，x有默认值，y解构不出
func(undefined, undefined) //都是用默认值 10 10
func() // 10 10
func({ x: 1 }, { y: 2 }) // 1,2
```

第一行给 func 函数传入了 2 个空对象,所以函数的第一第二个参数都不会使用函数默认值,然后函数的第一个参数会尝试解构对象,提取变量 x,因为第一个参数传入了一个空对象,所以解构不出变量 x,但是这里又在内层设置了一个默认值,所以 x 的值为 10,而第二个参数同样传了一个空对象,不会使用函数默认值,然后会尝试解构出变量 y,发现空对象中也没有变量 y,但是 y 没有设置默认值所以解构后 y 的值为 undefined

第二行第一个参数显式的传入了一个 undefined,所以会使用函数默认值为一个空对象,随后和第一行一样尝试解构 x 发现 x 为 undefined,但是设置了默认值所以 x 的值为 10,而 y 和上文一样为 undefined

第三行 2 个参数都会 undefined,第一个参数和上文一样,第二个参数会调用函数默认值,赋值为{y:10},然后尝试解构出变量 y,即 y 为 10

第四行和第三行相同,一个是显式传入 undefined,一个是隐式不传参数

第五行直接使用传入的参数,不会使用函数默认值,并且能够顺利的解构出变量 x,y

## Proxy

Proxy 作为拦截器，可以在目标对象前架设一个拦截器，他们访问对象，必须先经过这层拦截器

Proxy 和 Reflect 配套使用，前者拦截对象，后者返回拦截结果

```javascript
let obj = {}
obj = new Proxy(obj, {
  set(target, key, val) {
    console.log('oops')
    return Reflect.set(target, key, val)
  },
})
obj.foo = 'bar' // oops
```

### vue

## Object.assign

将多个对象进行合并

```javascript
let target = {}

let obj = Object.assign(target, { a: 1 }, { b: 2 })

obj // {a:1, b:2}
```

Object.assign 遍历需要合并给 target 的对象(即 sourece 对象的集合)的属性,用等号进行赋值,这里遍历{a:1}将属性 a 和值数字 1 赋值给 target 对象,然后再遍历{b:2}将属性 b 和值数字 2 赋值给 target 对象

知识点：

- Object.assign 是浅拷贝,对于值是引用类型的属性,拷贝仍旧的是它的引用

- 可以拷贝 Symbol 属性

- 不能拷贝不可枚举的属性

- Object.assign 保证 target 始终是一个对象,如果传入一个基本类型,会转为基本包装类型,null/undefined 没有基本包装类型,所以传入会报错

- source 参数如果是不可枚举的数据类型会忽略合并(字符串类型被认为是可枚举的,因为内部有 iterator 接口)

- 因为是用等号进行赋值,如果被赋值的对象的属性有 setter 函数会触发 setter 函数,同理如果有 getter 函数,也会调用赋值对象的属性的 getter 函数(这就是为什么 Object.assign 无法合并对象属性的访问器,因为它会直接执行对应的 getter/setter 函数而不是合并它们,如果需要合并对象属性的 getter/setter 函数,可以使用 ES7 提供的 Object.getOwnPropertyDescriptors 和 Object.defineProperties 这 2 个 API 实现)

```javascript
let obj = {
  get a() {
    console.log('get')
    return 1
  },
  set a(val) {
    console.log('set')
  },
}
let obj2 = {}

Object.defineProperties(obj2, Object.getOwnPropertyDescriptors(obj))

console.log('obj', obj)
console.log('obj2', obj2)
```

成功的复制了 obj 对象中 a 属性的 getter/setter

这里有一个坑不得不提,对于 target 参数传入一个字符串,内部会转换为基本包装类型,而字符串基本包装类型的属性是只读的(属性描述符的 writable 属性为 false)

```javascript
let strObj = Object('abc')

console.log(Object.getOwnPropertyDescriptors(strObj))

// 不可写
0: {value: "a", writable: false, enumerable: true, configurable: false}
1: {value: "b", writable: false, enumerable: true, configurable: false}
2: {value: "c", writable: false, enumerable: true, configurable: false}

Object.assign('abc','def')

// Cannot assign to read only property '0' of object '[object String]'

```

字符串 abc 会转为基本包装类型,然后将字符串 def 合并给这个基本包装类型的时候会将字符串 def 展开,分别将字符串 def 赋值给基本包装类型 abc 的 0,1,2 属性,随后就会在赋值的时候报错

### 和 ES9 的对象扩展运算符相比

功能类似，区别在于 getter/setter

```javascript
let obj = {
  get a() {
    console.log('get')
    return 'obj的a属性'
  },
  set a(val) {
    console.log('set')
  },
}

let obj2 = {
  get a() {
    console.log('get2')
    return 'obj2的a属性'
  },
  set a(val) {
    console.log('set2')
  },
}

console.log('扩展运算符')
let obj3 = { ...obj, ...obj2 }
console.log(obj3)

// get
// get2
// {a: "obj2的a属性"}

console.log('assign运算符')
let obj4 = Object.assign(obj, obj2)
console.log(obj4)

// get2
// set
// a: "obj的a属性"
// get a: ƒ a()
// set a: ƒ a(val)
```

ES9:

会合并 2 个对象,并且只触发 2 个对象对应属性的 getter 函数
相同属性的后者覆盖了前者,所以 a 属性的值是第二个 getter 函数 return 的值

ES6:

同样会合并这 2 个对象,并且只触发了 obj 上 a 属性的 setter 函数而不会触发它的 getter 函数(结合上述 Object.assgin 的内部实现理解会容易一些)
obj 上 a 属性的 setter 函数替代默认的赋值行为,导致 obj2 的 a 属性不会被复制过来

## 类

```javascript
class Animal {
  // 构造函数，实例化的时候将会被调用，如果不指定，那么会有一个不带参数的默认构造函数.
  constructor(name, color) {
    this.name = name
    this.color = color
  }
  // toString 是原型对象上的属性
  toString() {
    console.log('name:' + this.name + ',color:' + this.color)
  }
}

var animal = new Animal('dog', 'white') //实例化Animal
animal.toString()

console.log(animal.hasOwnProperty('name')) //true
console.log(animal.hasOwnProperty('toString')) // false
console.log(animal.__proto__.hasOwnProperty('toString')) // true

class Cat extends Animal {
  constructor(action) {
    // 子类必须要在constructor中指定super 函数，否则在新建实例的时候会报错.
    // 如果没有置顶consructor,默认带super函数的constructor将会被添加、
    super('cat', 'white')
    this.action = action
  }
  toString() {
    console.log(super.toString())
  }
}

var cat = new Cat('catch')
cat.toString()

// 实例cat 是 Cat 和 Animal 的实例，和Es5完全一致。
console.log(cat instanceof Cat) // true
console.log(cat instanceof Animal) // true
```

## Object.values()

```javascript
const obj = { a: 1, b: 2, c: 3 }

const vals = Object.keys(obj).map((key) => obj[key])
console.log(vals) //[1, 2, 3]

const values = Object.values(obj1)
console.log(values) //[1, 2, 3]
```

## Object.entries

```javascript
Object.keys(obj).forEach((key) => {
  console.log('key:' + key + ' value:' + obj[key])
})
//key:a value:1
//key:b value:2
//key:c value:3
```

```javascript
for (let [key, value] of Object.entries(obj1)) {
  console.log(`key: ${key} value:${value}`)
}
//key:a value:1
//key:b value:2
//key:c value:3
```
