<script>

  // How to draw:
  // https://stackoverflow.com/questions/2368784/draw-on-html5-canvas-using-a-mouse

  // TODO: assign a unique ID to each object in the diagram.

  import rough from "roughjs/bin/rough"
  import Menu from "./Menu.svelte"
  import Object from "./Object.svelte"
  import { Guides } from './guides.js'
  
  let roughSvg
  let svgNode
  let svgX
  let svgY
  export let diagram
  
  const xmlns = "http://www.w3.org/2000/svg"

  let hovering = -1       // Index of what we're hovering over. Set to -1 for nothing.
  let startX
  let startY
  let endX
  let endY
  let guides = null       // Gets a value when drawing
  let showMenu

  function updateGuidesText(str) {
    guides.updateText(str)
  }

  function clearGuides() {
    guides.remove()
    guides = null
  }

  function handleMouseDown(evt) {
    if (evt.button == 0) {
      // Left button press.
      if (!showMenu) {
        startX = evt.clientX - svgX
        startY = evt.clientY - svgY
        guides = new Guides(svgNode, startX, startY)
      }
    }
  }

  function handleMenuCancel() {
    clearGuides()
    showMenu = false
  }

  function handleMenuObject(typ, txt) {
    clearGuides()
    const obj = {
      type: typ,
      box: [startX, startY, endX, endY],
      text: txt
    }
    diagram.objects.push(obj)
    diagram = diagram
    showMenu = false
  }        

  function handleMouseUp(evt) {
    if (showMenu) {
      return
    }
    if (evt.button == 0) {
      // Left button release.
      if (guides) {
        endX = evt.clientX - svgX
        endY = evt.clientY - svgY
        if (startX !== endX || startY !== endY) {
          showMenu = [endX, endY]
        } else {
          clearGuides()
        }
      }
    } else if (evt.button == 2) {
      // Right button click.
      if (!guides) {
        if (hovering >= 0) {
          // We have a selected object!
          console.log('selected = ', hovering)
        }
      }
    }
  }

  function handleMouseMove(evt) {
    if (showMenu) {
      return
    }
    if (guides) {
      const endX = evt.clientX - svgX
      const endY = evt.clientY - svgY
      guides.move(endX, endY)
    } else {
      const pX = evt.clientX - svgX
      const pY = evt.clientY - svgY
      const idx = findObject(pX, pY)
      if (hovering !== idx) {
        // Previous hovering state is different than current.
        let hover
        if (hovering < 0) {
          // We had no hovering before, we probably need to create one.
          hover = document.createElementNS(xmlns, 'rect')
          svgNode.appendChild(hover)
          hover.setAttribute('id', 'hovering')
          hover.setAttribute('x', 0)
          hover.setAttribute('y', 0)
          hover.setAttribute('width', 0)
          hover.setAttribute('height', 0)
          hover.setAttribute('stroke', '#003eff')
          hover.setAttribute('stroke-dasharray', '5 10')
          hover.setAttribute('fill', 'none')
        } else {
          hover = document.getElementById('hovering')
        }
        if (idx < 0) {
          // We need to kill the hovering element.
          hover.remove()
        } else {
          const box = diagram.objects[idx].box
          // We need to move it to the current object.
          const minX = Math.min(box[0], box[2])
          const maxX = Math.max(box[0], box[2])
          const minY = Math.min(box[1], box[3])
          const maxY = Math.max(box[1], box[3])
          hover.setAttribute('x', minX - 5)
          hover.setAttribute('y', minY - 5)
          hover.setAttribute('width', maxX - minX + 10)
          hover.setAttribute('height', maxY - minY + 10)
        }
        hovering = idx
      }
    }
  }
    
  function handleMouseOut(evt) {
    if (guides) {
      clearGuides()
    }
  }

  function handleContextMenu(evt) {
    evt.preventDefault()
  }
  
  function inObject(x, y, obj) {
    // TODO: maintain the invariant that [0,1] is always TL and [2,3] always BR.
    const minX = Math.min(obj.box[0], obj.box[2])
    const maxX = Math.max(obj.box[0], obj.box[2])
    const minY = Math.min(obj.box[1], obj.box[3])
    const maxY = Math.max(obj.box[1], obj.box[3])
    return x >= minX && x <= maxX && y >= minY && y <= maxY
  }

  function findObject(x, y) {
    for (let i = diagram.objects.length - 1; i >= 0; i--) {
      if (inObject(x, y, diagram.objects[i])) {
        return i
      }
    }
    return -1
  }

  function action(node) {
    svgNode = node
    const rect = node.getBoundingClientRect()
    svgX = rect.left
    svgY = rect.top
    roughSvg = rough.svg(node)
  }

</script>

<svg on:mousedown={handleMouseDown}
     on:mouseup={handleMouseUp}
     on:mousemove={handleMouseMove}
     on:contextmenu={handleContextMenu}
     use:action>
  {#each diagram.objects as obj}
    <Object obj={obj} roughSvg={roughSvg}/>
  {/each}
</svg>

{#if showMenu}
  <Menu
    x={showMenu[0]}
    y={showMenu[1]}
    cancel={handleMenuCancel}
    makeObject={handleMenuObject}
    updateText={updateGuidesText}
    />
  {/if}

<style>
  svg {
    width: calc(100vw - 16px);
    height: calc(100vh - 16px);
    background-color: white;
    /* border: 1px solid #ff3e00;*/
  }
</style>
