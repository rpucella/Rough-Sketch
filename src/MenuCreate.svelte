
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
      name: 'Rectangle'
    },
    {
      type: 'option',
      fun: () => makeObject('ellipse', text),
      name: 'Ellipse'
    },
    {
      type: 'option',
      fun: () => makeObject('circle', text),
      name: 'Circle'
    },
    {
      type: 'option',
      fun: () => makeObject('line', text),
      name: 'Line'
    },
    {
      type: 'option',
      fun: () => makeObject('arrow', text),
      name: 'Arrow'
    },
    {
      type: 'option',
      fun: () => makeObject('reverse-arrow', text),
      name: 'R-Arrow'
    },
    {
      type: 'option',
      fun: () => makeObject('double-arrow', text),
      name: 'D-Arrow'
    },
    {
      type: 'option',
      fun: () => makeObject('text', text),
      name: 'Text'
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
