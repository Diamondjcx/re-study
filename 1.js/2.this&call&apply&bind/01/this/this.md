why：this 提供一种更优雅的方式来隐式“传递”一个对象引用，因此可以将 API 设计得更加简洁并且易于复用。如果么有 this，只能显示的传递上下文对象，会让代码变得越来越乱

# 总结

如果要判断一个运行中函数的 this 绑定， 就需要找到这个函数的直接调用位置。 找到之后
就可以顺序应用下面这四条规则来判断 this 的绑定对象。

**（1）** new 调用：绑定到新创建的对象，注意：显示 return 函数或对象，返回值不是新创建的对象，而是显式返回的函数或对象。
**（2）** call 或者 apply（ 或者 bind） 调用：严格模式下，绑定到指定的第一个参数。非严格模式下，null 和 undefined，指向全局对象（浏览器中是 window），其余值指向被 new Object()包装的对象。
**（3）** 对象上的函数调用：绑定到那个对象。
**（4）** 普通函数调用： 在严格模式下绑定到 undefined，否则绑定到全局对象。

**（5）** ES6 中的箭头函数：不会使用上文的四条标准的绑定规则， 而是根据当前的词法作用域来决定 this， 具体来说， 箭头函数会继承外层函数，调用的 this 绑定（ 无论 this 绑定到什么），没有外层函数，则是绑定到全局对象（浏览器中是 window）。 这其实和 ES6 之前代码中的 self = this 机制一样。
**（6）** DOM 事件函数：一般指向绑定事件的 DOM 元素，但有些情况绑定到全局对象（比如 IE6~IE8 的 attachEvent）。
一定要注意，有些调用可能在无意中使用普通函数绑定规则。 如果想“ 更安全” 地忽略 this 绑定， 你可以使用一个对象， 比如 ø = Object.create(null)， 以保护全局对象。

# this

`this`是在函数被调用时发生的绑定，它指向什么完全取决于函数在哪里被调用

## 全局上下文

非严格模式和严格模式中的 this 都是指向顶层对象

```javascript
this === window // true
;('use strict')
this === window // true
this.name = '若川'
console.log(this.name) // 若川
```

## 函数上下文

### 普通函数调用模式

```javascript
var name = 'window'
var doSth = function () {
  console.log(this.name)
}
doSth() //window
```

var 直接给 window 添加了 name 属性

```javascript
// 非严格模式
let name2 = 'window2'
let doSth2 = function () {
  console.log(this === window)
  console.log(this.name2)
}
doSth2() // true, undefined
```

let 没有给顶层对象添加属性，window.name2 和 window.doSth 都是 undefined

```javascript
// 严格模式
'use strict'
var name = 'window'
var doSth = function () {
  console.log(typeof this === 'undefined')
  console.log(this.name)
}
doSth() // true，// 报错，因为this是undefined

doSth.call(undefined)
```

### 对象中的函数调用模式

```javascript
var name = 'window'
var doSth = function () {
  console.log(this.name)
}
var student = {
  name: '若川',
  doSth: doSth,
  other: {
    name: 'other',
    doSth: doSth,
  },
}
student.doSth() // '若川'
student.other.doSth() // 'other'
// 用call类比则为：
student.doSth.call(student)
// 用call类比则为：
student.other.doSth.call(student.other)
```

```javascript
var studentDoSth = student.doSth
studentDoSth() // 'window'
// 用call类比则为：
studentDoSth.call(undefined)
```

### call\apply\bind 调用模式

> fun.call(thisArg, arg1, arg2, ...)

**（1）**`thisArg`

```javascript
function test(name) {
  this.name = name
  console.log(this)
}
test.call(1, 'test') // Number{1,name:"test"} 会指向原始值的自动包装对象
```

如果第一个参数为原始值（数字，字符串，布尔值），this 会指向该原始值的自动包装对象

如果是严格模式下，不会被包装为对象形式

