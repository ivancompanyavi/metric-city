import Shape from './shape'

export default class TextTile extends Shape {
  draw({ text = '', textColor = 'white', font = '20px Arial' }) {
    const { ctx, height, point } = this
    ctx.font = font
    ctx.fillStyle = textColor
    ctx.textAlign = 'center'
    ctx.fillText(text, point.x, point.y - height / 2)
  }
}
