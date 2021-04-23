# call 模拟实现

首先看call做了什么，call()方法在使用一个指定this值和若干指定的参数值的前提下调用某个函数或方法

```javascript
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

bar.call(foo); // 1
```

注意：
// call改变了this的指向，指向foo
// bar函数执行了

## 模拟实现第一步

```javascript
// 改造如下，this会指向foo
var foo = {
    value: 1,
    bar: function() {
        console.log(this.value)
    }
};
```


foo.bar(); // 1

// 改造步骤：
//     1、函数设置为对象的属性
//     2、执行该函数
//     3、删除该函数

```javascript
// 第一步
foo.fn = bar
// 第二步
foo.fn()
// 第三步
delete foo.fn
```

```javascript
// 第一版
Function.prototype.call2 = function(context) {
    // 首先要获取调用call的函数，用this可以获取
    context.fn = this; // this是bar函数
    context.fn();
    delete context.fn;
}

// 测试一下
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

bar.call2(foo); // 1
```

## 模拟实现第二步  参数

```javascript
var foo = {
    value: 1
};

function bar(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
}

bar.call(foo, 'kevin', 18);
// kevin
// 18
// 1
```

传入的参数不固定怎么办？
可以从 Arguments 对象中取值，取出第二个到最后一个参数，然后放到一个数组里

```javascript
// 以上个例子为例，此时的arguments为：
// arguments = {
//      0: foo,
//      1: 'kevin',
//      2: 18,
//      length: 3
// }
// 因为arguments是类数组对象，所以可以用for循环
var args = [];
for(var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']');
}

// 执行后 args为 [foo, 'kevin', 18]
```

最终

```javascript
// 第二版
Function.prototype.call2 = function(context) {
    context.fn = this;
    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }
    eval('context.fn(' + args +')');
    delete context.fn;
}

// 测试一下
var foo = {
    value: 1
};

function bar(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
}

bar.call2(foo, 'kevin', 18); 
// kevin
// 18
// 1
```

## 模拟实现第三步  假如传入null

**（1）**this 参数可以传 null，当为 null 的时候，视为指向 window

```javascript

var value = 1;

function bar() {
    console.log(this.value);
}

bar.call(null); // 1
```

**(2)**函数是可以有返回值的！

```javascript

var obj = {
    value: 1
}

function bar(name, age) {
    return {
        value: this.value,
        name: name,
        age: age
    }
}

console.log(bar.call(obj, 'kevin', 18));
// Object {
//    value: 1,
//    name: 'kevin',
//    age: 18
// }
```

最终

```javascript
// 第三版
Function.prototype.call2 = function (context) {
    var context = context || window;
    context.fn = this;

    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }

    var result = eval('context.fn(' + args +')');

    delete context.fn
    return result;
}

// 测试一下
var value = 2;

var obj = {
    value: 1
}

function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}

bar.call(null); // 2

console.log(bar.call2(obj, 'kevin', 18));
// 1
// Object {
//    value: 1,
//    name: 'kevin',
//    age: 18
// }
```

问题：__fn 同名覆盖问题，thisArg对象上有__fn，那就被覆盖了然后被删除了。
解决： 使用es6的symbol或者使用Math.random()模拟实现独一无二的key

问题：传递参数可以使用eval或者使用ES6扩展符...


# apply的模拟实现

```javascript
Function.prototype.apply = function (context, arr) {
    var context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    }
    else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn
    return result;
}
```

# bind的模拟实现

```javascript
var obj = {};
console.log(obj);
console.log(typeof Function.prototype.bind); // function
console.log(typeof Function.prototype.bind());  // function
console.log(Function.prototype.bind.name);  // bind
console.log(Function.prototype.bind().name);  // bound

```

1、bind是Functoin原型链中Function.prototype的一个属性，每个函数都可以调用它。
2、bind本身是一个函数名为bind的函数，返回值也是函数，函数名是bound。（打出来就是bound加上一个空格）。
知道了bind是函数，就可以传参，而且返回值'bound '也是函数，也可以传参，就很容易写出例子2：
后文统一 bound 指原函数original bind之后返回的函数，便于说明。

