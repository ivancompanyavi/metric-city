import { getRandomId } from '../../common/engine/utils'

export class DrawableElement {
  constructor(ctx, isoPos, shape, data) {
    this.ctx = ctx
    this.shape = shape
    this.isoPos = isoPos
    this.data = data
    this.id = getRandomId()
  }
}

export function getMousePosition(evt) {
  return { x: evt.pageX, y: evt.pageY }
}

class LayerCounter {
  constructor() {
    this.counter = 1
  }

  getCount() {
    return this.counter++
  }
}

const layerCounter = new LayerCounter()

export { layerCounter }
