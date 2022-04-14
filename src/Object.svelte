<script>
  
  // Interesting font to use:
  // https://fonts.google.com/specimen/Nothing+You+Could+Do?category=Handwriting&preview.text=Server&preview.text_type=custom

  export let roughSvg
  export let obj
  
  const xmlns = "http://www.w3.org/2000/svg"

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

  function arrowHead(end, start, target) {
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
    target.appendChild(r1)
    target.appendChild(r2)
  }

  function createText(cxy, txt, target) {
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
    target.appendChild(rtback)
    // Then draw the actual text in the space created.
    const rt = document.createElementNS(xmlns, 'text')
    rt.setAttribute('x', cxy[0])
    rt.setAttribute('y', cxy[1])
    rt.setAttribute('dy', '0.35em')
    rt.setAttribute('text-anchor', 'middle')
    rt.setAttribute('font-size', '36px')
    rt.textContent = txt
    target.appendChild(rt)
  }

  function drawObject(obj, target) {
    const width = Math.abs(obj.box[2] - obj.box[0])
    const height = Math.abs(obj.box[3] - obj.box[1])
    const left = Math.min(obj.box[0], obj.box[2])
    const top = Math.min(obj.box[1], obj.box[3])
    switch (obj.type) {
    case 'rectangle':
      // Set fill to white or something...
      const rr = roughSvg.rectangle(left, top, width, height)
      target.appendChild(rr)
      break
    case 'circle':
      const rc = roughSvg.circle((obj.box[2] + obj.box[0]) / 2, (obj.box[3] + obj.box[1]) / 2, Math.min(height, width))
      target.appendChild(rc)
      break
    case 'ellipse':
      const re = roughSvg.ellipse((obj.box[2] + obj.box[0]) / 2, (obj.box[3] + obj.box[1]) / 2, width, height)
      target.appendChild(re)
      break
    case 'line':
      const rl = roughSvg.line(obj.box[0], obj.box[1], obj.box[2], obj.box[3])
      target.appendChild(rl)
      break
    case 'arrow':
      const ra = roughSvg.line(obj.box[0], obj.box[1], obj.box[2], obj.box[3])
      target.appendChild(ra)
      arrowHead([obj.box[2], obj.box[3]], [obj.box[0], obj.box[1]], target)
      break;
    case 'reverse-arrow':
      const rra = roughSvg.line(obj.box[0], obj.box[1], obj.box[2], obj.box[3])
      target.appendChild(rra)
      arrowHead([obj.box[0], obj.box[1]], [obj.box[2], obj.box[3]], target)
      break;
    case 'double-arrow':
      const rda = roughSvg.line(obj.box[0], obj.box[1], obj.box[2], obj.box[3])
      target.appendChild(rda)
      arrowHead([obj.box[2], obj.box[3]], [obj.box[0], obj.box[1]], target)
      arrowHead([obj.box[0], obj.box[1]], [obj.box[2], obj.box[3]], target)
      break;
    case 'text':
      break
    }
    if (obj.text) {
      createText([(obj.box[0] + obj.box[2]) / 2, (obj.box[1] + obj.box[3]) / 2], obj.text, target)
    }
  }

  function action(node, obj) {
    drawObject(obj, node)
    return {
      destroy() {
        node.remove()
      }
    }
  }
</script>

<g use:action={obj} />

<style>
</style>
