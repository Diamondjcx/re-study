# 深拷贝与浅拷贝

深浅拷贝都是基于js中的引用类型而言的

浅拷贝复制对象的引用，如果拷贝后对象发生变化，源对象也会发生变化

深拷贝是真正的对对象的拷贝

## 浅拷贝

只是对引用地址的拷贝，修改引用指向的值，都会受到影响

```javascript
const originArray = [1,2,3,4];
const originObj = {a: 'a', b:'b', c:[1,2,3], d: {dd: 'dd'}}

const cloneArray = originArray;
const cloneObj = originObj;

console.log(cloneArray); // [1,2,3,4];
console.log(originObj); // {a: 'a', b:'b', c:[1,2,3], d: {dd: 'dd'}}


cloneArray.push(66);
cloneObj.a = {aa:'aa'};
 
console.log(cloneArray); // [1, 2, 3, 4, 66]
console.log(originArray); // [1, 2, 3, 4, 66]

console.log(originObj); // {a:{aa:'aa'}, b:'b', c:[1,2,3], d: {dd: 'dd'}}
console.log(cloneObj) // {a:{aa:'aa'}, b:'b', c:[1,2,3], d: {dd: 'dd'}}
```

## 深拷贝

对目标的完全拷贝，进行深拷贝之后，老死不相往来，互不影响

方法： 

1、JSON.parse JSON.stringfiy
2、利用递归实现每一层都重新创建对象并赋值

### JSON.stringfy/parse的方法

`JSON.stringfy`: 将一个`JavaScript`值转化为`JSON`字符串
`JSON.parse`: 将一个`JSON`字符串转成一个`JavaScript`值或对象
`JavaScript`和`JSON`字符串的相互转换

```javascript
const originArray = [1,2,3,4];
const originObj = {a: 'a', b:'b', c:[1,2,3], d: {dd: 'dd'}}

const cloneArray = JSON.parse(JSON.stringify(originArray));
const cloneObj = JSON.parse(JSON.stringify(originObj));

cloneArray.push(66);
cloneObj.a = {aa:'aa'};

console.log(cloneArray); // [1,2,3,4,66]
console.log(originArray); //[1,2,3,4]


console.log(originObj);  //  {a: 'a', b:'b', c:[1,2,3], d: {dd: 'dd'}}
console.log(cloneObj) //{a: {aa:'aa'}, b:'b', c:[1,2,3], d: {dd: 'dd'}}
```

特殊情况不适用

```javascript
const originObj = {
  name:'axuebin',
  sayHello:function(){
    console.log('Hello World');
  }
}
console.log(originObj); // {name: "axuebin", sayHello: ƒ}
const cloneObj = JSON.parse(JSON.stringify(originObj));
console.log(cloneObj); // {name: "axuebin"} 导致sayHello函数丢失
```

导致函数属性丢失，MDN有解释：undefined、function、symbol会在转换过程中被忽略

## 递归的方法

对每一层的数据都实现一次`创建对象->对象赋值`的操作

浅拷贝：对引用的拷贝，会相互影响

深拷贝：引用和值全部拷贝，互不影响

### JSON.stringify

会抛弃对象的 constructor,深拷贝之后，不管原来的对象的构造函数是什么，在深拷贝之后都会变成 Object
如果对象存在循环引用的情况也无法处理

### 递归的方法

对每一层的数据都实现`创建对象->对象赋值`

```javascript
function deepClone(source) {
  // 只拷贝对象
  if (typeof source !== 'object' && obj === null) {
    return source
  }
  // 初始值，判断是复制的原始值对象还是数组
  const cloneObj = source.constructor === Array ? [] : {}

  // 进行遍历
  for (let keys in source) {
    // 判断是否有此属性
    if (source.hasOwnProperty(keys)) {
      // 如果值是对象，就重新递归
      if (source[keys] && typeof source[keys] === 'object') {
        cloneObj[keys] = source[keys].constructor === Array ? [] : {}
        cloneObj[keys] = deepClone(source[keys])
      } else {
        cloneObj[keys] = source[keys]
      }
    }
  }
  return cloneObj
}
```

test

```javascript
const originObj = { a: 'a', b: 'b', c: [1, 2, 3], d: { dd: 'dd' } }
const cloneObj = deepClone(originObj)
console.log(cloneObj === originObj) // false

cloneObj.a = 'aa'
cloneObj.c = [1, 1, 1]
cloneObj.d.dd = 'doubled'

console.log(cloneObj) // {a:'aa',b:'b',c:[1,1,1],d:{dd:'doubled'}};
console.log(originObj) // {a:'a',b:'b',c:[1,2,3],d:{dd:'dd'}};
```

带有函数的

```javascript
const originObj = {
  name: 'axuebin',
  sayHello: function () {
    console.log('Hello World')
  },
}
console.log(originObj) // {name: "axuebin", sayHello: ƒ}
const cloneObj = deepClone(originObj)
console.log(cloneObj) // {name: "axuebin", sayHello: ƒ}
```

