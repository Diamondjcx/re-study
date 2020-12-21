# this
函数`this`在调用时绑定的，完全取决于函数的调用位置

## 全局上下文

非严格模式和严格模式中的this都是指向顶层对象

```javascript
this === window // true
'use strict'
this === window; // true
this.name = '若川';
console.log(this.name); // 若川
```

## 函数上下文

### 普通函数调用模式

```javascript
var name = "window"
var doSth = function() {
  console.log(this.name)
}
doSth() //window
```

var 直接给window添加了name属性


```javascript
// 非严格模式
let name2 = 'window2';
let doSth2 = function(){
    console.log(this === window);
    console.log(this.name2);
}
doSth2() // true, undefined

```
let没有给顶层对象添加属性，window.name2和window.doSth 都是undefined