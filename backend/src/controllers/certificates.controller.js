const Certificate = require('../models/Certificate');

// GET /api/certificates
exports.getAll = async (req, res) => {
  try {
    const data = await Certificate.findAll({ order: [['sort_order', 'ASC']] });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/certificates
// TODO: protect this route with auth middleware
exports.create = async (req, res) => {
  try {
    const item = await Certificate.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/certificates/:id
// TODO: protect this route with auth middleware
exports.update = async (req, res) => {
  try {
    const item = await Certificate.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Tidak ditemukan.' });
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/certificates/:id
// TODO: protect this route with auth middleware
exports.remove = async (req, res) => {
  try {
    const item = await Certificate.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Tidak ditemukan.' });
    await item.destroy();
    res.json({ message: 'Berhasil dihapus.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
