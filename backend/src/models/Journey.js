const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Journey = sequelize.define('Journey', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  level: { type: DataTypes.STRING(50), comment: 'SD, SMP, SMA, Kuliah' },
  institution_name: { type: DataTypes.STRING(150) },
  period: { type: DataTypes.STRING(50), comment: 'contoh: 2010 - 2016' },
  description: { type: DataTypes.TEXT },
  achievement: { type: DataTypes.TEXT },
  image_url: { type: DataTypes.STRING(255) },
  sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
  tableName: 'journeys',
  timestamps: false,
});

module.exports = Journey;
