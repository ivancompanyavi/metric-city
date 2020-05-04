
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
const template = document.createElement('template');
template.innerHTML = `
  <style>
  :host {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }
  </style>
  <slot></slot>
`;

class City extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.appendChild(template.content.cloneNode(true));
    this.initListeners();
  }

  get width() {
    return this.dataset.width
  }

  set width(newValue) {
    this.dataset.width = newValue;
  }

  get height() {
    return this.dataset.height
  }

  set height(newValue) {
    this.dataset.height = newValue;
  }

  get rows() {
    return this.dataset.rows
  }

  set rows(newValue) {
    this.dataset.rows = newValue;
  }

  get columns() {
    return this.dataset.columns
  }

  set columns(newValue) {
    this.dataset.columns = newValue;
  }

  get offset() {
    return this.dataset.offset
  }

  initListeners() {
    this.addEventListener('click', evt => {
      document.dispatchEvent(new CustomEvent('city-click', { detail: evt }));
    });
    let layerEventBuffer = [];
    document.addEventListener('city-element-clicked', evt => {
      const layers = this.querySelectorAll('hoot-layer');
      layerEventBuffer.push(evt.detail);
      if (layerEventBuffer.length === layers.length) {
        console.log(this.processLayerEvents(layerEventBuffer));
        layerEventBuffer = [];
      }
    });
  }

  processLayerEvents(events) {
    events.sort((a, b) => b.layerId - a.layerId);
    const filteredEvents = events.filter(e => e.element);
    if (filteredEvents.length) {
      return filteredEvents[0]
    }
  }
}

customElements.define('hoot-city', City);

function getRandomId() {
  return '_' + Math.random().toString(36).substr(2, 9)
}

class CityElement extends HTMLElement {
  constructor() {
    super();
    this._city = null;
  }

  getAttr(key, defaultValue) {
    let value = this.dataset[key];
    if (value === undefined || value === null) {
      return defaultValue
    }
    return value
  }

  get city() {
    if (!this._city) {
      this._city = document.querySelector('hoot-city');
    }
    return this._city
  }

  get width() {
    return this.city.dataset.width
  }

  get height() {
    return this.city.dataset.height
  }
  get rows() {
    return this.city.dataset.rows
  }
  get columns() {
    return this.city.dataset.columns
  }
  get offset() {
    return this.city.dataset.offset || 0
  }

  connectedCallback() {
    this.setAttribute('id', getRandomId());
  }
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color
}

class LayerCounter {
  constructor() {
    this.counter = 1;
  }

  getCount() {
    return this.counter++
  }
}

const layerCounter = new LayerCounter();

class DrawableElement {
  constructor(ctx, isoPos, shape, data) {
    this.ctx = ctx;
    this.shape = shape;
    this.isoPos = isoPos;
    this.data = data;
  }
}

class LayerElement extends CityElement {
  constructor() {
    super();
    this._ctx = null;
    this._hitCtx = null;
    this._elements = null;
    this.initListeners();
  }

  get x() {
    return parseInt(this.dataset.x) || 0
  }

  get y() {
    return parseInt(this.dataset.y) || 0
  }

  get ctx() {
    if (!this._ctx) {
      const layer = this._getClosestLayer();
      this._ctx = layer.shadowRoot.querySelector('canvas').getContext('2d');
    }
    return this._ctx
  }

  get hitCtx() {
    if (!this._hitCtx) {
      const layer = this._getClosestLayer();
      this._hitCtx = layer._hitCtx;
    }
    return this._hitCtx
  }

  get elements() {
    if (!this._elements) {
      const layer = this._getClosestLayer();
      this._elements = layer.elements;
    }
    return this._elements
  }

  _getClosestLayer() {
    let elem = this;
    for (; elem && elem !== document; elem = elem.parentNode) {
      if (elem.matches('hoot-layer')) return elem
    }
  }

  isometricToCartesian(isoPos) {
    const { width, height, rows } = this;
    const { x, y } = isoPos;
    const x0 = width / 2 + this.offset;
    const y0 = height / 2 + (height * rows) / 2 + this.offset;
    return {
      x: x0 + (x * width) / 2 + (y * width) / 2,
      y: y0 - (x * height) / 2 + (y * height) / 2,
    }
  }

