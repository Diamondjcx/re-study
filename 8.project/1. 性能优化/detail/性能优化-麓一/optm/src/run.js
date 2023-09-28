const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLaucher = require('chrome-launcher');

(
    async () => {
        // 启动一个 Chrome
        const chrome = await chromeLaucher.launch();
        const options = {
            logLevel: 'info',
            output: 'html',
            onlyCategories:['performance'],
            port: chrome.port
        }
        // 使用 Lighthouse 对页面进行一个计算
        const res = await lighthouse('https://www.baidu.com/', options);
        const { report } = res;
        // 对报告写入文件
        fs.writeFileSync('repost.html', report);
        console.log('Report is done for ', res.lhr.finalUrl);
        await chrome.kill();
    }
)()