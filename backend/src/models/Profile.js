const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Profile = sequelize.define('Profile', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  full_name: { type: DataTypes.STRING(150) },
  nickname: { type: DataTypes.STRING(50) },
  birth_place: { type: DataTypes.STRING(100) },
  birth_date: { type: DataTypes.DATEONLY },
  tagline: { type: DataTypes.STRING(255) },
  bio: { type: DataTypes.TEXT },
  goals: { type: DataTypes.TEXT },
  photo_url: { type: DataTypes.STRING(255) },
  cv_url: { type: DataTypes.STRING(255) },
  skills: {
    type: DataTypes.JSON,
    defaultValue: [],
    comment: 'Array of { category: string, items: string[] }'
  },
  personal_photos: {
    type: DataTypes.JSON,
    defaultValue: [],
    comment: 'Array URL foto pribadi untuk galeri di halaman Profil'
  },
}, {
  tableName: 'profile',
  timestamps: false,
});

module.exports = Profile;
