const PENDING = 'pending'
const FUILIFILED = 'fulfilied'
const REJECTED = 'rejected'

function Promise () {
  this.state = PENDING
  this.result = null
  this.callbacks = []
}

const transition =(promise, state,result)=> {
  if (promise.state !== PENDING) return
  promise.state = state
  promise.result = result
}
// then方法必须返回promise

Promise.prototype.then = function(onFulfilled, onRejected){
  return new Promise((resolve, reject) => {
    let callback = {onFulfilled, onRejected, resolve, reject}
    if (this.state === PENDING) {
      this.callbacks.push(callback)
    } else {
      setTimeout(() => handleCallback(callback, this.state,this.result),0)
    }
  })
}

const handleCallback =(callback,state,result) => {
  let {onFulfilled, onRejected, resolve, reject} = callback
  try {
    if (state === FUILIFILED) {
      isFunction(onFulfilled) ? resolve(onFulfilled(result)): resolve(result)
    } else {
      isFunction(onRejected) ? resolve(onRejected(result)):reject(result)
    }
  } catch (error) {
    reject(error)
  }
}

