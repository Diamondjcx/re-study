const path = require('path');
const resolvePlugin = require('@rollup/plugin-node-resolve').default;

const resolvePath = (file) => path.resolve(__dirname, 'packages', process.env.TARGET, file)
// 我们要拿到每一个packages 下的 package.json
const pkg = require(resolvePath('package.json'));
const options = pkg.buildOptions;

console.log(pkg, options)

const outputConfig = {
    cjs: {
        file: resolvePath(`dist/${process.env.TARGET}.cjs.js`),
        format: 'cjs',
    },
    global: {
        file: resolvePath(`dist/${process.env.TARGET}.global.js`),
        format: 'iife',
    },
    "esm-bundler": {
        file: resolvePath(`dist/${process.env.TARGET}.esm-bundler.js`),
        format: 'esm',
    },
}

function createConfig(output) {
    // 输出就是一个 rollup 的配置
    output.name = options.name;
    return {
        input: resolvePath('src/index.js'),
        output,
        plugins: [
            resolvePlugin()
        ]
    }
}

export default options.formats.map(f => createConfig(outputConfig[f]))