  initListeners() {
    document.addEventListener('city-updated', () => {
      this._ctx = null;
      this._hitCtx = null;
      this._elements = null;
      this.draw(this.getDrawable());
    });
  }

  draw(drawable) {
    const { width, height } = this;
    const s = new drawable.shape({
      ctx: drawable.ctx,
      width,
      height,
      point: this.isometricToCartesian(drawable.isoPos),
    });
    const coords = s.draw(drawable.data);
    this.drawHitGraph(drawable);
    return coords
  }

  drawHitGraph(drawable) {
    const { width, height } = this;

    const hitGraphDrawable = new drawable.shape({
      ctx: this.hitCtx,
      width,
      height,
      point: this.isometricToCartesian(drawable.isoPos),
    });
    const color = getRandomColor();
    drawable.data.color = color;
    this.dataset._hitcolor = color;
    drawable.data.id = this.getAttribute('id');
    hitGraphDrawable.drawHitGraph(drawable.data);
    this.elements.push(this);
  }

  getShape() {
    throw Error('Missing mandatory method implementation: getShape')
  }

  getData() {
    return {}
  }

  getDrawable() {
    return new DrawableElement(
      this.ctx,
      { x: this.x, y: this.y },
      this.getShape(),
      this.getData(),
    )
  }

  connectedCallback() {
    super.connectedCallback();
    this.draw(this.getDrawable());
  }
}

class Shape {
  constructor({ ctx, width, height, point }) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.point = point;
  }
  draw() {}

  drawHitGraph() {}

  getColor(color = this.color) {
    return color
  }
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  compare(point) {
    if (this.x === point.x) {
      return this.y - point.y
    }
    return this.x - point.x
  }
}

const STROKE_COLOR = '#333333';

class Rect extends Shape {
  draw({
    w,
    h,
    axis = 'x',
    color = 'black',
    point = this.point,
    coords = null,
    strokeColor = STROKE_COLOR,
  }) {
    const { x, y } = point;

    let points = [];
    const { width, height } = this;
    if (axis === 'x') {
      points[0] = new Point(x, y);
      points[1] = new Point(x, y - height * h);
      points[2] = new Point(
        x + (width * w) / 2,
        y - height * h - (height * w) / 2,
      );
      points[3] = new Point(x + (width * w) / 2, y - (height * w) / 2);
      if (coords) {
        points = points.map(
          p =>
            new Point(
              p.x + (coords.x * width) / 2,
              p.y - (coords.x * height) / 2 - coords.y * height,
            ),
        );
      }
    } else if (axis === 'y') {
      points[0] = new Point(x, y);
      points[1] = new Point(x, y - height * h);
      points[2] = new Point(
        x - (width * w) / 2,
        y - height * h - (height * w) / 2,
      );
      points[3] = new Point(x - (width * w) / 2, y - (height * w) / 2);

      if (coords) {
        points = points.map(
          p =>
            new Point(
              p.x - (coords.x * width) / 2,
              p.y - (coords.x * height) / 2 - coords.y * height,
            ),
        );
      }
    } else {
      points[0] = new Point(x, y);
      points[1] = new Point(x - (width * w) / 2, y - (height * w) / 2);
      points[2] = new Point(
        x - (width * w) / 2 + (width * h) / 2,
        y - (height * h) / 2 - (height * w) / 2,
      );
      points[3] = new Point(x + (width * h) / 2, y - (height * h) / 2);
      if (coords) {
        points = points.map(
          p =>
            new Point(
              p.x + (coords.x * width) / 2 + (coords.y * width) / 2,
              p.y - (coords.x * height) / 2 + (coords.y * height) / 2,
            ),
        );
      }
    }

    this.ctx.beginPath();
    this.ctx.moveTo(points[0].x, points[0].y);
    this.ctx.lineTo(points[1].x, points[1].y);
    this.ctx.lineTo(points[2].x, points[2].y);
    this.ctx.lineTo(points[3].x, points[3].y);

    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = strokeColor;
    this.ctx.stroke();
    this.ctx.fill();
    return points
  }
}

