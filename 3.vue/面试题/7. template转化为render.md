template 如何转换为 render（构建过程中编译的）

vue 编译器会先对 template 进行解析 parse，结束之后会得到一个 js 对象----AST 抽象语法树，遍历语法树，标记静态节点
transform 将 AST 生成为 js 代码也就是 render 函数

执行时机：
webpack 预打包环境
自带编译器的 组件创建运行阶段

1. 将 template 模板转换成 ast 语法树 - parserHTML
2. 对静态语法做静态标记• markup diff 来做优化的 静态节点跳过 diff 操作
3. 重新生成代码 - codeGen （with new）
