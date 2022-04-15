
<script>

  import { onDestroy } from 'svelte'
  export let name
  export let color
  export let cancel

</script>

<div class="background" on:click={cancel}>
  <div class="frame" on:click|stopPropagation={() => {}}>
    <div class="title" style:--color={color}>{name}</div>
    <slot>
    </slot>
  </div>
</div>
  
<style>
  div.background {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 50;
  }

  div.frame {
    position: fixed;
    left: 25vw;
    right: 25vw;
    top: 25vh;
    z-index: 100;
    background-color: white;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: white;
  }

  div.title {
    padding: 4px;
    cursor: pointer;
    flex: 1;
    width: calc(100% - 8px);
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    color: white;
    background-color: var(--color);
  }

</style>

