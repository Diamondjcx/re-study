// 分治法 DC
// 工作原理： 找到基线条件 => 不断分解问题 => 直到符合基线条件得出题干解

// 1. 基线分割 2. 完成单个模块功能 3. 递归
const quickSort = function(arr) {
    // 检测
    if (arr.length <= 1) {
        return arr;
    }
    
    // 绝对的二分之一
    let pivotIndex = Math.floor(arr.length / 2);
    let pivot = arr.splice(pivotIndex, 1)[0];
    let left = [];
    let right = [];

    for(let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return quickSort(left).concat([pivot], quickSort(right));
}

// 线性 => 非线性