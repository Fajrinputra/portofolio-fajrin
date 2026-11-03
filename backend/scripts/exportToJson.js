const fs = require('fs');
const path = require('path');

// 1. Muat environment variables backend
const envPath = path.join(__dirname, '../.env');
require('dotenv').config({ path: envPath });

// 2. Import Sequelize instance dan model-model
const sequelize = require('../src/config/database');
const Profile = require('../src/models/Profile');
const Journey = require('../src/models/Journey');
const Organization = require('../src/models/Organization');
const Project = require('../src/models/Project');
const Design = require('../src/models/Design');
const Certificate = require('../src/models/Certificate');

// Helper untuk normalisasi path aset gambar dan dokumen
function normalizeAssetPath(val, isCv = false) {
  if (!val || typeof val !== 'string') return val;
  let normalized = val.trim();

  // Peringatan jika mengandung localhost atau 127.0.0.1
  if (normalized.includes('localhost') || normalized.includes('127.0.0.1')) {
    console.warn(`⚠️ [PERINGATAN] URL mengandung localhost/127.0.0.1: ${val}`);
    // Bersihkan origin host agar path statis tidak broken di production Vercel
    normalized = normalized.replace(/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/, '');
  }

  // Jika dokumen CV
  if (isCv && (normalized.includes('/uploads/docs/') || normalized.endsWith('.pdf'))) {
    return '/cv-fajrin-putra-pratama.pdf';
  }

  // Normalisasi gambar dari /uploads/images/ ke /images/
  if (normalized.startsWith('/uploads/images/')) {
    return normalized.replace('/uploads/images/', '/images/');
  }

  // Normalisasi docs umum jika ada
  if (normalized.startsWith('/uploads/docs/')) {
    return isCv ? '/cv-fajrin-putra-pratama.pdf' : normalized.replace('/uploads/docs/', '/docs/');
  }

  return normalized;
}

// Helper untuk parsing array JSON yang mungkin tersimpan sebagai string
function parseArrayIfString(arr) {
  if (!arr) return [];
  if (typeof arr === 'string') {
    try {
      const parsed = JSON.parse(arr);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return [];
    }
  }
  return Array.isArray(arr) ? arr : [];
}

