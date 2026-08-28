# Sanggar Paiketan Swara — Frontend Website

Website profil dan reservasi interaktif untuk **Sanggar Paiketan Swara** (Gamelan & Tari Bali) yang berlokasi di Desa Bantas, Tabanan, Bali. Dibuat menggunakan arsitektur Single Page Application (SPA) modern yang terintegrasi dengan Laravel, React, dan Tailwind CSS v4.

---

## 🛠️ Stack Teknologi

- **Backend / Router Wrapper**: Laravel 11/12
- **Frontend Core**: React 19 (dengan React DOM)
- **Styling System**: Tailwind CSS v4 (Sistem variabel `@theme` modern)
- **Asset Bundler / HMR**: Vite 8 (dengan `@vitejs/plugin-react`)
- **Icon Library**: Lucide React

---

## 📂 Struktur Direktori Frontend

Berikut adalah pemetaan file utama frontend di dalam direktori `resources/`:

```bash
resources/
├── css/
│   └── app.css                # Konfigurasi variabel tema Tailwind v4 & Scrollbar
├── js/
│   ├── app.jsx                # Entry-point bootstrap React
│   ├── components/            # Komponen bersama (Shared Components)
│   │   ├── App.jsx            # State Router & penentu transisi halaman
│   │   ├── Navbar.jsx         # Navigasi responsif (Desktop & Mobile)
│   │   ├── Footer.jsx         # Footer lengkap dengan link sosial & alamat
│   │   └── PageWrapper.jsx    # Kontainer efek animasi fade-in-out
│   └── pages/                 # Halaman utama (Views)
│       ├── Home.jsx           # Beranda (Hero, Paket, Keunggulan)
│       ├── About.jsx          # Tentang Kami (Visi, Misi, 5 Nilai Inti)
│       ├── Programs.jsx       # Program Edu-Wisata (Detail Paket & Target)
│       ├── News.jsx           # Berita Terkini
│       ├── Gallery.jsx        # Galeri Kegiatan (Filter Kategori)
│       ├── Partnership.jsx    # Kemitraan & Sponsorship
│       ├── Contact.jsx        # Kontak Kami (Formulir Hubungi Kami)
│       └── Reservation.jsx    # Formulir Reservasi & Detail Booking
└── views/
    └── welcome.blade.php      # Blade template utama sebagai mount-point React
```

---

## 🚀 Cara Menjalankan Proyek

Buka dua terminal berbeda pada folder root proyek (`sanggar_client`):

### Terminal 1: Menjalankan Server Laravel
Untuk melayani routing backend dan memuat halaman:
```bash
php artisan serve
```
> Server akan aktif di **http://127.0.0.1:8000**

### Terminal 2: Menjalankan Vite (Frontend Compiler)
Untuk kompilasi asset secara *real-time* (Hot Module Replacement):
```cmd
npm run dev
```

### 🔑 Akses Dasbor Admin
Setelah server berjalan, Anda dapat mengelola konten website (CMS) dengan mengakses Dasbor Admin:
- **URL**: [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin)
- **Email**: `admin@sanggar.com`
- **Password**: `password`

---
## Migrate dulu biar ada database 
``` bash
php artisan migrate
```
## 🎭 Animasi Transisi Halaman (Fade-In-Out)

Website ini menggunakan sistem routing berbasis state di dalam `App.jsx` dan dibalut oleh `PageWrapper.jsx` untuk menciptakan perpindahan halaman yang profesional:
1. Ketika link navigasi diklik, halaman aktif akan memicu state `visible = false` yang secara perlahan menurunkan opasitas kontainer menjadi `opacity-0` dan mengecilkan skala kontainer (`duration-300`).
2. Setelah 300ms (animasi keluar selesai), state halaman diperbarui ke halaman baru, scrollbar diatur ulang ke atas instan (`window.scrollTo(0,0)`), dan state diubah kembali menjadi `visible = true`.
3. Halaman baru memudar masuk secara elegan (`opacity-100`) ke posisi semula.

---

## 🎨 Palet Warna & Font (Tailwind v4)

Variabel tema didefinisikan secara modern di dalam `resources/css/app.css` menggunakan sintaks `@theme`:
- **Background Utama (Warm Cream)**: `--color-brand-bg: #FAF6F0`
- **Teks / Earth Dark**: `--color-brand-dark: #261E14`
- **Gold Accent (Bali Gold)**: `--color-brand-gold: #C99B53`
- **Gold Hover**: `--color-brand-gold-hover: #B7863F`
- **Dark Forest Green**: `--color-brand-forest: #1A2F1C`
- **Brand Red**: `--color-brand-red: #8B261E`

### Font:
- **Heading**: `Playfair Display` (Serif premium untuk aksen tradisional Bali)
- **Body / Teks**: `Instrument Sans` (Sans-serif bersih untuk keterbacaan tinggi)

---

## 💡 Tips Pengaturan Editor (Menghilangkan Garis Merah di app.css)

Jika file `app.css` menampilkan tanda error merah di editor Anda, hal ini dikarenakan editor belum mengenali struktur `@theme` atau `@import "tailwindcss"` bawaan Tailwind CSS v4.

**Cara memperbaikinya di VS Code:**
1. Buka **Settings** (`Ctrl + ,`).
2. Cari `css.validate`.
3. Hapus centang pada **Css › Validate** (ubah ke `false`).
4. Pasang ekstensi resmi **Tailwind CSS IntelliSense** di VS Code.
