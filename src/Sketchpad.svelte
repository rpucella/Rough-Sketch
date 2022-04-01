<script>
  // Interesting font to use:
  // https://fonts.google.com/specimen/Nothing+You+Could+Do?category=Handwriting&preview.text=Server&preview.text_type=custom

  // How to draw:
  // https://stackoverflow.com/questions/2368784/draw-on-html5-canvas-using-a-mouse

  import rough from "roughjs/bin/rough"
  import Menu from "./Menu.svelte"
  // TODO: turn these into an object passing in startX startY svgNode, etc.
  // import { makeGuides, moveGuides, updateGuidesText, removeGuides } from './guides.js'
  // npm i roughjs@4.0.4
  // https://roughjs.com/
  let roughSvg
  let svgNode
  let svgX
  let svgY
  export let diagram
  
  const xmlns = "http://www.w3.org/2000/svg"

  let drawing = false
  let hovering = -1       // Index of what we're hovering over. Set to -1 for nothing.
  let startX
  let startY
  let endX
  let endY
  let drawer
  let showMenu

  function makeGuides(x, y) {
    // Use an actual bona fide rectangle that we can modify as we go!
    // Maybe make use of a more general box that shows guides for circles/lines/rectangles?
    drawer = document.createElementNS(xmlns, 'g')
    svgNode.appendChild(drawer)
    const rect = document.createElementNS(xmlns, 'rect')
    drawer.appendChild(rect)
    rect.setAttribute('id', 'rect')
    rect.setAttribute('x', startX)
    rect.setAttribute('y', startY)
    rect.setAttribute('width', 0)
    rect.setAttribute('height', 0)
    rect.setAttribute('stroke', '#ff3e00')
    rect.setAttribute('stroke-dasharray', '5 10')
    rect.setAttribute('fill', 'none')
    const line1 = document.createElementNS(xmlns, 'line')
    drawer.appendChild(line1)
    line1.setAttribute('id', 'line1')
    line1.setAttribute('x1', startX)
    line1.setAttribute('y1', startY)
    line1.setAttribute('x2', startX)
    line1.setAttribute('y2', startY)
    line1.setAttribute('stroke', '#ff3e00')
    line1.setAttribute('stroke-dasharray', '5 10')
    line1.setAttribute('fill', 'none')
    const line2 = document.createElementNS(xmlns, 'line')
    drawer.appendChild(line2)
    line2.setAttribute('id', 'line2')
    line2.setAttribute('x1', startX)
    line2.setAttribute('y1', startY)
    line2.setAttribute('x2', startX)
    line2.setAttribute('y2', startY)
    line2.setAttribute('stroke', '#ff3e00')
    line2.setAttribute('stroke-dasharray', '5 10')
    line2.setAttribute('fill', 'none')
    const line3 = document.createElementNS(xmlns, 'line')
    drawer.appendChild(line3)
    line3.setAttribute('id', 'line3')
    line3.setAttribute('x1', startX)
    line3.setAttribute('y1', startY)
    line3.setAttribute('x2', startX)
    line3.setAttribute('y2', startY)
    line3.setAttribute('stroke', '#ff3e00')
    line3.setAttribute('stroke-dasharray', '5 10')
    line3.setAttribute('fill', 'none')
    const text = document.createElementNS(xmlns, 'text')
    drawer.appendChild(text)
    text.setAttribute('id', 'text')
    text.setAttribute('x', startX)
    text.setAttribute('y', startY)
    text.setAttribute('dy', '0.35em')
    text.setAttribute('text-anchor', 'middle')
    text.setAttribute('font-size', '36px')
    text.setAttribute('stroke', '#ff3e00')
    text.setAttribute('opacity', '0.5')
  }

  function moveGuides(tx, ty) {
    // Find top-left corner.
    const tlx = Math.min(startX, tx)
    const tly = Math.min(startY, ty)
    // Find width and height.
    const width = Math.abs(tx - startX)
    const height = Math.abs(ty - startY)
    const rect = document.getElementById('rect')
    rect.setAttribute('x', tlx)
    rect.setAttribute('y', tly)
    rect.setAttribute('width', width)
    rect.setAttribute('height', height)
    const line1 = document.getElementById('line1')
    const line2 = document.getElementById('line2')
    const line3 = document.getElementById('line3')
    if (width < height) {
      const margin = (height - width) / 2
      line1.setAttribute('x1', tlx)
      line1.setAttribute('y1', tly + margin)
      line1.setAttribute('x2', tlx + width)
      line1.setAttribute('y2', tly + margin)
      line2.setAttribute('x1', tlx)
      line2.setAttribute('y1', tly + margin + width)
      line2.setAttribute('x2', tlx + width)
      line2.setAttribute('y2', tly + margin + width)
    } else if (width > height) { 
      const margin = (width - height) / 2
      line1.setAttribute('x1', tlx + margin)
      line1.setAttribute('y1', tly)
      line1.setAttribute('x2', tlx + margin)
      line1.setAttribute('y2', tly + height)
      line2.setAttribute('x1', tlx + margin + height)
      line2.setAttribute('y1', tly)
      line2.setAttribute('x2', tlx + margin + height)
      line2.setAttribute('y2', tly + height)
    }
    line3.setAttribute('x1', startX)
    line3.setAttribute('y1', startY)
    line3.setAttribute('x2', tx)
    line3.setAttribute('y2', ty)
    const text = document.getElementById('text')
    text.setAttribute('x', (startX + tx) / 2)
    text.setAttribute('y', (startY + ty) / 2)
  }

  function updateGuidesText(str) {
    const text = document.getElementById('text')
    text.textContent = str
  }

  /*
    // This is the kind of code that will split a string over multiple
    // text nodes if it is too wide.
    // I probably need to replace the single text node about with <g>,
    // and make sure that the (x,y) we have is the center node of the
    // whole set of lines, both horizontally (easy) and vertically (harder).
    
  function labelTopAutoSplit (svg,x,y,width,font,label) {
    let g = svg.append("g");
    let words = label.split(/\s+/).reverse(),
        word,
        line = [],
        dy = 0.35,
        lineNumber = 0,
        lineHeight = 1.1;  // ems
    let text = g.append("text")
        .attr("x", x)
        .attr("y", y)
        .attr("dy", dy + "em")
        .attr("text-anchor","middle")
	.call(fontAttrs,font);
    while (word = words.pop()) {
      line.push(word);
      text.text(line.join(" "));
      if (text.node().getComputedTextLength() > width && line.length > 1) {
        // if the line length is > allotted width, drop the last word added
        // unless that word is the only word in the line
        line.pop();
        text.text(line.join(" "));
        line = [word];
        text = g.append("text")
	  .attr("x", x)
	  .attr("y", y)
	  .attr("dy", ++lineNumber * lineHeight + dy + "em")
	  .attr("text-anchor","middle")
	  .call(fontAttrs,font)
	  .text(word);
      }
    }
  }
  */

  function removeGuides() {
    while (drawer.firstChild) {
      drawer.firstChild.remove()
    }
    drawer.remove()
  }
  
  function handleMouseDown(evt) {
    /// console.log(evt.clientX, evt.clientY)
    if (!showMenu) {
      drawing = true
      startX = evt.clientX - svgX
      startY = evt.clientY - svgY
      makeGuides(startX, endX)
    }
  }

  function handleMenuCancel() {
    removeGuides()
    showMenu = false
  }

  function handleMenuObject(typ, txt) {
    removeGuides()
    const obj = {
      type: typ,
      box: [startX, startY, endX, endY],
      text: txt
    }
    diagram.objects.push(obj)
    drawObject(obj)
    showMenu = false
  }        

  function handleMenuCircle() {
    removeGuides()
    const obj = {
      type: 'circle',
      box: [startX, startY, endX, endY]
    }
    diagram.objects.push(obj)
    drawObject(obj)
    showMenu = false
  }        
  
  function handleMouseUp(evt) {
    if (drawing) {
      drawing = false
      endX = evt.clientX - svgX
      endY = evt.clientY - svgY
      showMenu = [endX, endY]
    }
  }

  function handleMouseMove(evt) {
    if (drawing) {
      const endX = evt.clientX - svgX
      const endY = evt.clientY - svgY
      moveGuides(endX, endY)
    } else if (!showMenu) {
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
          console.log('this should have removed the hover')
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
    if (drawing) {
      drawing = false
      removeGuides()
    }
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
     on:mouseleave={handleMouseOut}
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
