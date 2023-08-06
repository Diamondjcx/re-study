const { spawn } = require("child_process");
const fs = require("fs");


// 拿到 Packages 下面的所有的文件。
const dics = fs.readdirSync('packages')
    .filter(item => fs.statSync(`packages/${item}`).isDirectory());
// [ 'bar', 'baz', 'foo' ]
async function build(target) {
    // 我们要同时对 foo, bar, baz 三个库打包
    // 子进程。
    const ls = spawn('rollup', ['-c', '--environment', 'TARGET:'+target]);
    // rollup -c --envrionment TARGET:foo;
    // rollup -c --envrionment TARGET:bar;
    // rollup -c --envrionment TARGET:baz;
    ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });
    ls.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });
    ls.on('close', (code) => {
        console.log(`child process exited with the code ${code}`)
    })
}

function runAll(dics) {
    let results = dics.map(build);
    // for(let dic of dics) {
    //     results.push(build(dics));
    // }
    return Promise.all(results);
}

runAll(dics).then(() => console.log("build done"))