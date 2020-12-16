function Compile(el) {
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    if ($el) {
        this.$fragment = this.node2Fragment(this.$el);
        this.init();
        this.$el.appendChild(this.$fragment);
    }
}

Compile.prototype = {
    init: function() {
        this.complieElement(this.$fragment);
    },
    node2Fragment: function(el) {
        var fragment = document.createDocumentFragment(), child;
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    },
    complieElement: function(el) {
        var childNodes = el.childNodes;
        var me = this;
        [].slice.call(childNodes).forEach(function(node) {
            var text = node.textContent;
            var reg = /\{\{(.*)\}\}/;
            if (me.isElementNode(node)) {
                me.compile(node)
            } else if (me.isTextNode(node) && reg.test(text)) {
                me.compileText(node, RegExp.$1);
            }
            if (node.childNodes && node.childNodes.length) {
                me.complieElement(node)
            }
        })
    },
    compile: function() {
        var nodeAttrs = node.attributes;
        var me = this;
        [].slice.call(nodeAttrs).forEach((attr) => {
            // 指令以v-xxx命名
            var attrName = attr.name;
            if (me.isDirective(attrName)) {
                var exp = attr.value;
                var dir = attrName.substring(2)
                if (me.isEventDirective(dir)) {
                    // 事件指令v-on:clikc
                    compileUtil.eventHandles(node, me.$vm, exp, idr)
                } else {
                    // 普通指令
                    complirUtil[dir] &&compileUtil[dir](node, me.$vm, exp)
                }
            }
        })
    }
}

var compileUtil = {
    text: function(node, vm, exp) {
        this.bind(node, vm, exp, 'text')
    },
    bind: function(node, vm, exp, dir) {
        var updaterFn = updater[dir + 'Updater'];
        updaterFn && updaterFn(node, vm[exp]);
        new Watcher(vm, exp, function(value, oldValue){
            updaterFn && updaterFn(node, value, oldValue)
        })
    }
};

var updater = {
    textUpdater: function() {
        node.textContent = typeof value === 'undefined' ? '':value
    }
}