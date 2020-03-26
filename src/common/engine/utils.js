export function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export function getRandomId() {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  )
}
