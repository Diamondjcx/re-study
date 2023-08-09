### key解构技巧
```js
    const zhaowa = {
        teacher: {
            name: '',
            age: 30
        },
        leader: '',
        name: 'es6'
    }

    // 别名
    const {
        teacher: {
            name,
            age
        },
        leader,
        name: className
    } = zhaowa;
```

## 追问结构使用场景
### 形参结构
```js
    const sum = arr => {
        let res = 0;
        arr.forEach(each => {
            res += each;
        })
    }

    const sum = ([a, b, c]) => {
        return a + b + c;
    };
```

### 结合初始值
```js
    const course = ({ teacher, leader, course = 'zhaowa' }) => {
        // …… 
    }

    course({
        teacher: 'yy',
        leader: '小可'
    })
```

### 返回值
```js
    const getCourse = () => {
        return {
            teacher: '',
            leader: ''
        }
    }

    const { teacher, leader } = getCourse();
```

### 变量交换
```js
    let a = 1;
    let b = 2;
    [b, a] = [a, b];
```

### json处理
```js
const json = '{"teacher": "yy", "leader": "xk"}';

const obj = JSON.parse(json);

const {
    teacher,
    leader
} = JSON.parse(json);
```

### ajax
```js
    const {
        code,
        data,
        msg
    } = response;
```