// 贪婪 - 利益最大化，始终查找最大项目，尽可能快地去满足需求

// 给定一个整数数组nums，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和
// [1, 2, 3, 4, -4, 3, 6] => 10


// 1. 最大子序列和为sum，结果是ans
// 2. 遍历 => 判断sum是否有buff => 如果没有直接抛弃 => 比较sum和ans
// 3. nums => ans

const maxSubArray = function(nums) {
    let ans = nums[0];
    let sum = 0;

    for(const num of nums) {
        if(sum > 0) {
            sum += num;
        } else {
            sum = num;
        }
        ans = Math.max(ans, sum);
    }
    return ans;
}