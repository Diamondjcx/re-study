#### new 操作符具体干了什么呢？如何实现？

```js
// （1）创建(构造)一个全新的对象
// （2）这个新对象会被执行[[Prototype]]连接
// （3）这个新对象会绑定到函数调用的this
// （4）如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象

// 实现:

function objectFactory() {
  let newObject = null,
    constructor = Array.prototype.shift.call(arguments),
    result = null

  // 参数判断
  if (typeof constructor !== 'function') {
    console.error('type error')
    return
  }

  // 新建一个空对象，对象的原型为构造函数的 prototype 对象
  newObject = Object.create(constructor.prototype)

  // 将 this 指向新建对象，并执行函数
  result = constructor.apply(newObject, arguments)

  // 判断返回对象
  let flag =
    result && (typeof result === 'object' || typeof result === 'function')

  // 判断返回结果
  return flag ? result : newObject
}

// 使用方法
// objectFactory(构造函数, 初始化参数);
```
