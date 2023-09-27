const { Compilation } = require("webpack");

class Plugin1 {
    apply(compiler) {
        console.log(compiler.hooks);
        // 不同的声明周期
        compiler.hooks.emit.tap('Plugin1', Compilation => {
            console.log('hooks.emit.tap');
        })
        compiler.hooks.afterEmit.tap('Plugin1', Compilation => {
            console.log('hooks.afterEmit.tap');
        })
        // 不同的函数
        // 处理异步函数
        compiler.hooks.emit.tap('Plugin1', (Compilation, cb) => {
            setTimeout(() => {
                console.log('hooks.emit ASYNC');
                cb();
            }, 1000)
        })
        // 处理promise
        compiler.hooks.emit.tap('Plugin1', Compilation => {
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log('hooks.emit ASYNC');
                    resolve();
                }, 1000)
            })
        })
    }
}

module.exports = Plugin1;