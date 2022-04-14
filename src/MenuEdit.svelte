
<script>

  import { onDestroy } from 'svelte'
  export let x
  export let y
  export let obj
  export let updateObject
  export let cancel

  function changeType(newType) {
    ///console.log('object = ', obj)
    obj.type = newType
    obj.edited = true
    updateObject(obj)
    ///console.log('object = ', obj)
  }

</script>

<div class="menu" style:--position-x={x} style:--position-y={y}>
  <div class="title">Edit</div>
  <div class="option" on:click={() => changeType('rectangle') }>Rectangle</div>
  <div class="option" on:click={() => changeType('ellipse')}>Ellipse</div>
  <div class="option" on:click={() => changeType('circle')}>Circle</div>
  <div class="option" on:click={() => changeType('line')}>Line</div>
  <div class="option" on:click={() => changeType('arrow')}>Arrow</div>
  <div class="option" on:click={() => changeType('reverse-arrow')}>R-Arrow</div>
  <div class="option" on:click={() => changeType('double-arrow')}>D-Arrow</div>
  <div class="option" on:click={() => changeType('text')}>Text</div> 
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

  div.title {
    padding: 4px;
    cursor: pointer;
    flex: 1;
    width: 100%;
    padding: 4px 0;
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    color: white;
    background-color: blue;
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
