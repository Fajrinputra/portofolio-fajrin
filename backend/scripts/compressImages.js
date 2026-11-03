/**
 * compressImages.js
 * Kompres semua gambar di frontend/public/images/ menggunakan sharp.
 * Target: maks ~400KB per file, kualitas 80 (tidak terlihat beda secara visual).
 * File < 400KB dibiarkan apa adanya.
 * Jalankan: node scripts/compressImages.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = path.join(__dirname, '../../frontend/public/images');
const MAX_SIZE_BYTES = 400 * 1024; // 400 KB
const QUALITY = 80;

async function compressAll() {
  if (!fs.existsSync(INPUT_DIR)) {
    console.error('❌ Folder tidak ditemukan:', INPUT_DIR);
    process.exit(1);
  }

  const files = fs.readdirSync(INPUT_DIR).filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
  });

  console.log(`\n🔍 Ditemukan ${files.length} file gambar di frontend/public/images/`);
  console.log(`🎯 Target: file > 400KB akan dikompres ke kualitas ${QUALITY}\n`);

  let skipped = 0;
  let compressed = 0;
  let totalSavedBytes = 0;
  const errors = [];

  for (const file of files) {
    const filePath = path.join(INPUT_DIR, file);
    const stat = fs.statSync(filePath);
    const sizeBefore = stat.size;
    const ext = path.extname(file).toLowerCase();

    if (sizeBefore <= MAX_SIZE_BYTES) {
      skipped++;
      continue;
    }

    const tmpPath = filePath + '.tmp';

    try {
      let pipeline = sharp(filePath);

      if (ext === '.png') {
        pipeline = pipeline.png({ quality: QUALITY, compressionLevel: 9 });
      } else {
        // jpg, jpeg, webp → simpan sebagai jpeg
        pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
      }

      await pipeline.toFile(tmpPath);

      const sizeAfter = fs.statSync(tmpPath).size;
      const saved = sizeBefore - sizeAfter;
      totalSavedBytes += saved;

      // Ganti file asli dengan yang sudah dikompres
      fs.renameSync(tmpPath, filePath);

      compressed++;
      console.log(
        `✅ ${file.substring(0, 40).padEnd(42)} ` +
        `${(sizeBefore / 1024 / 1024).toFixed(2)} MB → ${(sizeAfter / 1024).toFixed(0)} KB ` +
        `(hemat ${(saved / 1024).toFixed(0)} KB)`
      );
    } catch (err) {
      if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
      errors.push({ file, error: err.message });
      console.error(`❌ Gagal: ${file} — ${err.message}`);
    }
  }

  console.log('\n──────────────────────────────────────────────────');
  console.log(`✅ Dikompres  : ${compressed} file`);
  console.log(`⏭️  Dilewati   : ${skipped} file (sudah di bawah 400 KB)`);
  console.log(`💾 Total hemat : ${(totalSavedBytes / 1024 / 1024).toFixed(2)} MB`);
  if (errors.length > 0) {
    console.log(`❌ Error       : ${errors.length} file`);
    errors.forEach((e) => console.log(`   - ${e.file}: ${e.error}`));
  }
  console.log('──────────────────────────────────────────────────\n');

  process.exit(errors.length > 0 ? 1 : 0);
}

compressAll();

