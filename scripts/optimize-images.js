#!/usr/bin/env node
'use strict';

/**
 * Replacement for the old `imagemin` CLI call.
 * Walks src/img, optimizes raster images with sharp,
 * and copies everything else (SVGs, etc.) 1:1.
 *
 * Usage: node scripts/optimize-images.js
 */

const fs = require('fs');
const path = require('path');
const fg = require('fast-glob');
const sharp = require('sharp');

const SRC_DIR = 'src/img';
const OUT_DIR = 'public_html';

const RASTER_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif', '.tiff']);

async function ensureDirFor(filePath) {
  await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
}

async function optimizeRaster(srcPath, outPath, ext) {
  const image = sharp(srcPath);

  switch (ext) {
    case '.png':
      // roughly equivalent to `optipng -strip all -o3`
      await image
        .png({ compressionLevel: 9, palette: true, effort: 8 })
        .toFile(outPath);
      break;
    case '.jpg':
    case '.jpeg':
      await image
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(outPath);
      break;
    case '.webp':
      await image.webp({ quality: 80 }).toFile(outPath);
      break;
    case '.avif':
      await image.avif({ quality: 60 }).toFile(outPath);
      break;
    case '.gif':
      // sharp re-encodes GIFs (including animated) without extra lossy tricks
      await image.gif().toFile(outPath);
      break;
    case '.tiff':
      await image.tiff({ quality: 80 }).toFile(outPath);
      break;
    default:
      await fs.promises.copyFile(srcPath, outPath);
  }
}

async function copyAsIs(srcPath, outPath) {
  await fs.promises.copyFile(srcPath, outPath);
}

async function run() {
  const entries = await fg('**/*', { cwd: SRC_DIR, onlyFiles: true });

  if (entries.length === 0) {
    console.log(`No files found in ${SRC_DIR}, nothing to do.`);
    return;
  }

  let optimized = 0;
  let copied = 0;

  for (const relPath of entries) {
    const srcPath = path.join(SRC_DIR, relPath);
    const outPath = path.join(OUT_DIR, relPath);
    const ext = path.extname(relPath).toLowerCase();

    await ensureDirFor(outPath);

    if (RASTER_EXTENSIONS.has(ext)) {
      await optimizeRaster(srcPath, outPath, ext);
      optimized += 1;
    } else {
      // SVGs and anything else: sharp can't meaningfully optimize
      // vector markup, so it's copied through unchanged. Run svgo
      // separately if you want SVGs minified too.
      await copyAsIs(srcPath, outPath);
      copied += 1;
    }

    console.log(`✓ ${relPath}`);
  }

  console.log(`\nDone: ${optimized} image(s) optimized, ${copied} file(s) copied.`);
}

run().catch((err) => {
  console.error('Image optimization failed:', err);
  process.exit(1);
});
