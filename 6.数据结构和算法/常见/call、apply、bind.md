# call 模拟实现

首先看 call 做了什么，call()方法在使用一个指定 this 值和若干指定的参数值的前提下调用某个函数或方法

```js
fun.call(thisArg, arg1, arg2, ...)
call 就是改变函数中 this 指向为 thisArg，并且执行这个函数

> bind() 方法创建一个新的函数，当这个新函数被调用时，this 键值为其提供的值，后面为参数序列

fun.bind(thisArg[, arg1[, arg2[, ...]]])
```

```js
// 模拟实现
Function.prototype.call = function (context, ...args) {
  context = context || window;

  const fnSymbol = Symbol("fn");
  context[fnSymbol] = this;

  context[fnSymbol](...args);
  delete context[fnSymbol];
};
```

# apply 的模拟实现

```javascript
Function.prototype.apply = function (context, argsArr) {
  context = context || window;

  const fnSymbol = Symbol("fn");
  context[fnSymbol] = this;

  context[fnSymbol](...argsArr);
  delete context[fnSymbol];
};
```

# bind 的模拟实现

```js
Function.prototype.bind = function (context, ...args) {
  context = context || window;
  const fnSymbol = Symbol("fn");
  context[fnSymbol] = this;

  return function (..._args) {
    args = args.concat(_args);

    context[fnSymbol](...args);
    delete context[fnSymbol];
  };
};
```
