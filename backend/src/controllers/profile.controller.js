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
exports.updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();

    const body = { ...req.body };

    // ── Sanitasi goals → TEXT string
    if (body.goals !== undefined) {
      if (typeof body.goals !== 'string') body.goals = JSON.stringify(body.goals);
      try { JSON.parse(body.goals); } catch { body.goals = '[]'; }
    }

    // ── Sanitasi skills → JSON array
    if (body.skills !== undefined) {
      if (typeof body.skills === 'string') {
        try { body.skills = JSON.parse(body.skills); } catch { body.skills = []; }
      }
      if (!Array.isArray(body.skills)) body.skills = [];
    }

    // ── Sanitasi personal_photos → JSON array
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

    // Re-fetch untuk memastikan data JSON sudah di-parse Sequelize dengan benar
    const updated = await Profile.findOne({ where: { id: profile.id } });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
