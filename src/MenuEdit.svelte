
<script>

  import Menu from './Menu.svelte'
  import InputLabel from './InputLabel.svelte'
  
  export let x
  export let y
  export let obj
  export let moveObject
  export let deleteObject
  export let resizeObject
  export let cloneObject
  export let selectNextObject
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
    },
    {
      name: 'Clone',
      type: 'option',
      icon: 'assets/icons/clone.svg',
      fun: clone
    },
    {
      name: 'Next',
      type: 'option',
      icon: 'assets/icons/select-down.svg',
      fun: next
    }
  ]

  function move(evt) {
    evt.stopPropagation()
    moveObject(obj, evt.clientX, evt.clientY)
  }

  function del(evt) {
    evt.stopPropagation()
    deleteObject(obj, evt.clientX, evt.clientY)
  }

  function resize(evt) {
    evt.stopPropagation()
    resizeObject(obj, evt.clientX, evt.clientY)
  }

  function change(evt) {
    evt.stopPropagation()
    menuChange()
  }

  function clone(evt) {
    evt.stopPropagation()
    cloneObject(obj, evt.clientX, evt.ClientY)
  }

  function next(evt) {
    evt.stopPropagation()
    selectNextObject(obj, evt.clientX, evt.ClientY)
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
  name='Edit'
  />

<InputLabel updateText={updateLabel} value={obj.text} />
