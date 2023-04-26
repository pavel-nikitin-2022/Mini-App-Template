/**
 * Для контекста Uploady фильтрует файлы в очереди
 * @param file - файл в обработке
 * @param index - порядковый номер файла в очереди
 * @returns может ли файл загружаться
 */
export function fileFilter(file: File | string, index: number) {
  if (typeof file === 'string') return false
  const type = file.type.replace(/\/.+/, '')
  return type === 'image' && index === 0
}
