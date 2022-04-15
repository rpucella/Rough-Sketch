
<script>

  import Menu from './Menu.svelte'
  
  export let x
  export let y
  export let obj
  export let updateObject
  export let moveObject
  export let deleteObject
  export let resizeObject
  export let cancel

  let options = [
    {
      name: 'Move',
      type: 'option',
      fun: move
    },
    {
      name: 'Resize',
      type: 'option',
      fun: resize
    },
    {
      name: 'Delete',
      type: 'option',
      fun: del
    },
    {
      name: 'Forward',
      type: 'unavailable'
    },
    {
      name: 'Back',
      type: 'unavailable'
    },
    {
      type: 'separator'
    },
    {
      type: 'option',
      name: '&rarr; Rectangle',
      fun: () => changeType('rectangle')
    },
    {
      type: 'option',
      name: '&rarr; Ellipse',
      fun: () => changeType('ellipse')
    },
    {
      type: 'option',
      name: '&rarr; Circle',
      fun: () => changeType('circle')
    },
    {
      type: 'option',
      name: '&rarr; Line',
      fun: () => changeType('line')
    },
    {
      type: 'option',
      name: '&rarr; Arrow',
      fun: () => changeType('arrow')
    },
    {
      type: 'option',
      name: '&rarr; R-Arrow',
      fun: () => changeType('reverse-arrow')
    },
    {
      type: 'option',
      name: '&rarr; D-Arrow',
      fun: () => changeType('double-arrow')
    },
    {
      type: 'option',
      name: '&rarr; Text',
      fun: () => changeType('text')
    },
    {
      type: 'separator'
    },
    {
      type: 'option',
      name: 'Cancel',
      fun: cancel
    }
  ]

  function changeType(newType) {
    ///console.log('object = ', obj)
    obj.type = newType
    obj.edited = true
    updateObject(obj)
    ///console.log('object = ', obj)
  }

  function move(evt) {
    moveObject(obj, evt.clientX, evt.clientY)
  }

  function del(evt) {
    deleteObject(obj, evt.clientX, evt.clientY)
  }

  function resize(evt) {
    resizeObject(obj, evt.clientX, evt.clientY)
  }
</script>

<Menu
  content={options}
  color='blue'
  x={x} y={y}
  cancel={cancel}
  name='Edit'
  />
