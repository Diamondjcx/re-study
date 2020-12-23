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