<template>
  <!-- <teleport to="html"> -->
  <body
    class="full-adapter"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      transform: `scale(${scale})`,
    }"
  >
    <div v-if="loading" class="full-adapter__loading">
      <n-spin size="large" />
    </div>
    <div v-else class="full-adapter-container">
      <slot />
    </div>
  </body>
  <!-- </teleport> -->
</template>
  <script setup>
import { useMessage } from "naive-ui";
import { computed, onMounted, onUnmounted, ref } from "vue";
window.$message = useMessage();
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  width: {
    type: Number,
    default: 1920,
  },
  height: {
    type: Number,
    default: 1080,
  },
  bgStyle: {
    type: Object,
    default: () => {},
  },
  mode: {
    validator: (val) => {
      return ["widthFix"].includes(val);
    },
    default: "widthFix",
  },
  bgColor: {
    type: String,
    default: "",
  },
});
/**缩放指数 */
const scale = ref(1);
const setScale = () => {
  const { innerHeight, innerWidth } = window;
  const w_scale = innerWidth / props.width;
  const h_scale = innerHeight / props.height;
  const result = w_scale < h_scale ? w_scale : h_scale;
  const { mode } = props;
  switch (mode) {
    case "widthFix":
      scale.value = Number(w_scale);
      break;
    default:
      scale.value = Number(result);
  }
};
const setHtmlClassName = (className) => {
  const html = document.querySelector("html");
  html && html.setAttribute("class", className);
};
setScale();
onMounted(() => {
  setHtmlClassName("no-scrollbar");
  window.onresize = function () {
    setScale();
  };
});
onUnmounted(() => {
  setHtmlClassName();
  window.onresize = () => {};
});
</script>
  <style lang="scss" scoped>
.full-adapter {
  transition: 0.1s;
  transform-origin: left top;
  overflow: hidden;
  &-container {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }
}
</style>
  <style lang="scss">
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  body {
    background-color: #0f1420 !important;
  }
}
</style>
  