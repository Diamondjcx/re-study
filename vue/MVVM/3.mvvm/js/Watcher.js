Watcher.prototype = {
    update: function() {
        this.run();   // 属性值变化受到通知
    },
    run: function(){
        var value = this.get();
        var oldVlue = this.value;
        if (value !==oldVlue) {
            this.value = value;
            this.cb.call(this.vm, value, oldVlue)
        }
    },
    get: function() {
        Dep.target = this;
        this.value = this.vm[exp]; // 会触发属性的getter，从而添加订阅者
        Dep.target = null;
        return value;
    }
}

function Watcher(vm, exp, cb) {
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    this.value = this.get();
}