class Dimension2D {
  constructor(width, height) {
    this.w = width;
    this.h = height;
  }
}

class Dimension3D {
  constructor(width, height, depth) {
    this.w = width;
    this.h = height;
    this.d = depth;
  }
}

class Cube extends Shape {
  draw({ w, h, d, strokeColor, color = '#000000', point = this.point }) {
    const { ctx, width, height } = this;
    const rect = new Rect({ ctx, width, height, point });
    const side1 = rect.draw({
      ...new Dimension2D(w, h),
      axis: 'x',
      color: this.getColor(color),
      strokeColor,
    });
    const side2 = rect.draw({
      ...new Dimension2D(d, h),
      axis: 'y',
      color: this.getColor(color),
      strokeColor,
    });
    // Modify the point to render for the topside rect
    rect.point = {
      x: rect.point.x,
      y: rect.point.y - h * height,
    };
    const side3 = rect.draw({
      ...new Dimension2D(d, w),
      axis: 'z',
      color: this.getColor(color),
      strokeColor,
    });
    return [side1, side2, side3]
  }
}

class TextTile extends Shape {
  draw({ text = '', textColor = 'white', font = '20px Arial' }) {
    const { ctx, height, point } = this;
    ctx.font = font;
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.fillText(text, point.x, point.y - height / 2);
  }
}

const percentColors = [
  { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
  { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
  { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } },
];

function calculateColor(pct) {
  let i;
  for (i = 1; i < percentColors.length - 1; i++) {
    if (pct < percentColors[i].pct) {
      break
    }
  }
  const lower = percentColors[i - 1];
  const upper = percentColors[i];
  const range = upper.pct - lower.pct;
  const rangePct = (pct - lower.pct) / range;
  const pctLower = 1 - rangePct;
  const pctUpper = rangePct;
  const color = {
    r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
    g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
    b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper),
  };
  return `#${color.r.toString(16).padStart(2, '0')}${color.g
    .toString(16)
    .padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`
  // or output as hex if preferred
}

class Building extends Shape {
  constructor(data) {
    super(data);
    this.pct = data.pct || 0;
  }

  getColor(color, wall = false) {
    if (wall && this.pct) {
      return calculateColor(this.pct)
    }
    return super.getColor(color)
  }
}

class FireStation extends Building {
  drawHitGraph(data) {
    this.draw({ ...data, strokeColor: data.color });
  }

  draw(data) {
    this._drawFirstBlock(data);
  }

  _drawFirstBlock({ color, strokeColor }) {
    const { ctx, width, height, point } = this;

    const cube = new Cube({ ctx, width, height, point });
    const rect = new Rect({ ctx, width, height, point });
    // Walls
    let tempPoint = cube.draw({
      w: 8,
      h: 6,
      d: 7,
      color: this.getColor(color || '#D5251F', true),
      strokeColor,
      point,
    });
    cube.draw({
      w: 8,
      h: 1,
      d: 7,
      color: this.getColor(color || '#FFFFFF'),
      strokeColor,
      point: tempPoint[2][0],
    });

    // Windows
    rect.draw({
      w: 3,
      h: 4,
      axis: 'x',
      color: this.getColor(color || '#7CA1D2'),
      strokeColor,
      point,
      coords: { x: 4, y: 1 },
    });
    rect.draw({
      w: 2,
      h: 3,
      axis: 'y',
      color: this.getColor(color || '#7CA1D2'),
      strokeColor,
      point,
      coords: { x: 1, y: 1 },
    });
    rect.draw({
      w: 2,
      h: 3,
      axis: 'y',
      color: this.getColor(color || '#7CA1D2'),
      strokeColor,
      point,
      coords: { x: 4, y: 1 },
    });

    // Door
    rect.draw({
      w: 2,
      h: 3,
      axis: 'x',
      color: this.getColor(color || '#7CA1D2'),
      strokeColor,
      point,
      coords: { x: 1, y: 0 },
    });
  }
}

class Hospital extends Building {
  drawHitGraph(data) {
    this.draw({ ...data, strokeColor: data.color });
  }

