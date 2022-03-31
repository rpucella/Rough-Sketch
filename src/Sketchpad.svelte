<script>
    // Interesting font to use:
    // https://fonts.google.com/specimen/Nothing+You+Could+Do?category=Handwriting&preview.text=Server&preview.text_type=custom

    // How to draw:
    // https://stackoverflow.com/questions/2368784/draw-on-html5-canvas-using-a-mouse

    import rough from "roughjs/bin/rough";
    // npm i roughjs@4.0.4
    // https://roughjs.com/
    let roughSvg
    let svgNode
    let svgX
    let svgY
    export let diagram
    
    const xmlns = "http://www.w3.org/2000/svg"

    let drawing = false
    let startX
    let startY
    let drawer

    function handleMouseDown(evt) {
        /// console.log(evt.clientX, evt.clientY)
        drawing = true
        startX = evt.clientX - svgX
        startY = evt.clientY - svgY
        // Use an actual bona fide rectangle that we can modify as we go!
        drawer = document.createElementNS(xmlns, 'rect')
        drawer.setAttribute('x', startX)
        drawer.setAttribute('y', startY)
        drawer.setAttribute('width', 1)
        drawer.setAttribute('height', 1)
        drawer.setAttribute('stroke', '#ff3e00')
        drawer.setAttribute('stroke-dasharray', '5 10')
        drawer.setAttribute('fill', 'none')
        svgNode.appendChild(drawer)
    }

    function handleMouseUp(evt) {
        if (drawing) {
            drawer.remove()
            drawing = false
            const endX = evt.clientX - svgX
            const endY = evt.clientY - svgY
            const obj = {
                type: 'rectangle',
                box: [startX, startY, endX, endY]
            }
            diagram.objects.push(obj)
            drawObject(obj)
            ///console.log(diagram)
        }
    }

    function handleMouseMove(evt) {
        if (drawing) {
            const endX = evt.clientX - svgX
            const endY = evt.clientY - svgY
            const width = Math.abs(endX - startX)
            const height = Math.abs(endY - startY)
            drawer.setAttribute('x', Math.min(startX, endX))
            drawer.setAttribute('y', Math.min(startY, endY))
            drawer.setAttribute('width', width)
            drawer.setAttribute('height', height)
        }
    }

    function handleMouseOut(evt) {
       if (drawing) {
          drawing = false
          drawer.remove()
      }
    }

    function drawObject(obj) {
            let r
            switch (obj.type) {
            case 'rectangle':
                // Set fill to white or something...
                r = roughSvg.rectangle(obj.box[0], obj.box[1], obj.box[2] - obj.box[0], obj.box[3] - obj.box[1])
                break
            case 'circle':
                r = roughSvg.circle((obj.box[2] + obj.box[0]) / 2, (obj.box[3] + obj.box[1]) / 2, (obj.box[2] - obj.box[0]) / 2)
                break
            case 'text':
                r = document.createElementNS(xmlns, 'text')
                r.setAttribute('x', (obj.box[2] + obj.box[0]) / 2)
                r.setAttribute('y', (obj.box[3] + obj.box[1]) / 2)
                r.setAttribute('dy', '0.35em')
                r.setAttribute('text-anchor', 'middle')
                r.setAttribute('font-size', '36px')
                const txt = document.createTextNode(obj.text)
                r.appendChild(txt)
            }
            if (r) {
                svgNode.appendChild(r)
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

<style>
  svg {
      width: calc(100vw - 16px);
      height: calc(100vh - 16px);
      background-color: white;
      /* border: 1px solid #ff3e00;*/
  }
</style>
