
<script>

  import { onDestroy } from 'svelte'
  export let x
  export let y
  export let obj
  export let updateObject
  export let moveObject
  export let deleteObject
  export let resizeObject
  export let cancel

  function changeType(newType) {
    ///console.log('object = ', obj)
    obj.type = newType
    obj.edited = true
    updateObject(obj)
    ///console.log('object = ', obj)
  }

  function move(evt) {
    moveObject(obj, evt.clientX, evt.clientY)
  }

  function del(evt) {
    deleteObject(obj, evt.clientX, evt.clientY)
  }

  function resize(evt) {
    resizeObject(obj, evt.clientX, evt.clientY)
  }

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
</script>

<div class="background" on:click={cancel}>
  <div class="menu" style:--position-x={x} style:--position-y={y}>
    <div class="title">Edit</div>
    <div class="option" on:click={move}>Move</div>
    <div class="option" on:click={resize}>Resize</div>
    <div class="option" on:click={del}>Delete</div>
    <div class="unavailable">Forward</div>
    <div class="unavailable">Back</div>
    <div class="separator" />
    <div class="option" on:click={() => changeType('rectangle') }>&rarr; Rectangle</div>
    <div class="option" on:click={() => changeType('ellipse')}>&rarr; Ellipse</div>
    <div class="option" on:click={() => changeType('circle')}>&rarr; Circle</div>
    <div class="option" on:click={() => changeType('line')}>&rarr; Line</div>
    <div class="option" on:click={() => changeType('arrow')}>&rarr; Arrow</div>
    <div class="option" on:click={() => changeType('reverse-arrow')}>&rarr; R-Arrow</div>
    <div class="option" on:click={() => changeType('double-arrow')}>&rarr; D-Arrow</div>
    <div class="option" on:click={() => changeType('text')}>&rarr; Text</div>
    <div class="separator" />
    <div class="option" on:click={cancel}>Cancel</div>
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
    width: 8em;
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
    background-color: blue;
  }

  div.separator {
    flex: 1;
    height: 1px;
    width: 100%;
    border-top: 1px solid black;
  }

  div.option {
    padding: 4px;
    cursor: pointer;
    flex: 1;
    width: calc(100% - 8px);
    text-align: left;
  }

  div.unavailable {
    opacity: 0.5;
    padding: 4px;
    flex: 1;
    width: calc(100% - 8px);
    text-align: left;
  }

  div.option:hover {
    background-color: black;
    color: white;
  }

  div.option:not(:first-child) {
    /* border-top: 1px solid black;*/
  }        
</style>
