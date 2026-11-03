# 🌐 Website Portofolio — Fajrin Putra Pratama

Website portofolio multi-halaman berkinerja tinggi untuk menampilkan profil profesional, riwayat perjalanan, organisasi, proyek software development, desain UI/UX, dan sertifikasi.

Website ini menggunakan **arsitektur hybrid**:
- **Mode Development (Full-Stack)**: React + Node.js/Express + MySQL untuk kemudahan manajemen konten via dashboard CMS `/manage` dengan upload gambar langsung.
- **Mode Production (Statis / Serverless di Vercel)**: Data diekspor menjadi file JSON statis di `frontend/public/data/` dan aset di `frontend/public/images/`. Tanpa backend server aktif di production, website sangat cepat, hemat biaya hosting (gratis di Vercel), aman, dan ramah SEO.

---

## 🏗️ Tech Stack

| Layer | Teknologi |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS v3, Framer Motion, React Router v6, React Helmet Async |
| **Icons & Font** | Lucide React, Space Grotesk (Display), Inter (Body) |
| **Data Layer** | Dual-mode API adapter (`services/api.js`), Static JSON (`/data/*.json`) di Prod |
| **Backend (Dev / CMS)** | Node.js, Express.js, Sequelize ORM, MySQL |
| **Hosting & Deployment** | Vercel (Edge CDN, SPA Routing, Caching Optimization) |
| **Kontak** | Formspree API (dengan fallback otomatis ke `mailto:`) |

---

## 📁 Struktur Proyek

```
portfolio-fajrin/
├── backend/
│   ├── scripts/
│   │   ├── exportToJson.js    # Script ekspor MySQL ke frontend/public/data/*.json
│   │   └── verifyAssets.js    # Script verifikasi kelengkapan aset & deteksi file > 2MB
│   ├── src/
│   │   ├── config/database.js # Konfigurasi Sequelize ORM
│   │   ├── models/            # Model Profile, Journey, Organization, Project, Design, Certificate, Message
│   │   ├── controllers/       # Controller REST API
│   │   └── routes/            # Route Express
│   ├── uploads/               # Penyimpanan gambar dan dokumen dari dashboard dev
│   ├── .env                   # Kredensial DB lokal (diabaikan git)
│   └── package.json           # npm run export, npm run dev, npm run seed
├── frontend/
│   ├── public/
│   │   ├── data/              # File JSON statis (profile, projects, designs, dll)
│   │   ├── images/            # Gambar galeri, thumbnail, dan sertifikat
│   │   ├── cv-fajrin-putra-pratama.pdf # File CV utama
│   │   ├── robots.txt         # Aturan crawling SEO
│   │   └── vercel.json        # Routing SPA & headers caching untuk Vercel
│   ├── src/
│   │   ├── components/        # Komponen UI (Navbar, Footer, Card, Timeline, Lightbox, dll)
│   │   ├── pages/             # Halaman publik (Home, Profil, Perjalanan, Proyek, dll) & Manage (Dev only)
│   │   ├── services/api.js    # Dual-mode data fetcher (API di Dev, JSON di Prod)
│   │   └── main.jsx           # Entrypoint React + HelmetProvider
│   ├── .env.production        # VITE_DATA_SOURCE=static
│   ├── .env.development       # VITE_API_URL=http://localhost:5000/api
│   └── package.json
└── README.md
```

---

## 🚀 Cara Menjalankan Lokal (Development)

### Prasyarat
- Node.js >= 18
- MySQL Server (misal via XAMPP)
- npm

### 1. Persiapan Database & Backend
1. Pastikan service MySQL berjalan (port default `3306`).
2. Pastikan database `portfolio_fajrin` sudah dibuat di MySQL.
3. Masuk ke folder backend dan install dependensi:
   ```bash
   cd backend
   npm install
   ```
4. Salin file environment jika belum ada:
   ```bash
   cp .env.example .env
   ```
   Sesuaikan `DB_USER` dan `DB_PASS` di file `backend/.env`.
5. (Opsional) Jalankan seeder jika database masih kosong:
   ```bash
   npm run seed
   ```
