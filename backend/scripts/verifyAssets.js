const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../../frontend/public');
const dataDir = path.join(publicDir, 'data');
const imagesDir = path.join(publicDir, 'images');

// 1. Ekstrak path dari objek JSON rekursif
function extractPaths(obj, paths = []) {
  if (!obj) return paths;
  if (typeof obj === 'string') {
    if (
      obj.startsWith('/images/') ||
      obj.startsWith('/assets/') ||
      obj.endsWith('.pdf') ||
      obj.match(/\.(png|jpe?g|svg|webp|gif|pdf)$/i)
    ) {
      paths.push(obj);
    }
    return paths;
  }
  if (Array.isArray(obj)) {
    obj.forEach((item) => extractPaths(item, paths));
    return paths;
  }
  if (typeof obj === 'object') {
    Object.values(obj).forEach((val) => extractPaths(val, paths));
  }
  return paths;
}

function verifyAssets() {
  console.log('🔍 Memverifikasi aset frontend/public/ ...\n');

  if (!fs.existsSync(dataDir)) {
    console.error('❌ Folder frontend/public/data tidak ditemukan.');
    process.exit(1);
  }

  const jsonFiles = fs.readdirSync(dataDir).filter((f) => f.endsWith('.json'));
  const allAssetPaths = new Set();

  jsonFiles.forEach((file) => {
    const filePath = path.join(dataDir, file);
    try {
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const extracted = extractPaths(content);
      extracted.forEach((p) => allAssetPaths.add(p));
      console.log(`📄 ${file}: ditemukan ${extracted.length} referensi aset.`);
    } catch (err) {
      console.error(`❌ Gagal membaca ${file}:`, err.message);
    }
  });

  console.log(`\nTotal referensi aset unik: ${allAssetPaths.size}`);

  const missing = [];
  const found = [];

  allAssetPaths.forEach((assetPath) => {
    // normalisasi path awal tanda '/'
    const relativePath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
    const fullDiskPath = path.join(publicDir, relativePath);

    if (fs.existsSync(fullDiskPath)) {
      found.push(assetPath);
    } else {
      missing.push({ assetPath, fullDiskPath });
    }
  });

  console.log(`✅ Aset ditemukan: ${found.length}/${allAssetPaths.size}`);
  if (missing.length > 0) {
    console.warn(`\n⚠️ ${missing.length} Aset TIDAK DITEMUKAN di frontend/public/:`);
    missing.forEach((m) => console.warn(`   - ${m.assetPath}`));
  } else {
    console.log('🎉 Semua aset yang direferensikan dalam JSON tersedia di frontend/public/!');
  }

  // 2. Cek file > 2MB di folder images
  console.log('\n📊 Memeriksa ukuran file gambar di frontend/public/images/ ...');
  if (fs.existsSync(imagesDir)) {
    const files = fs.readdirSync(imagesDir);
    const largeFiles = [];

    files.forEach((file) => {
      const fullPath = path.join(imagesDir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isFile() && stat.size > 2 * 1024 * 1024) {
        largeFiles.push({
          file,
          sizeMb: (stat.size / (1024 * 1024)).toFixed(2),
          bytes: stat.size,
        });
      }
    });

    largeFiles.sort((a, b) => b.bytes - a.bytes);

    console.log(`Ditemukan ${largeFiles.length} file gambar berukuran > 2MB:`);
    largeFiles.forEach((item) => {
      console.log(`   - ${item.file} (${item.sizeMb} MB)`);
    });
  }

  console.log('\n✅ Verifikasi aset selesai.');
}

verifyAssets();