```javascript
function test(name) {
  this.name = name
  console.log(this)
}
test.call(null, 'test') // window
```

如果第一个参数为 null 和 undefined，this 会自动指向全局对象（浏览器中就是 window 对象）

**（2）** `arg1, arg2, ...`指定的参数列表

**（3）** 返回值

返回值是调用的方法的返回值，若该方法没有返回值，则返回 undefined

call 就是改变函数中 this 指向为 thisArg，并且执行这个函数

> bind() 方法创建一个新的函数，当这个新函数被调用时，this 键值为其提供的值，后面为参数序列

fun.bind(thisArg[, arg1[, arg2[, ...]]])

```javascript
function test(name) {
  this.name = name
  console.log(this)
}
var newTest = test.bind(null, 'test')
newTest() // window
```

表现与 call 一样（参数为基本类型或 null）

### 构造函数调用模式

```javascript
function Student(name) {
  this.name = name
  console.log(this) // {name: '若川'}
  // 相当于返回了
  // return this; // {name: '若川'}
}
var result = new Student('若川')
```

使用 new 操作符调用函数

> 1、创建一个全新的对象
> 2、这个对象会被执行[[Prototype]]
> 3、生成的新对象会绑定到函数调用的 this
> 4、通过 new 创建的每个对象将最终被[[prototype]]链接到这个函数的 prototype 对象上
> 5、如果函数没有返回对象类型 object（包含 Function、Array、Date、RegExg、Error），那么表达式中的函数调用会自动返回这个新的对象

> 特别提醒一下，new 调用时的返回值，如果没有显式返回对象或者函数，才是返回生成的新对象。

```javascript
function Student(name) {
  this.name = name
  // return function f(){};
  // return {};
}
var result = new Student('若川')
console.log(result)
{
  name: '若川'
}
// 如果返回函数f，则result是函数f，如果是对象{}，则result是对象{}
```

### 原型链中的调用模式

```javascript
function Student(name) {
  this.name = name
}
var s1 = new Student('若川')
Student.prototype.doSth = function () {
  console.log(this.name)
}
s1.doSth() // '若川'
```

es6 中 class 实现

```javascript
class Student {
  constructor(name) {
    this.name = name
  }
  doSth() {
    console.log(this.name)
  }
}
let s1 = new Student('若川')
s1.doSth()
```

### 箭头函数调用模式

1、没有自己的 this、super、arguments 和 new.target 绑定。

2、不能使用 new 来调用。

3、没有原型对象。

4、不可以改变 this 的绑定。

5、形参名称不能重复。

箭头函数中没有 this 绑定，必须通过查找作用域链来决定。如果箭头函数被非箭头函数包含，则 this 绑定的是最近一层非箭头函数的 this，否则 this 得值则被设置为全局对象

```javascript
var name = 'window'
var student = {
  name: '若川',
  doSth: function () {
    // var self = this;
    var arrowDoSth = () => {
      // console.log(self.name);
      console.log(this.name)
    }
    arrowDoSth()
  },
  arrowDoSth2: () => {
    console.log(this.name)
  },
}
student.doSth() // '若川'
student.arrowDoSth2() // 'window'
```

相当于箭头函数外的 this 是缓存的该箭头函数上层的普通函数的 this，如果没有则是全局对象
也就是说无法通过 call、apply、bind 绑定箭头函数的 this，可以绑定缓存箭头函数上层的普通函数的 this

```javascript
var student = {
  name: '若川',
  doSth: function () {
    console.log(this.name)
    return () => {
      console.log('arrowFn:', this.name)
    }
  },
}
var person = {
  name: 'person',
}
student.doSth().call(person) // '若川'  'arrowFn:' '若川'
student.doSth.call(person)() // 'person' 'arrowFn:' 'person'
```

### DOM 事件处理函数调用

`addEventListener`、`attachEvent`、`onClik`

详情请见 test.html

