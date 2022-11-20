
<script>

  import { onDestroy } from 'svelte'
  import Menu from './Menu.svelte'
  
  export let x
  export let y
  export let obj
  export let updateObject
  export let cancel

  let options = [
    {
      type: 'option',
      name: 'Rectangle',
      fun: () => changeType('rectangle')
    },
    {
      type: 'option',
      name: 'Ellipse',
      fun: () => changeType('ellipse')
    },
    {
      type: 'option',
      name: 'Circle',
      fun: () => changeType('circle')
    },
    {
      type: 'option',
      name: 'Line',
      fun: () => changeType('line')
    },
    {
      type: 'option',
      name: 'Arrow',
      fun: () => changeType('arrow')
    },
    {
      type: 'option',
      name: 'R-Arrow',
      fun: () => changeType('reverse-arrow')
    },
    {
      type: 'option',
      name: 'D-Arrow',
      fun: () => changeType('double-arrow')
    },
    {
      type: 'option',
      name: 'Text',
      fun: () => changeType('text')
    },
  ]

  function changeType(newType) {
    ///console.log('object = ', obj)
    obj.type = newType
    obj.edited = true
    updateObject(obj)
    ///console.log('object = ', obj)
  }

</script>

<Menu
  content={options}
  color='blue'
  x={x} y={y}
  cancel={cancel}
  name='Change'
  />
