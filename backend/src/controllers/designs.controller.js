const Design = require('../models/Design');

// GET /api/designs
exports.getAll = async (req, res) => {
  try {
    const where = {};
    if (req.query.category) where.category = req.query.category;
    const data = await Design.findAll({ where, order: [['sort_order', 'ASC']] });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/designs/:slug
exports.getBySlug = async (req, res) => {
  try {
    const item = await Design.findOne({ where: { slug: req.params.slug } });
    if (!item) return res.status(404).json({ message: 'Design tidak ditemukan.' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/designs
// TODO: protect this route with auth middleware
exports.create = async (req, res) => {
  try {
    const item = await Design.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/designs/:id
// TODO: protect this route with auth middleware
exports.update = async (req, res) => {
  try {
    const item = await Design.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Tidak ditemukan.' });
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/designs/:id
// TODO: protect this route with auth middleware
exports.remove = async (req, res) => {
  try {
    const item = await Design.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Tidak ditemukan.' });
    await item.destroy();
    res.json({ message: 'Berhasil dihapus.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
