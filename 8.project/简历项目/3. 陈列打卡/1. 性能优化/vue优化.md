### 路由懒加载

```js
const router = new VueRouter({
  routes: [{ path: "/foo", component: () => import("./Foo.vue") }],
});
```

### keep-alive 缓存页面

### 使用 v-show 复用 DOM

### v-for 遍历避免同时使用 v-if

### 长列表性能优化

- 如果列表是纯粹的数据展示，不会有任何改变，就不需要做响应
  化

```js
export default {
  data: () => ({
    users: [],
  }),
  async created() {
    const users = await axios.get("/api/users");
    this.users = Object.freeze(users);
  },
};
```

- 如果是大数据长列表，可采用虚拟滚动，只渲染少部分区域的内容

```html
<recycle-scroller class="items" :items="items" :item-size="24">
  <template vslot="{ item }">
    <FetchIte mView :item="item" @vote="voteItem(item)" />
  </template>
</recycle-scroller>
参考 vue-virtual-scroller、vue-virtual-scroll-list
```

### 事件的销毁

Vue 组件销毁时，会自动解绑它的全部指令及事件监听器，但是仅限于组件本身的事件。

```html
created() { this.timer = setInterval(this.refresh, 2000) }, beforeDestroy() {
clearInterval(this.timer) }
```

### 图片懒加载

对于图片过多的页面，为了加速页面加载速度，所以很多时候我们需要将页面内未出现在可视区
域 内的图片先不做加载， 等到滚动到可视区域后再去加载。vue-lazyload

### 第三方插件按需引入

### 无状态的组件标记为函数式组件

### 子组件分割

### 变量本地化 computed
