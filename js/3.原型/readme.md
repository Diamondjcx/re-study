# 原型与原型链

构造函数创建对象

```javascript
function Person() {}
var person = new Person()
person.name = 'Kevin'
console.log(person.name) // Kevin
```

## prototype

每个函数都有一个`prototype`,函数对象固有的属性

```javascript
function Person() {}
// 虽然写在注释里，但是你要注意：
// prototype是函数才会有的属性
Person.prototype.name = 'Kevin'
var person1 = new Person()
var person2 = new Person()
console.log(person1.name) // Kevin
console.log(person2.name) // Kevin
```

函数的`prototype`指向一个对象，调用该构造函数而创建的实例的原型，也就是`person1`和`person2`的原型

原型：每一个`JavaScript`对象(null 除外)在创建的时候会与之关联一个另一对象，这个对象就是我们说的原型，每一个对象都会从原型"继承"属性

## _proto_

这是每一个`JavaScript`对象(除了 null )都具有的一个属性，叫`__proto__`，这个属性会指向该对象的原型。

```javascript
function Person() {}
var person = new Person()
console.log(person.__proto__ === Person.prototype) // true
```

## constructor

没有指向实例的，因为会创建很多实例，有指向构造函数的。`constructor`，每个原型都有一个 `constructor` 属性指向关联的构造函数。

```javascript
function Person() {}
console.log(Person === Person.prototype.constructor) // true
```

```javascript
function Person() {}
var person = new Person()
console.log(person.constructor === Person) // true
转化为
person.constructor === Person.prototype.constructor
```

## 综上所述

```javascript
function Person() {}

var person = new Person()

console.log(person.__proto__ == Person.prototype) // true
console.log(Person.prototype.constructor == Person) // true
// 顺便学习一个ES5的方法,可以获得对象的原型
console.log(Object.getPrototypeOf(person) === Person.prototype) // true
```

## 实例与原型

当读取实例的属性时，如果找不到，就会查找与对象关联的原型中的属性，如果还查不到，就去找原型的原型，一直找到最顶层为止。

```javascript
function Person() {}

Person.prototype.name = 'Kevin'

var person = new Person()

person.name = 'Daisy'
console.log(person.name) // Daisy

delete person.name
console.log(person.name) // Kevin
```

从 person 对象中找不到 name 属性就会从 person 的原型也就是 person.`proto` ，也就是 Person.prototype 中查找

## 原型的原型

```javascript
var obj = new Object()
obj.name = 'Kevin'
console.log(obj.name) // Kevin

Person.prototype.__proto__ === Object.prototype

Object.prototype.constructor === Object
```

原型对象就是通过 Object 构造函数生成的

## 原型链

```javascript
console.log(Object.prototype.__proto__ === null) // true
```

> null 表示“没有对象”，即该处不应该有值。

## instanceof

> object instanceof constructor

instanceof 运算符用来检测 constructor.prototype 是否存在于参数 object 的原型链上。
