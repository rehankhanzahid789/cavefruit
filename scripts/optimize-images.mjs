// Converts every source image to optimized WebP/PNG in public/assets/optimized.
// Usage: npm run optimize-images
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Source photos are ~200 megapixels: keep memory low (no cache, 1 thread, strictly sequential).
sharp.cache(false);
sharp.concurrency(1);

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, 'assets-src');
const OUT = path.join(root, 'public', 'assets', 'optimized');
const MAX_SIDE = 1400;
const MAX_BYTES = 300 * 1024;

const sizeKB = (n) => `${(n / 1024).toFixed(0)}KB`;

async function webp(input, output, { maxSide = MAX_SIDE, quality = 80 } = {}) {
  let q = quality;
  let buf;
  do {
    buf = await sharp(input, { limitInputPixels: false, sequentialRead: true })
      .rotate()
      .resize({ width: maxSide, height: maxSide, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: q, effort: 5 })
      .toBuffer();
    q -= 5;
  } while (buf.length > MAX_BYTES && q > 40);
  await fs.writeFile(path.join(OUT, output), buf);
  const meta = await sharp(buf).metadata();
  console.log(`  ${output.padEnd(22)} ${meta.width}x${meta.height}  ${sizeKB(buf.length)}`);
}

async function logo(input, output) {
  const buf = await sharp(input, { limitInputPixels: false })
    .trim({ threshold: 5 }) // crop transparent padding
    .resize({ width: 400, withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true })
    .toBuffer();
  await fs.writeFile(path.join(OUT, output), buf);
  const meta = await sharp(buf).metadata();
  console.log(`  ${output.padEnd(22)} ${meta.width}x${meta.height}  ${sizeKB(buf.length)}`);
}

await fs.mkdir(OUT, { recursive: true });

console.log('Logos');
await logo(path.join(SRC, 'logo-black.png'), 'logo-black.png');
await logo(path.join(SRC, 'logo-white.png'), 'logo-white.png');

console.log('Favicon (fruit icon cropped from the logo)');
{
  const trimmed = await sharp(path.join(SRC, 'logo-black.png'), { limitInputPixels: false })
    .trim({ threshold: 5 }).toBuffer();
  const m = await sharp(trimmed).metadata();
  // the fruit mark is the top-centre ~56% of the logo
  const icon = await sharp(trimmed)
    .extract({ left: Math.round(m.width * 0.33), top: 0, width: Math.round(m.width * 0.38), height: Math.round(m.height * 0.58) })
    .trim({ threshold: 5 }).toBuffer();
  for (const [name, size] of [['favicon.png', 64], ['apple-touch-icon.png', 180]]) {
    const inner = Math.round(size * 0.68);
    const glyph = await sharp(icon).resize({ width: inner, height: inner, fit: 'inside' }).toBuffer();
    const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${size * 0.28}" fill="#F6B8CF"/></svg>`);
    const out = await sharp(bg).composite([{ input: glyph, gravity: 'center' }]).png({ compressionLevel: 9 }).toBuffer();
    await fs.writeFile(path.join(OUT, name), out);
    console.log(`  ${name.padEnd(22)} ${size}x${size}  ${sizeKB(out.length)}`);
  }
}

console.log('Hero / About');
await webp(path.join(SRC, 'hero.jpg'), 'hero.webp', { maxSide: 1920 });
await webp(path.join(SRC, 'about.jpg'), 'about.webp', { maxSide: 1200 });

console.log('Products');
for (const folder of ['strawberry', 'dragonfruit', 'banana']) {
  for (let i = 1; i <= 5; i++) {
    await webp(path.join(SRC, folder, `${i}.jpg`), `${folder}-${i}.webp`);
  }
}
console.log('Done.');
