/**
 * Перевод позиции найденного объекта в новую систему координат
 * @param newWidth - размер изображения в верстке
 * @param width - размер реального изображения
 * @param coords - координаты объекта
 * @returns массив координат
 */
export function updateCoords(
  newWidth: number,
  width: number,
  coords: number[]
) {
  const proportionality = newWidth / width

  return coords.map((coord) => {
    return coord * proportionality
  })
}
