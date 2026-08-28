const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { upload } = require('../config/upload');

// POST /api/upload?type=image  (default)
// POST /api/upload?type=document  (untuk PDF)
router.post('/', (req, res) => {
  // TODO: protect this route with auth middleware
  const uploadSingle = upload.single('file');
  uploadSingle(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'Tidak ada file yang diupload' });
    }

    const type = req.query.type || 'image';
    const subFolder = type === 'document' ? 'docs' : 'images';
    const url = `/uploads/${subFolder}/${req.file.filename}`;

    return res.json({
      url,
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });
  });
});

// POST /api/upload/multiple — upload banyak gambar sekaligus (untuk galeri organisasi)
router.post('/multiple', (req, res) => {
  // TODO: protect this route with auth middleware
  const uploadMultiple = upload.array('files', 20); // max 20 file
  uploadMultiple(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'Tidak ada file yang diupload' });
    }
    const urls = req.files.map(f => ({
      url: `/uploads/images/${f.filename}`,
      filename: f.filename,
      originalname: f.originalname,
    }));
    return res.json({ files: urls });
  });
});

// DELETE /api/upload — hapus file
router.delete('/', (req, res) => {
  // TODO: protect this route with auth middleware
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL diperlukan' });

  // Hanya izinkan hapus file di dalam uploads/
  const filename = path.basename(url);
  const subFolder = url.includes('/docs/') ? 'docs' : 'images';
  const filePath = path.join(__dirname, '../../uploads', subFolder, filename);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return res.json({ message: 'File berhasil dihapus' });
  }
  return res.status(404).json({ error: 'File tidak ditemukan' });
});

module.exports = router;
