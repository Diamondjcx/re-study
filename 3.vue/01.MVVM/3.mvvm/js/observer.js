// 对每个属性进行劫持
var data = {name: 'kindeng'};
observe(data);
// data.name = 'dmq';

function observe(data) {
    if (!data || typeof data !== 'object') {
        return;
    }
    Object.keys(data).forEach((key) => {
        defineReactive(data, key, data[key]);
    })
}

function Dep() {
  this.subs = [];
}

Dep.prototype.addSub = function (sub) {
  this.subs.push(sub);
};
Dep.prototype.notify = function () {
  this.subs.forEach(sub => sub.update());
};

function defineReactive(data, key, val) {
    // 消息订阅器
    var dep = new Dep();
    observe(val);
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: false,
        get: function() {
            // 添加订阅者
            Dep.target && dep.addDep(Dep.target)
            return val;
        },
        set: function(newVal) {
            console.log('监听到值变化了', val, '...>', newVal);
            val = newVal;
            dep.notify()
        }
    })
}

// 消息订阅器，用来收集订阅者，数据变动触发notify，再调用订阅者的update方法

