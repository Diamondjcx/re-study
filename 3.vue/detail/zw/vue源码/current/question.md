## 问题1: Vue2 和 Vue3 的区别？
- Vue 3.x 中使用了 Proxy 作为响应式，天生的代理，不用考虑属性重写、数组这些2.x 中hack的情况；
- diff, 增加了最大递增子序列的算法，让我移动节点，更高效；
- 架构采用 monorepo 的方式，分层清晰，同时把编译部分也进行了一些拆解；
- vue3 对编译的内容，进行了重写，template -- render 函数。
    - vue2 正则， vue3 状态机; -- [ast 编译原理]
    - patchFlag, 标记哪些元素包含哪些属性
    - 静态提升
- vue3 使用 blockTree, 对比需要改变的，优化性能，如果你要用 jsx 的写法，就不会优化，但是可以自己去标记。
- ts 重构。
- compiler 拆成了四个包。方便你去重写。
- vue2 options API -- vue3 composition API
- vue3，使用了 rollup 打包，支持 treeshaking。
- 实例化方式也有区别；

## 问题2: Vue2 中如何实现数据响应。
通过 Object.DefineProperty，劫持数据的get 和 set, 结合观察者模式实现

## 问题3: 请写一个观察者模式
```ts
class Subject {
    deps: Array<Observer>;
    state: Number
    constructor() {
        this.deps = [];
        this.state = 0;
    }

    attach(obs: Observer) {
        this.deps.push(obs);
    }
    setState(num: Number) {
        this.state = num;
        this.notifyAllObservers();
    }


    notifyAllObservers():void {
        this.deps.forEach(obs => {
            obs.run(this.state);
        })
    }
}

abstract class Observer {
    subject: Subject;
    constructor(subject: Subject) {
        this.subject = subject;
        this.subject.attach(this);
    };

    abstract run(data: String | Number | undefined): void;
}
class BinaryObserver extends Observer {
    constructor(subject: Subject) {
        super(subject);
    }

    run(data: String | Number | undefined): void {
        console.log("hello, this is binaryObserver:" + data)
    }
    
}

class ArrayObserver extends Observer {
    constructor(subject: Subject) {
        super(subject);
    }

    run(data: String | Number | undefined): void {
        console.log("hello, this is ArrayObserver:" + data)
    }
    
}

// main
const subject = new Subject();
const obs = new BinaryObserver(subject);
subject.setState(10);
subject.setState(15);
```

## 问题4: 请写一个最长上升子序列的算法
```js

function maxUp(arr) {
    if(arr.length === 0) return 0;
    let dp = [];
    let max = 0;
    dp[0] = 1;
    for(let i = 1; i < arr.length; i++) {
        dp[i] = 1;
        for(let j = 0; j < i; j++) {
           if(arr[i] > arr[j]) {
                dp[i] = Math.max(dp[j]+1, dp[i])
           }
        }
        max = Math.max(dp[i],max)
    }
    return max;
}

```

