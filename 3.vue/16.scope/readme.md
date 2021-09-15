1. scoped style标签上一个特殊属性，当一个style标签拥有scoped属性时，它的css样式只能用于当前Vue组件，可以使组件样式不相互污染，样式模块化
2. scope实现原理
Vue中的scope属性的效果主要是通过PostCss实现的
```css
<style scoped>
    .example{
        color:red;
    }
</style>
<template>
    <div>scoped测试案例</div>
</template>
```
转义后

```css
.example[data-v-5558831a] {
  color: red;
}
<template>
    <div class="example" data-v-5558831a>scoped测试案例</div>
</template>
```
给一个组件中的所有dom添加了一个独一无二的动态属性，给css选择器额外添加一个对应属性选择器，来选择组件中的dom