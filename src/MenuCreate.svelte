
<script>

  import Menu from './Menu.svelte'
  import { onDestroy } from 'svelte'
  export let x
  export let y
  export let cancel
  export let makeObject
  export let updateText

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
    // {
    //   type: 'separator'
    // },
    // {
    //   type: 'option',
    //   fun: cancel,
    //   name: 'Cancel'
    // },
  ]

  let chars = []
  let text = ''

  function handleKey(evt){
    evt.preventDefault()
    if (evt.key.length == 1 || (evt.key.length > 1 && /[^a-zA-Z0-9]/.test(evt.key))) {
      chars.push(evt.key)
      text = chars.join('')
      updateText(text)
    } else if (evt.key === 'Spacebar') {
      chars.push(' ')
      text = chars.join('')
      updateText(text)
    } else if (evt.key === 'Backspace') {
      chars.pop()
      text = chars.join('')
      updateText(text)
    } else if (evt.key === 'Escape') {
      cancel()
    }
  }

  document.addEventListener('keydown', handleKey)

  onDestroy(() => { document.removeEventListener('keydown', handleKey) })
  
</script>

<Menu
  x={x}
  y={y}
  content={options}
  name='Create'
  color='red'
  cancel={cancel}
  />
