// 哈希 - 快速匹配定位
// 面试题 - 罗马字转数字
// 字符 数值
// I  1
// II 2
// V  5
// X  10
// L  50
// C  100
// D  500
// M  1000
// 'III' 3
// 'VI' 5 + 1
// 'VII' 5 + 1 + 1
// 'IV' 1 => 5 - 1 = 4

// 算法流程
// 1. 需要什么数据结构、满足模型的数据 - 构造变量 & 常量
// 2. 运行方式 简单条件执行、遍历、递归……… - 算法主体结构
// 3. 确定输入 & 输出 - 确定入参和return

const MAP = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
}

// 'IV' - 4  'VI' - 6

const romanToInt = function(s) {
    let len = s.length;
    let max = 0;
    let res = 0;

    while(len--) {
        let num = MAP[s[len]];

        if (max > num) {
            res -= num;
            continue;
        };
        max = num;
        res += num;
    }

    return res;
}

