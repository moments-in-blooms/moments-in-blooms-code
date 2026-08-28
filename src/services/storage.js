import { isSupabaseConfigured, supabase } from './supabaseClient.js'

const BUCKET = 'public-media'
const MAX_SIZE_MB = 5
const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
])

const UPLOAD_ERROR_MESSAGE = "We couldn't upload the image. Please try again."
const DELETE_ERROR_MESSAGE = "We couldn't delete the image. Please try again."

const slugifyFileName = (name) =>
  String(name ?? 'image')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'image'

const buildPath = (fileName, prefix = 'cms') => {
  const safe = slugifyFileName(fileName)
  const id =
    globalThis.crypto?.randomUUID?.() ?? `upload-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  // Organize by prefix so admin can browse by pageKey if needed.
  return `${prefix}/${id}-${safe}`
}

/**
 * Upload an image file to Supabase Storage bucket `public-media`.
 *
 * - Validates type/size client-side (server also enforces).
 * - Scales down oversized images via readImageFile if needed — caller may
 *   already have scaled dataUrl, but Storage requires a File/Blob, so we
 *   re-create a Blob from the file directly.
 * - Returns `{ data: { publicUrl, path }, error }`.
 * - When Supabase is not configured (demo mode), returns a local dataUrl
 *   fallback so the admin → public flow still works without a backend —
 *   but logs a warning so the team knows it's not persisted to Storage.
 */
export async function uploadImage(file, { prefix = 'cms' } = {}) {
  if (!(file instanceof File || file instanceof Blob)) {
    return { data: null, error: { message: 'No file selected.' } }
  }

  // Normalize to File for name/type/size checks.
  const name = file.name || 'image.jpg'
  const type = file.type || 'image/jpeg'

  if (!ALLOWED_TYPES.has(type) && !type.startsWith('image/')) {
    return { data: null, error: { message: 'Only JPG, PNG, WEBP, GIF or SVG images are allowed.' } }
  }

  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return { data: null, error: { message: `That file is too large. Maximum size is ${MAX_SIZE_MB}MB.` } }
  }

  if (!isSupabaseConfigured() || !supabase) {
    // Demo fallback: return a data URL so the CMS still works locally.
    // This is intentionally not a Storage URL — it lives only in localStorage.
    try {
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = () => reject(new Error('Could not read file.'))
        reader.readAsDataURL(file)
      })
      console.warn('[storage] Supabase not configured — image stored as data URL (not in Storage).')
      return { data: { publicUrl: dataUrl, path: null, demo: true }, error: null }
    } catch (error) {
      return { data: null, error: { message: UPLOAD_ERROR_MESSAGE, detail: error } }
    }
  }

  const path = buildPath(name, prefix)
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: type,
    cacheControl: '3600',
    upsert: false,
  })

  if (error) {
    console.error('[storage] upload failed', error)
    return { data: null, error: { message: UPLOAD_ERROR_MESSAGE, detail: error } }
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return { data: { publicUrl: data.publicUrl, path, demo: false }, error: null }
}

/**
 * Upload from a dataUrl (e.g. from readImageFile scaled canvas).
 * Converts base64 dataUrl to Blob, then uploads.
 */
export async function uploadDataUrl(dataUrl, fileName = 'image.jpg', opts = {}) {
  if (typeof dataUrl !== 'string' || !dataUrl.startsWith('data:')) {
    return { data: null, error: { message: 'Invalid image data.' } }
  }
  try {
    const res = await fetch(dataUrl)
    const blob = await res.blob()
    const file = new File([blob], fileName, { type: blob.type || 'image/jpeg' })
    return uploadImage(file, opts)
  } catch (error) {
    console.error('[storage] dataUrl upload failed', error)
    return { data: null, error: { message: UPLOAD_ERROR_MESSAGE, detail: error } }
  }
}

/**
 * Delete a file from Storage by its path (the `path` returned from upload).
 * If `path` is null (demo dataUrl), this is a no-op.
 * If `url` is a public Storage URL, extracts the path automatically.
 */
export async function deleteImage(pathOrUrl) {
  if (!pathOrUrl) return { error: null }
  // Demo dataUrls are not in Storage — nothing to delete.
  if (pathOrUrl.startsWith('data:')) return { error: null }

  let path = pathOrUrl
  // If a full public URL was passed, extract the path after /public-media/
  if (pathOrUrl.includes(`/storage/v1/object/public/${BUCKET}/`)) {
    path = pathOrUrl.split(`/storage/v1/object/public/${BUCKET}/`)[1]
  } else if (pathOrUrl.startsWith('http') && pathOrUrl.includes(BUCKET)) {
    // Fallback: try to get last occurrence of bucket id
    const idx = pathOrUrl.indexOf(`${BUCKET}/`)
    if (idx !== -1) path = pathOrUrl.slice(idx + BUCKET.length + 1)
  }
  // If it still looks like a URL (external Unsplash etc.), don't try to delete.
  if (path.startsWith('http') || path.startsWith('data:')) return { error: null }

  if (!isSupabaseConfigured() || !supabase) return { error: null }

  const { error } = await supabase.storage.from(BUCKET).remove([path])
  if (error) {
    console.error('[storage] delete failed', error)
    return { error: { message: DELETE_ERROR_MESSAGE, detail: error } }
  }
  return { error: null }
}

/**
 * Helper to determine if a value is a Storage public URL (vs external or dataUrl).
 */
export function isStorageUrl(url) {
  return (
    typeof url === 'string' &&
    url.includes(`/storage/v1/object/public/${BUCKET}/`)
  )
}

export { BUCKET, MAX_SIZE_MB, ALLOWED_TYPES }
