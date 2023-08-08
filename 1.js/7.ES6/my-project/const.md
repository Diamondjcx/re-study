## const 常量标识
```js
    const LIMIT = 10;
    cosnt OBJ_MAP = {
        a: 'A',
        A: 'a'
    };
    // 5 => VI
    // VI => 5
    const QUEUE = [1, 2, 3, 5, 6];
```
### 1. 不允许重复声明赋值
```js
// 变量重新赋值
var arg1 = '云隐';
arg1 = '小可';

// 常量
// ES5
Object.defineProperty(window, 'arg2', {
    value: '云隐'，
    writable: false
})
arg2 = '小可';

// ES6
const arg3 = '云隐';
arg3 = '小可';

// const不允许重复声明
const arg3 = '云隐';
const arg3 = '云隐';
```

### 2. 块级作用域
```js
    if(true) {
        var arg1 = '云隐';
    }
    console.log('arg1', arg1);

    if(true) {
        const arg2 = '云隐';
    }
    console.log('arg2', arg2);
    // 变量提升 + 块级作用域
```

### 3. 无变量提升
```js
    console.log(arg1);
    var arg1 = '云隐';

    // 相当于
    var arg1;
    console.log(arg1);
    arg1 = '云隐';

    // 无变量提升 - 先声明再使用
    console.log(arg2);
    const arg2 = '云隐'; // not defined
```

```js
    // 非全局作用域

    var arg1 = '云隐';
    console.log(window.arg1);

    // const不在window中
    const arg1 = '云隐';
    console.log(window.arg1);
```

### 4. dead zone
```js
    if(true) {
        console.log(arg1);
        var arg1 = '云隐';
    }
```

### 5. let or const
* 引用型 const
```js
    const obj = {
        teacher: '云隐',
        leader: '小可'
    }
    obj.leader = '部部';

    const arr = ['云隐', '小可'];
    arr[0] = 'aaaa';

    // 引用类型的原理 - 指向地址
    // 追问 破局 - object.freeze()
    object.freeze(obj);

    const obj2 = {
        teacher: '云隐',
        leader: '小可',
        zhuawa: ['黄小杨', '部部']
    }
     object.freeze(obj2);
     obj2.zhuawa[0] = '云隐';

    // freeze只能冻结根层，嵌套引用类型需要遍历递归
    // 面试题目
    function deepFreeze() {
        // 2. 确定主执行步骤
        Object.freeze(obj);
        // 3. 逐级深入
        (Object.keys(obj) || []).forEach(key => { // for in - hasOwnProperty
            let innerObj = obj[key];
            
            if (typeof innerObj === 'object') {
                // 1. 递归模式确定
                deepFreeze(innerObj);
            }
        })
    }
    // lodash: clone deepclone equal deepequal
```