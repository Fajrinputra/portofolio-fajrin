const Project = require('../models/Project');

// GET /api/projects
exports.getAll = async (req, res) => {
  try {
    const where = {};
    if (req.query.category) where.category = req.query.category;
    const data = await Project.findAll({ where, order: [['created_at', 'DESC']] });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/projects/:slug
exports.getBySlug = async (req, res) => {
  try {
    const item = await Project.findOne({ where: { slug: req.params.slug } });
    if (!item) return res.status(404).json({ message: 'Proyek tidak ditemukan.' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/projects
// TODO: protect this route with auth middleware
exports.create = async (req, res) => {
  try {
    const item = await Project.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/projects/:id
// TODO: protect this route with auth middleware
exports.update = async (req, res) => {
  try {
    const item = await Project.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Tidak ditemukan.' });
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/projects/:id
// TODO: protect this route with auth middleware
exports.remove = async (req, res) => {
  try {
    const item = await Project.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Tidak ditemukan.' });
    await item.destroy();
    res.json({ message: 'Berhasil dihapus.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
