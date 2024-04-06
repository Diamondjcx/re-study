Es6 是 javascript 的最新版本，为了提高开发效率和简化代码，引入很多新的语法和特性，比如 let、const，用于声明块级作用域的变量；更简洁的函数语法-箭头函数；扩展运算符用于展开数组和对象处理函数参数；模版字符串；解构赋值；迭代器和生成器；promise 用于异步编程，更好地处理异步操作；class 类、对字符串数组对象的拓展 es6 更适用于现代 web 应用开发，特别是那些处理复杂数据、进行异步操作或优化代码性能的项目，现在项目中也都在使用 es6 的新特性

### let 和 const

var 定义的变量是全局的, 所以全局只有一个变量 i.
setTimeout 是异步, 在下一轮事件循环, 等到执行的时候, 去找 i 变量的引用。所以函数找到了遍历完后的 i, 此时它已经变成了 4。

1. 而 let 引入了块级作用域的概念, 创建 setTimeout 函数时，变量 i 在作用域内。对于循环的每个迭代，引用的 i 是 i 的不同实例。

2. 还存在变量提升的问题

3. const 就很简单了, 在 let 的基础上, 不可被修改.

### 箭头函数

1. 最大的区别：箭头函数里的 this 是定义的时候决定的, 普通函数里的 this 是使用的时候决定的。

2. 简写箭头函数

3. 注意, 箭头函数不能被用作构造函数

构造函数会干嘛? 改变 this 指向到新实例出来的对象.
箭头函数会干嘛？this 指向是定义的时候决定的.

### class

### 模板字符串

### 解构

1. 数组的解构

2. 对象的解构

3. 解构的原理是什么?

针对可迭代对象的 Iterator 接口，通过遍历器按顺序获取对应的值进行赋值.

3.1 那么 Iterator 是什么?

Iterator 是一种接口，为各种不一样的数据解构提供统一的访问机制。任何数据解构只要有 Iterator 接口，就能通过遍历操作，依次按顺序处理数据结构内所有成员。ES6 中的 for of 的语法相当于遍历器，会在遍历数据结构时，自动寻找 Iterator 接口。

3.2 Iterator 有什么用?

- 为各种数据解构提供统一的访问接口
- 使得数据解构能按次序排列处理
- 可以使用 ES6 最新命令 for of 进行遍历

  3.3 可迭代对象是什么?

可迭代对象是 Iterator 接口的实现。这是 ECMAScript 2015 的补充，它不是内置或语法，而仅仅是协议。任何遵循该协议点对象都能成为可迭代对象。可迭代对象得有两个协议：可迭代协议和迭代器协议。

- 可迭代协议：对象必须实现 iterator 方法。即对象或其原型链上必须有一个名叫 Symbol.iterator 的属性。该属性的值为无参函数，函数返回迭代器协议。

- 迭代器协议：定义了标准的方式来产生一个有限或无限序列值。其要求必须实现一个 next()方法，该方法返回对象有 done(boolean)和 value 属性。

  3.4 我们自己来实现一个可以 for of 遍历的对象?

通过以上可知，自定义数据结构，只要拥有 Iterator 接口，并将其部署到自己的 Symbol.iterator 属性上，就可以成为可迭代对象，能被 for of 循环遍历。

### 遍历

1. for in

遍历数组时，key 为数组下标字符串；遍历对象，key 为对象字段名。

缺点：

- for in 不仅会遍历当前对象，还包括原型链上的可枚举属性
- for in 不适合遍历数组，主要应用为对象

2. for of

可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象，NodeList 对象）上创建一个迭代循环,调用自定义迭代钩子，并为每个不同属性的值执行语句。

优点：

- for of 仅遍历当前对象

### Object

1. Object.keys

该方法返回一个给定对象的自身可枚举属性组成的数组。

2. Object.values

该方法返回一个给定对象自身的所有可枚举属性值的数组。

3. Object.entries

该方法返回一个给定对象自身可枚举属性的键值对数组。

4. Object.getOwnPropertyNames