循环引用不适用

```javascript
const originArr = { a: 'a', b: { bb: 'bb' } }
originArr.c = originArr
const cloneArr = deepClone(originArr)
// 会产生溢出
```

解决

- 使用哈希表

循环检测，设置一个数组或者哈希表存储已拷贝过的对象，当检测到当前对象已存在哈希表中，取出该值并返回

```javascript
function deepClone1(source, hash = new WeakMap()) {
  // 只拷贝对象
  if (typeof source !== 'object' && obj === null) {
    return source
  }
  //新增,直接查hash表
  if (hash.has(source)) return hash.get(source)

  // 初始值，判断是复制的原始值对象还是数组
  const cloneObj = source.constructor === Array ? [] : {}

  // 新增代码，哈希表设值
  hash.set(source, cloneObj)

  // 进行遍历
  for (let keys in source) {
    // 判断是否有此属性
    if (source.hasOwnProperty(keys)) {
      // 如果值是对象，就重新递归
      if (source[keys] && typeof source[keys] === 'object') {
        cloneObj[keys] = source[keys].constructor === Array ? [] : {}
        cloneObj[keys] = deepClone1(source[keys], hash)
      } else {
        cloneObj[keys] = source[keys]
      }
    }
  }
  return cloneObj
}
```

test

```javascript
const originArr = { a: 'a', b: { bb: 'bb' } }
originArr.c = originArr
const cloneArr = deepClone1(originArr)
```

不会溢出，成功拷贝

- 使用数组

```javascript
function deepClone2(source, uniqueList) {
  // 只拷贝对象
  if (typeof source !== 'object' && obj === null) {
    return source
  }
  //新增,直接查hash表
  if (!uniqueList) uniqueList = []

  // 初始值，判断是复制的原始值对象还是数组
  const cloneObj = source.constructor === Array ? [] : {}

  // 新增代码
  // 数据已经存在，返回保存的数据
  const uniqueData = find(uniqueList, source)
  if (uniqueData) {
    return uniqueData.target
  }

  // 数据不存在，保存元数据，以及对应的引用
  uniqueList.push({
    source: source,
    cloneObj: cloneObj,
  })
  // 进行遍历
  for (let keys in source) {
    // 判断是否有此属性
    if (source.hasOwnProperty(keys)) {
      // 如果值是对象，就重新递归
      if (source[keys] && typeof source[keys] === 'object') {
        cloneObj[keys] = source[keys].constructor === Array ? [] : {}
        cloneObj[keys] = deepClone2(source[keys], uniqueList)
      } else {
        cloneObj[keys] = source[keys]
      }
    }
  }
  return cloneObj
}

function find(arr, item) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].source === item) {
      return arr[i]
    }
  }
  return null
}
```

test

```javascript
const originArr = { a: 'a', b: { bb: 'bb' } }
originArr.c = originArr
const cloneArr = deepClone2(originArr)
```

引用丢失的问题

```javascript
var obj1 = {}
var obj2 = { a: obj1, b: obj1 }

obj2.a === obj2.b
// true

var obj3 = cloneDeep1(obj2)
obj3.a === obj3.b
// false
```

cloneDeep2 已解决

```javascript
var obj3 = cloneDeep2(obj2)
obj3.a === obj3.b
// true
```

#### 拷贝 Symbol

`Symbol`在`ES6`下才有，需要一些方法来检测出 Symble 类型

方法一： Object.getOwnPropertySymbols()
方法二：Reflect.ownKeys()

对于方法一可以查找一个给定对象的符号属性时返回一个 ?symbol 类型的数组。注意，每个初始化的对象都是没有自己的 symbol 属性的，因此这个数组可能为空，除非你已经在对象上设置了 symbol 属性。（来自 MDN）

```javascript
var obj = {}
var a = Symbol('a') // 创建新的symbol类型
var b = Symbol.for('b') // 从全局的symbol注册?表设置和取得symbol

obj[a] = 'localSymbol'
obj[b] = 'globalSymbol'

var objectSymbols = Object.getOwnPropertySymbols(obj)

console.log(objectSymbols.length) // 2
console.log(objectSymbols) // [Symbol(a), Symbol(b)]
console.log(objectSymbols[0]) // Symbol(a)
```

对于方法二返回一个由目标对象自身的属性键组成的数组。它的返回值等同于 Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))。(来自 MDN)

```javascript
Reflect.ownKeys({ z: 3, y: 2, x: 1 }) // [ "z", "y", "x" ]
Reflect.ownKeys([]) // ["length"]

var sym = Symbol.for('comet')
var sym2 = Symbol.for('meteor')
var obj = {
  [sym]: 0,
  str: 0,
  773: 0,
  0: 0,
  [sym2]: 0,
  '-1': 0,
  8: 0,
  'second str': 0,
}
Reflect.ownKeys(obj)
// [ "0", "8", "773", "str", "-1", "second str", Symbol(comet), Symbol(meteor) ]
// 注意顺序
// Indexes in numeric order,
// strings in insertion order,
// symbols in insertion order
```

