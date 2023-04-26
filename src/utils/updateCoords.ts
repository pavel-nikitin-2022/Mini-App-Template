export function updateCoords(
  newWidth: number,
  width: number,
  coords: number[]
) {
  const proportionality = newWidth / width
  console.log(proportionality, newWidth, width)
  return coords.map((coord) => {
    return coord * proportionality
  })
}
