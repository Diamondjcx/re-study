## Generator 和 Async 简介

在讲 Generator 之前, 咱们要来先了了解另外⼀一个概念, 迭代器器.

### 迭代器器 Iterator

迭代器器 Iterator 是 ES6 引⼊入的⼀一种新的遍历机制，同时也是⼀一种特殊对象，它具有⼀一些专⻔门为迭代过程设计的专有接⼝口。
每个迭代器器对象都有⼀一个 next()⽅方法，每次调⽤用都返回⼀一个当前结果对象。当前结果对象中有
两个属性：

1.  value：当前属性的值
2.  done：⽤用于判断是否遍历结束，当没有更更多可返回的数据时，返回 true

    每调⽤用⼀一次 next()⽅方法，都会返回下⼀一个可⽤用的值，直到遍历结束。

### ⽣成器器 Generator

⽣生成器器是⼀一种返回迭代器器的函数，通过 function 关键字后的星号(\*)来表示，函数中会⽤用到新的
关键字 yield。星号可以紧挨着 function 关键字，也可以在中间添加⼀一个空格.

```js
function* generator() {
  const list = [1, 2, 3];
  for (let i of list) {
    yield i;
  }
}
let g = generator();
console.log(g.next()); // {value: 1, done: false}
console.log(g.next()); // {value: 2, done: false}
console.log(g.next()); // {value: 3, done: false}
console.log(g.next()); // {value: undefined, done: true}
```

特性

1.  每当执⾏行行完⼀一条 yield 语句句后函数就会⾃自动停⽌止执⾏行行, 直到再次调⽤用 next();
2.  Yield 关键字只可在⽣生成器器内部使⽤用，在其他地⽅方使⽤用会导致程序抛出错误;
3.  可以通过函数表达式来创建⽣生成器器, 但是不不能使⽤用箭头函数
