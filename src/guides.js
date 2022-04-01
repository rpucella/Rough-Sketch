
const xmlns = "http://www.w3.org/2000/svg"

export class Guides {
  constructor(svgNode, x, y) {
    this._drawer = document.createElementNS(xmlns, 'g')
    svgNode.appendChild(this._drawer)
    this._startX = x
    this._startY = y
    const rect = document.createElementNS(xmlns, 'rect')
    this._drawer.appendChild(rect)
    rect.setAttribute('id', 'rect')
    rect.setAttribute('x', this._startX)
    rect.setAttribute('y', this._startY)
    rect.setAttribute('width', 0)
    rect.setAttribute('height', 0)
    rect.setAttribute('stroke', '#ff3e00')
    rect.setAttribute('stroke-dasharray', '5 10')
    rect.setAttribute('fill', 'none')
    const line1 = document.createElementNS(xmlns, 'line')
    this._drawer.appendChild(line1)
    line1.setAttribute('id', 'line1')
    line1.setAttribute('x1', this._startX)
    line1.setAttribute('y1', this._startY)
    line1.setAttribute('x2', this._startX)
    line1.setAttribute('y2', this._startY)
    line1.setAttribute('stroke', '#ff3e00')
    line1.setAttribute('stroke-dasharray', '5 10')
    line1.setAttribute('fill', 'none')
    const line2 = document.createElementNS(xmlns, 'line')
    this._drawer.appendChild(line2)
    line2.setAttribute('id', 'line2')
    line2.setAttribute('x1', this._startX)
    line2.setAttribute('y1', this._startY)
    line2.setAttribute('x2', this._startX)
    line2.setAttribute('y2', this._startY)
    line2.setAttribute('stroke', '#ff3e00')
    line2.setAttribute('stroke-dasharray', '5 10')
    line2.setAttribute('fill', 'none')
    const line3 = document.createElementNS(xmlns, 'line')
    this._drawer.appendChild(line3)
    line3.setAttribute('id', 'line3')
    line3.setAttribute('x1', this._startX)
    line3.setAttribute('y1', this._startY)
    line3.setAttribute('x2', this._startX)
    line3.setAttribute('y2', this._startY)
    line3.setAttribute('stroke', '#ff3e00')
    line3.setAttribute('stroke-dasharray', '5 10')
    line3.setAttribute('fill', 'none')
    const text = document.createElementNS(xmlns, 'text')
    this._drawer.appendChild(text)
    text.setAttribute('id', 'text')
    text.setAttribute('x', this._startX)
    text.setAttribute('y', this._startY)
    text.setAttribute('dy', '0.35em')
    text.setAttribute('text-anchor', 'middle')
    text.setAttribute('font-size', '36px')
    text.setAttribute('stroke', '#ff3e00')
    text.setAttribute('opacity', '0.5')
  }

  move(tx, ty) {
    // Find top-left corner.
    const tlx = Math.min(this._startX, tx)
    const tly = Math.min(this._startY, ty)
    // Find width and height.
    const width = Math.abs(tx - this._startX)
    const height = Math.abs(ty - this._startY)
    const rect = document.getElementById('rect')
    rect.setAttribute('x', tlx)
    rect.setAttribute('y', tly)
    rect.setAttribute('width', width)
    rect.setAttribute('height', height)
    const line1 = document.getElementById('line1')
    const line2 = document.getElementById('line2')
    const line3 = document.getElementById('line3')
    if (width < height) {
      const margin = (height - width) / 2
      line1.setAttribute('x1', tlx)
      line1.setAttribute('y1', tly + margin)
      line1.setAttribute('x2', tlx + width)
      line1.setAttribute('y2', tly + margin)
      line2.setAttribute('x1', tlx)
      line2.setAttribute('y1', tly + margin + width)
      line2.setAttribute('x2', tlx + width)
      line2.setAttribute('y2', tly + margin + width)
    } else if (width > height) { 
      const margin = (width - height) / 2
      line1.setAttribute('x1', tlx + margin)
      line1.setAttribute('y1', tly)
      line1.setAttribute('x2', tlx + margin)
      line1.setAttribute('y2', tly + height)
      line2.setAttribute('x1', tlx + margin + height)
      line2.setAttribute('y1', tly)
      line2.setAttribute('x2', tlx + margin + height)
      line2.setAttribute('y2', tly + height)
    }
    line3.setAttribute('x1', this._startX)
    line3.setAttribute('y1', this._startY)
    line3.setAttribute('x2', tx)
    line3.setAttribute('y2', ty)
    const text = document.getElementById('text')
    text.setAttribute('x', (this._startX + tx) / 2)
    text.setAttribute('y', (this._startY + ty) / 2)
  }

  updateText(str) {
    const text = document.getElementById('text')
    text.textContent = str
  }

/*
// This is the kind of code that will split a string over multiple
// text nodes if it is too wide.
// I probably need to replace the single text node about with <g>,
// and make sure that the (x,y) we have is the center node of the
// whole set of lines, both horizontally (easy) and vertically (harder).

function labelTopAutoSplit (svg,x,y,width,font,label) {
let g = svg.append("g");
let words = label.split(/\s+/).reverse(),
word,
line = [],
dy = 0.35,
lineNumber = 0,
lineHeight = 1.1;  // ems
let text = g.append("text")
.attr("x", x)
.attr("y", y)
.attr("dy", dy + "em")
.attr("text-anchor","middle")
.call(fontAttrs,font);
while (word = words.pop()) {
line.push(word);
text.text(line.join(" "));
if (text.node().getComputedTextLength() > width && line.length > 1) {
// if the line length is > allotted width, drop the last word added
// unless that word is the only word in the line
line.pop();
text.text(line.join(" "));
line = [word];
text = g.append("text")
.attr("x", x)
.attr("y", y)
.attr("dy", ++lineNumber * lineHeight + dy + "em")
.attr("text-anchor","middle")
.call(fontAttrs,font)
.text(word);
}
}
}
*/

  remove() {
    while (this._drawer.firstChild) {
      this._drawer.firstChild.remove()
    }
    this._drawer.remove()
  }
}

