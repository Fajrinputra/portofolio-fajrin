require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const sequelize = require('../config/database');
const Profile = require('../models/Profile');
const Journey = require('../models/Journey');
const Organization = require('../models/Organization');
const Project = require('../models/Project');
const Design = require('../models/Design');
const Photo = require('../models/Photo');
const Certificate = require('../models/Certificate');

async function seedAll() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('📦 Mulai seeding database...\n');

    // --- Profile ---
    const existingProfile = await Profile.findOne();
    if (!existingProfile) {
      await Profile.create({
        full_name: 'Fajrin Putra Pratama',
        nickname: 'Fajrin',
        birth_place: 'Batanghari, Jambi',
        birth_date: '2004-04-18',
        tagline: 'Fresh Graduate Sistem Informasi · Developer & Designer',
        bio: 'Saya adalah fresh graduate Sistem Informasi dari Universitas Andalas. Saya memiliki passion di bidang pengembangan software, desain UI/UX, dan fotografi. Selama kuliah, saya aktif mengembangkan berbagai proyek berbasis web dan mobile, mulai dari sistem ERP hingga aplikasi mobile.',
        goals: JSON.stringify([
          { title: 'Inovasi', description: 'Selalu mencari solusi kreatif dan inovatif untuk setiap tantangan teknologi.' },
          { title: 'Fleksibilitas Bisnis', description: 'Membangun produk yang adaptif terhadap kebutuhan bisnis yang terus berkembang.' },
          { title: 'Kolaborasi', description: 'Percaya bahwa kolaborasi tim yang solid menghasilkan karya terbaik.' },
        ]),
        photo_url: '/assets/foto-profil.jpg',
        cv_url: '/assets/CV-Fajrin-Putra-Pratama.pdf',
        skills: [
          { category: 'Programming & Framework', items: ['PHP', 'CodeIgniter', 'Laravel', 'JavaScript', 'Express.js', 'React.js', 'Bootstrap', 'Tailwind CSS'] },
          { category: 'Database', items: ['MySQL', 'PostgreSQL', 'Redis'] },
          { category: 'Design', items: ['Figma'] },
          { category: 'Media & Konten', items: ['Video Editing', 'Photo Editing', 'Fotografi', 'Social Media Management'] },
        ],
      });
      console.log('✅ Profile seeded');
    } else {
      console.log('⏭️  Profile sudah ada, skip');
    }

    // --- Journeys ---
    const journeyCount = await Journey.count();
    if (journeyCount === 0) {
      await Journey.bulkCreate([
        { level: 'SD', institution_name: 'SD Negeri 112/I Perumnas', period: '2010 - 2016', description: 'Membangun fondasi pendidikan dasar dengan semangat belajar yang tinggi.', achievement: '', image_url: '', sort_order: 1 },
        { level: 'SMP', institution_name: 'SMP Negeri 3 Batang Hari', period: '2016 - 2019', description: 'Mulai mengenal dunia komputer dan teknologi, serta aktif dalam kegiatan sekolah.', achievement: '', image_url: '', sort_order: 2 },
        { level: 'SMA', institution_name: 'SMA Negeri 1 Batang Hari', period: '2019 - 2022', description: 'Mengembangkan minat di bidang teknologi informasi dan mulai belajar pemrograman dasar.', achievement: '', image_url: '', sort_order: 3 },
        { level: 'Kuliah', institution_name: 'S1 Sistem Informasi, Universitas Andalas', period: '2022 - 2026', description: 'Menempuh pendidikan sarjana Sistem Informasi dengan fokus pada pengembangan software, desain sistem, dan analisis data. Aktif dalam berbagai proyek dan organisasi kampus.', achievement: 'Lulus dengan predikat Pujian, IPK 3.59, masa studi 3 tahun 11 bulan', image_url: '', sort_order: 4 },
      ]);
      console.log('✅ Journeys seeded');
    } else {
      console.log('⏭️  Journeys sudah ada, skip');
    }

    // --- Organizations ---
    const orgCount = await Organization.count();
    if (orgCount === 0) {
      await Organization.bulkCreate([
        { org_name: '[Nama Organisasi 1]', role: '[Jabatan/Role]', period: '[Periode]', description: 'Deskripsi singkat kontribusi dan kegiatan di organisasi ini.', logo_url: '', sort_order: 1 },
        { org_name: '[Nama Organisasi 2]', role: '[Jabatan/Role]', period: '[Periode]', description: 'Deskripsi singkat kontribusi dan kegiatan di organisasi ini.', logo_url: '', sort_order: 2 },
        { org_name: '[Nama Organisasi 3]', role: '[Jabatan/Role]', period: '[Periode]', description: 'Deskripsi singkat kontribusi dan kegiatan di organisasi ini.', logo_url: '', sort_order: 3 },
      ]);
      console.log('✅ Organizations seeded');
    } else {
      console.log('⏭️  Organizations sudah ada, skip');
    }

    // --- Projects ---
    const projectCount = await Project.count();
    if (projectCount === 0) {
      await Project.bulkCreate([
        { slug: 'project-1', title: '[Nama Project 1]', category: 'Web Development', tagline: 'Tagline singkat project ini.', thumbnail: '', background: 'Latar belakang project.', solution: 'Solusi yang ditawarkan.', role: 'Full Stack Developer', tech_stack: ['React.js', 'Laravel', 'MySQL'], challenges: ['Tantangan 1', 'Tantangan 2'], features: ['Fitur 1', 'Fitur 2'], impact: 'Dampak yang dihasilkan.', gallery: [], demo_link: '', repo_link: '' },
        { slug: 'project-2', title: '[Nama Project 2]', category: 'Enterprise/ERP', tagline: 'Tagline singkat project ini.', thumbnail: '', background: 'Latar belakang project.', solution: 'Solusi yang ditawarkan.', role: 'Backend Developer', tech_stack: ['Laravel', 'MySQL', 'Bootstrap'], challenges: ['Tantangan 1'], features: ['Fitur 1', 'Fitur 2', 'Fitur 3'], impact: 'Dampak yang dihasilkan.', gallery: [], demo_link: '', repo_link: '' },
        { slug: 'project-3', title: '[Nama Project 3]', category: 'Web Development', tagline: 'Tagline singkat project ini.', thumbnail: '', background: 'Latar belakang project.', solution: 'Solusi yang ditawarkan.', role: 'Frontend Developer', tech_stack: ['React.js', 'Tailwind CSS', 'Express.js'], challenges: ['Tantangan 1'], features: ['Fitur 1', 'Fitur 2'], impact: 'Dampak yang dihasilkan.', gallery: [], demo_link: '', repo_link: '' },
        { slug: 'project-4', title: '[Nama Project 4]', category: 'Lainnya', tagline: 'Tagline singkat project ini.', thumbnail: '', background: 'Latar belakang project.', solution: 'Solusi yang ditawarkan.', role: 'Developer', tech_stack: ['PHP', 'MySQL'], challenges: [], features: ['Fitur 1'], impact: 'Dampak yang dihasilkan.', gallery: [], demo_link: '', repo_link: '' },
      ]);
      console.log('✅ Projects seeded');
    } else {
      console.log('⏭️  Projects sudah ada, skip');
    }

    // --- Designs ---
    const designCount = await Design.count();
    if (designCount === 0) {
      await Design.bulkCreate([
        { slug: 'design-1', title: '[Nama Design 1]', category: 'Mobile App', thumbnail: '', description: 'Deskripsi case study desain ini.', process: 'Riset pengguna → Wireframe → Hi-Fi Mockup → Prototype', gallery: [], figma_link: '', sort_order: 1 },
        { slug: 'design-2', title: '[Nama Design 2]', category: 'Web App', thumbnail: '', description: 'Deskripsi case study desain ini.', process: 'Riset pengguna → Wireframe → Hi-Fi Mockup → Prototype', gallery: [], figma_link: '', sort_order: 2 },
        { slug: 'design-3', title: '[Nama Design 3]', category: 'Landing Page', thumbnail: '', description: 'Deskripsi case study desain ini.', process: 'Riset pengguna → Wireframe → Hi-Fi Mockup', gallery: [], figma_link: '', sort_order: 3 },
      ]);
      console.log('✅ Designs seeded');
    } else {
      console.log('⏭️  Designs sudah ada, skip');
    }

    // --- Photos ---
    const photoCount = await Photo.count();
    if (photoCount === 0) {
      await Photo.bulkCreate([
        { title: '[Foto Placeholder 1]', category: 'Wedding', image_url: 'https://picsum.photos/seed/wedding1/800/600', description: 'Foto wedding profesional.', client_name: '[Nama Klien]', sort_order: 1 },
        { title: '[Foto Placeholder 2]', category: 'Event', image_url: 'https://picsum.photos/seed/event1/800/600', description: 'Dokumentasi event.', client_name: '[Nama Klien]', sort_order: 2 },
        { title: '[Foto Placeholder 3]', category: 'Product', image_url: 'https://picsum.photos/seed/product1/800/600', description: 'Foto produk.', client_name: '[Nama Klien]', sort_order: 3 },
        { title: '[Foto Placeholder 4]', category: 'Portrait', image_url: 'https://picsum.photos/seed/portrait1/800/600', description: 'Foto portrait.', client_name: '[Nama Klien]', sort_order: 4 },
        { title: '[Foto Placeholder 5]', category: 'Wedding', image_url: 'https://picsum.photos/seed/wedding2/800/600', description: 'Foto wedding profesional.', client_name: '[Nama Klien]', sort_order: 5 },
        { title: '[Foto Placeholder 6]', category: 'Event', image_url: 'https://picsum.photos/seed/event2/800/600', description: 'Dokumentasi event.', client_name: '[Nama Klien]', sort_order: 6 },
      ]);
      console.log('✅ Photos seeded');
    } else {
      console.log('⏭️  Photos sudah ada, skip');
    }

    // --- Certificates ---
    const certCount = await Certificate.count();
    if (certCount === 0) {
      await Certificate.bulkCreate([
        { title: '[Nama Sertifikat 1]', issuer: '[Penerbit]', issued_date: '2024-01-01', image_url: '', credential_url: '', sort_order: 1 },
        { title: '[Nama Sertifikat 2]', issuer: '[Penerbit]', issued_date: '2024-03-01', image_url: '', credential_url: '', sort_order: 2 },
        { title: '[Nama Sertifikat 3]', issuer: '[Penerbit]', issued_date: '2024-06-01', image_url: '', credential_url: '', sort_order: 3 },
        { title: '[Nama Sertifikat 4]', issuer: '[Penerbit]', issued_date: '2024-09-01', image_url: '', credential_url: '', sort_order: 4 },
        { title: '[Nama Sertifikat 5]', issuer: '[Penerbit]', issued_date: '2025-01-01', image_url: '', credential_url: '', sort_order: 5 },
      ]);
      console.log('✅ Certificates seeded');
    } else {
      console.log('⏭️  Certificates sudah ada, skip');
    }

    console.log('\n🎉 Seeding selesai!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding gagal:', err);
    process.exit(1);
  }
}

seedAll();
