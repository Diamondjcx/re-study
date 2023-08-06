// module.exports = function(content, map, meta) {
//     console.log('im loaderB');

//     return content;
// }

module.exports.pitch = function () {
    console.log('pitch B');
}

// 异步方式
module.exports = function(content, map, meta) {
    console.log('im loaderB');
    
    const callback = this.async();

    setTimeout(() => {
        callback(null, content);
    }, 1000);
}