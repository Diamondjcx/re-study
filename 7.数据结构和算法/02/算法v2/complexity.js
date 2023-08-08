// 算法复杂度 - 时间复杂度、空间复杂度

// 时间复杂度
// 1. 循环次数 - 循环次数最多的代码块
// 2. 最大值原则 - 多个循环同时存在，总复杂度等于最大代码块的复杂度
// 3. 乘法原则 - 嵌套循环的复杂度等于嵌套内外代码复杂度的乘积

function total(n) {
    let sum = 0;                      // t

    for (let i = 0; i < n; i++) {     // nt
        sum += i;                     // nt
    }
    return sum;                       // t
}

// 执行了 t + nt + nt + t = 2(n + 1)t 时间

function total2(n) {
    let sum = 0;                        // t

    for (let i = 0; i < n; i++) {       // nt
        for (let j = 0; j < n; j++) {   // n*n*t
            sum = sum + i + j;          // n*n*t
        }
    }
    return sum;                         // t
}
// 执行了 t + nt + n*n*t + n*n*t + t = (2n*n + n + 2)t 时间
// n => 无穷大；
// total => n; total2 => n*n => O(n)、O(n*n)

// 常数阶O(1)
// 线性阶O(n)
// 对数阶O(logN)
// 平方阶O(n*n)
// k次方阶O(n^k)

// 1
const sum_plus = function() {
    let i = 1;
    let j = 2;
    ++i;
    j++;
    return i + j;
}
// O(1)

// 2
const foo2 = function(n) {
    for(let i = 1; i <= n; ++i) {
        let j = i;
        j++;
    }
}
// O(n)

// 3
const foo3 = function(n) {
    let i = 1;
    while(i < n) {
        i = i * 2;
    }
}
// i 等比变化 2^n
// 2 的 x次方等于n，x = log2^n
// 循环log2^n次之后，跳出
// O(logN)

// 4
const foo4 = function(n) {
    for (let m = 1; m < n; m++) {
        let i = 1;

        while(i < n) {
            i = i * 2;
        }
    }
}
// O(nlogN)

// 5
const foo5 = function(n) {
    let sum = 0;                        // t

    for (let i = 0; i < n; i++) {       // nt
        for (let j = 0; j < n; j++) {   // n*n*t
            sum = sum + i + j;          // n*n*t
        }
    }
    return sum;                         // t
}
// O(n * n)

// 面试
// 1. 解决一个问题 => 2.对你的方案产生质疑 => 3. 优化 => 4. 优化实施

// 空间复杂度
// 常量
let j = 0;
for (let i = 0; i < n; i++) {
    j++;
}

// o{1}

// 线性增长
j = [];
for (let i = 0; i < n; i++) {
    j.push(i);
}

// o{n}

// log增长