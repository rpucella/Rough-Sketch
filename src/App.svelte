<script>
  import Sketchpad from './Sketchpad.svelte';
  const diagram = {
      height: 400,
    width: 800,
    objects: [
      {
        type: 'rectangle',
        box: [10, 10, 300, 150]
      },
      {
        type: 'circle',
        box: [310, 10, 400, 90]
      },
      {
        type: 'circle',
        box: [350, 10, 500, 100]
      },
      {
        type: 'text',
        box: [10, 10, 300, 150],
        text: 'First Box'
      }
    ]
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
  
  <Sketchpad diagram={diagram} />
</main>

<style>
  main div.title {
    position: absolute;
    right: 8px;
    top: 8px;
    text-align: center;
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 3em;
    font-weight: 100;
  }
</style>

