export default {
  type: 'city',
  width: 30,
  height: 15,
  rows: 50,
  columns: 50,
  children: [
    {
      type: 'layer',
      id: 'map',
      children: [{ type: 'tile-map', x: 0, y: 0, color: '#9CD050' }],
    },
    {
      type: 'layer',
      id: 'buildings',
      children: [
        { type: 'house', x: 10, y: 29, pct: 0.4 },
        { type: 'text', x: 15, y: 32, text: 'Hello world' },
        { type: 'road', x: 0, y: 29, direction: 'right' },
        { type: 'road', x: 0, y: 39, length: 5, direction: 'left' },
        { type: 'fire-station', x: 18, y: 8 },
        { type: 'hospital', x: 0, y: 8 },
        { type: 'park', x: 0, y: 15 },
        { type: 'stacked-house', x: 15, y: 20, pct: 0.5 },
      ],
    },
  ],
}
