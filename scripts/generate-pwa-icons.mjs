// Single source of truth for ALL PWA/install icons + favicon:
//   src/assets/images/logo-old-primary.png  (transparent brown line-art)
// Outputs are composited onto white (#FFFFFF) to match manifest
// background_color and to stay legible on dark launchers.
// Run: node scripts/generate-pwa-icons.mjs
import sharp from 'sharp'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(root, 'src/assets/images/logo-old-primary.png')
const PUB = join(root, 'public')
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 }

// Maskable: artwork inset to ~80% so nothing is cropped by the
// mask safe-zone, centered on an opaque white canvas.
async function maskable(size, outName) {
  const artSize = Math.round(size * 0.8)
  const art = await sharp(SRC)
    .resize(artSize, artSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()
  await sharp({ create: { width: size, height: size, channels: 4, background: WHITE } })
    .composite([{ input: art, gravity: 'center' }])
    .png()
    .toFile(join(PUB, outName))
}

async function sized(size, outName) {
  await sharp(SRC)
    .flatten({ background: WHITE })
    .resize(size, size, { fit: 'contain', background: WHITE })
    .png()
    .toFile(join(PUB, outName))
  console.log('wrote', outName)
}

// Sanity check so a wrong/transparent source fails loudly instead of
// shipping invisible icons.
async function assertSource() {
  const meta = await sharp(SRC).metadata()
  if (meta.width !== meta.height) throw new Error(`source must be square, got ${meta.width}x${meta.height}`)
  if (!meta.hasAlpha) console.warn('warning: source has no alpha channel; flatten is a no-op')
  console.log(`source: ${meta.width}x${meta.height} ${meta.format}`)
}

await assertSource()
await sized(192, 'pwa-192x192.png')
await sized(512, 'pwa-512x512.png')
await maskable(192, 'pwa-192x192-maskable.png')
await maskable(512, 'pwa-512x512-maskable.png')
await sized(180, 'apple-touch-icon.png')
await sized(48, 'favicon.png')
await sized(1024, 'logo-old-primary-public.png')
console.log('done: all PWA icons regenerated from logo-old-primary.png')
