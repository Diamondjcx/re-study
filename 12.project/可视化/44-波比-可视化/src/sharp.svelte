<!-- 包一层，吸附对齐 -->

<div
  class="sharp"
  on:mousedown={handleMouseDown}
  style={getStyleStr({...ss, ...pos})}
  bind:this={el}
>
  <slot />
</div>

<script>
  import { RefLine } from './ref-line'
  export let ss = {}
  export let container = null
  let pos = {}
  let el = null

  const rl = new RefLine();

  function getStyleStr(styles = {}) {
    return Object.keys(styles).map(s => `${s}: ${styles[s]}px`).join(';')
  }

  function handleMouseDown(e) {
    if (!e || !container) return
    const { x, y } = container.getBoundingClientRect()
    const move = me => {
      const cx = me.clientX
      const cy = me.clientY

      pos = {
        top: cy - y,
        left: cx - x
      }

      requestAnimationFrame(() => rl.check(el, '.sharp', document.querySelector('.center')));
    }

    const up = me => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
      rl.uncheck();
    }

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  }
</script>

<style>
  .sharp {
    position: absolute;
  }
</style>
