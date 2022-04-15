<script>

  // How to draw:
  // https://stackoverflow.com/questions/2368784/draw-on-html5-canvas-using-a-mouse

  // TODO: assign a unique ID to each object in the diagram.

  import rough from "roughjs/bin/rough"
  import { nanoid } from 'nanoid'
  import MenuCreate from "./MenuCreate.svelte"
  import MenuEdit from "./MenuEdit.svelte"
  import Object from "./Object.svelte"
  import { Guides } from './guides.js'
  import { Selector } from './selector.js'

  let roughSvg
  let svgNode
  let svgX
  let svgY
  export let objects
  export let addObject
  export let deleteObject
  
  const xmlns = "http://www.w3.org/2000/svg"

  // TODO: Concept of a mode: creating, moving, resizing, ...
  
  let selector
  let startX
  let startY
  let endX
  let endY
  let guides = null       // Gets a value when drawing
  let showMenuCreate
  let showMenuEdit
  let moving = false

  function isShowMenu() {
    return showMenuCreate || showMenuEdit
  }

  function updateGuidesText(str) {
    guides.updateText(str)
  }

  function clearGuides() {
    if (guides) { 
      guides.remove()
      guides = null
    }
  }

  function handleMouseDown(evt) {
    if (evt.button == 0) {
      // Left button press.
      if (!showMenuCreate && !showMenuEdit && !moving) {
        startX = evt.clientX - svgX
        startY = evt.clientY - svgY
        guides = new Guides(svgNode, startX, startY)
      }
    }
  }

  function handleMenuCancel() {
    clearGuides()
    showMenuCreate = false
    showMenuEdit = false
  }

  function handleMenuObject(typ, txt) {
    clearGuides()
    const obj = {
      id: nanoid(),
      type: typ,
      box: [startX, startY, endX, endY],
      text: txt
    }
    addObject(obj)
    showMenuCreate = false
  }

  function handleMenuUpdate(obj) {
    // Adding a null object is just a refresh.
    addObject()
    showMenuEdit = false
  }

  function handleMenuMove(obj, clientX, clientY) {
    const guides = new Guides(svgNode, obj.box[0], obj.box[1])
    guides.resize(obj.box[2], obj.box[3])
    startX = clientX - svgX
    startY = clientY - svgY
    moving = [obj, guides]
    showMenuEdit = false
  }

  function handleMenuDelete(obj, clientX, clientY) {
    deleteObject(obj)
    // Adjustment because we are affecting the resulting hovering.
    selector.clear()
    const pX = clientX - svgX
    const pY = clientY - svgY
    selector.select(objects, pX, pY)
    showMenuEdit = false
  }

  function handleMouseUp(evt) {
    if (showMenuCreate || showMenuEdit) {
      return
    }
    if (evt.button == 0) {
      // Left button release.
      if (guides) {
        endX = evt.clientX - svgX
        endY = evt.clientY - svgY
        if (startX !== endX || startY !== endY) {
          showMenuCreate = [endX, endY]
        } else {
          clearGuides()
          // Show edit menu if we have a selected object.
          if (selector.isSelected()) {
            //console.log('object = ', hovering)
            showMenuEdit = [endX, endY, selector.object()]
          }
        }
      } else if (moving) {
        const [obj, guides ] = moving
        guides.remove()
        moving = false
        obj.box = guides.box()
        obj.edited = true
        addObject()
        // Adjustment because we are affecting the resulting hovering.
        selector.clear()
        const pX = evt.clientX - svgX
        const pY = evt.clientY - svgY
        selector.select(objects, pX, pY)
      }
    } else if (evt.button == 2) {
      // Right button click.
      if (!guides) {
        if (selector.isSelecting()) {
          // We have a selected object!
          console.log('selected = ', selector.object())
        }
      }
    }
  }

  function handleMouseMove(evt) {
    if (showMenuCreate || showMenuEdit) {
      return
    }
    if (guides) {
      const endX = evt.clientX - svgX
      const endY = evt.clientY - svgY
      guides.resize(endX, endY)
    } else if (moving) {
      const dx = (evt.clientX - svgX) - startX
      const dy = (evt.clientY - svgY) - startY
      const [obj, guides] = moving
      guides.move(obj.box[0] + dx, obj.box[1] + dy, obj.box[2] + dx, obj.box[3] + dy)
    }
    const pX = evt.clientX - svgX
    const pY = evt.clientY - svgY
    selector.select(objects, pX, pY)
  }
    
  function handleMouseOut(evt) {
    if (guides) {
      clearGuides()
    }
  }

  function handleContextMenu(evt) {
    evt.preventDefault()
  }
  
  function action(node) {
    svgNode = node
    const rect = node.getBoundingClientRect()
    svgX = rect.left
    svgY = rect.top
    roughSvg = rough.svg(node)
    selector = new Selector(node)
  }

</script>

<svg on:mousedown={handleMouseDown}
     on:mouseup={handleMouseUp}
     on:mousemove={handleMouseMove}
     on:contextmenu={handleContextMenu}
     use:action>
  {#each objects as obj (obj.id)}
    <Object obj={obj} roughSvg={roughSvg}/>
  {/each}
</svg>

{#if showMenuCreate}
  <MenuCreate
    x={showMenuCreate[0]}
    y={showMenuCreate[1]}
    cancel={handleMenuCancel}
    makeObject={handleMenuObject}
    updateText={updateGuidesText}
    />
  {/if}

{#if showMenuEdit}
  <MenuEdit
    x={showMenuEdit[0]}
    y={showMenuEdit[1]}
    obj={showMenuEdit[2]}
    updateObject={handleMenuUpdate}
    moveObject={handleMenuMove}
    deleteObject={handleMenuDelete}
    cancel={handleMenuCancel}
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
