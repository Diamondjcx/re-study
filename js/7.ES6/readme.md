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

## iterator 迭代器

## 扩展运算符

替代了以前的 arguments