该方法返回一个数组，该数组对元素是 obj 自身拥有的枚举或不可枚举属性名称字符串。

5. Object.getOwnPropertyDescriptor

什么是 descriptor? 对象对应的属性描述符, 是一个对象. 包含以下属性:

- configurable。 如果为 false，则任何尝试删除目标属性或修改属性特性（writable, configurable, enumerable）的行为将被无效化。所以通常属性都有特性时，可以把 configurable 设置为 true 即可。
- writable 是否可写。设置成 false，则任何对该属性改写的操作都无效（但不会报错，严格模式下会报错），默认 false。
- enumerable。是否能在 for-in 循环中遍历出来或在 Object.keys 中列举出来。

Reflect 又是个什么东西?

- 将 Object 对象的一些明显属于语言内部的方法（比如 Object.defineProperty），放到 Reflect 对象上。现阶段，某些方法同时在 Object 和 Reflect 对象上部署，未来的新方法将只部署在 Reflect 对象上。也就是说，从 Reflect 对象上可以拿到语言内部的方法
- 让 Object 操作都变成函数行为。某些 Object 操作是命令式，比如 name in obj 和 delete obj[name]，而 Reflect.has(obj, name)和 Reflect.deleteProperty(obj, name)让它们变成了函数行为。
- Reflect 对象的方法与 Proxy 对象的方法一一对应，只要是 Proxy 对象的方法，就能在 Reflect 对象上找到对应的方法。这就让 Proxy 对象可以方便地调用对应的 Reflect 方法，完成默认行为，作为修改行为的基础。也就是说，不管 Proxy 怎么修改默认行为，你总可以在 Reflect 上获取默认行为。

6. Object.create()

Object.create()方法创建一个新的对象，并以方法的第一个参数作为新对象的**proto**属性的值(根据已有的对象作为原型，创建新的对象。)
Object.create()方法还有第二个可选参数，是一个对象，对象的每个属性都会作为新对象的自身属性，对象的属性值以 descriptor（Object.getOwnPropertyDescriptor(obj, 'key')）的形式出现，且 enumerable 默认为 false

那么 Object.create(null)的意义是什么呢? 平时创建一个对象 Object.create({}) 或者 直接声明一个{} 不就够了?

Object.create(null)创建一个对象，但这个对象的原型链为 null，即 Fn.prototype = null

### Promise

### 数组

1. Array.flat

flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回

如果不考虑深度, 咱们直接给他无限打平

2. Array.includes

includes() 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回 false。

3. Array.find
   find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。

4. Array.from

4.1 Array.from() 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。

- arrayLike
  想要转换成数组的伪数组对象或可迭代对象。
- mapFn 可选
  如果指定了该参数，新数组中的每个元素会执行该回调函数。

  4.2 Array.from() 可以通过以下方式来创建数组对象：

- 伪数组对象（拥有一个 length 属性和若干索引属性的任意对象）
- 可迭代对象（可以获取对象中的元素,如 Map 和 Set 等）

所以数组去重我们可以怎么做?

```js
function unique(arr) {
  return Array.from(new Set(arr));
  // return [...new Set(arr)]
}
const test = [
  1,
  1,
  "true",
  "true",
  true,
  true,
  15,
  15,
  false,
  false,
  undefined,
  undefined,
  null,
  null,
  NaN,
  NaN,
  "NaN",
  0,
  0,
  "a",
  "a",
];
console.log(unique(test));

function unique(arr) {
  const map = new Map();
  const array = []; // 数组用于返回结果
  for (let i = 0; i < arr.length; i++) {
    if (!map.has(arr[i])) {
      // 如果有该key值
      array.push(arr[i]);
      map.set(arr[i], true);
    }
  }
  return array;
}

function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log("type error!");
    return;
  }
  const array = [];
  for (let i = 0; i < arr.length; i++) {
    if (!array.includes(arr[i])) {
      //includes 检测数组是否有某个值
      array.push(arr[i]);
    }
  }
  return array;
}
```

5. Array.of

Array.of() 方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。
