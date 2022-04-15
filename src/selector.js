
const xmlns = "http://www.w3.org/2000/svg"


function inObject(x, y, obj) {
  // TODO: maintain the invariant that [0,1] is always TL and [2,3] always BR?
  const minX = Math.min(obj.box[0], obj.box[2])
  const maxX = Math.max(obj.box[0], obj.box[2])
  const minY = Math.min(obj.box[1], obj.box[3])
  const maxY = Math.max(obj.box[1], obj.box[3])
  return x >= minX && x <= maxX && y >= minY && y <= maxY
}

function findObject(objects, x, y) {
  for (let i = objects.length - 1; i >= 0; i--) {
    if (inObject(x, y, objects[i])) {
      return objects[i]
    }
  }
  return null
}

export class Selector {
  constructor(svgNode) {
    this._node = svgNode
    this._hover = null
    this._object = null
  }

  isSelected() {
    return !!this._object
  }

  select(objects, pX, pY) {
    const obj = findObject(objects, pX, pY)
    this.selectObject(obj)
  }

  selectObject(obj) {
    if (this._object) {
      if (obj) {
        if (this._object.id !== obj.id) {
          this.clear()
          this._select(obj)
        }
      } else {
        this.clear()
      }
    } else {
      if (obj) {
        this._select(obj)
      }
    }
  }

  _select(obj) {
    this._object = obj
    this._hover = document.createElementNS(xmlns, 'rect')
    this._node.appendChild(this._hover)
    const box = obj.box
    const minX = Math.min(box[0], box[2])
    const maxX = Math.max(box[0], box[2])
    const minY = Math.min(box[1], box[3])
    const maxY = Math.max(box[1], box[3])
    ///this._hover.setAttribute('id', 'hovering')
    this._hover.setAttribute('x', minX - 5)
    this._hover.setAttribute('y', minY - 5)
    this._hover.setAttribute('width', maxX - minX + 10)
    this._hover.setAttribute('height', maxY - minY + 10)
    // this._hover.setAttribute('x', 0)
    // this._hover.setAttribute('y', 0)
    // this._hover.setAttribute('width', 0)
    // this._hover.setAttribute('height', 0)
    this._hover.setAttribute('stroke', '#003eff')
    this._hover.setAttribute('stroke-dasharray', '5 10')
    this._hover.setAttribute('fill', 'none')
  }

  object() {
    return this._object
  }

  clear() {
    if (this.isSelected()) { 
      this._hover.remove()
      this._hover = null
      this._object = null
    }
  }
}


  
