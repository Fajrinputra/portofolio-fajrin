require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/database');

// Import semua model agar Sequelize mengenali mereka
require('./models/Profile');
require('./models/Journey');
require('./models/Organization');
require('./models/Project');
require('./models/Design');
require('./models/Photo');
require('./models/Certificate');
require('./models/Message');


const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Koneksi database berhasil.');

    // sync({ alter: true }) untuk development — update schema tanpa drop data
    await sequelize.sync({ alter: true });
    console.log('✅ Semua tabel tersinkronisasi.');

    app.listen(PORT, () => {
      console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Gagal terhubung ke database:', err.message);
    process.exit(1);
  }
}

startServer();