  draw(data) {
    this._drawSecondBlock(data);
    this._drawFirstBlock(data);
  }

  _drawFirstBlock({ color, strokeColor }) {
    let tempPoint;
    const { ctx, width, height, point: p } = this;
    const point = new Point(this.point.x, this.point.y);
    const cube = new Cube({ ctx, width, height, point: p });
    const rect = new Rect({ ctx, width, height, point: p });
    // Walls
    tempPoint = cube.draw({
      ...new Dimension3D(5, 7, 5),
      color: this.getColor(color || '#B9B5AC', true),
      strokeColor,
      point,
    });
    tempPoint = cube.draw({
      ...new Dimension3D(5, 1, 5),
      color: this.getColor(color || '#81645E', true),
      strokeColor,
      point: tempPoint[2][0],
    });
    tempPoint = cube.draw({
      ...new Dimension3D(5, 1, 5),
      color: this.getColor(color || '#FFFFFF'),
      strokeColor,
      point: tempPoint[2][0],
    });
    cube.draw({
      ...new Dimension3D(5, 4, 5),
      color: this.getColor(color || '#81645E', true),
      strokeColor,
      point: tempPoint[2][0],
    });

    // Windows
    const windows = [
      new Point(1, 1),
      new Point(1, 4),
      new Point(3, 4),
      new Point(3, 1),
    ];
    windows.forEach(w => {
      rect.draw({
        ...new Dimension2D(1, 2),
        axis: 'x',
        color: this.getColor(color || '#FFFFFF'),
        strokeColor,
        point,
        coords: w,
      });
      rect.draw({
        ...new Dimension2D(1, 2),
        axis: 'y',
        color: this.getColor(color || '#FFFFFF'),
        strokeColor,
        point,
        coords: w,
      });
    });

    // Cross
    rect.draw({
      ...new Dimension2D(1, 3),
      axis: 'x',
      color: this.getColor(color || '#FFFFFF'),
      strokeColor,
      point,
      coords: new Point(2, 10),
    });
    rect.draw({
      ...new Dimension2D(3, 1),
      axis: 'x',
      color: this.getColor(color || '#FFFFFF'),
      strokeColor,
      point,
      coords: new Point(1, 11),
    });
    // Now we draw the cross
  }

  _drawSecondBlock({ color, strokeColor }) {
    let tempPoint;
    const { ctx, width, height, point } = this;
    const cube = new Cube({ ctx, width, height, point });
    const rect = new Rect({ ctx, width, height, point });
    const firstPoint = new Point(
      point.x + (7 * width) / 2,
      point.y - (3 * height) / 2,
    );
    // Walls
    tempPoint = cube.draw({
      ...new Dimension3D(9, 7, 7),
      color: this.getColor(color || '#B9B5AC', true),
      strokeColor,
      point: firstPoint,
    });
    tempPoint = cube.draw({
      ...new Dimension3D(9, 1, 7),
      color: this.getColor(color || '#81645E', true),
      strokeColor,
      point: tempPoint[2][0],
    });
    tempPoint = cube.draw({
      ...new Dimension3D(9, 1, 7),
      color: this.getColor(color || '#FFFFFF'),
      strokeColor,
      point: tempPoint[2][0],
    });
    tempPoint = cube.draw({
      ...new Dimension3D(9, 4, 7),
      color: this.getColor(color || '#81645E', true),
      strokeColor,
      point: tempPoint[2][0],
    });
    // Door
    rect.draw({
      ...new Dimension2D(3, 3),
      axis: 'x',
      color: this.getColor(color || 'blue'),
      strokeColor,
      point: firstPoint,
      coords: new Point(3, 0),
    });
    // Windows
    const windows = [
      new Point(1, 1),
      new Point(1, 4),
      new Point(3, 4),
      new Point(5, 4),
      new Point(7, 4),
      new Point(7, 1),
    ];
    windows.forEach(w => {
      rect.draw({
        ...new Dimension2D(1, 2),
        axis: 'x',
        color: this.getColor(color || '#FFFFFF'),
        strokeColor,
        point: firstPoint,
        coords: w,
      });
    });
  }
}

