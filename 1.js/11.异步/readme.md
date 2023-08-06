# 异步

概念：程序是顺序执行，同一时刻只会发生一件事情。如果一个函数依赖于另外一个函数的结果，只能等待那个函数结束才能继续执行

同步 JavaScript：代码一行一行执行

异步 JavaScript：同时做两件事情，等待的时候可以做事

异步 callback：即是函数，可以作为参数传递给那些在后台执行的其它函数，当那些函数执行完成之后，就调用 callbacks 函数，通知工作已经完成。
作为参数传递进去，不会立即执行，会等到合适时机进行执行。

    ```
    function loadAsset(url, type, callback) {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = type;

      xhr.onload = function() {
        callback(xhr.response);
      };

      xhr.send();
    }

    function displayImage(blob) {
      let objectURL = URL.createObjectURL(blob);

      let image = document.createElement('img');
      image.src = objectURL;
      document.body.appendChild(image);
    }

    loadAsset('coffee.jpg', 'blob', displayImage);
    ```

Promises：表示异步操作完成或者操作失败的对象，一种中间状态

    ```
    fetch('products.json').then(function(response) {
      return response.json();
    }).then(function(json) {
      products = json;
      initialize();
    }).catch(function(err) {
      console.log('Fetch problem: ' + err.message);
    });
    ```

事件队列：像 promise 这样的异步队列操作被放入到事件队列中，事件队列会在主线程完成处理后运行，这样就不会阻止后面 JavaScript 的运行。

promise 对比 callback：
**（1）** 可以使用多个 then 操作将异步操作链接在一起，并将一个操作结果作为输入传递给下一个操作。
**（2）** Promise 总是严格按照它们放置在事件队列中的顺序调用。
**（3）** 错误处理要好得多——所有的错误都由块末尾的一个.catch()块处理，而不是在“金字塔”的每一层单独处理。

setTimeout()：指定一段时间后，执行代码
setInterval()：以固定的时间间隔，重复运行一段代码.
requestAnimationFrame()：setInterval()的现代版本;在浏览器下一次重新绘制显示之前执行指定的代码块，从而允许动画在适当的帧率下运行

#### 118. 异步编程的实现方式？

相关资料：

```
回调函数
优点：简单、容易理解
缺点：不利于维护，代码耦合高

事件监听（采用时间驱动模式，取决于某个事件是否发生）：
优点：容易理解，可以绑定多个事件，每个事件可以指定多个回调函数
缺点：事件驱动型，流程不够清晰

发布/订阅（观察者模式）
类似于事件监听，但是可以通过‘消息中心’，了解现在有多少发布者，多少订阅者

Promise 对象
优点：可以利用 then 方法，进行链式写法；可以书写错误时的回调函数；
缺点：编写和理解，相对比较难,处理错误不够清晰

Generator 函数
优点：函数体内外的数据交换、错误处理机制
缺点：流程管理不方便

async 函数
优点：内置执行器、更好的语义、更广的适用性、返回的是 Promise、结构清晰。
缺点：错误处理机制，直接放在try..catch中
```

回答：

```
js 中的异步机制可以分为以下几种：

第一种最常见的是使用回调函数的方式，使用回调函数的方式有一个缺点是，多个回调函数嵌套的时候会造成回调函数地狱，上下两层的回调函数间的代码耦合度太高，不利于代码的可维护。

第二种是 Promise 的方式，使用 Promise 的方式可以将嵌套的回调函数作为链式调用。但是使用这种方法，有时会造成多个 then 的链式调用，可能会造成代码的语义不够明确。

第三种是使用 generator 的方式，它可以在函数的执行过程中，将函数的执行权转移出去，在函数外部我们还可以将执行权转移回来。当我们遇到异步函数执行的时候，将函数执行权转移出去，当异步函数执行完毕的时候我们再将执行权给转移回来。因此我们在 generator 内部对于异步操作的方式，可以以同步的顺序来书写。使用这种方式我们需要考虑的问题是何时将函数的控制权转移回来，因此我们需要有一个自动执行 generator 的机制，比如说 co 模块等方式来实现 generator 的自动执行。

第四种是使用 async 函数的形式，async 函数是 generator 和 promise 实现的一个自动执行的语法糖，它内部自带执行器，当函数内部执行到一个 await 语句的时候，如果语句返回一个 promise 对象，那么函数将会等待 promise 对象的状态变为 resolve 后再继续向下执行。因此我们可以将异步逻辑，转化为同步的顺序来书写，并且这个函数可以自动执行。
```
