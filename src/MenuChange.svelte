
<script>

  import Menu from './Menu.svelte'
  import InputLabel from './InputLabel.svelte'
  export let x
  export let y
  export let obj
  export let updateObject
  export let updateText
  export let cancel

  let options = [
    {
      type: 'option',
      name: 'Rectangle',
      icon: 'assets/icons/square-blue.svg',
      fun: (evt) => changeType(evt,'rectangle')
    },
    {
      type: 'option',
      name: 'Ellipse',
      icon: 'assets/icons/ellipse-blue.svg',
      fun: (evt) => changeType(evt,'ellipse')
    },
    {
      type: 'option',
      name: 'Circle',
      icon: 'assets/icons/circle-blue.svg',
      fun: (evt) => changeType(evt,'circle')
    },
    {
      type: 'option',
      name: 'Line',
      icon: 'assets/icons/line-blue.svg',
      fun: (evt) => changeType(evt,'line')
    },
    {
      type: 'option',
      name: 'Arrow',
      icon: 'assets/icons/arrow-right-blue.svg',
      fun: (evt) => changeType(evt,'arrow')
    },
    {
      type: 'option',
      name: 'R-Arrow',
      icon: 'assets/icons/arrow-left-blue.svg',
      fun: (evt) => changeType(evt,'reverse-arrow')
    },
    {
      type: 'option',
      name: 'D-Arrow',
      icon: 'assets/icons/arrow-double-blue.svg',
      fun: (evt) => changeType(evt,'double-arrow')
    },
    {
      type: 'option',
      name: 'Text',
      icon: 'assets/icons/text-blue.svg',
      fun: (evt) => changeType(evt,'text')
    },
  ]

  function changeType(evt, newType) {
    evt.stopPropagation()
    obj.type = newType
    obj.edited = true
    updateObject(obj)
  }

  function updateLabel(t) {
    updateText(obj, t)
  }

</script>

<Menu
  content={options}
  color='blue'
  x={x} y={y}
  cancel={cancel}
  name='Change'
  />

<InputLabel updateText={updateLabel} value={obj.text} />
