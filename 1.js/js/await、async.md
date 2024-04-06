async/await 是什么？
async 函数，就是 Generator 函数的语法糖，它建⽴在 Promises 上，并且与所有现有的基于 Promise 的 API 兼容。

1. Async—声明⼀个异步函数(async function someName(){...})
2. ⾃动将常规函数转换成 Promise，返回值也是⼀个 Promise 对象
3. 只有 async 函数内部的异步操作执⾏完，才会执⾏ then ⽅法指定的回调函数
4. 异步函数内部可以使⽤ await
5. Await—暂停异步的功能执⾏(var result = await someAsyncCall();)
6. 放置在 Promise 调⽤之前，await 强制其他代码等待，直到 Promise 完成并返回结果
7. 只能与 Promise ⼀起使⽤，不适⽤与回调
8. 只能在 async 函数内部使⽤

async/await 相⽐于 Promise 的优势？

1. 代码读起来更加同步，Promise 虽然摆脱了回调地狱，但是 then 的链式调⽤也会带来额外的阅读负担
2. Promise 传递中间值⾮常麻烦，⽽ async/await ⼏乎是同步的写法，⾮常优雅
3. 错误处理友好，async/await 可以⽤成熟的 try/catch，Promise 的错误捕获⾮常冗余
4. 调试友好，Promise 的调试很差，由于没有代码块，你不能在⼀个返回表达式的箭头函数中设置断点，如果你在⼀
   个.then 代码块中使⽤调试器的步进(step-over)功能，调试器并不会进⼊后续的.then 代码块，因为调试器只能跟踪
   同步代码的『每⼀步』。
