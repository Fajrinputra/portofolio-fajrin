const sequelize = require('./src/config/database');
const Project = require('./src/models/Project');

const projects = [
  {
    slug: 'sarpras-ppsdm-bukittinggi',
    title: 'Sistem Informasi Pengelolaan Aset (Sarpras V1.0) - PPSDM Bukittinggi',
    category: 'Web Development',
    tagline: 'Sistem pengelolaan aset internal berbasis web untuk mendukung efisiensi operasional dan transparansi.',
    background: 'Pengelolaan aset di PPSDM Regional Bukittinggi selama ini masih menggunakan metode manual dan semi-digital (dokumen fisik, spreadsheet), yang rentan terhadap duplikasi, kesalahan pencatatan, dan kesulitan pelacakan riwayat aset.',
    solution: 'Membangun Modul Pengelolaan Aset berbasis web (Sarpras V1.0) yang mengintegrasikan pencatatan aset (CRUD), pengajuan peminjaman, persetujuan admin, dan pelaporan barang rusak dengan hak akses berbasis peran.',
    role: 'Fullstack Developer',
    tech_stack: ['PHP 7.4', 'CodeIgniter 4.4.8', 'MySQL 7.4.1', 'HTML', 'CSS', 'JavaScript'],
    challenges: ['Mengintegrasikan sistem dengan alur kerja birokrasi pemerintahan', 'Memastikan kemudahan penggunaan bagi pengguna yang tidak memiliki latar belakang teknis (menggunakan metode Prototyping)'],
    features: ['Manajemen Data Aset (CRUD)', 'Sistem Peminjaman Aset (Request to Approval)', 'Pelaporan Aset Rusak', 'Hak Akses Berbasis Peran'],
    impact: 'Meningkatkan efisiensi, akurasi, dan transparansi dalam pengelolaan aset, serta membantu pemantauan riwayat peminjaman dan kondisi aset secara real-time.',
    thumbnail: '',
    gallery: []
  },
  {
    slug: 'aplikasi-farmunand',
    title: 'Aplikasi FarmUnand - Platform Digital Terpadu Peternakan',
    category: 'Web Development',
    tagline: 'Marketplace dan platform edukasi produk peternakan berkualitas dari Fakultas Peternakan Universitas Andalas.',
    background: 'Banyak produk peternakan berkualitas dari Fakultas Peternakan UNAND belum memiliki saluran pemasaran yang optimal. Proses jual beli konvensional menyebabkan potensi pasar tidak dimanfaatkan secara maksimal.',
    solution: 'Mengembangkan aplikasi FarmUnand sebagai platform digital yang mempertemukan produsen dengan konsumen. Sistem ini mengintegrasikan seluruh proses jual beli, mengelola inventaris, dan menyajikan informasi produk.',
    role: 'System Analyst & Programmer',
    tech_stack: ['Java (Android Studio)', 'JavaFX', 'UML', 'BPMN'],
    challenges: ['Mengintegrasikan sistem pemasaran dan inventory secara real-time', 'Merancang arsitektur sistem yang mudah dipahami oleh civitas akademika dan masyarakat umum'],
    features: ['Pemesanan & Pembayaran Digital', 'Manajemen Inventaris', 'Pelacakan Penjualan & Laporan', 'Media Edukasi Asal-Usul Produk'],
    impact: 'Memperluas jangkauan pasar, meningkatkan volume penjualan produk peternakan UNAND, serta mengedukasi masyarakat tentang produk ternak yang aman dan berkualitas.',
    thumbnail: '',
    gallery: []
  },
  {
    slug: 'hoax-detector-nlp',
    title: 'AI Hoax Detector Pro - Sistem Deteksi Berita Hoax',
    category: 'Lainnya',
    tagline: 'Aplikasi berbasis web untuk memverifikasi keaslian berita secara otomatis menggunakan Natural Language Processing (NLP).',
    background: 'Maraknya penyebaran berita hoax di media sosial yang sering kali tidak melalui proses verifikasi memadai, menyebabkan kesalahpahaman dan kepanikan publik.',
    solution: 'Membangun website pendeteksi hoax menggunakan metode Machine Learning dan Natural Language Processing (NLP) dengan algoritma Support Vector Machine (SVM) dan ekstraksi fitur TF-IDF.',
    role: 'Data Scientist & Backend Developer',
    tech_stack: ['Python', 'Streamlit', 'Scikit-Learn', 'SpaCy', 'Pandas', 'MySQL'],
    challenges: ['Menangani ketidakseimbangan dataset', 'Ekstraksi sentimen teks untuk mendeteksi pola emosi (ketakutan/kemarahan) pada berita hoax'],
    features: ['Deteksi Hoax Real-time', 'Analisis Sentimen', 'Visualisasi Probabilitas Hoax', 'Ekstraksi Entitas Nama Tokoh (NER)'],
    impact: 'Memberikan alat bantu efektif bagi masyarakat untuk memvalidasi informasi, mengurangi penyebaran berita palsu, dan meningkatkan literasi digital.',
    thumbnail: '',
    gallery: []
  },
  {
    slug: 'erp-blueseer-dewata-vape',
    title: 'Implementasi ERP Blueseer - Dewata Vape Store',
    category: 'Enterprise/ERP',
    tagline: 'Optimalisasi distribusi barang dan operasional antar cabang menggunakan sistem ERP open-source.',
    background: 'Pertumbuhan pesat cabang Dewata Vape Store menyebabkan kesulitan dalam pengelolaan penjualan, pelacakan inventaris fisik, dan koordinasi distribusi barang yang sebelumnya dilakukan secara manual.',
    solution: 'Mengadopsi dan mengkonfigurasi sistem ERP open-source (Blueseer) untuk mengotomatisasi manajemen inventaris, mengelola arus kas (finance), dan memantau pembelian serta distribusi logistik secara terpusat.',
    role: 'ERP Implementation Consultant',
    tech_stack: ['ERP Blueseer', 'Java 11', 'MySQL', 'BPMN'],
    challenges: ['Keterbatasan sumber daya untuk pelatihan karyawan dalam transisi sistem baru', 'Mengubah kultur proses bisnis manual menjadi terkomputerisasi secara penuh'],
    features: ['Manajemen Inventaris Multi-Cabang', 'Purchasing & Order Maintenance', 'Akuntansi & Laporan Keuangan', 'Penjadwalan Logistik & Distribusi'],
    impact: 'Meningkatkan efisiensi operasional, menekan risiko kesalahan data manual, serta memastikan ketersediaan stok yang konsisten di semua cabang Dewata Vape Store.',
    thumbnail: '',
    gallery: []
  }
];

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('Connected to database.');
    
    await Project.destroy({ truncate: true });
    console.log('Cleared existing projects.');

    for (const p of projects) {
      await Project.create(p);
      console.log(`Created project: ${p.title}`);
    }
    
    console.log('Seed completed successfully!');
  } catch (error) {
    console.error('Error seeding projects:', error);
  } finally {
    process.exit();
  }
}

seed();
