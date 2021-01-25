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