第一种

```javascript
// 木易杨
function cloneDeep4(source, hash = new WeakMap()) {
  if (!isObject(source)) return source
  if (hash.has(source)) return hash.get(source)

  let target = Array.isArray(source) ? [] : {}
  hash.set(source, target)

  // ============= 新增代码
  let symKeys = Object.getOwnPropertySymbols(source) // 查找
  if (symKeys.length) {
    // 查找成功
    symKeys.forEach((symKey) => {
      if (isObject(source[symKey])) {
        target[symKey] = cloneDeep4(source[symKey], hash)
      } else {
        target[symKey] = source[symKey]
      }
    })
  }
  // =============

  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObject(source[key])) {
        target[key] = cloneDeep4(source[key], hash)
      } else {
        target[key] = source[key]
      }
    }
  }
  return target
}
```

测试下效果

```javascript
// 木易杨
// 此处 a 是文章开始的测试用例
var sym1 = Symbol('a') // 创建新的symbol类型
var sym2 = Symbol.for('b') // 从全局的symbol注册?表设置和取得symbol

a[sym1] = 'localSymbol'
a[sym2] = 'globalSymbol'

var b = cloneDeep4(a)
console.log(b)
// {
// 	name: "muyiy",
// 	a1: undefined,
//	a2: null,
// 	a3: 123,
// 	book: {title: "You Don't Know JS", price: "45"},
// 	circleRef: {name: "muyiy", book: {…}, a1: undefined, a2: null, a3: 123, …},
//  [Symbol(a)]: 'localSymbol',
//  [Symbol(b)]: 'globalSymbol'
// }
```

方法二

```javascript
function cloneDeep4(source, hash = new WeakMap()) {
  if (!isObject(source)) return source
  if (hash.has(source)) return hash.get(source)

  let target = Array.isArray(source) ? [] : {}
  hash.set(source, target)

  Reflect.ownKeys(source).forEach((key) => {
    // 改动
    if (isObject(source[key])) {
      target[key] = cloneDeep4(source[key], hash)
    } else {
      target[key] = source[key]
    }
  })
  return target
}
```

### JavaScript 中的拷贝方法

1、`concat`和`slice`可以实现对数组的拷贝，不会改变原数组，返回一个新的数组

```javascript
const originArr = [1, 2, 3]

const cloneArr1 = originArr.concat(4)

console.log('originArr', originArr) //[1, 2, 3]
console.log('cloneArr1', cloneArr1) // [1, 2, 3, 4]

const cloneArr2 = originArr.slice(0, 1)

console.log('originArr', originArr) // [1, 2, 3]
console.log('cloneArr2', cloneArr2) // [1]
```

原数组没有变，看上去是深拷贝的

多层

```javascript
const originArray = [1, [1, 2, 3], { a: 1 }]
const cloneArray = originArray.concat()
console.log(cloneArray === originArray) // false
cloneArray[1].push(4)
cloneArray[2].a = 2
console.log(originArray) // [1,[1,2,3,4],{a:2}]
```

originArray 中含有数组 [1,2,3] 和对象 {a:1}，如果我们直接修改数组和对象，不会影响 originArray，但是我们修改数组 [1,2,3] 或对象 {a:1} 时，发现 originArray 也发生了变化

> concat 只是对数组的第一层进行深拷贝, slice 只是对数组的第一层进行深拷贝。

2、 `Object.assign()`

Object.assign() 拷贝的是属性值。假如源对象的属性值是一个指向对象的引用，它也只拷贝那个引用值。

```javascript
const originArray = [1, 2, 3, 4, 5, [6, 7, 8]]
const originObj = { a: 1, b: { bb: 1 } }

const cloneArray = [...originArray]
cloneArray[0] = 0
cloneArray[5].push(9)
console.log(originArray) // [1,2,3,4,5,[6,7,8,9]]

const cloneObj = { ...originObj }
cloneObj.a = 2
cloneObj.b.bb = 2
console.log(originObj) // {a:1,b:{bb:2}}
```

> ... 实现的是对象第一层的深拷贝。后面的只是拷贝的引用值。

# 结论

1、赋值运算符 = 实现的是浅拷贝，只拷贝对象的引用值；

2、JavaScript 中数组和对象自带的拷贝方法都是“首层浅拷贝”；

3、JSON.stringify 实现的是深拷贝，但是对目标对象有要求；

4、若想真正意义上的深拷贝，请递归。

# 补充

jQuery.extend 实现了深拷贝，无法处理源对象的循环引用情况

lodash 的\_.cloneDeep