const DEFAULT_COLOR = '#cb4154';
const TRANSPARENCY = '66';

class House extends Building {
  drawHitGraph(data) {
    const { w, t, h, pct, color } = data;
    const { ctx, width, height, point } = this;
    const tall = pct === 0.0 ? 0 : t;
    const cube = new Cube({ ctx, width, height, point });
    return cube.draw({
      ...new Dimension3D(w, tall, h),
      color,
      point,
      strokeColor: color,
    })
  }

  draw(data) {
    const { pct } = data;
    let invisibleStartingPoint = this.point;
    if (pct === 0.0) {
      this._drawFundation(data);
    } else {
      if (pct > 0.0) {
        invisibleStartingPoint = this._drawVisiblePart(data)[0][1];
      }
      if (pct < 1.0) {
        this._drawInvisiblePart(data, invisibleStartingPoint);
      }
    }
  }

  _drawFundation(data) {
    const { w, h } = data;
    const { ctx, width, height, point } = this;
    const cube = new Cube({ ctx, width, height, point });
    return cube.draw({
      ...new Dimension3D(w, 0, h),
      color: this.getColor(`${DEFAULT_COLOR}`),
      point,
    })
  }

  _drawVisiblePart(data) {
    const { pct, w, h, t, color } = data;
    const { ctx, width, height, point: p } = this;
    const point = new Point(this.point.x, this.point.y);
    const cube = new Cube({ ctx, width, height, point: p });
    // Walls
    return cube.draw({
      ...new Dimension3D(w, Math.floor(pct * t), h),
      color: color,
      point,
    })
  }

  _drawInvisiblePart(data, startingPoint) {
    const { pct, w, h, t, color } = data;
    const { ctx, width, height, point: p } = this;
    const cube = new Cube({ ctx, width, height, point: p });
    // Walls
    cube.draw({
      ...new Dimension3D(w, t - Math.floor(t * pct), h),
      color: this.getColor(`${color}${TRANSPARENCY}`),
      point: startingPoint,
    });
  }
}

const COLOR = '#7cfc00';

class Park extends Building {
  drawHitGraph(data) {
    this.draw({ ...data, strokeColor: data.color });
  }
  draw(data) {
    this._drawFloor(data);
  }

  _drawFloor({ w, h, color = COLOR, strokeColor }) {
    const { ctx, width, height, point: p } = this;
    const point = new Point(p.x, p.y);
    const cube = new Cube({ ctx, width, height, point: p });
    // Walls
    return cube.draw({
      ...new Dimension3D(w, 0, h),
      color: this.getColor(`${color}`, true),
      strokeColor,
      point,
    })
  }
}

const ROAD_WIDTH = 1;

class Road extends Shape {
  draw({ length, direction = 'right' }) {
    const { ctx, width, height, point } = this;
    const rect = new Rect({ ctx, width, height, point });
    const road = rect.draw({
      ...new Dimension2D(
        direction === 'right' ? ROAD_WIDTH : length,
        direction === 'right' ? length : ROAD_WIDTH,
      ),
      axis: 'z',
      color: this.getColor('#807e78'),
    });

    for (let i = 0; i < length; i += 2) {
      rect.draw({
        ...new Dimension2D(
          direction === 'left' ? 1 : 0.3,
          direction === 'left' ? 0.3 : 1,
        ),
        axis: 'z',
        color: this.getColor('#ffffff'),
        coords: {
          x: direction === 'left' ? 0 : i,
          y: direction === 'left' ? -i : 0,
        },
        point: {
          x:
            direction === 'left'
              ? this.point.x - width / 2
              : this.point.x + width / 2,
          y:
            direction === 'left'
              ? this.point.y - height / 2
              : this.point.y - height / 2,
        },
      });
    }
    return road
  }
}

class TileMap extends Building {
  drawHitGraph(data) {
    this.draw({ ...data, strokeColor: data.color });
  }
  draw(data) {
    const { ctx, width, height, point } = this;
    const { color, rows, columns, strokeColor } = data;
    const d = { w: 1, h: 1, axis: 'z', color, strokeColor };
    const rect = new Rect({ ctx, width, height, point });
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        rect.draw({ ...d, coords: { x: i, y: j } });
      }
    }
  }
}

