const Message = require('../models/Message');

// GET /api/messages — ambil semua pesan (admin only)
exports.getAll = async (req, res) => {
  try {
    const messages = await Message.findAll({
      order: [['created_at', 'DESC']],
    });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/messages — kirim pesan baru (publik)
exports.create = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Nama, email, dan pesan harus diisi.' });
    }
    const newMsg = await Message.create({ name, email, message });
    res.status(201).json({ success: true, id: newMsg.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/messages/:id/read — tandai sudah dibaca
exports.markRead = async (req, res) => {
  try {
    const msg = await Message.findByPk(req.params.id);
    if (!msg) return res.status(404).json({ message: 'Pesan tidak ditemukan.' });
    await msg.update({ is_read: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/messages/:id — hapus pesan
exports.remove = async (req, res) => {
  try {
    const msg = await Message.findByPk(req.params.id);
    if (!msg) return res.status(404).json({ message: 'Pesan tidak ditemukan.' });
    await msg.destroy();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/messages/unread-count — jumlah pesan belum dibaca
exports.unreadCount = async (req, res) => {
  try {
    const count = await Message.count({ where: { is_read: false } });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