### 内联事件处理函数调用

```html
<button
  class="btn1"
  onclick="console.log(this === document.querySelector('.btn1'))"
>
  点我呀
</button>
<button onclick="console.log((function(){return this})());">再点我呀</button>
```

第一个是 button 本身，所以是 true，第二个是 window

## 优先级

```javascript
var name = 'window'
var person = {
  name: 'person',
}
var doSth = function () {
  console.log(this.name)
  return function () {
    console.log('return:', this.name)
  }
}
var Student = {
  name: '若川',
  doSth: doSth,
}
// 普通函数调用
doSth() // window
// 对象上的函数调用
Student.doSth() // '若川'
// call、apply 调用
Student.doSth.call(person) // 'person'
new Student.doSth.call(person)
```

试想一下，如果是 Student.doSth.call(person)先执行的情况下，那 new 执行一个函数。是没有问题的。
然而事实上，这代码是报错的。运算符优先级是 new 比点号低，所以是执行 new (Student.doSth.call)(person)
而 Function.prototype.call，虽然是一个函数（apply、bind 也是函数），跟箭头函数一样，不能用 new 调用。所以报错了。

> Uncaught TypeError: Student.doSth.call is not a constructor

new 调用 > call、apply、bind 调用 > 对象上的函数调用 > 普通函数调用。

面试官考察 this 指向就可以考察 new、call、apply、bind，箭头函数等用法。从而扩展到作用域、闭包、原型链、继承、严格模式等。这就是面试官乐此不疲的原因。

```javascript
function Foo() {
  getName = function () {
    alert(1)
  }
  return this
}
Foo.getName = function () {
  alert(2)
}
Foo.prototype.getName = function () {
  alert(3)
}
var getName = function () {
  alert(4)
}
function getName() {
  alert(5)
}

//请写出以下输出结果：
Foo.getName() // 2
getName() // 4
Foo().getName() // 1
getName() // 1
new Foo.getName() // 2
new Foo().getName() // 3
new new Foo().getName() // 3
```

```javascript
var name = 'window'

ver person1 = {
    name:'person1',
    show1:function () {
        console.log(this.name)
    },
    show2:()=>console.log(this.name),
    show3: function () {
        return function () {
            console.log(this.name)
        }
    },
    show4:function () {
        return ()=>console.log(this.name)
    }
}
var person2 = {name:'person2'}

person1.show1()  // 对象中的函数调用，指向对象  'person1'
person1.show1.call(person2) // 绑定第一个参数 'person2'

person1.show2() // 箭头函数绑定上一层函数的this 没有上一层函数 绑定window ‘window’
person1.show2.call(person2) // 使用call，自己没有this，所以绑定的是上一层函数的this，没有 即 ‘window’

person1.show3()() // person1.show3 是函数，在全局作用域中调用，即普通函数调用， window
person1.show3().call(person2) // 指向person2  ‘person2’
person1.show3.call(person2)() // 普通函数调用，在全局作用域中调用  window

person1.show4()()  // person1    不是使用时所在的对象而是定义时所在的对象
person1.show4().call(person2) // 'person1' 不是使用时所在的对象而是定义时所在的对象
person1.show4.call(person2)() // 'person2'

```

```javascript
var name = 'window'

ver person1 = {
    name:'person1',
    show1:function () {
        console.log(this.name)
    },
    show2:()=>console.log(this.name),
    show3: function () {
        return function () {
            console.log(this.name)
        }
    },
    show4:function () {
        return ()=>console.log(this.name)
    }
}

var personA = new Person('personA')
var personB = new Person('personB')

personA.show1() // personA
personA.show1.call(personB) // personB

personA.show2() //personA
personA.show2.call(personB) //personA

personA.show3()() //window
personA.show3().call(personB) // personB
personA.show3.call(personB)() // window

personA.show4()() // personA
personA.show4().call(personB) // personA
personA.show4.call(personB)() // personB
```
