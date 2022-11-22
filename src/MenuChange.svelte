
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
      icon: 'assets/icons/square-blue.svg',
      fun: () => changeType('rectangle')
    },
    {
      type: 'option',
      name: 'Ellipse',
      icon: 'assets/icons/ellipse-blue.svg',
      fun: () => changeType('ellipse')
    },
    {
      type: 'option',
      name: 'Circle',
      icon: 'assets/icons/circle-blue.svg',
      fun: () => changeType('circle')
    },
    {
      type: 'option',
      name: 'Line',
      icon: 'assets/icons/line-blue.svg',
      fun: () => changeType('line')
    },
    {
      type: 'option',
      name: 'Arrow',
      icon: 'assets/icons/arrow-right-blue.svg',
      fun: () => changeType('arrow')
    },
    {
      type: 'option',
      name: 'R-Arrow',
      icon: 'assets/icons/arrow-left-blue.svg',
      fun: () => changeType('reverse-arrow')
    },
    {
      type: 'option',
      name: 'D-Arrow',
      icon: 'assets/icons/arrow-double-blue.svg',
      fun: () => changeType('double-arrow')
    },
    {
      type: 'option',
      name: 'Text',
      icon: 'assets/icons/text-blue.svg',
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
