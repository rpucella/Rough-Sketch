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
    let endX
    let endY
    let drawer

    function handleMouseDown(evt) {
        /// console.log(evt.clientX, evt.clientY)
        drawing = true
        console.log(svgNode.clientX)
        startX = evt.clientX - svgX
        startY = evt.clientY - svgY
        // Use an actual bona fide rectangle that we can modify as we go!
        drawer = roughSvg.rectangle(startX, startY, 1, 1, {strokeLineDash: [5, 5]})
        svgNode.appendChild(drawer)
    }

    function handleMouseUp(evt) {
        if (drawing) {
           drawer.remove()
           drawing = false
        }
    }

    function handleMouseMove(evt) {
        if (drawing) {
           drawer.remove()
           endX = evt.clientX - svgX
           endY = evt.clientY - svgY
          drawer = roughSvg.rectangle(startX, startY, endX - startX, endY - startY, {strokeLineDash: [5, 5]})
          svgNode.appendChild(drawer)
        }
    }

    function action(node) {
        svgNode = node
        const rect = node.getBoundingClientRect()
        svgX = rect.left
        svgY = rect.top
        roughSvg = rough.svg(node)
        for (const obj of diagram.objects) {
            let r
            switch (obj.type) {
            case 'rectangle':
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
                node.appendChild(r)
            }
        }
    }
</script>

<svg on:mousedown={handleMouseDown} on:mouseup={handleMouseUp} on:mousemove={handleMouseMove} use:action />

<style>
  svg {
    width: 1000px;
    height: 600px;
    background-color: white;
    border: 1px solid #ff3e00;

  }
</style>
