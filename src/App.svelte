<script>

  import DiagramEditor from './DiagramEditor.svelte';
  import Icon from './Icon.svelte';

  let objects = []
  let d_height = 400
  let d_width = 400

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

  function uploadDiagram() {
    // TODO: Need a modal box to get the name!
    alert('Upload not yet implemented')
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
      <!-- <Icon src="assets/icons/upload.svg" width="1.5em" clickFn={uploadDiagram} /> -->
      <Icon src="assets/icons/download.svg" width="1.5em" clickFn={hasObjects && downloadDiagram} />
      <!-- <Icon src="assets/icons/help.svg" width="1.5em" /> -->
      <!-- <Icon src="assets/icons/settings.svg" width="1.5em" /> -->
  </div>
  <DiagramEditor objects={objects} addObject={addObject} />
</main>

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

</style>

