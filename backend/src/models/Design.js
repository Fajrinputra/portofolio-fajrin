const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Design = sequelize.define('Design', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  slug: { type: DataTypes.STRING(100), unique: true, allowNull: false },
  title: { type: DataTypes.STRING(150), allowNull: false },
  category: { type: DataTypes.STRING(100), comment: 'Mobile App, Web App, Landing Page, dst' },
  thumbnail: { type: DataTypes.STRING(255) },
  description: { type: DataTypes.TEXT },
  process: { type: DataTypes.TEXT, comment: 'Ringkas proses desain: riset, wireframe, hi-fi' },
  gallery: { type: DataTypes.JSON, defaultValue: [] },
  figma_link: { type: DataTypes.STRING(255) },
  sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
  tableName: 'designs',
  timestamps: false,
});

module.exports = Design;
