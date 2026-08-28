const Profile = require('../models/Profile');

// GET /api/profile — ambil data profil (single object)
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ message: 'Profil belum diisi.' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/profile — update data profil
// TODO: protect this route with auth middleware
exports.updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();

    // Sanitasi: kolom goals bertipe TEXT, harus string
    const body = { ...req.body };

    if (body.goals !== undefined) {
      if (typeof body.goals !== 'string') {
        body.goals = JSON.stringify(body.goals);
      }
      // Validasi JSON valid (opsional, untuk keamanan)
      try { JSON.parse(body.goals); } catch {
        body.goals = '[]';
      }
    }

    // Sanitasi: personal_photos bertipe JSON — pastikan array
    if (body.personal_photos !== undefined) {
      if (typeof body.personal_photos === 'string') {
        try { body.personal_photos = JSON.parse(body.personal_photos); } catch { body.personal_photos = []; }
      }
      if (!Array.isArray(body.personal_photos)) body.personal_photos = [];
    }

    if (!profile) {
      profile = await Profile.create(body);
    } else {
      await profile.update(body);
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
