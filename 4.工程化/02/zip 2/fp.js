// 实现一个方法，对一个数组：
// 不考虑输入参数的校验，
// 返回一个新数组，其中可以去零，每一位乘以2

// function generateArray(num) {
//     return function(flag) {
//         return function(arr) {
//             let res = [];
//             for(let i = 0; i < arr.length; i++) {
//                 if(arr[i] || flag) res.push(arr[i] * num)
//             }
//             return res;
//         }
//     }
// }

// const generateArray2 = generateArray(2)

// const generateArray3 = generateArray(3)

// let arr = [0,1,2,3,4,5]; ......pipe....... dest.
// console.log(generateArray3(arr));

// const generateArray = (arr) => arr.filter(Boolean).map(item => item*2);
// const generateArray = (num) => (arr) => arr.filter(Boolean).map(item => item * num);

const filterBoolean = arr => arr.filter(Boolean);
const filterBigger = num => arr => arr.filter(item => item <= num);
const filerBigger10 = filterBigger(10);

const multiply = num => arr => arr.map(item => item * num);
const multiplyTwo = multiply(2);

const compose = (...rest) => startNum => rest.reduce((total, item) => item(total),startNum);

const modifyArr2 = compose(filterBoolean, multiplyTwo, filerBigger10);

let arr = [0,1,2,3,4,5,6];
console.log(modifyArr2(arr));



