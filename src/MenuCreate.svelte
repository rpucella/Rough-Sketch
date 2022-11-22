
<script>

  import Menu from './Menu.svelte'
  import InputLabel from './InputLabel.svelte'
  export let x
  export let y
  export let cancel
  export let makeObject

  const options = [
    {
      type: 'option',
      fun: () => makeObject('rectangle', text),
      name: 'Rectangle',
      icon: "assets/icons/square-red.svg"
    },
    {
      type: 'option',
      fun: () => makeObject('ellipse', text),
      name: 'Ellipse',
      icon: "assets/icons/ellipse-red.svg"
    },
    {
      type: 'option',
      fun: () => makeObject('circle', text),
      name: 'Circle',
      icon: "assets/icons/circle-red.svg"
    },
    {
      type: 'option',
      fun: () => makeObject('line', text),
      name: 'Line',
      icon: "assets/icons/line-red.svg"
    },
    {
      type: 'option',
      fun: () => makeObject('arrow', text),
      name: 'Arrow',
      icon: "assets/icons/arrow-right-red.svg"
    },
    {
      type: 'option',
      fun: () => makeObject('reverse-arrow', text),
      name: 'R-Arrow',
      icon: "assets/icons/arrow-left-red.svg"
    },
    {
      type: 'option',
      fun: () => makeObject('double-arrow', text),
      name: 'D-Arrow',
      icon: "assets/icons/arrow-double-red.svg"
    },
    {
      type: 'option',
      fun: () => makeObject('text', text),
      name: 'Text',
      icon: "assets/icons/text-red.svg"
    },
  ]

  let text = ''

  function updateText(t) {
    text = t
  }
  
</script>

<Menu
  x={x}
  y={y}
  content={options}
  name='Create'
  color='red'
  cancel={cancel}
  />

<InputLabel updateText={updateText} />
