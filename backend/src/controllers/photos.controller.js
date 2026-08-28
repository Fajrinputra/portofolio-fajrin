const Photo = require('../models/Photo');

// GET /api/photos (opsional filter ?category=)
exports.getAll = async (req, res) => {
  try {
    const where = {};
    if (req.query.category) where.category = req.query.category;
    const data = await Photo.findAll({ where, order: [['sort_order', 'ASC']] });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/photos
// TODO: protect this route with auth middleware
exports.create = async (req, res) => {
  try {
    const item = await Photo.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/photos/:id
// TODO: protect this route with auth middleware
exports.update = async (req, res) => {
  try {
    const item = await Photo.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Tidak ditemukan.' });
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/photos/:id
// TODO: protect this route with auth middleware
exports.remove = async (req, res) => {
  try {
    const item = await Photo.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Tidak ditemukan.' });
    await item.destroy();
    res.json({ message: 'Berhasil dihapus.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
