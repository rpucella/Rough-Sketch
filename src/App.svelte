<script>

  import DiagramEditor from './DiagramEditor.svelte'
  import Icon from './Icon.svelte'
  import Dialog from './Dialog.svelte'

  let objects = []
  let d_height = 400
  let d_width = 400

  let files

  const D_DISABLED = 0
  const D_ENABLED = 1
  const D_ERROR = 2
  
  let showUploadDB = D_DISABLED

  $: hasObjects = objects && objects.length > 0

  function clearDiagram() {
    objects = []
  }

  function addObject(obj) {
    if (obj) { 
      objects.push(obj)
    }
    objects = objects
    ///console.log('refreshing objects = ', objects)
  }

  function deleteObject(obj) {
    if (obj) {
      for (let i = 0; i < objects.length; i++) {
        if (obj.id === objects[i].id) {
          objects.splice(i, 1)
        }
      }
    }
    objects = objects
  }

  function enableUploadDB() {
    showUploadDB = D_ENABLED
  }
  
  function uploadDiagram() {
    // TODO: Need a modal box to get the name!
    if (files) {
      files[0].text().then((content) => { 
        const json = JSON.parse(content)
        if (validate(json)) {
          d_height = json.height
          d_width = json.width
          objects = json.objects
          showUploadDB = D_DISABLED
        } else {
          showUploadDB = D_ERROR
        }
      }).catch((err) => {
        //console.log(err)
        showUploadDB = D_ERROR
      })
    }
  }

  function validate(json) {
    // TODO: Write me!
    return true
  }
  
  function downloadDiagram() {
    const diagram = {
      height: d_height,
      width: d_width,
      objects: objects
    }
    const blob = new Blob([JSON.stringify(diagram, null, 2)], { type: 'text/json' })
    const link = document.createElement('a')
    link.download = 'diagram.json'
    link.href = window.URL.createObjectURL(blob)
    link.dataset.downloadurl = ['text/json', link.download, link.href].join(':')
    const evt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    link.dispatchEvent(evt)
    link.remove()
  }
</script>

<svelte:head>
  <title>Rough Sketch</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nothing+You+Could+Do" rel="stylesheet">
  <style>
    body {
      padding: 8px;
      user-select: none;
    }
    
    svg text {
      font-family: Nothing You Could Do;
      font-display: block;
    }
  </style>
</svelte:head>


<main>
  <div class="title">Rough Sketch</div>
  <div class="icons">
    <Icon src="assets/icons/clear.svg" width="1.5em" clickFn={hasObjects && clearDiagram} />
    <Icon src="assets/icons/upload.svg" width="1.5em" clickFn={!hasObjects && enableUploadDB} />
    <Icon src="assets/icons/download.svg" width="1.5em" clickFn={hasObjects && downloadDiagram} />
    <!-- <Icon src="assets/icons/help.svg" width="1.5em" /> -->
    <!-- <Icon src="assets/icons/settings.svg" width="1.5em" /> -->
  </div>
  <DiagramEditor objects={objects} addObject={addObject} deleteObject={deleteObject} />
</main>

{#if showUploadDB > 0}
  <Dialog name="Upload Diagram" color="blue" cancel={() => { showUploadDB = D_DISABLED }}>
    <div class="content">
      <div>
        Choose a diagram to upload:
      </div>
        <input type="file" bind:files>
        {#if showUploadDB === D_ERROR}
          <div class="error">
            There is a problem with the JSON file.
          </div>
        {/if}
      <div>
        {#if files}
          <button on:click={uploadDiagram}>Upload</button>
        {:else}
          <button disabled>Upload</button>
          {/if}
      </div>
    </div>
    </Dialog>
  {/if}
<div>
</div>

<style>
  
  div.title {
    position: absolute;
    right: 8px;
    top: 8px;
    text-align: center;
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 3em;
    font-weight: 100;
  }

  div.icons {
    position: absolute;
    top: 5em;
    right: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  div.content {
    padding: 8px 8px;
    width: 100%;
    box-sizing: border-box;
  }

  div.content * {
    margin: 8px 0;
  }

  div.content button {
    margin-top: 16px;
  }

  div.error {
    color: red;
  }

</style>

