<script>
    // Interesting font to use:
    // https://fonts.google.com/specimen/Nothing+You+Could+Do?category=Handwriting&preview.text=Server&preview.text_type=custom

    // How to draw:
    // https://stackoverflow.com/questions/2368784/draw-on-html5-canvas-using-a-mouse

    import rough from "roughjs/bin/rough"
    import Menu from "./Menu.svelte"
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
    let endX
    let endY
    let drawer
    let showMenu

    function handleMouseDown(evt) {
        /// console.log(evt.clientX, evt.clientY)
        if (!showMenu) {
            drawing = true
            startX = evt.clientX - svgX
            startY = evt.clientY - svgY
            // Use an actual bona fide rectangle that we can modify as we go!
            // Maybe make use of a more general box that shows guides for circles/lines/rectangles?
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
    }

    function handleMenuCancel() {
        drawer.remove()
        showMenu = false
    }

    function handleMenuObject(typ) {
        drawer.remove()
        const obj = {
            type: typ,
            box: [startX, startY, endX, endY]
        }
        diagram.objects.push(obj)
        drawObject(obj)
        showMenu = false
    }        

    function handleMenuCircle() {
        drawer.remove()
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
        case 'line':
            const rl = roughSvg.line(obj.box[0], obj.box[1], obj.box[2], obj.box[3])
            svgNode.appendChild(rl)
            break
        case 'arrow':
            const ra = roughSvg.line(obj.box[0], obj.box[1], obj.box[2], obj.box[3])
            const r1 = roughSvg.circle(obj.box[2], obj.box[3], 10)
            svgNode.appendChild(ra)
            svgNode.appendChild(r1)
            break;
        case 'text':
            const rt = document.createElementNS(xmlns, 'text')
            rt.setAttribute('x', (obj.box[2] + obj.box[0]) / 2)
            rt.setAttribute('y', (obj.box[3] + obj.box[1]) / 2)
            rt.setAttribute('dy', '0.35em')
            rt.setAttribute('text-anchor', 'middle')
            rt.setAttribute('font-size', '36px')
            const txt = document.createTextNode(obj.text)
            rt.appendChild(txt)
            svgNode.appendChild(rt)
            break
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