class HootFireStation extends LayerElement {
  getData() {
    return {}
  }

  getShape() {
    return FireStation
  }
}

customElements.define('hoot-fire-station', HootFireStation);

class HootHospital extends LayerElement {
  getData() {
    return {}
  }

  getShape() {
    return Hospital
  }
}

customElements.define('hoot-hospital', HootHospital);

class HootHouse extends LayerElement {
  getData() {
    return {
      pct: this.getAttr('pct', 0.0),
      w: this.getAttr('w', 4),
      h: this.getAttr('h', 4),
      t: this.getAttr('t', 10),
      color: this.getAttr('color', getRandomColor()),
    }
  }

  getShape() {
    return House
  }
}

customElements.define('hoot-house', HootHouse);

const SIDEBAR_WIDTH = 100;
const HEADER_HEIGHT = 60;

const template$1 = `
  <style>
    canvas {
      position: absolute;
    }
    #hitgraph {
      opacity: 0;
    }
  </style>
  <canvas id="layer"></canvas>
  <canvas id="hitgraph"></canvas>
`;

class Layer extends CityElement {
  constructor() {
    super();
    this.layerId = layerCounter.getCount();

    this.init();
    this.initListeners();
  }

  init() {
    this.elements = [];
    this.tpl = this.initTemplate();
    const _hitGraph = this.tpl.content.getElementById('hitgraph');
    this._hitCtx = _hitGraph.getContext('2d');
    this.initCanvas('layer');
    this.initCanvas('hitgraph');
    this.initShadow();
  }

  initTemplate() {
    const tpl = document.createElement('template');
    tpl.innerHTML = template$1;
    return tpl
  }

  initShadow() {
    if (!this.shadow) {
      this.shadow = this.attachShadow({ mode: 'open' });
    }
    this.shadow.textContent = '';
    this.shadow.appendChild(this.tpl.content);
  }

  initCanvas(canvasName) {
    const canvas = this.tpl.content.getElementById(canvasName);
    canvas.setAttribute('width', this.width * this.rows);
    canvas.setAttribute('height', this.height * this.columns);
  }

  initListeners() {
    document.addEventListener('city-click', evt => {
      const element = this.getClickedElement(evt);
      if (element) {
        const event = new CustomEvent('city-element-clicked', {
          detail: {
            element,
            layerId: this.layerId,
          },
        });
        document.dispatchEvent(event);
      }
    });

    document.addEventListener('city-updated', () => {
      this.init();
    });
  }
  getMousePosition(evt) {
    return { x: evt.pageX, y: evt.pageY }
  }

  getClickedElement(evt) {
    const point = this.getMousePosition(evt.detail);
    const pixel = this._hitCtx.getImageData(
      point.x - SIDEBAR_WIDTH,
      point.y - HEADER_HEIGHT,
      1,
      1,
    ).data;
    const color = `#${this.componentToHex(pixel[0])}${this.componentToHex(
      pixel[1],
    )}${this.componentToHex(pixel[2])}`;
    return this.elements.find(e => e.dataset._hitcolor === color.toUpperCase())
  }

  componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex
  }
}

customElements.define('hoot-layer', Layer);

class HootPark extends LayerElement {
  getData() {
    return {
      w: this.getAttr('w', 4),
      h: this.getAttr('h', 4),
    }
  }

  getShape() {
    return Park
  }
}

customElements.define('hoot-park', HootPark);

class HootRoad extends LayerElement {
  getData() {
    let defaultLength = this.city.columns;
    const dir = this.getAttr('direction', 'right');
    if (dir === 'right') {
      defaultLength = this.city.rows;
    }
    return {
      length: this.getAttr('length', defaultLength),
      direction: dir,
    }
  }

  getShape() {
    return Road
  }
}

customElements.define('hoot-road', HootRoad);

