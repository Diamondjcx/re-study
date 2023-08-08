## class 助力js更面向对象 - 类
```js
    // 传统对象 - function
    function Course(teacher, course) {
        this.teacher = teacher;
        this.course = course;
    }

    Course.prototype.getCourse = function() {
        return `teacher is:${this.teacher}, course: ${this.course}`
    }

    const course = new Course('云隐', 'ES6');
    course.getCourse();

    // Es6
    class Course {
        // init 实例会默认执行
        constructor(teacher, course) {
            this.teacher = teacher;
            this.course = course;
        }

        // 拓展方法
        getCourse() {
            return `teacher is:${this.teacher}, course: ${this.course}`;
        }
    }
    const course = new Course('云隐', 'ES6');
    course.getCourse();
```

### 追问
### class的类型是？
```js
    console.log(typeOf Course); // function
```

### class的prototype
```js
    console.log(Course.prototype); // 有区分，但本质类型相同
```

### class & 函数对象 属性
```js
    console.log(course.hasOwnProperty('teacher')); // true
```

### 属性定义 构造器 & 顶层定义 两种定义方式
```js
    class Course {
        // init 实例会默认执行
        constructor(teacher, course) {
            this.teacher = teacher;
            this.course = course;
        }

        // 拓展方法
        getCourse() {
            return `teacher is:${this.teacher}, course: ${this.course}`;
        }

        get teacher() {
            // 留有空间
            return this.teacher;
        }

        set teacher(val) {
            // 留有空间
            this.teacher = val;
        }
    }

    // 意义何在？
    // 1. js如何建立只读变量
    class Course {
        // init 实例会默认执行
        constructor(teacher, course) {
            this._teacher = teacher;
            this.course = course;
        }

        // 拓展方法
        getCourse() {
            return `teacher is:${this.teacher}, course: ${this.course}`;
        }

        get teacher() {
            // 留有空间
            return this._teacher;
        }
    }
    // 修改只读变量，会报错么 - 无法改变但是不会报错

    // 2. js如何建立一个私有属性
    class Course {
        constructor(teacher, course) {
            this._teacher = teacher;

            // 在constructor作用域内定义一个局部变量
            let _course = 'es6';
            // 内部通过闭包的形式去暴露该变量
            this.getCourse = () => {
                return _course;
            }
        }
    }

    class Course {
        #course = 'es6';
        constructor(teacher, course) {
            this._teacher = teacher;
        }
        get course() {
            return this.#course;
        }
        set course(val) {
            if(val) {
                this.#course = val;
            }
        }
    }

    // 3. 封装核心 - 适配器模式
    // 底层封装中台业务core
    class utils {
        constructor(core) {
            this._main = core;
            this._name = 'my-utils';
            this._id = 'zhaowa专有';
        }

        // fullName: {firstName: '', lastName: '', name: ''}
        get name() {
            return {
                ...this._main.fullName,
                ...{
                    name: `utils is ${this._name}`
                }
            }
        }
        get id() {
            return {
                ...this._main.id,
                id: this._id
            }
        }
        set name(val) {
            // valid saftey
            this._name = val;
        }
    }
```

### 静态方法 - 直接挂载在类上的方法无需实例化获取
```js
    // ES5 
    function Course() {
        // ……
    }
    Course.ring = function() {
        // ……
    }

    // ES6
    class Course {
        constructor() {
            //……
        }

        static ring() {
            //……
        }
    }

    Course.ring();
    // 全局对象变量问题
```

### 继承 
```js
    // es5继承
    function Course() {
        // ……
    }
    Course.ring = function() {
        // ……
    }
    Course.prototype.send = function() {
        // ……
    }

    function Child() {
        Course.call(this, '云隐', 'ES6');
        this.run = function() {
            // ……
        }
    }
    Child.prototype = Course.prototype;

    // es6
    class Course {
        constructor() {
            //……
        }
        static ring() {}
        send() {}    
    }
    // => 工厂模式
    class Child extends Course {
        constructor() {
            super('云隐', 'ES6')
        }
        run() {}
    }
```