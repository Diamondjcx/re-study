<div class="editor" bind:this={ele}>
  {#each $store as option (option.id)}
    <Sharp container={ele} ss={option.style}>
      <svelte:component this={option.c}></svelte:component>
    </Sharp>
  {/each}
</div>

<script>
  import { store } from './store'
  import Sharp from './sharp.svelte';

  let ele = null;
</script>

<style>
  .editor {
    height: 100%;
  }
</style>
