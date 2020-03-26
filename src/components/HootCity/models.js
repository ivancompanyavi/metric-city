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
  const canvas = evt.target
  const rect = canvas.getBoundingClientRect()
  return { x: evt.clientX - rect.left, y: evt.clientY - rect.top }
}
