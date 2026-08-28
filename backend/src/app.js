const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/profile', require('./routes/profile.routes'));
app.use('/api/journeys', require('./routes/journeys.routes'));
app.use('/api/organizations', require('./routes/organizations.routes'));
app.use('/api/projects', require('./routes/projects.routes'));
app.use('/api/designs', require('./routes/designs.routes'));
app.use('/api/photos', require('./routes/photos.routes'));
app.use('/api/certificates', require('./routes/certificates.routes'));
app.use('/api/upload', require('./routes/upload.routes'));
app.use('/api/messages', require('./routes/messages.routes'));


// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route tidak ditemukan.' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Terjadi kesalahan internal.' });
});

module.exports = app;
