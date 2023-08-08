## 箭头函数
```js
    // 传统函数
    function test(a, b) {
        return a + b;
    }
    const test2 = function(a, b) {
        return a + b;
    }
```

### 箭头函数
```js
    // Es6
    const test3 = (a, b) => {
        return a + b;
    }
    const test3 = (a, b) => a + b;
    const test4 = x => {
        // content
    }
    cosnt test5 = () => {
        // ...
    }
```

### 上下文
```js
    // ES6
    const obj2 = {
        teacher: '云隐',
        leader: '小可',
        zhuawa: ['黄小杨', '部部'],
        getTeacher: function() {
            console.log('teacher is:', this.teacher);
            return this.teacher;
        }
        getLeader: () => {
            console.log('leader is:', this.leader);
            return this.leader;
        }
    }
```

## 追问：上下文形成的原因 箭头函数并不会形成独立上下文，内部this指向了window
### 场景
#### 场景1：dom操作cb时
```js
    const btn = document.querySelector('#btn');

    btn.addEventListener('click', function() {
        this.style.color = '#fff';
    });
```

#### 场景2：类操作
```js
    // 箭头函数无法成为完整构造类
    function Obj(teacher, leader) {
        this.teacher = teacher;
        this.leader = leader;
    }

    const Obj = (teacher, leader) => {
        this.teacher = teacher;
        this.leader = leader;
    }

    // 实例验证
    const o1 = new Obj('云隐', '小可');
    console.log(o1);

    // 箭头函数无法构造原型方法
    Obj.prototype.learn = function() {
        console.log(this.teacher, this.leader);
    }
    Obj.prototype.learn = () => {
        console.log(this.teacher, this.leader);
    }
```

### 箭头函数的参数特性 - 无法使用arguments
```js
    const test = function(teacher) {
        console.log(arguments);
    }

    const test = teacher => {
        console.log(arguments);
    }
```
