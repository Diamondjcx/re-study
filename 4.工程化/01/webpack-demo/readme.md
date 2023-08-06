# webpack
## 起步
## 管理资源
## 管理输出
## 开发环境
- source map 排查错误
- 代码发生变化之后的行为
  - 自动检测变化的代码，自动进行编译
  ```javascript
  "watch": "webpack --watch",
  ```
  - 自动检测变化的代码，自动进行编译之后，自动刷新浏览器 webpack-dev-server
  ```javascript 
  webpack-dev-server
  ```
  - 把webpack处理过的文件发送到server上
  ```javascript 
  webpack-dev-middleware
  ```
