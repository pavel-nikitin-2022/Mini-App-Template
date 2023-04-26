export function fileFilter(file: File | string, index: number) {
  if (typeof file === 'string') return false
  const type = file.type.replace(/\/.+/, '')
  return type === 'image' && index === 0
}
