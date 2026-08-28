const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Project = sequelize.define('Project', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  slug: { type: DataTypes.STRING(100), unique: true, allowNull: false },
  title: { type: DataTypes.STRING(150), allowNull: false },
  category: {
    type: DataTypes.ENUM('Enterprise/ERP', 'Web Development', 'Lainnya'),
    allowNull: false,
  },
  tagline: { type: DataTypes.STRING(255) },
  thumbnail: { type: DataTypes.STRING(255) },
  background: { type: DataTypes.TEXT },
  solution: { type: DataTypes.TEXT },
  role: { type: DataTypes.STRING(255) },
  tech_stack: { type: DataTypes.JSON, defaultValue: [] },
  challenges: { type: DataTypes.JSON, defaultValue: [] },
  features: { type: DataTypes.JSON, defaultValue: [] },
  impact: { type: DataTypes.TEXT },
  gallery: { type: DataTypes.JSON, defaultValue: [] },
  demo_link: { type: DataTypes.STRING(255) },
  repo_link: { type: DataTypes.STRING(255) },
}, {
  tableName: 'projects',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Project;
