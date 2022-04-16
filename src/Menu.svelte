
<script>

  import { onDestroy, afterUpdate } from 'svelte'
  export let x
  export let y
  export let name
  export let color
  export let content
  export let cancel

  function clickOutside(node) {
    const handleClick = (event) => {
      if (!node.contains(event.target)) {
	node.dispatchEvent(new CustomEvent("outclick"));
      }
    }
    document.addEventListener("click", handleClick)
    return {
      destroy() {
	document.removeEventListener("click", handleClick)
      }
    }
  }

  let menu
  afterUpdate(() => {
    const rect = menu.getBoundingClientRect()
    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight
    if (rect.left + rect.width > width) {
      menu.style.left = `${width - rect.width - 4}px`
    }
    if (rect.top + rect.height > height) {
      menu.style.top = `${height - rect.height - 4}px`
    }
  })
</script>

<div class="background" on:click={cancel}>
  <div class="menu" style:--position-x={x} style:--position-y={y} bind:this={menu}>
    <div class="title" style:--color={color}>{name}</div>
    {#each content as entry}
      {#if entry.type === 'option'}
        <div class="option" on:click={entry.fun}>{@html entry.name}</div>
      {:else if entry.type === 'unavailable'}
        <div class="unavailable">{@html entry.name}</div>
      {:else if entry.type === 'separator'}
        <div class="separator" />
      {/if}
    {/each}
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
  
  div.menu {
    position: fixed;
    left: calc(var(--position-x) * 1px);
    top: calc(var(--position-y) * 1px);
    z-index: 100;
    background-color: white;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  div.title {
    padding: 4px 8px;
    cursor: pointer;
    flex: 1;
    width: calc(100% - 16px);
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    color: white;
    background-color: var(--color);
  }

  div.separator {
    flex: 1;
    height: 1px;
    width: 100%;
    border-top: 1px solid black;
  }

  div.option {
    padding: 4px 8px;
    cursor: pointer;
    flex: 1;
    width: calc(100% - 16px);
    text-align: left;
    white-space: nowrap;
  }

  div.unavailable {
    opacity: 0.5;
    padding: 4px 8px;
    flex: 1;
    width: calc(100% - 16px);
    text-align: left;
    white-space: nowrap;
  }

  div.option:hover {
    background-color: black;
    color: white;
  }

</style>