```javascript
var obj = {
    name: '若川',
};
function original(a, b){
    console.log(this.name);
    console.log([a, b]);
    return false;
}
var bound = original.bind(obj, 1);
var boundResult = bound(2); // '若川', [1, 2]
console.log(boundResult); // false
console.log(original.bind.name); // 'bind'
console.log(original.bind.length); // 1
console.log(original.bind().length); // 2 返回original函数的形参个数
console.log(bound.name); // 'bound original'
console.log((function(){}).bind().name); // 'bound '
console.log((function(){}).bind().length); // 0

```

1、调用bind的函数中的this指向bind()函数的第一个参数。
2、传给bind()的其他参数接收处理了，bind()之后返回的函数的参数也接收处理了，也就是说合并处理了。
3、并且bind()后的name为bound + 空格 + 调用bind的函数名。如果是匿名函数则是bound + 空格。
4、bind后的返回值函数，执行后返回值是原函数（original）的返回值。
5、bind函数形参（即函数的length）是1。bind后返回的bound函数形参不定，根据绑定的函数原函数（original）形参个数确定。

简单模拟：
```javascript
// 第一版 修改this指向，合并参数
Function.prototype.bindFn = function bind(thisArg){
    if(typeof this !== 'function'){
        throw new TypeError(this + 'must be a function');
    }
    // 存储函数本身
    var self = this;
    // 去除thisArg的其他参数 转成数组
    var args = [].slice.call(arguments, 1);
    var bound = function(){
        // bind返回的函数 的参数转成数组
        var boundArgs = [].slice.call(arguments);
        // apply修改this指向，把两个函数的参数合并传给self函数，并执行self函数，返回执行结果
        return self.apply(thisArg, args.concat(boundArgs));
    }
    return bound;
}
// 测试
var obj = {
    name: '若川',
};
function original(a, b){
    console.log(this.name);
    console.log([a, b]);
}
var bound = original.bindFn(obj, 1);
bound(2); // '若川', [1, 2]

```

返回的函数，可以使用new进行实例化

```javascript
var obj = {
    name: '若川',
};
function original(a, b){
    console.log('this', this); // original {}
    console.log('typeof this', typeof this); // object
    this.name = b;
    console.log('name', this.name); // 2
    console.log('this', this);  // original {name: 2}
    console.log([a, b]); // 1, 2
}
var bound = original.bind(obj, 1);
var newBoundResult = new bound(2);
console.log(newBoundResult, 'newBoundResult'); // original {name: 2}
```

1、bind原先指向obj的失效了，其他参数有效。
2、new bound的返回值是以original原函数构造器生成的新对象。original原函数的this指向的就是这个新对象。
另外前不久写过一篇文章：面试官问：能否模拟实现JS的new操作符。简单摘要：
new做了什么：

> 1.创建了一个全新的对象。
2.这个对象会被执行[[Prototype]]（也就是__proto__）链接。
3.生成的新对象会绑定到函数调用的this。
4.通过new创建的每个对象将最终被[[Prototype]]链接到这个函数的prototype对象上。
5.如果函数没有返回对象类型Object(包含Functoin, Array, Date, RegExg, Error)，那么new表达式中的函数调用会自动返回这个新的对象。


模拟实现：

```javascript
function Student(name){
    if(this instanceof Student){
        this.name = name;
        console.log('name', name);
    }
    else{
        throw new Error('必须通过new关键字来调用Student。');
    }
}
var student = new Student('若');
var notAStudent = Student.call(student, '川'); // 不抛出错误，且执行了。
console.log(student, 'student', notAStudent, 'notAStudent');

function Student2(name){
    if(typeof new.target !== 'undefined'){
        this.name = name;
        console.log('name', name);
    }
    else{
        throw new Error('必须通过new关键字来调用Student2。');
    }
}
var student2 = new Student2('若');
var notAStudent2 = Student2.call(student2, '川');
console.log(student2, 'student2', notAStudent2, 'notAStudent2'); // 抛出错误

```

总结：
1、bind是Function原型链中的Function.prototype的一个属性，它是一个函数，修改this指向，合并参数传递给原函数，返回值是一个新的函数。
2、bind返回的函数可以通过new调用，这时提供的this的参数被忽略，指向了new生成的全新对象。内部模拟实现了new操作符。
