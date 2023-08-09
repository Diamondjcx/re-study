# EventLoop

## 浏览器中的 EventLoop

macro（宏任务）队列和 micro（微任务）队列 宏任务有多个，微任务队列只有一个

- macro：setTimeout、setInterval、setImmediate、script、I/O 操作、UI 渲染等

- micro：process.nextTick、new Promise().then(回调)、MutationObserver(html5 新特性)

EventLoop 过程解析

- 一开始执行栈空,我们可以把执行栈认为是一个存储函数调用的栈结构，遵循先进后出的原则。micro 队列空，macro 队列里有且只有一个 script 脚本（整体代码）。
- 全局上下文（script 标签）被推入执行栈，同步代码执行。在执行的过程中，会判断是同步任务还是异步任务，通过对一些接口的调用，可以产生新的 macro-task 与 micro-task，它们会分别被推入各自的任务队列里。同步代码执行完了，script 脚本会被移出 macro 队列，这个过程本质上是队列的 macro-task 的执行和出队的过程。
- 上一步我们出队的是一个 macro-task，这一步我们处理的是 micro-task。但需要注意的是：当 macro-task 出队时，任务是一个一个执行的；而 micro-task 出队时，任务是一队一队执行的。因此，我们处理 micro 队列这一步，会逐个执行队列中的任务并把它出队，直到队列被清空。
- 执行渲染操作，更新界面
- 检查是否存在 Web worker 任务，如果有，则对其进行处理
- 上述过程循环往复，直到两个队列都清空

当某个宏任务执行完成后，会查看是否有微任务队列。如果有，先执行微任务队列中的所有任务，如果没有，会读取宏任务队列中排在最前的任务，执行宏任务的过程中，遇到微任务，依次加入微任务队列。栈空后，再次读取微任务队列中的任务，依次类推。

```javascript
Promise.resolve().then(() => {
  console.log("Promise1");
  setTimeout(() => {
    console.log("setTimeout2");
  }, 0);
});
setTimeout(() => {
  console.log("setTimeout1");
  Promise.resolve().then(() => {
    console.log("Promise2");
  });
}, 0);
```

- 一开始执行栈的同步任务（这属于宏任务）执行完毕，会去查看是否有微任务队列，上题中存在(有且只有一个)，然后执行微任务队列中的所有任务输出 Promise1，同时会生成一个宏任务 setTimeout2
- 然后去查看宏任务队列，宏任务 setTimeout1 在 setTimeout2 之前，先执行宏任务 setTimeout1，输出 setTimeout1
- 在执行宏任务 setTimeout1 时会生成微任务 Promise2 ，放入微任务队列中，接着先去清空微任务队列中的所有任务，输出 Promise2
- 清空完微任务队列中的所有任务后，就又会去宏任务队列取一个，这回执行的是 setTimeout2

### setTimeout

异步可以延时执行，我们经常这么实现延时 3 秒执行：

```javascript
setTimeout(() => {
  console.log("延时3秒");
}, 3000);
```

```javascript
setTimeout(() => {
  task();
}, 3000);
console.log("执行console");
//执行console
//task()
```

```javascript
setTimeout(() => {
  task();
}, 3000);

sleep(10000000);
// 超过3s
```

> task()进入 Event Table 并注册,计时开始。
> 执行 sleep 函数，很慢，非常慢，计时仍在继续。
> 3 秒到了，计时事件 timeout 完成，task()进入 Event Queue，但是 sleep 也太慢了吧，还没执行完，只好等着。
> sleep 终于执行完了，task()终于从 Event Queue 进入了主线程执行。

### setInterval

循环的执行.对于执行顺序来说，setInterval 会每隔指定的时间将注册的函数置入 Event Queue，如果前面的任务耗时太久，那么同样需要等待

## Node 中的 Event Loop

Node 中的 Event Loop 是基于 libuv 实现的，而 libuv 是 Node 的新跨平台抽象层，libuv 使用异步，事件驱动的编程方式，核心是提供 i/o 的事假循环和异步回调

node.js 的 event 是基于 libuv，而浏览器的 event loop 则是在 html5 的规范中明确定义

```
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘

```

Node 的 Event Loop 分为 6 个阶段：

