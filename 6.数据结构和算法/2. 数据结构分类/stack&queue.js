// 栈与队列
// 执行顺序： 栈 - 先入后出； 队列 - 先入先出； => 薯片桶 vs 饮水机纸杯

// 面试题2 - 实现一个栈
class Stack {
    constructor() {
        this.items = [];
    }

    push(element) {
        this.items.push(element);
    } // 添加新元素到栈顶

    pop() {
        return this.items.pop();
    } // 移出栈顶元素
    
    peek() {
        return this.items[this.items.length - 1];
    } // 返回栈顶的元素

    isEmpty() {
        return this.items.length === 0;
    } // 判断当前栈是否为空

    clear() {
        this.items = [];
    } // 移除栈里所有元素

    size() {
        return this.items.length;
    } // 有多少薯片
}

// 拓展
// 栈类型特点，中间无法操作，只顾首尾的，通常都是栈

// 判断括号有效自闭合问题
// input string; '{}[]' - true; '{{}[]' - false; '[{()}]' - true

// 算法流程
// 1. 需要什么数据结构、满足模型的数据 - 构造变量 & 常量
// 2. 运行方式 简单条件执行、遍历、递归……… - 算法主体结构
// 3. 确定输入 & 输出 - 确定入参和return

const isValid = function(s) {
    // 1 - 栈 + hashMap
    const stack = new Stack();
    const map = {
        '}': '{',
        ']': '[',
        ')': '('
    }

    // 2 - 遍历
    for(let i = 0; i < s.length; i++) {
        const char = s[i];
        stack.push(char);

        if(stack.size < 2) continue;

        const theLastOne = stack[stack.size - 1];
        const theLastTwo = stack[stack.size - 2];

        if (map[theLastOne] === theLastTwo) {
            stack.pop();
            stack.pop();
        }
    }

    return stack.size === 0;
}
