const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Photo = sequelize.define('Photo', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING(150) },
  category: { type: DataTypes.STRING(100), comment: 'Wedding, Event, Product, Portrait, dst' },
  image_url: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.TEXT },
  client_name: { type: DataTypes.STRING(150) },
  sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
  tableName: 'photos',
  timestamps: false,
});

module.exports = Photo;
