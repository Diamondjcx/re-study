// module.exports = function(content, map, meta) {
//     console.log('im loaderA');

//     return content;
// }

module.exports.pitch = function () {
    console.log('pitch A');
}
// 同步方式
module.exports = function(content, map, meta) {
    console.log('im loaderA');
    // ……
    this.callback(null, content, map, meta);
}
