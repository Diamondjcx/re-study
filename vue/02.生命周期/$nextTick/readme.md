## nextTick  微任务

下次DOM更新循环结束之后执行延迟回调，在修改数据之后立即使用这个方法，获取更新之后的DOM

```javascript
      this.displayTotal = 10000000
      this.$nextTick().then(function () {
        // DOM 更新了
        console.log('DOM 更新了')
      })
```

## 微任务、宏任务、事件队列
> https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/
执行一次宏任务，清空微任务队列


执行一个宏任务（首次执行的主代码块或者任务队列中的回调函数）
执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
宏任务执行完毕后，立即执行当前微任务队列中的所有任务（依次执行）
JS引擎线程挂起，GUI线程执行渲染
GUI线程渲染完毕后挂起，JS引擎线程执行任务队列中的下一个宏任务


Tasks	
Microtasks
JS stack
Log