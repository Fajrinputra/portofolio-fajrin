# 🌐 Website Portofolio — Fajrin Putra Pratama

Website portofolio full-stack multi-halaman untuk menampilkan proyek, desain UI/UX, foto freelance, sertifikat, dan informasi profesional.

---

## 🏗️ Tech Stack

| Layer | Teknologi |
|---|---|
| **Frontend** | React 18 + Vite, Tailwind CSS v3, Framer Motion, React Router DOM v6 |
| **Backend** | Node.js + Express.js, Sequelize ORM |
| **Database** | MySQL |
| **Font** | Space Grotesk (headline) + Inter (body) |
| **Icons** | lucide-react |

---

## 📁 Struktur Folder

```
portfolio-fajrin/
├── backend/
│   ├── src/
│   │   ├── config/database.js
│   │   ├── models/         (7 model)
│   │   ├── controllers/    (7 controller)
│   │   ├── routes/         (7 routes)
│   │   └── seeders/index.js
│   ├── .env                ← ISI INI DULU!
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/     (9 reusable components)
    │   ├── pages/          (12+ halaman)
    │   ├── services/api.js
    │   └── hooks/useTheme.js
    └── package.json
```

---

## 🚀 Cara Menjalankan (Development)

### Prasyarat
- Node.js >= 18
- MySQL Server (lokal atau remote)
- npm atau yarn

---

### 1. Setup Database

Buka MySQL dan buat database:
```sql
CREATE DATABASE portfolio_fajrin CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

---

### 2. Setup Backend

```bash
cd backend

# Salin dan isi .env
# Pastikan DB_USER, DB_PASS, DB_NAME sudah benar
# File .env sudah ada, tinggal edit:
notepad .env
```

Isi `.env`:
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=password_mysql_kamu
DB_NAME=portfolio_fajrin
PORT=5000
NODE_ENV=development
```

```bash
# Install dependencies (sudah dilakukan)
npm install

# Jalankan seeder (buat tabel + isi data awal)
npm run seed

# Jalankan server
npm run dev
```

Backend berjalan di: **http://localhost:5000**

Cek health: http://localhost:5000/api/health

---

### 3. Setup Frontend

```bash
cd frontend

# Install dependencies (sudah dilakukan)
npm install

# Jalankan dev server
npm run dev
```

Frontend berjalan di: **http://localhost:5173**

> Vite sudah dikonfigurasi proxy `/api` → `http://localhost:5000`, jadi tidak perlu CORS manual.

---

## 📄 Halaman

| URL | Halaman |
|---|---|
| `/` | Home (hero, skills marquee, preview proyek & foto) |
| `/profil` | Profil Diri (foto, bio, skills tabs) |
| `/perjalanan` | Perjalanan Pendidikan (timeline animasi) |
| `/organisasi` | Pengalaman Organisasi (card grid) |
| `/proyek` | Proyek (filter + grid) |
| `/proyek/:slug` | Detail Proyek |
| `/uiux` | Design UI/UX (filter + grid) |
| `/uiux/:slug` | Detail Design |
| `/foto` | Foto Freelance (masonry + lightbox) |
| `/sertifikat` | Sertifikat (grid + lightbox) |
| `/kontak` | Kontak (form + social links) |
| `/manage` | **Admin** — CRUD semua konten |

---

## 🗄️ API Endpoints

**Base URL:** `http://localhost:5000/api`

| Endpoint | GET | POST | PUT | DELETE |
|---|---|---|---|---|
| `/profile` | ✅ | - | ✅ | - |
| `/journeys` | ✅ | ✅ | ✅ `/:id` | ✅ `/:id` |
| `/organizations` | ✅ | ✅ | ✅ `/:id` | ✅ `/:id` |
| `/projects` | ✅ | ✅ | ✅ `/:id` | ✅ `/:id` |
| `/projects/:slug` | ✅ | - | - | - |
| `/designs` | ✅ | ✅ | ✅ `/:id` | ✅ `/:id` |
| `/designs/:slug` | ✅ | - | - | - |
| `/photos` | ✅ `?category=` | ✅ | ✅ `/:id` | ✅ `/:id` |
| `/certificates` | ✅ | ✅ | ✅ `/:id` | ✅ `/:id` |

---

## ✍️ Mengisi Konten

Setelah server berjalan, buka `/manage` di browser:

**http://localhost:5173/manage**

Tab yang tersedia:
- **Profil** — Isi nama, bio, tagline, foto, CV, dan skills
- **Perjalanan** — Edit data SD/SMP/SMA/Kuliah
- **Organisasi** — Tambah pengalaman organisasi
- **Proyek** — Tambah portfolio proyek
- **UI/UX** — Tambah case study design
- **Foto** — Upload URL foto freelance
- **Sertifikat** — Tambah sertifikat

---

## 🎨 Design System

| Variable | Nilai |
|---|---|
| `--color-bg-primary` | `#0F1115` (dark) / `#FAFAFA` (light) |
| `--color-accent` | `#6C5CE7` (violet) |
| `--color-accent-secondary` | `#00D9C0` (teal) |
| Font heading | Space Grotesk |
| Font body | Inter |

---

## 🔒 Catatan Keamanan

> ⚠️ **Endpoint tulis belum diproteksi auth.** Jangan deploy ke publik sebelum menambahkan middleware auth di semua route POST/PUT/DELETE.

Semua route non-GET sudah diberi komentar:
```js
// TODO: protect this route with auth middleware
```

---

## 🌍 Deploy

Untuk hosting, butuh server yang mendukung **Node.js + MySQL**:
- **Railway** — gratis tier tersedia
- **Render** — gratis tier tersedia  
- **VPS** (DigitalOcean, Contabo, dll)

> Static hosting (Vercel, Netlify) tidak cukup karena butuh backend Node.js.

---

## 📝 TODO (Next Steps)

- [ ] Tambah auth middleware (JWT) untuk proteksi `/manage` dan endpoint tulis
- [ ] Upload file gambar (multer + cloud storage)
- [ ] Email endpoint untuk form kontak (Nodemailer / Formspree)
- [ ] SEO: sitemap.xml dan robots.txt
- [ ] Dark/light mode disimpan ke DB profile

---

*Dibuat dengan ❤️ menggunakan React + Tailwind + Express*
