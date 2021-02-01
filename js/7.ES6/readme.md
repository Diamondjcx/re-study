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

## iterator 迭代器

## 扩展运算符

替代了以前的 arguments