async function exportData() {
  const warnings = [];
  const outputDir = path.join(__dirname, '../../frontend/public/data');

  try {
    console.log('🔄 Memulai ekspor data dari MySQL ke JSON...');
    await sequelize.authenticate();
    console.log('✅ Terhubung ke database MySQL.');

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // ── 1. PROFILE ─────────────────────────────────────────
    const rawProfile = await Profile.findOne();
    let profileData = null;
    if (rawProfile) {
      profileData = rawProfile.toJSON ? rawProfile.toJSON() : { ...rawProfile };

      // Parse goals dari TEXT ke JSON (aman)
      if (typeof profileData.goals === 'string') {
        try {
          profileData.goals = JSON.parse(profileData.goals);
        } catch {
          // fallback ke string asli
        }
      }

      // Parse skills jika string
      if (typeof profileData.skills === 'string') {
        try {
          profileData.skills = JSON.parse(profileData.skills);
        } catch {}
      }

      // Normalisasi field gambar & CV
      profileData.photo_url = normalizeAssetPath(profileData.photo_url);
      profileData.cv_url = normalizeAssetPath(profileData.cv_url, true);

      // Sinkronisasi file CV fisik ke frontend/public jika ada upload baru
      if (rawProfile.cv_url && rawProfile.cv_url.includes('/uploads/docs/')) {
        const cvFilename = path.basename(rawProfile.cv_url);
        const sourceCv = path.join(__dirname, '../uploads/docs', cvFilename);
        if (fs.existsSync(sourceCv)) {
          const targetCv1 = path.join(__dirname, '../../frontend/public/cv-fajrin-putra-pratama.pdf');
          const targetCv2 = path.join(__dirname, '../../frontend/public/assets/CV-Fajrin-Putra-Pratama.pdf');
          fs.copyFileSync(sourceCv, targetCv1);
          const assetsDir = path.dirname(targetCv2);
          if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });
          fs.copyFileSync(sourceCv, targetCv2);
          console.log(`📄 File CV fisik diperbarui dari uploads/docs/${cvFilename}`);
        }
      }

      // Normalisasi personal_photos
      const photos = parseArrayIfString(profileData.personal_photos);
      profileData.personal_photos = photos.map((p) => normalizeAssetPath(p));
    }

    fs.writeFileSync(
      path.join(outputDir, 'profile.json'),
      JSON.stringify(profileData, null, 2),
      'utf8'
    );
    console.log('✅ profile.json berhasil ditulis.');

    // ── 2. JOURNEYS ────────────────────────────────────────
    const rawJourneys = await Journey.findAll({
      order: [['sort_order', 'ASC']],
    });
    const journeysData = rawJourneys.map((j) => {
      const item = j.toJSON ? j.toJSON() : { ...j };
      item.image_url = normalizeAssetPath(item.image_url);
      return item;
    });

    fs.writeFileSync(
      path.join(outputDir, 'journeys.json'),
      JSON.stringify(journeysData, null, 2),
      'utf8'
    );
    console.log(`✅ journeys.json berhasil ditulis (${journeysData.length} baris).`);

    // ── 3. ORGANIZATIONS ───────────────────────────────────
    const rawOrgs = await Organization.findAll({
      order: [['sort_order', 'ASC']],
    });
    const orgsData = rawOrgs.map((o) => {
      const item = o.toJSON ? o.toJSON() : { ...o };
      item.logo_url = normalizeAssetPath(item.logo_url);
      const gallery = parseArrayIfString(item.gallery);
      item.gallery = gallery.map((img) => normalizeAssetPath(img));
      return item;
    });

    fs.writeFileSync(
      path.join(outputDir, 'organizations.json'),
      JSON.stringify(orgsData, null, 2),
      'utf8'
    );
    console.log(`✅ organizations.json berhasil ditulis (${orgsData.length} baris).`);

    // ── 4. PROJECTS ────────────────────────────────────────
    const rawProjects = await Project.findAll({
      order: [['created_at', 'DESC']],
    });
    const projectsData = rawProjects.map((p) => {
      const item = p.toJSON ? p.toJSON() : { ...p };
      item.thumbnail = normalizeAssetPath(item.thumbnail);
      const gallery = parseArrayIfString(item.gallery);
      item.gallery = gallery.map((img) => normalizeAssetPath(img));
      item.tech_stack = parseArrayIfString(item.tech_stack);
      item.challenges = parseArrayIfString(item.challenges);
      item.features = parseArrayIfString(item.features);
      return item;
    });

    fs.writeFileSync(
      path.join(outputDir, 'projects.json'),
      JSON.stringify(projectsData, null, 2),
      'utf8'
    );
    console.log(`✅ projects.json berhasil ditulis (${projectsData.length} baris).`);

    // ── 5. DESIGNS ─────────────────────────────────────────
    const rawDesigns = await Design.findAll({
      order: [['sort_order', 'ASC']],
    });
    const designsData = rawDesigns.map((d) => {
      const item = d.toJSON ? d.toJSON() : { ...d };
      item.thumbnail = normalizeAssetPath(item.thumbnail);
      const gallery = parseArrayIfString(item.gallery);
      item.gallery = gallery.map((img) => normalizeAssetPath(img));
      item.tags = parseArrayIfString(item.tags);
      return item;
    });

    fs.writeFileSync(
      path.join(outputDir, 'designs.json'),
      JSON.stringify(designsData, null, 2),
      'utf8'
    );
    console.log(`✅ designs.json berhasil ditulis (${designsData.length} baris).`);

    // ── 6. CERTIFICATES ────────────────────────────────────
    const rawCerts = await Certificate.findAll({
      order: [['sort_order', 'ASC']],
    });
    const certsData = rawCerts.map((c) => {
      const item = c.toJSON ? c.toJSON() : { ...c };
      item.image_url = normalizeAssetPath(item.image_url);
      return item;
    });

    fs.writeFileSync(
      path.join(outputDir, 'certificates.json'),
      JSON.stringify(certsData, null, 2),
      'utf8'
    );
    console.log(`✅ certificates.json berhasil ditulis (${certsData.length} baris).`);

    // ── 7. SINKRONISASI GAMBAR BARU ──────────────────────────
    const uploadsImagesDir = path.join(__dirname, '../uploads/images');
    const publicImagesDir = path.join(__dirname, '../../frontend/public/images');
    if (fs.existsSync(uploadsImagesDir)) {
      if (!fs.existsSync(publicImagesDir)) fs.mkdirSync(publicImagesDir, { recursive: true });
      const uploadedImages = fs.readdirSync(uploadsImagesDir);
      let copiedCount = 0;
      for (const img of uploadedImages) {
        const dest = path.join(publicImagesDir, img);
        if (!fs.existsSync(dest)) {
          fs.copyFileSync(path.join(uploadsImagesDir, img), dest);
          copiedCount++;
        }
      }
      if (copiedCount > 0) {
        console.log(`🖼️  ${copiedCount} gambar baru disalin ke frontend/public/images/`);
      }
    }

    console.log('\n🎉 Ekspor data selesai dengan sukses!');
    console.log(`📁 File output tersimpan di: ${outputDir}`);

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Gagal mengekspor data:', error);
    try {
      await sequelize.close();
    } catch {}
    process.exit(1);
  }
}

exportData();

