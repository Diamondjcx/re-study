

// 二：支持三种状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function MyPromise(fn){
  let self = this;
  self.value = null
  self.error = null
  self.status = PENDING
  self.onFulfilled = null
  self.onRejected = null

  function resolve (value) {
    // 如果状态是pending才去修改状态为fulifilled并执行成功逻辑
    if (self.status === PENDING) {
      setTimeout(() => {
        self.status = FULFILLED
        self.value = value
        self.onFulfilled(self.value)
      }, 0)
    }
  }

  function reject(error){
    if (self.status === PENDING) {
      setTimeout(() => {
        self.status=REJECTED
        self.error = error
        self.onRejected(self.error)
      }, 0)
    }

  }

  fn(resolve, reject)
}

MyPromise.prototype.then = function(onFulfilled, onRejected){
  if (this.status === PENDING) {
    this.onFulfilled = onFulfilled
    this.onRejected = onRejected
  } else if (this.status === FULFILLED) {
    // 如果状态是fulifilled,直接执行失败回到，并将成功值传入
    onFulfilled(this.value)
  } else {
    onRejected(this.error)
  }
}

module.exports = MyPromise