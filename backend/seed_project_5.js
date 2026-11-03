const sequelize = require('./src/config/database');
const Project = require('./src/models/Project');

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('Connected to database.');

    const newProject = {
      slug: 'alter-studio-workflow-management',
      title: 'Sistem Informasi Manajemen Alur Kerja Terintegrasi - Alter Studio',
      category: 'Web Development',
      tagline: 'Sistem manajemen alur kerja terintegrasi untuk pemesanan layanan, kolaborasi pasca-produksi, dan kinerja kru.',
      background: 'Proses operasional studio fotografi masih dilakukan melalui kombinasi aplikasi terpisah (WhatsApp, Instagram, Notion, Google Drive), menyebabkan data tersebar, risiko kesalahan input, potensi benturan jadwal, dan kesulitan memantau progres proyek serta kinerja kru.',
      solution: 'Membangun Sistem Informasi Manajemen Alur Kerja Terintegrasi berbasis website yang menyatukan proses pemesanan layanan, pembayaran, penjadwalan kru, koordinasi pasca-produksi, dan pelaporan kinerja dalam satu platform terpusat.',
      role: 'Fullstack Developer',
      tech_stack: ['PHP', 'Laravel', 'Tailwind CSS', 'MySQL', 'Midtrans'],
      challenges: ['Mengintegrasikan berbagai tahapan operasional yang kompleks ke dalam satu alur kerja terpadu', 'Merancang sistem penjadwalan anti-bentrok untuk sumber daya studio (fotografer, editor, ruangan)'],
      features: ['Pemesanan Layanan & Pembayaran (Midtrans)', 'Penjadwalan Kru & Ruangan Otomatis', 'Kolaborasi Pasca-Produksi (Integrasi Link Google Drive)', 'Dashboard Laporan Pemasukan & Kinerja Kru', 'Hak Akses Role-Based (Admin, Manajer, Owner, Fotografer, Editor, Klien)'],
      impact: 'Membantu koordinasi lintas divisi secara terstruktur, mengurangi human error dalam administrasi, dan mempercepat pengambilan keputusan manajerial melalui laporan otomatis.',
      thumbnail: '',
      gallery: []
    };

    await Project.create(newProject);
    console.log('Created project: ' + newProject.title);
    
    console.log('Seed completed successfully!');
  } catch (error) {
    console.error('Error seeding project:', error);
  } finally {
    process.exit();
  }
}

seed();
