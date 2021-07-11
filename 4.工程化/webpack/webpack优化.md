## 优化开发体验

dev-server

- 提升效率

- 优化构建速度

- 优化使用体验

## 优化输出质量

- 优化要发布到线上的代码，减少用户能感知到的加载时间

- 提升代码性能，性能好，执行就快

### 缩⼩搜索 Loader 的⽂件范围

优化 loader 配置
test include exclude 三个配置项来缩⼩ loader 的处理范围
推荐 include

### 优化 resolve.modules 配置

resolve.modules ⽤于配置 webpack 去哪些⽬录下寻找第三⽅模块，默认是['node_modules']

### 优化 resolve.alias 配置

resolve.alias 配置通过别名来将原导⼊路径映射成⼀个新的导⼊路径

### 优化 resolve.extensions 配置

resolve.extensions 在导⼊语句没带⽂件后缀时，webpack 会⾃动带上后缀后，去尝试查找⽂件是否存
在。

后缀尝试列表尽量的⼩
导⼊语句尽量的带上后缀。

### 使⽤ externals 优化 cdn 静态资源

我的 bundle ⽂件⾥，就不⽤打包进去这个依赖了，体积会⼩

### 使⽤静态资源路径 publicPath(CDN)

CDN 通过将资源部署到世界各地，使得⽤户可以就近访问资源，加快访问速度。要接⼊ CDN，需要把⽹
⻚的静态资源上传到 CDN 服务上，在访问这些资源时，使⽤ CDN 服务提供的 URL。

### css ⽂件的处理

- 使⽤ less 或者 sass 当做 css 技术栈
- 使⽤ postcss 为样式⾃动补⻬浏览器前缀

如果不做抽取配置，我们的 css 是直接打包进 js ⾥⾯的，我们希望能单独⽣成 css ⽂件。 因为单独⽣
成 css,css 可以和 js 并⾏下载，提⾼⻚⾯加载效率

### 借助 MiniCssExtractPlugin 完成抽离 css

### 压缩 css

借助 optimize-css-assets-webpack-plugin
借助 cssnano

### 压缩 HTML

借助 html-webpack-plugin

### 图⽚优化

image-webpack-loader

### development vs Production 模式区分打包

基于环境变量区分 cross-env

### tree Shaking

Css tree shaking

glob-all purify-css purifycss-webpack

JS tree shaking:只⽀持 import ⽅式引⼊，不⽀持 commonjs 的⽅式引⼊

### 代码分割 code Splitting

单⻚⾯应⽤ spa：
打包完后，所有⻚⾯只⽣成了⼀个 bundle.js
代码体积变⼤，不利于下载
没有合理利⽤浏览器资源

多⻚⾯应⽤ mpa:
如果多个⻚⾯引⼊了⼀些公共模块，那么可以把这些公共的模块抽离出来，单独打包。公共代码只需要
下载⼀次就缓存起来了，避免了重复下载。
