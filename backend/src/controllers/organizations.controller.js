const Organization = require('../models/Organization');

// GET /api/organizations
exports.getAll = async (req, res) => {
  try {
    const data = await Organization.findAll({ order: [['sort_order', 'ASC']] });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/organizations/:identifier (by id or slug)
exports.getOne = async (req, res) => {
  try {
    const { identifier } = req.params;
    const isNumeric = /^\d+$/.test(identifier);
    const where = isNumeric ? { id: identifier } : { slug: identifier };
    const item = await Organization.findOne({ where });
    if (!item) return res.status(404).json({ message: 'Organisasi tidak ditemukan.' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/organizations
// TODO: protect this route with auth middleware
exports.create = async (req, res) => {
  try {
    // Auto-generate slug jika tidak ada
    let body = { ...req.body };
    if (!body.slug && body.org_name) {
      body.slug = body.org_name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
    }
    // Parse gallery jika string
    if (typeof body.gallery === 'string') {
      try { body.gallery = JSON.parse(body.gallery); } catch { body.gallery = []; }
    }
    const item = await Organization.create(body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/organizations/:id
// TODO: protect this route with auth middleware
exports.update = async (req, res) => {
  try {
    const item = await Organization.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Tidak ditemukan.' });
    let body = { ...req.body };
    if (typeof body.gallery === 'string') {
      try { body.gallery = JSON.parse(body.gallery); } catch { body.gallery = item.gallery || []; }
    }
    await item.update(body);
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/organizations/:id
// TODO: protect this route with auth middleware
exports.remove = async (req, res) => {
  try {
    const item = await Organization.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Tidak ditemukan.' });
    await item.destroy();
    res.json({ message: 'Berhasil dihapus.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
