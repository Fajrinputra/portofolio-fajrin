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
    if (!profile) {
      profile = await Profile.create(req.body);
    } else {
      await profile.update(req.body);
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
