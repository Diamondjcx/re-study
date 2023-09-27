
function isObject(data) {
    return data && typeof data === 'object';
}

let targetMap = new WeakMap();
// 在 Vue2 的时候，我是不是有一个“全局变量”，叫做 Dep.target -- watcher
// 我们还要有这么一个全局变量，来存放这么个东西。 effect 副作用。
let activeEffect;


// new WeakMap<any, KeyToDepMap>()
/**
 * targetMap
 * {
 *    target: { // Map()
 *      key: // Set()
 *          [ReactiveEffect, ReactiveEffect, ...]
 *    }
 * }
 * 
 */
// 进行依赖的收集
function track(target, key) {
    let depsMap = targetMap.get(target);
    if(!depsMap) targetMap.set(target, (depsMap = new Map()));
    // 在判断 depsMap 中有没有key
    let dep = depsMap.get(key);
    if(!dep) depsMap.set(key, (dep = new Set()));
    trackEffect(dep);
}

function trackEffect(dep) {
    // 相当于 Dep.target && dep.add(Dep.target);
    if(!dep.has(activeEffect)) dep.add(activeEffect); 
}

// 触发
function trigger(target, key) {
    const depsMap = targetMap.get(target);
    if(!depsMap) return ;
    // effect 上面肯定有一个 run 方法。
    depsMap.get(key).forEach(effect => effect && effect.run())
}

// const reactiveData = reactive({message: "hello", num: 0});
// reactiveData.message
export function reactive(data) {
    if(!isObject(data)) return;
    return new Proxy(data, {
        get(target, key, receiver) {
            const ret = Reflect.get(target, key, receiver);
            track(target, key);
            return isObject(ret) ? reactive(ret): ret;
        },
        set(target, key, value, receiver) {
            Reflect.set(target, key, value, receiver);
            trigger(target, key);
            return true;
        },
        deleteProperty(target, key) {
            const ret = Reflect.deleteProperty(target, key);
            trigger(target, key);
            return ret;
        },
        has(target, key) {
            track(target, key);
            const ret = Reflect.has(target, key);
        },
        ownKeys(target) {
            track(target);
            return Reflect.ownKeys(target);
        }
    })
}

// const num = ref(0);
// num.value
// react: useRef();
export function ref(init) {
    class RefImpl {
        constructor(init) {
            this.__value = init;
        }
        get value() {
            track(this, "value");
            return this.__value;
        }
        set value(newVal) {
            this.__value = newVal;
            trigger(this, "value");
        }
    }
    return new RefImpl(init);
}

// 我在定义一个 effect 的函数中，第一个参数是一个函数；
// 如果这个函数中，有使用 ref/reactive 
// effect(() => {
//    console.log(num.value)
// })
function effect(fn, options={}) {
    let __effect = new ReactiveEffect(fn);
    if(!options.lazy) {
        __effect.run();
    }
    return __effect;
}

// const m = computed(() => `${num.value}!!!!!`);

export function computed(fn) {
    // 只考虑函数的情况
    let __computed;
    const e = effect(fn, {lazy: true});
    __computed = {
        get value() {
            return e.run();
        }
    }
    return __computed;

}

export function mount(instance, el) {
    effect(function() {
        instance.$data && update(instance, el);
    })
    instance.$data = instance.setup()
    update(instance, el);
    function update(instance, el) {
        el.innerHTML = instance.render();
    }
}

class ReactiveEffect {
    constructor(fn) {
        this.fn = fn;
    }
    run() {
        activeEffect = this;
        return this.fn();
    }
}
