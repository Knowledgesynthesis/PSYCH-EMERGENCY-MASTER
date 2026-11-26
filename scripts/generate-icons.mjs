// Renders the app mark (public/favicon.svg) into the PNG sizes the PWA manifest and iOS need.
// Usage: npm run icons   (requires Playwright + Chromium available locally)
import { readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';

const mark = readFileSync(new URL('../public/favicon.svg', import.meta.url), 'utf8');

// Maskable icons need the glyph inside the central 80% safe zone on a full-bleed background.
const maskable = mark
  .replace(/rx="\d+"/, 'rx="0"')
  .replace('<g ', '<g transform="translate(256 256) scale(0.72) translate(-256 -256)" ');

const targets = [
  { file: 'icon-192.png', size: 192, svg: mark },
  { file: 'icon-512.png', size: 512, svg: mark },
  { file: 'icon-maskable-512.png', size: 512, svg: maskable },
  { file: 'apple-touch-icon.png', size: 180, svg: maskable },
];

const browser = await chromium.launch();
const page = await browser.newPage();
for (const { file, size, svg } of targets) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(
    `<html><body style="margin:0;background:transparent">${svg.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body></html>`,
  );
  const png = await page.locator('svg').screenshot({ omitBackground: true });
  writeFileSync(new URL(`../public/${file}`, import.meta.url), png);
  console.log('wrote', file);
}
await browser.close();
