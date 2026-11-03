const sequelize = require('./src/config/database');
const Project = require('./src/models/Project');

async function fixAlterStudio() {
  try {
    await sequelize.authenticate();
    
    await Project.update({
      tech_stack: ['PHP', 'Laravel', 'Tailwind CSS', 'MySQL', 'Midtrans'],
      challenges: [
        'Mengintegrasikan berbagai tahapan operasional yang kompleks ke dalam satu alur kerja terpadu',
        'Merancang sistem penjadwalan anti-bentrok untuk sumber daya studio (fotografer, editor, ruangan)'
      ],
      features: [
        'Pemesanan Layanan & Pembayaran (Midtrans)',
        'Penjadwalan Kru & Ruangan Otomatis',
        'Kolaborasi Pasca-Produksi (Integrasi Link Google Drive)',
        'Dashboard Laporan Pemasukan & Kinerja Kru',
        'Hak Akses Role-Based (Admin, Manajer, Owner, Fotografer, Editor, Klien)'
      ],
      gallery: []
    }, {
      where: { slug: 'alter-studio-workflow-management' }
    });
    
    console.log('Alter Studio fixed successfully!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

fixAlterStudio();
