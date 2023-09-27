<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- 面试题 -->
    <!-- 计算类型 -->
    1. 绑定数据的计算可以写在花括号里吗？
    <h1>number+1:{{ number + 1 }}</h1>
    2. 截断
    <h1>{{ msg.slice(0, -1) }}</h1>
    3. 浮点数
    <h1>{{ number.toFixed(2) }}</h1>
    4. 转整形
    <h1>{{ parseInt(number, 10) }}</h1>

    <!-- 加工类型 -->
    5. 函数加工
    <h1>{{ calcNumber(number) }}</h1>

    <!-- 条件类型 -->
    6. 三元运算
    <h1>100>99:{{ 100 > 99 ? "对" : "错" }}</h1>
    7. 逻辑运算
    <h1>100>99&&100>98:{{ 100 > 99 && 100 > 98 }}</h1>
    8. 取反
    <h1>{{ !number }}</h1>
    9. 变量判断
    <h1>{{ number > 80 ? "大于" : "小于" }}</h1>

    <h2>Essential Links</h2>
    <h2 @click="number++">Essential Links {{ number }}</h2>
    <h2>{{ addMsg }}</h2>
    <h2>{{ number2 }}</h2>
    <zhaowa></zhaowa>
    <!-- 动态组件 -->
    <component :is="currentComponent"></component>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank"> Core Docs </a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank"> Forum </a>
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank"> Community Chat </a>
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank"> Twitter </a>
      </li>
      <br />
      <li>
        <a href="http://vuejs-templates.github.io/webpack/" target="_blank">
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a href="http://router.vuejs.org/" target="_blank"> vue-router </a>
      </li>
      <li>
        <a href="http://vuex.vuejs.org/" target="_blank"> vuex </a>
      </li>
      <li>
        <a href="http://vue-loader.vuejs.org/" target="_blank"> vue-loader </a>
      </li>
      <li>
        <a href="https://github.com/vuejs/awesome-vue" target="_blank">
          awesome-vue
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import zhaowa from "./zhaowa.vue";
import zhaowa2 from "./zhaowa2.vue";
import zhaowa3 from "./zhaowa3.vue";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      number: 100,
      number2: 0,
    };
  },
  computed: {
    addMsg() {
      return this.msg + this.number;
    },
    currentComponent() {
      return this.number2 > 3 ? "zhaowa3" : "zhaowa2";
    },
  },
  watch: {
    number() {
      this.number2++;
    },
  },
  methods: {
    calcNumber(num) {
      return num + 2;
    },
  },
  components: {
    zhaowa,
    zhaowa2,
    zhaowa3,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
