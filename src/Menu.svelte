
<script>

  import { onDestroy } from 'svelte'
  export let x
  export let y
  export let cancel
  export let makeObject
  export let updateText

  let chars = []
  let text = ''

  function handleKey(evt){
    evt.preventDefault()
    if (evt.key.length == 1 || (evt.key.length > 1 && /[^a-zA-Z0-9]/.test(evt.key))) {
      chars.push(evt.key)
      text = chars.join('')
      updateText(text)
    } else if (evt.key === 'Spacebar') {
      chars.push(' ')
      text = chars.join('')
      updateText(text)
    } else if (evt.key === 'Backspace') {
      chars.pop()
      text = chars.join('')
      updateText(text)
    } else if (evt.key === 'Escape') {
      cancel()
    }
  }

  document.addEventListener('keydown', handleKey)

  onDestroy(() => { document.removeEventListener('keydown', handleKey) })
  
</script>

<div class="menu" style:--position-x={x} style:--position-y={y}>
  <div class="option" on:click={() => makeObject('rectangle', text)}>Rectangle</div>
  <div class="option" on:click={() => makeObject('ellipse', text)}>Ellipse</div>
  <div class="option" on:click={() => makeObject('circle', text)}>Circle</div>
  <div class="option" on:click={() => makeObject('line', text)}>Line</div>
  <div class="option" on:click={() => makeObject('arrow', text)}>Arrow</div>
  <div class="option" on:click={() => makeObject('reverse-arrow', text)}>R-Arrow</div>
  <div class="option" on:click={() => makeObject('double-arrow', text)}>D-Arrow</div>
  <div class="option" on:click={() => makeObject('text', text)}>Text</div>
  <div class="option" on:click={cancel}>Cancel</div>
</div>

<style>
  div.menu {
    position: fixed;
    left: calc(var(--position-x) * 1px);
    top: calc(var(--position-y) * 1px);
    z-index: 100;
    background-color: white;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 6em;
  }

  div.option {
    padding: 4px;
    cursor: pointer;
    flex: 1;
    width: 100%;
    padding: 4px 0;
    text-align: center;
  }

  div.option:hover {
    background-color: black;
    color: white;
  }

  div.option:not(:first-child) {
    /* border-top: 1px solid black;*/
  }        
</style>
