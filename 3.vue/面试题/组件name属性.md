增加 name 选项会在 components 属性中增加组件本身，实现组件的递归调用。
可以标识组件的具体名称方便调试和查找对应组件。
$children.filter(fitem=>item.$options.name === 'xxx)
Sub.options.components Iname] = Sub； //子组件会通过 name 属性，将自己也注册到组件中
