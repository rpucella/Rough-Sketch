<script>

  // Icons:
  //   https://www.svgrepo.com/collection/handy-icon-collection/
  //

  export let width = '2em'
  export let src
  export let clickFn = undefined
  
</script>

{#if clickFn}
  <img class="icon active" src={src} style="width: {width}" on:click={clickFn}>
{:else}
  <img class="icon" src={src} style="width: {width}">
{/if}
  
<style>
  img.icon {
    flex: 1;
    padding: 8px 8px;
    opacity: 0.3;
  }

  img.active {
        cursor: pointer;
  }

  img.active:hover {
    opacity: 1;
  }
</style>

