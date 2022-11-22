
<script>

  import { onDestroy } from 'svelte'
  import Menu from './Menu.svelte'
  
  export let x
  export let y
  export let obj
  export let moveObject
  export let deleteObject
  export let resizeObject
  export let cancel
  export let updateText
  export let menuChange

  let options = [
    {
      name: 'Move',
      type: 'option',
      icon: 'assets/icons/move.svg',
      fun: move
    },
    {
      name: 'Resize',
      type: 'option',
      icon: 'assets/icons/resize.svg',
      fun: resize
    },
    {
      name: 'Delete',
      type: 'option',
      icon: 'assets/icons/delete.svg',
      fun: del
    },
    {
      name: 'Change',
      type: 'option',
      icon: 'assets/icons/change.svg',
      fun: change
    }
    /*
    {
      name: 'Forward',
      type: 'unavailable'
    },
    {
      name: 'Back',
      type: 'unavailable'
    }, */
  ]

  function move(evt) {
    moveObject(obj, evt.clientX, evt.clientY)
  }

  function del(evt) {
    deleteObject(obj, evt.clientX, evt.clientY)
  }

  function resize(evt) {
    resizeObject(obj, evt.clientX, evt.clientY)
  }

  function change(evt) {
    menuChange()
  }

  let chars = [...obj.text]
  let text = obj.text

  function handleKey(evt){
    evt.preventDefault()
    if (evt.key.length == 1 || (evt.key.length > 1 && /[^a-zA-Z0-9]/.test(evt.key))) {
      chars.push(evt.key)
      text = chars.join('')
      updateText(obj, text)
    } else if (evt.key === 'Spacebar') {
      chars.push(' ')
      text = chars.join('')
      updateText(obj, text)
    } else if (evt.key === 'Backspace') {
      chars.pop()
      text = chars.join('')
      updateText(obj, text)
    } else if (evt.key === 'Escape') {
      cancel()
    }
  }

  document.addEventListener('keydown', handleKey)

  onDestroy(() => { document.removeEventListener('keydown', handleKey) })
  
</script>

<Menu
  content={options}
  color='blue'
  x={x} y={y}
  cancel={cancel}
  name='Edit'
  />
