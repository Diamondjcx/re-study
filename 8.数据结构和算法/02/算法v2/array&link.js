// 数组 & 链表
// 数组 - 可以迅速通过索引来定位到其中某一个节点的位置
// 链表 - 通过前一个元素指向下一个元素地址，需要前后依赖

// 查找：数组 - 效率高； 链表 - 关系型查找； => 对比查找效率
// 插入：数组 - 影响较大；链表 - 链表做单个节点的插入操作，合适 => 中途加入问题

// 面试题 - 实现链表 - head开始，null结束
// head => node1 => node2 => ... => noden => null
class LinkedList {
    constructor() {
        this.length = 0;
        this.head = null;
    }
    // 基础方法
    getElementAt(position) {
        // 预判校验
        if (position < 0 || position >= this.length) return null;

        let _current = this.head;
        for(let i = 0; i < position; i++) {
            _current = _current.next;  // 标准节点实例
        }
        return _current;
    } // 获取元素

    append(element) {} // 快速添加节点
    insert(position, element) {} // 指定位置插入节点
    removeAt(position) {} // 删除指定位置的节点
    indexOf(element) {} // 索引
}

class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
        // this.prev = null; // 双向链表
    }
}

// 实现链表尾部插入添加
append(element) {
    let node = new Node(element);

    // 预判校验
    if (this.head === null) {
        // 空链表
        this.head = node;
    } else {
        // 找尾巴
        let _current = this.getElementAt(this.length - 1);

        _current.next = node;
    }
}

// 指定位置插入指定元素
insert(position, element) {
    // 预判校验
    if (position < 0 || position >= this.length) return false;

    let node = new Node(element);

    if (position === 0) {
        node.next = this.head;
        this.head = node;
    } else {
        let _previous = this.getElementAt(position - 1);

        node.next = _previous.next;
        _previous.next = node;
    }

    this.length++;
    return true;
}

removeAt(position) {
    // 预判校验
    if (position < 0 || position > this.length) return null;

    let _current = this.head;

    // 头校验
    if(position === 0) {
        this.head = _current.next;
    } else {
        let _previous = this.getElementAt(position - 1);
        
        _current = _previous.next;
        _previous.next = _current.next;
    }

    this.length--;
    return _current.element;
}

indexOf(element) {
    let _current = head;

    for(let i = 0; i < this.length; i++) {
        if(_current.element === element) return i;

        _current = _current.next;
    }

    return -1;
}

// remove、isEmpty、size、getHead、clear - 补充完整操作

// 双向链表
// head <=> node1 <=> node2 <=> …… <=> null(tail)
// tail 、 prev
class DoubleLink extends LinkedList {
    // ……
}
