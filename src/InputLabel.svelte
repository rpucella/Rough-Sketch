
<script>

  import { afterUpdate } from 'svelte'
  
  export let updateText
  export let value = ''
  
  function handleChange(evt) {
    updateText(evt.target.value)
  }
  
  let inputElt 

  afterUpdate(() => {
    inputElt.focus()
  })

</script>


<div>
  <!-- <span>Label</span> -->
  <input type="text" bind:this={inputElt} on:change={handleChange} value={value} />
</div>


<style>
  
  div > * {
    margin-right: 8px;
  }
  
  div {
    position: fixed;
    left: 8px;
    top: 8px;
    height: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  input {
    height: 32px;
    margin: 0;
  }

  /* I know, I know, don't ever do this - but you can't use the tool non-visually anyway. */
  
  input:focus {
    outline: none;
  }
  
</style>
