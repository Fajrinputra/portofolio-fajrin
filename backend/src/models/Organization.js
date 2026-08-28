const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Organization = sequelize.define('Organization', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  slug: { type: DataTypes.STRING(100), unique: true, comment: 'URL identifier unik' },
  org_name: { type: DataTypes.STRING(150) },
  role: { type: DataTypes.STRING(150) },
  period: { type: DataTypes.STRING(50) },
  description: { type: DataTypes.TEXT },
  achievements: { type: DataTypes.TEXT, comment: 'Daftar pencapaian selama di org ini' },
  logo_url: { type: DataTypes.STRING(255) },
  gallery: { type: DataTypes.JSON, defaultValue: [], comment: 'Array URL foto kegiatan organisasi' },
  sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
  tableName: 'organizations',
  timestamps: false,
});

module.exports = Organization;
