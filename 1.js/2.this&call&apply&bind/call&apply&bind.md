# call 模拟实现

首先看 call 做了什么，call()方法在使用一个指定 this 值和若干指定的参数值的前提下调用某个函数或方法

```js
function foo() {
  console.log("函数内部this", this);
}
foo();

// 使用
foo.call({ a: 1 });
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