6. Jalankan backend server:
   ```bash
   npm run dev
   # Backend berjalan di http://localhost:5000
   ```

### 2. Persiapan Frontend
1. Buka terminal baru dan masuk ke folder frontend:
   ```bash
   cd frontend
   npm install
   ```
2. Jalankan frontend:
   ```bash
   npm run dev
   # Frontend berjalan di http://localhost:5173
   ```
3. Di mode development:
   - Akses `/manage` untuk masuk ke halaman CMS (PIN dilindungi).
   - Seluruh data dibaca dan ditulis langsung ke MySQL melalui REST API backend.

---

## 🔄 Alur Update Konten Portofolio

Saat Anda ingin menambah proyek baru, memperbarui sertifikat, atau mengubah profil:

```
[1. Buka /manage di Dev] ──> [2. Tambah/Ubah Konten] ──> [3. npm run export] ──> [4. Commit & Push] ──> [5. Vercel Auto-deploy]
```

1. Jalankan MySQL dan backend: `cd backend && npm start`
2. Buka frontend: `cd frontend && npm run dev`
3. Akses `http://localhost:5173/manage`, masukkan PIN, lalu lakukan perubahan konten atau upload gambar baru.
4. Setelah selesai mengedit, jalankan script ekspor di folder backend:
   ```bash
   cd backend
   npm run export
   ```
   Script ini akan:
   - Mengambil data terbaru dari MySQL.
   - Menormalisasi URL lokal (`http://localhost:5000/...` menjadi `/images/...`).
   - Menulis 6 file JSON ke `frontend/public/data/`.
5. Verifikasi aset dengan:
   ```bash
   node scripts/verifyAssets.js
   ```
6. Commit perubahan data dan gambar ke Git, lalu push ke GitHub:
   ```bash
   git add frontend/public/data/ frontend/public/images/
   git commit -m "feat: perbarui konten portofolio"
   git push origin main
   ```
7. Vercel secara otomatis mendeteksi commit baru, mem-build website statis, dan memperbarui portofolio online dalam hitungan detik!

---

## ☁️ Panduan Deploy ke Vercel

1. **Push repository ke GitHub/GitLab**.
2. **Import Project di Vercel Dashboard**:
   - Klik **Add New...** → **Project**.
   - Pilih repository portofolio Anda.
3. **Konfigurasi Project Settings di Vercel**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend` *(PENTING: arahkan root ke subfolder frontend)*
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. **Environment Variables di Vercel (Opsional)**:
   - `VITE_FORMSPREE_ID`: ID form dari Formspree Anda (lihat panduan di bawah).
   - *(Catatan: `VITE_DATA_SOURCE=static` sudah otomatis termuat dari file `frontend/.env.production`)*.
5. Klik **Deploy**! Website Anda siap diakses secara global melalui CDN Vercel.

---

## ✉️ Integrasi Form Kontak (Formspree / Email)

Form kontak pada halaman `/kontak` bekerja secara fleksibel tanpa backend server:
1. **Mode Default (Mailto)**:
   Jika tidak ada Formspree ID, tombol kirim pesan akan membuka aplikasi email pengunjung dengan subjek dan isi pesan yang sudah terisi otomatis ke `fajrinputrapratama01@gmail.com`.
2. **Mode Formspree (Kirim langsung via web)**:
   - Daftar akun gratis di [https://formspree.io](https://formspree.io).
   - Buat formulir baru dan dapatkan Form ID (misal: `xabcdefg`).
   - Masukkan ID tersebut di **Vercel Project Settings → Environment Variables**:
     - Key: `VITE_FORMSPREE_ID`
     - Value: `xabcdefg`
   - Pesan yang dikirim pengunjung dari web akan langsung masuk ke inbox email Anda!

---

## 🛡️ Keamanan & Akses CMS di Production

- Rute `/manage` dinonaktifkan secara otomatis saat aplikasi di-build untuk production (`!import.meta.env.DEV`). Pengunjung yang mencoba mengakses `/manage` di Vercel akan langsung diarahkan ke halaman 404.
- Kredensial database, file `.env` backend, dan folder `uploads/` tidak di-commit ke Git sesuai konfigurasi `.gitignore`.
