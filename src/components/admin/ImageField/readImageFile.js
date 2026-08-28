const MAX_DIMENSION = 1600
const JPEG_QUALITY = 0.85

const readAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('The selected file could not be read.'))
    reader.readAsDataURL(file)
  })

const scaleDown = async (file, type) => {
  try {
    const bitmap = await createImageBitmap(file)
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height))
    if (scale >= 1) {
      bitmap.close()
      return null
    }
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(bitmap.width * scale)
    canvas.height = Math.round(bitmap.height * scale)
    canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    bitmap.close()
    const outputType = type === 'image/png' ? 'image/png' : 'image/jpeg'
    return canvas.toDataURL(outputType, JPEG_QUALITY)
  } catch {
    return null
  }
}

async function readImageFile(file, maxSizeMb = 20) {
  if (!file.type.startsWith('image/')) {
    throw new Error('Only image files can be uploaded.')
  }
  if (file.size > maxSizeMb * 1024 * 1024) {
    throw new Error(`That file is too large. Maximum size is ${maxSizeMb}MB.`)
  }

  const dataUrl = await readAsDataUrl(file)
  if (file.type === 'image/gif' || file.type === 'image/svg+xml') {
    return dataUrl
  }
  const scaled = await scaleDown(file, file.type)
  return scaled ?? dataUrl
}

export default readImageFile