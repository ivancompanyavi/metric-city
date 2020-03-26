import { fromEvent } from 'rxjs'
import { map, filter } from 'rxjs/operators'

import Rect from './rect'
import Point from './point'

export default class Map {
  constructor({
    elementId,
    rows = 0,
    columns = 0,
    offset = 0,
    tile = {},
    tiles = [],
    width = 0,
    height = 0,
    color = '#0000FF',
  }) {
    if (tiles.length) {
      rows = columns = Math.ceil(Math.sqrt(tiles.length))
      if (!tile.width) tile.width = width / columns
      if (!tile.height) tile.height = height / rows
    }

    this.elementId = elementId
    this.rows = rows
    this.columns = columns
    this.offset = offset
    this.tile = tile
    this.color = color
    this.tiles = tiles
    this.canvas = null
    this.ctx = null
    this.map = []
    this.shapes = []
    this.events$ = {}
  }
  create() {
    this.canvas = document.getElementById(this.elementId)
    this.ctx = this.canvas.getContext('2d')

    const width = this.tile.width * this.rows
    const height = this.tile.height * this.columns

    this.canvas.setAttribute('width', width + this.offset * 2)
    this.canvas.setAttribute('height', height + this.offset * 2)

    let i,
      j,
      k = 0
    for (i = 0; i < this.rows; i++) {
      for (j = 0; j < this.columns; j++) {
        this.map.push({
          x: i,
          y: j,
          points: this.drawShape(
            { x: i, y: j },
            Rect,
            {
              w: 1,
              h: 1,
              axis: 'z',
              color: this.color,
            },
            0,
            false,
          ),
          id: this.tiles.length && this.tiles[k] && this.tiles[k].id,
        })
        k++
      }
    }
    this.createStreams()
  }

  cartesianToIsometric(x, y) {
    let xi, xj, yi, yj, inside
    for (const tile of this.map) {
      const pointLength = tile.points.length
      inside = false
      for (let i = 0, j = pointLength - 1; i < pointLength; j = i++) {
        xi = tile.points[i].x
        yi = tile.points[i].y
        xj = tile.points[j].x
        yj = tile.points[j].y
        let intersect =
          yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
        if (intersect) inside = !inside
      }
      if (inside) {
        return { x: tile.x, y: tile.y }
      }
    }

    return null
  }

  isometricToCartesian(x, y) {
    const { width, height } = this.tile
    const x0 = width / 2 + this.offset
    const y0 = height / 2 + (height * this.rows) / 2 + this.offset
    return new Point(
      x0 + (x * width) / 2 + (y * width) / 2,
      y0 - (x * height) / 2 + (y * height) / 2,
    )
  }

  getMousePosition(evt) {
    const canvas = evt.target
    const rect = canvas.getBoundingClientRect()
    return new Point(evt.clientX - rect.left, evt.clientY - rect.top)
  }

  _onTileClick() {
    return fromEvent(this.canvas, 'click').pipe(
      map(evt => this.getMousePosition(evt)),
      map(coords => this.cartesianToIsometric(coords.x, coords.y)),
      filter(coords => coords !== null),
      map(coords => this.getMapTileAtIsometricPosition(coords)),
    )
  }

  _onTileHover() {
    return fromEvent(this.canvas, 'mousemove').pipe(
      map(evt => this.getMousePosition(evt)),
      map(coords => this.cartesianToIsometric(coords.x, coords.y)),
      filter(coords => coords !== null),
      map(coords => this.getMapTileAtIsometricPosition(coords)),
    )
  }
  _onTileLeave() {
    return fromEvent(this.canvas, 'mouseleave').pipe(
      map(evt => this.getMousePosition(evt)),
      map(coords => this.cartesianToIsometric(coords.x, coords.y)),
      filter(coords => coords === null),
    )
  }

  createStreams() {
    this.events$.onTileClick = this._onTileClick()
    this.events$.onTileHover = this._onTileHover()
    this.events$.onTileLeave = this._onTileLeave()
  }

  drawShape(
    isometricPosition = { x: 0, y: 0 },
    ShapeClass,
    data = {},
    pct = 0.0,
    persist = true,
  ) {
    const { ctx, tile } = this
    const point = this.isometricToCartesian(
      isometricPosition.x,
      isometricPosition.y,
    )
    const s = new ShapeClass({ ctx, tile, point, pct })
    const coords = s.draw(data)
    if (persist) {
      this.shapes.push({
        label: data.label,
        point: isometricPosition,
        instance: s,
      })
    }
    return coords
  }

  repaint() {
    this.shapes.sort((a, b) => {
      const yDif = a.point.y - b.point.y
      if (yDif === 0) {
        return b.point.x - a.point.x
      }
      return yDif
    })
    this.shapes.forEach(s => {
      this.drawShape(
        s.point,
        s.instance.constructor,
        { color: s.instance.color, label: s.label },
        s.instance.pct,
        false,
      )
    })
  }

  getMapTileAtIsometricPosition({ x, y }) {
    return this.map.find(s => s.x == x && s.y == y)
  }
}
