<template>
  <div>
    <div>{{inputval}}</div>
    <input type="text"
           :value='inputval'
           @input="handleInput">
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputval: '',
    }
  },
  methods: {
    handleInput(e) {
      this.inputval = e.target.value
    },
  },
}
</script>

<style >
</style>