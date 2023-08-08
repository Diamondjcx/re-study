compiler

webpack.config.js:  视为 options
```
const webpack = require('webpack')

const compiler = webpack(options);

options.plugins.map(plugin => {
  plugin.apply(compiler)
})

compiler.run();

```

compilation

每次更新文件时，都会创建一个任务，这个任务就是 compilation 
```
import { Button } from 'antd'

=> 

import Button from 'antd/dist/Button'
```