import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

module.exports = {
    input: "./src/index.js",
    output: {
        file:'./dist/bundle.js',
        format: 'iife',
        name:'optm',
    },
    plugins: [
        babel({
            exclude: "node_modules/**"
        }),
        
        // 热更新 默认监听根文件夹
        livereload(),
        
        // 本地服务器
        serve({
            open: true, // 自动打开页面
            port: 8000,
            openPage: '/index.html', // 打开的页面
            contentBase: ''
        })
    ]
}