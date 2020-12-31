// 一：基础
// 1、创建promise对象实例
// 2、promise实例传入的异步方法执行成功就执行注册的成功回调函数，失败就执行注册的失败回调函数

// 二：支持同步方法

function MyPromise(fn){
  let self = this;
  self.value = null
  self.error = null
  self.onFulfilled = null
  self.onRejected = null

  function resolve (value) {
    self.value = value
    self.onFulfilled(self.value)
  }

  function reject(error){
    self.error = error
    self.onRejected(self.error)
  }

  fn(resolve, reject)
}

MyPromise.prototype.then = function(onFulfilled, onRejected){
  this.onFulfilled = onFulfilled
  this.onRejected = onRejected
}

module.exports = MyPromise