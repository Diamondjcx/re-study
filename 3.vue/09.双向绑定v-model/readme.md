input 的 oninput 事件和 value

```html
<div>
  <input :value="value" @input="onInput" v-bind="$attrs" />
</div>
```

```js
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
    },
  },
}
```
