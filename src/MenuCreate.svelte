
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
      fun: (evt) => make(evt, 'rectangle'),
      name: 'Rectangle',
      icon: "assets/icons/square-red.svg"
    },
    {
      type: 'option',
      fun: (evt) => make(evt, 'ellipse'),
      name: 'Ellipse',
      icon: "assets/icons/ellipse-red.svg"
    },
    {
      type: 'option',
      fun: (evt) => make(evt, 'circle'),
      name: 'Circle',
      icon: "assets/icons/circle-red.svg"
    },
    {
      type: 'option',
      fun: (evt) => make(evt, 'line'),
      name: 'Line',
      icon: "assets/icons/line-red.svg"
    },
    {
      type: 'option',
      fun: (evt) => make(evt, 'arrow'),
      name: 'Arrow',
      icon: "assets/icons/arrow-right-red.svg"
    },
    {
      type: 'option',
      fun: (evt) => make(evt, 'reverse-arrow'),
      name: 'R-Arrow',
      icon: "assets/icons/arrow-left-red.svg"
    },
    {
      type: 'option',
      fun: (evt) => make(evt, 'double-arrow'),
      name: 'D-Arrow',
      icon: "assets/icons/arrow-double-red.svg"
    },
    {
      type: 'option',
      fun: (evt) => make(evt, 'text'),
      name: 'Text',
      icon: "assets/icons/text-red.svg"
    },
  ]

  function make(evt, type) {
    evt.stopPropagation()
    makeObject(type, text)
  }

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
