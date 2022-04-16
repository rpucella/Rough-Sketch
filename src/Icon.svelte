<script>

  // Icons:
  //
  //   https://www.svgrepo.com/collection/handy-icon-collection/
  //   https://github.com/djamshed/rough-awesome-font/


  export let width = '2em'
  export let src
  export let clickFn = undefined
  export let href = undefined
  
</script>

{#if clickFn}
  <img class="icon active" src={src} style="width: {width}" on:click={clickFn}>
{:else if href}
  <a href={href} target="_blank"><img class="icon active" src={src} style="width: {width}"></a>
{:else}
  <img class="icon" src={src} style="width: {width}">
{/if}
  
<style>
  img.icon {
    flex: 1;
    margin: 12px 8px;
    opacity: 0.3;
  }

  img.active {
    cursor: pointer;
    opacity: 1;
  }

  img.active:hover {
    opacity: 1;
  }
</style>

