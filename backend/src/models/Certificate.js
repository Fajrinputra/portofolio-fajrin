const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Certificate = sequelize.define('Certificate', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING(150), allowNull: false },
  issuer: { type: DataTypes.STRING(150) },
  issued_date: { type: DataTypes.DATEONLY },
  image_url: { type: DataTypes.STRING(255) },
  credential_url: { type: DataTypes.STRING(255) },
  category: { type: DataTypes.STRING(100), defaultValue: 'Umum', comment: 'Kategori sertifikat, misal: Programming, Design, Data Science' },
  sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
  tableName: 'certificates',
  timestamps: false,
});

module.exports = Certificate;