- timers: 执行 setTimeout() 和 setInterval()中到期的 callback
- pending callback： 上一轮循环中有少数的 I/O callback 会被延迟到这一轮的这一阶段
- idle,prepare： 内部使用
- poll：执行 I/O callback，在适当的条件下会阻塞在这个阶段
- check：执行 setImmediate 的 callback
- close callbacks：执行 close 事件的 callback，例如 socket.on('close'[,fn])、http.server.on('close, fn)

### timers 阶段

会执行 setTimeout 和 setInterval 回调，并且由 poll 阶段控制的

timers 阶段使用最小堆而不是队列保存元素。timemout 的 callback 是按照超时时间顺序调用，不是先进先出

在第一个执行阶梯上，尽可能准确的执行

### pending callbacks 阶段

pending callbacks 阶段其实是 I/O 的 callbacks 阶段。比如一些 TCP 的 error 回调等。
举个栗子：如果 TCP socket ECONNREFUSED 在尝试 connect 时 receives，则某些\* nix 系统希望等待报告错误。 这将在 pending callbacks 阶段执行。

### poll 阶段

- 执行 I/O 回调
- 处理 poll 队列中的事件

  timers 极端没有可执行任务

  - poll queue 非空 ，则执行

  - poll queue 为空
    - 如果 setImmediate()有回调需要执行，则会立即进入到 check 阶段
    - 相反，则 poll 阶段将等待 callback 被添加到队列中再立即执行，这也是为什么我们说 poll 阶段可能会阻塞的原因如果没有 setImmediate()有回调需要执行

### check 阶段

check 阶段在 poll 阶段之后，setImmediate()回调会被加入到 check 队列中
代码执行时，EventLoop 最终会到达 poll 阶段，然后等待传入链接或者请求等，但是如果已经制定了 setImmediate()并且这时候 poll 阶段已经空闲的时候，则 poll 阶段将被中止，然后开始 check 阶段的执行

### close callbacks 阶段

如果一个 socket 或者事件处理函数突然关闭/中断（比如：socket.destroy）则这个阶段就会发生 close 的回调执行。否则他会通过 process.nextTick 发出

### setImmediate() vs setTimeout()

- setImmediate 在 poll 阶段后执行，即 check 阶段
- setTimeout 在 poll 空闲时且设定时间到达的时候执行，在 timer 阶段

计时器的执行顺序将根据调用它们的上下文而有所不同。如果两者都是从主模块中调用，则时序将受到进程性能的限制

不在一个 I/O 周期，则两个计时器的执行顺序不准确，受进程性能的约束

```javascript
// timeout_vs_immediate.js
setTimeout(() => {
  console.log("timeout");
}, 0);

setImmediate(() => {
  console.log("immediate");
});

// $ node timeout_vs_immediate.js
// timeout
// immediate

// $ node timeout_vs_immediate.js
// immediate
// timeout
```

在一个 I/O 周期移动这两个调用，则之中首先执行立即回调

```javascript
// timeout_vs_immediate.js
const fs = require("fs");

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log("timeout");
  }, 0);
  setImmediate(() => {
    console.log("immediate");
  });
});

// $ node timeout_vs_immediate.js
// immediate
// timeout

// $ node timeout_vs_immediate.js
// immediate
// timeout
```

所以与 setTimeout（）相比，使用 setImmediate（）的主要优点是，如果在 I / O 周期内安排了任何计时器，则 setImmediate（）将始终在任何计时器之前执行，而与存在多少计时器无关。

### nextTick queue

无论当前事件循环的当前阶段如何，都将在当前操作完成之后处理 nextTickQueue
如果存在 nextTickQueue，就会清空队列中的所有回调函数，并且优先于其他 microtask 执行

```javascript
setTimeout(() => {
  console.log("timer1");
  Promise.resolve().then(function () {
    console.log("promise1");
  });
}, 0);
process.nextTick(() => {
  console.log("nextTick");
  process.nextTick(() => {
    console.log("nextTick");
    process.nextTick(() => {
      console.log("nextTick");
      process.nextTick(() => {
        console.log("nextTick");
      });
    });
  });
});
// nextTick=>nextTick=>nextTick=>nextTick=>timer1=>promise1
```

### process.nextTick() vs setImmediate()

- process.nextTick（）在同一阶段立即触发
- setImmediate（）在事件循环的以下迭代或“tick”中触发

## Node 与浏览器的 Event Loop 差异

一句话总结其中：浏览器环境下，microtask 的任务队列是每个 macrotask 执行完之后执行。而在 Node.js 中，microtask 会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行 microtask 队列的任务

# 总结

eg

```
<div id="outer">
    <div id="inner"></div>
</div>
```

```javascript
const inner = document.getElementById("inner");
const outer = document.getElementById("outer");

// 监听 outer 的属性变化。
new MutationObserver(() => console.log("mutate outer")).observe(outer, {
  attributes: true,
});

// 处理 click 事件。
function onClick() {
  console.log("click");
  setTimeout(() => console.log("timeout"), 0);
  Promise.resolve().then(() => console.log("promise"));
  outer.setAttribute("data-mutation", Math.random());
}

// 监听 click 事件。
inner.addEventListener("click", onClick);
outer.addEventListener("click", onClick);
```

第一种方式直接点击黄色方块，输出结果 click promise mutate click promise mutate timeout timeout

第二种方式：代码调用方式 inner.click()

区别在于执行 Microtask Queue 前，当前执行栈是否为空

```js
setTimeout(function () {
  console.log(1);
}, 0);
new Promise(function executor(resolve) {
  console.log(2);
  for (var i = 0; i < 10000; i++) {
    i == 9999 && resolve();
  }
  console.log(3);
}).then(function () {
  console.log(4);
});
console.log(5);

// 2\3\5\4\1
```

```javascript
setTimeout(() => {
  setTimeout(() => {
    console.log(1);
  }, 0);
}, 2000);

setTimeout(() => {
  Promise.resolve(console.log(2));
}, 3000);

// 1\2
```
