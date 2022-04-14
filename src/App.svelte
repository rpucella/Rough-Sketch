<script>

  import Sketchpad from './Sketchpad.svelte';
  import Icon from './Icon.svelte';
  let diagram = {
    height: 400,
    width: 800,
    objects: []
  }

  function clearDiagram() {
    console.log('clearing!')
    console.log(diagram)
    diagram.objects = []
    diagram = diagram
    console.log(diagram)
  }

  function downloadDiagram() {
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
    <Icon src="assets/icons/clear.svg" width="2em" clickFn={clearDiagram} />
    <Icon src="assets/icons/upload.svg" width="2em" />
    <Icon src="assets/icons/download.svg" width="2em" clickFn={downloadDiagram} />
  </div>
  <Sketchpad diagram={diagram} />
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