class HootTextTile extends LayerElement {
  getData() {
    return {
      text: this.getAttr('text', ''),
      textColor: this.getAttr('textColor', 'white'),
      font: this.getAttr('font', '20px aria'),
    }
  }

  getShape() {
    return TextTile
  }
}

customElements.define('hoot-text', HootTextTile);

class HootTileMap extends LayerElement {
  get color() {
    return this.dataset.color
  }

  getData() {
    return {
      rows: this.rows,
      columns: this.columns,
      color: this.color,
    }
  }

  getShape() {
    return TileMap
  }
}

customElements.define('hoot-tile-map', HootTileMap);

const template$2 = /*html*/ `
  <style>
    hoot-config-bar {
      position: absolute;
      right: 0;
      height: 100%;
      width: 350px;
      background: var(--color-grey);
    }
  </style>
  <aside>
    <form>
    </form>
  </aside>
`;

class ConfigBar extends HTMLElement {
  constructor() {
    super();
    this.initListeners();
    this.inputs = [];
    this.selectedElement = null;
  }

  initListeners() {
    document.addEventListener('city-element-clicked', evt => {
      this.selectedElement = event.detail.element;
      this.inputs = this.renderInputs(event.detail.element);
      this.render();
    });
  }

  renderInputs(element) {
    const inputs = [];
    Object.keys(element.dataset).forEach(field => {
      if (!field.startsWith('_')) {
        inputs.push([field, element.dataset[field]]);
      }
    });
    return inputs
  }

  render() {
    const form = this.querySelector('form');
    this.inputs.forEach(field => {
      form.insertAdjacentHTML(
        'beforeend',
        /*html*/ `
      <div class="fieldset">
        <label for="${field[0]}">${field[0]}<label>
        <input type="text" name="${field[0]}" value="${field[1]}" />
      </div>
      `,
      );
    });
    this.addInputListeners();
  }

  addInputListeners() {
    const inputs = this.querySelectorAll('input');
    console.log(inputs);
    inputs.forEach(input => {
      input.addEventListener('change', evt => {
        const key = evt.target.name;
        const value = evt.target.value;
        this.selectedElement.dataset[key] = value;
        this.updateCity();
      });
    });
  }

  updateCity() {
    document.dispatchEvent(new Event('city-updated'));
  }

  connectedCallback() {
    this.innerHTML = template$2;
  }
}

customElements.define('hoot-config-bar', ConfigBar);

const template$3 = /*html*/ `
<style>
  * {
    color: var(--color-white);
  }
:host {
    grid-area: content;
    position: relative;
}
</style>
<slot></slot>
`;

class Content extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = template$3;
  }
}

customElements.define('hoot-content', Content);

const template$4 = /*html*/ `
<style>
  hoot-nav {
    grid-area: nav;
    background-color: var(--color-grey);
  }
  nav {
    
    border-bottom: 1px solid black;
    height: 100%;
  }
  ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style-type: none;
    height: 80px;
    text-align: center;
  }

  li:hover {
    cursor: pointer;
  }

  li:hover i {
    color: var(--color-white);
  }

  a {
    display: flex;
    flex-align: center;
    justify-content: center;
    flex-direction: column;
    padding: 10px;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 12px;
    color: var(--color-grey-lighter);
  }

  a:hover {
    font-weight: bold;
  }

  a[selected=true] {
    background-color: var(--color-grey-lighter);
    color: var(--color-white);
  }

  a[selected=true] i {
    color: var(--color-white);
  }
  i {
    color: var(--color-grey-lighter);
    margin-bottom: 10px;
  }

</style>
<nav>
<ul>
    <li>
      <a href="/index.html">
        <i class="material-icons">map</i>
        view
      </a>
    </li>
    <li>
      <a href="/edit.html">
        <i class="material-icons">edit</i>
        edit
      </a>
    </li>
</ul>
</nav>
`;
class Nav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template$4;
    this.selectLink();
  }

  selectLink() {
    const url = new URL(window.location.href);
    this.querySelectorAll('a').forEach(link => {
      if (link.getAttribute('href') === url.pathname) {
        link.setAttribute('selected', true);
      }
    });
  }
}

customElements.define('hoot-nav', Nav);
