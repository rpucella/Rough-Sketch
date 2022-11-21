
<script>

  import { onDestroy, afterUpdate } from 'svelte'
  
  import Icon from './Icon.svelte'
  
  export let x
  export let y
  export let name
  export let color
  export let content
  export let cancel

  const inner = 20
  const outer = 60
  const size = outer * 2
  const center = size / 2

/* No longer seems used
   
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
*/
  
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

  const pi = 3.1415921
  let positions = []
  for (let i = 0; i < content.length; i++) {
    const x = Math.cos(2 * i * pi / content.length)
    const y = Math.sin(2 * i * pi / content.length)
    const xnext = Math.cos(2 * (i + 1) * pi / content.length)
    const ynext = Math.sin(2 * (i + 1) * pi / content.length)
    content[i].x= x
    content[i].y = y
    content[i].mx = Math.cos(2 * (i + 0.5) * pi / content.length)
    content[i].my = Math.sin(2 * (i + 0.5) * pi / content.length)
    content[i].path = `M ${center + inner * x} ${center + inner * y} L ${center + outer * x} ${center + outer * y} A ${outer} ${outer} 45 0 1 ${center + outer * xnext} ${center + outer * ynext} L ${center + inner * xnext} ${center + inner * ynext} A ${inner} ${inner} -45 0 0 ${center + inner * x} ${center + inner * y}`
  }

</script>

<div class="background" on:click={cancel}>
  <svg class="menu" width={size} height={size} viewPort={`0 0 ${size} ${size}`} style:--position-x={x} style:--position-y={y} bind:this={menu}>
    <circle cx={center} cy={center} r={inner} />
    {#each content as entry}
      {#if entry.icon}
        <g class="option" on:click={entry.fun} style:--color={color}>
          <path d={entry.path} />
          <image x={center + (inner + (outer - inner) / 2) * entry.mx - 10} y={center + (inner + (outer - inner) / 2) * entry.my - 10} width="20" height="20" href={entry.icon} />
        </g>
      {:else}
        <g class="option" on:click={entry.fun} style:--color={color}>
          <path d={entry.path} />
          <text x={center + (inner + (outer - inner) / 2) * entry.mx} y={center + (inner + (outer - inner) / 2) * entry.my} dy="0.35em" text-anchor="middle" stroke={color}>{ entry.name[0] }{entry.name[1]}</text>
        </g>
      {/if}
    {/each}
  </svg>
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
  
  svg.menu {
    position: fixed;
    left: calc(var(--position-x) * 1px - 50px);
    top: calc(var(--position-y) * 1px - 50px);
    z-index: 100;
  }

  svg circle {
    fill: white;
    stroke: none;
  }
  
  svg g.option {
    fill: white;
    fill-opacity: 0.5;
    stroke: var(--color);
  }

  svg g.option:hover {
    fill-opacity: 0.1;
    fill: var(--color);
  }

  /*
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
*/

</style>
