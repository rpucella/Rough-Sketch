<script>
  // Interesting font to use:
  // https://fonts.google.com/specimen/Nothing+You+Could+Do?category=Handwriting&preview.text=Server&preview.text_type=custom

  // How to draw:
  // https://stackoverflow.com/questions/2368784/draw-on-html5-canvas-using-a-mouse

  import rough from "roughjs/bin/rough"
  import Menu from "./Menu.svelte"
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
    drawObject(obj)
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

  function interceptRadius(cxy, oxy, r) {
    const dx = cxy[0] - oxy[0]
    const dy = cxy[1] - oxy[1]
    const angle = Math.atan2(dy, dx)
    const ddx = Math.cos(angle) * r
    const ddy = Math.sin(angle) * r
    return [cxy[0] - ddx, cxy[1] - ddy]
  }

  function rotateAbout(pxy, cxy, r) {
    const x = pxy[0] - cxy[0]
    const y = pxy[1] - cxy[1]
    const nx = Math.cos(r) * x - Math.sin(r) * y
    const ny = Math.sin(r) * x + Math.cos(r) * y
    return [nx + cxy[0], ny + cxy[1]]
  }

  function arrowHead(end, start) {
    const endX = end[0]
    const endY = end[1]
    const startX = start[0]
    const startY = start[1]
    const width = Math.abs(endX - startX)
    const height = Math.abs(endY - startY)
    const len = Math.min(Math.sqrt(width * width + height * height) / 2, 20)
    const inter = interceptRadius(end, start, len)
    const p1 = rotateAbout(inter, end, Math.PI / 6)
    const p2 = rotateAbout(inter, end, -Math.PI / 6)
    const r1 = roughSvg.line(endX, endY, p1[0], p1[1])
    const r2 = roughSvg.line(endX, endY, p2[0], p2[1])
    svgNode.appendChild(r1)
    svgNode.appendChild(r2)
  }

  function createText(cxy, txt) {
    // First draw the text in white with a thick pen (background).
    const rtback = document.createElementNS(xmlns, 'text')
    rtback.setAttribute('x', cxy[0])
    rtback.setAttribute('y', cxy[1])
    rtback.setAttribute('dy', '0.35em')
    rtback.setAttribute('text-anchor', 'middle')
    rtback.setAttribute('font-size', '36px')
    rtback.setAttribute('stroke-width', '10px')
    rtback.setAttribute('stroke', 'white')
    rtback.textContent = txt
    svgNode.appendChild(rtback)
    // Then draw the actual text in the space created.
    const rt = document.createElementNS(xmlns, 'text')
    rt.setAttribute('x', cxy[0])
    rt.setAttribute('y', cxy[1])
    rt.setAttribute('dy', '0.35em')
    rt.setAttribute('text-anchor', 'middle')
    rt.setAttribute('font-size', '36px')
    rt.textContent = txt
    svgNode.appendChild(rt)
  }

  function drawObject(obj) {
    const width = Math.abs(obj.box[2] - obj.box[0])
    const height = Math.abs(obj.box[3] - obj.box[1])
    const left = Math.min(obj.box[0], obj.box[2])
    const top = Math.min(obj.box[1], obj.box[3])
    switch (obj.type) {
    case 'rectangle':
      // Set fill to white or something...
      const rr = roughSvg.rectangle(left, top, width, height)
      svgNode.appendChild(rr)
      break
    case 'circle':
      const rc = roughSvg.circle((obj.box[2] + obj.box[0]) / 2, (obj.box[3] + obj.box[1]) / 2, Math.min(height, width))
      svgNode.appendChild(rc)
      break
    case 'ellipse':
      const re = roughSvg.ellipse((obj.box[2] + obj.box[0]) / 2, (obj.box[3] + obj.box[1]) / 2, width, height)
      svgNode.appendChild(re)
      break
    case 'line':
      const rl = roughSvg.line(obj.box[0], obj.box[1], obj.box[2], obj.box[3])
      svgNode.appendChild(rl)
      break
    case 'arrow':
      const ra = roughSvg.line(obj.box[0], obj.box[1], obj.box[2], obj.box[3])
      svgNode.appendChild(ra)
      arrowHead([obj.box[2], obj.box[3]], [obj.box[0], obj.box[1]])
      break;
    case 'reverse-arrow':
      const rra = roughSvg.line(obj.box[0], obj.box[1], obj.box[2], obj.box[3])
      svgNode.appendChild(rra)
      arrowHead([obj.box[0], obj.box[1]], [obj.box[2], obj.box[3]])
      break;
    case 'double-arrow':
      const rda = roughSvg.line(obj.box[0], obj.box[1], obj.box[2], obj.box[3])
      svgNode.appendChild(rda)
      arrowHead([obj.box[2], obj.box[3]], [obj.box[0], obj.box[1]])
      arrowHead([obj.box[0], obj.box[1]], [obj.box[2], obj.box[3]])
      break;
    case 'text':
      break
    }
    if (obj.text) {
      createText([(obj.box[0] + obj.box[2]) / 2, (obj.box[1] + obj.box[3]) / 2], obj.text)
    }
  }

  function action(node) {
    svgNode = node
    const rect = node.getBoundingClientRect()
    svgX = rect.left
    svgY = rect.top
    roughSvg = rough.svg(node)
    for (const obj of diagram.objects) {
      drawObject(obj)
    }
  }
</script>

<svg on:mousedown={handleMouseDown}
     on:mouseup={handleMouseUp}
     on:mousemove={handleMouseMove}
     on:contextmenu={handleContextMenu}
     use:action />

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
