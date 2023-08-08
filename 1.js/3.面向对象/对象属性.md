1、属性描述符
writable：决定是否可以修改属性的值
configurable：决定属性是否可配置，利用 defineProperty()方法来修改属性描述符

Enumerable：决定是否出现在对象的属性枚举中

2、禁止扩展
Object.preventExtensions

3、密封
Object.seal()会创建一个密封对象
其实通过进制扩展设置了 configurable 为 false

4、冻结
Object.freeze()会创建一个冻结对象
实际通过密封 设置 writeable 为 false

5、getter 和 setter，会忽略 value 和 writable 特性，关心 set 和 get（还有 configurable 和 enumerable）

6、存在性
myObject.a 属性返回值可能是 undefined，可能属性中存储的 undefined，也可能是因为属性不存在返回 undefined

in、hasOwnProperty:区别是否查找[[Prototype]]

Object.keys(..)和 Object.getOwenPrototypeNames 都只会查找对象直接包含的属性

7、遍历
for...in 无法直接获取属性值

for...of 直接获取属性值，首先会向被访问对象请求一个迭代器对象@@iterator，通过调用迭代器对象的 next 方法遍历所有返回值
