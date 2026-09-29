# Sanggar Paiketan Swara — Website Profil & Reservasi

Website profil dan reservasi interaktif untuk Sanggar Paiketan Swara (Gamelan & Tari Bali) yang berlokasi di Desa Bantas, Selemadeg Timur, Tabanan, Bali. Dibangun menggunakan arsitektur Single Page Application (SPA) berbasis Laravel 12, React 19, Tailwind CSS v4, dan Vite.

---

## Spesifikasi & Kebutuhan Server (Server Requirements)

Sebelum melakukan deployment atau hosting, pastikan server memenuhi spesifikasi berikut:

- **PHP**: Versi >= 8.2 (Direkomendasikan PHP 8.3)
  - Ekstensi PHP wajib: `BCMath`, `Ctype`, `cURL`, `DOM`, `Fileinfo`, `Filter`, `Hash`, `Mbstring`, `OpenSSL`, `PCRE`, `PDO`, `PDO_MySQL` (atau `PDO_SQLite`), `Session`, `Tokenizer`, `XML`.
- **Composer**: Versi 2.x
- **Node.js & NPM**: Node.js >= 18.x / 20.x dan NPM >= 9.x (untuk build asset)
- **Database**: MySQL 8.0+ / MariaDB 10.4+ / SQLite 3
- **Web Server**: Nginx atau Apache (dengan modul `mod_rewrite` aktif)

---

## Langkah-Langkah Wajib Sebelum & Saat Hosting (Pre-Hosting Checklist)

Ikuti langkah-langkah berikut secara berurutan saat menyiapkan aplikasi di server hosting atau VPS:

### 1. Unggah / Clone Repositori
Clone repositori ke server atau unggah berkas proyek ke direktori target (di luar direktori publik web server jika di Shared Hosting):
```bash
git clone <url-repository> sanggar-paiketan-swara
cd sanggar-paiketan-swara
```

### 2. Instalasi Dependensi Backend (Composer)
Jalankan instalasi dependensi PHP dengan optimasi produksi (tanpa dependensi dev):
```bash
composer install --no-dev --optimize-autoloader
```

### 3. Konfigurasi File Environment (`.env`)
Salin file `.env.example` menjadi `.env` lalu sesuaikan pengaturannya:
```bash
cp .env.example .env
```

Buka dan sesuaikan variabel kunci pada `.env`:
```ini
APP_NAME="Sanggar Paiketan Swara"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://domain-anda.com

# Konfigurasi Database (Sesuaikan dengan kredensial database server)
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nama_database_hosting
DB_USERNAME=user_database_hosting
DB_PASSWORD=password_database_hosting

# Session, Cache & Storage
SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database
FILESYSTEM_DISK=public

# Konfigurasi Pengiriman Email Notifikasi (SMTP)
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=email_pengirim@gmail.com
MAIL_PASSWORD=password_aplikasi_gmail
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=email_pengirim@gmail.com
MAIL_FROM_NAME="Sanggar Paiketan Swara"
```

### 4. Generate Application Encryption Key
Buat kunci enkripsi aplikasi Laravel:
```bash
php artisan key:generate --force
```

### 5. Kompilasi Asset Frontend (Vite)
Asset React dan Tailwind CSS wajib dikompilasi ke format produksi statis (`public/build/`):

> **PENTING**: **JANGAN** menjalankan `npm run dev` di server hosting. `npm run dev` hanya untuk pengembangan lokal. Jika dijalankan di hosting atau jika file `public/hot` tertinggal, website akan menampilkan halaman putih (*blank page*).

- **Jika server hosting memiliki akses Node.js & Terminal SSH:**
  ```bash
  npm install
  npm run build
  rm -f public/hot
  ```
- **Jika Shared Hosting / cPanel (tanpa Node.js):**
  Jalankan `npm run build` dan `rm -f public/hot` di komputer lokal Anda, lalu pastikan folder `public/build/` ikut terunggah ke hosting (di dalam `public_html/build/`). Server hosting **tidak membutuhkan Node.js**.

### 6. Tautkan Storage Simbolik (Storage Link)
Buat tautan simbolik dari `storage/app/public` ke `public/storage` agar file upload (gambar galeri, artikel, konten) dapat diakses publik:
```bash
php artisan storage:link
```

### 7. Migrasi Database & Seeding Data Awal
Jalankan migrasi tabel dan masukkan data awal (termasuk akun administrator default):
```bash
php artisan migrate --seed --force
```

### 8. Optimasi Cache Laravel untuk Produksi
Jalankan perintah optimasi agar performa aplikasi maksimal dan pembacaan konfigurasi instan:
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache
```

> **Perhatian:** Jika Anda mengubah isi file `.env` di masa mendatang, jalankan kembali `php artisan config:clear` lalu `php artisan config:cache`.

### 9. Pengaturan Hak Akses Direktori (Permissions)
Pastikan web server memiliki izin tulis (write permission) ke direktori `storage` dan `bootstrap/cache`:
```bash
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```
*(Ganti `www-data:www-data` sesuai user web server hosting Anda, misalnya `nginx`, `apache`, atau user cPanel).*

---

## Konfigurasi Web Server

### 1. Pengaturan Document Root (Kritis)
Pastikan **Document Root** domain / subdomain Anda diarahkan langsung ke subdirektori **`public`**, **BUKAN** ke root folder proyek:
- **Benar**: `/var/www/sanggar-paiketan-swara/public`
- **Salah**: `/var/www/sanggar-paiketan-swara`

### 2. Contoh Konfigurasi Nginx
```nginx
server {
    listen 80;
    server_name domain-anda.com www.domain-anda.com;
    root /var/www/sanggar-paiketan-swara/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

### 3. Konfigurasi Apache (Shared Hosting / cPanel)
Jika menggunakan Apache, file `.htaccess` bawaan di dalam folder `public/` sudah mengelola penulisan ulang URL. Pastikan modul `mod_rewrite` aktif.

Jika hosting menggunakan struktur folder cPanel standar:
1. Letakkan seluruh isi proyek Laravel di direktori luar `public_html` (misal: `/home/username/laravel_app/`).
2. Pindahkan seluruh isi folder `public/` (termasuk folder `build/`) ke dalam `/home/username/public_html/`.
3. Sesuaikan path pada file `public_html/index.php`:
   ```php
   require __DIR__.'/../laravel_app/vendor/autoload.php';
   $app = require_once __DIR__.'/../laravel_app/bootstrap/app.php';
   ```

---

## Panduan Khusus: Persiapan & Deployment via File ZIP (Plug & Play)

Gunakan panduan ini jika Anda membagikan proyek dalam bentuk berkas `.zip` untuk di-upload langsung ke hosting/cPanel tanpa memerlukan Node.js di server:

### A. Langkah di Komputer Lokal (Sebelum Membuat ZIP)
1. Matikan server dev lokal jika masih menyala (`Ctrl + C`).
2. Jalankan kompilasi frontend:
   ```bash
   npm run build
   ```
3. Pastikan file `public/hot` terhapus:
   ```bash
   rm -f public/hot
   ```
4. Siapkan dependensi Composer jika server hosting tidak ada terminal Composer:
   ```bash
   composer install --no-dev --optimize-autoloader
   ```
5. Kompres seluruh proyek menjadi `.zip` dengan ketentuan:
   - **WAJIB Masuk**: `public/build/` (beserta `manifest.json`), `app/`, `bootstrap/`, `config/`, `database/`, `public/`, `resources/`, `routes/`, `storage/`, `vendor/`, `artisan`, `.env.example`.
   - **JANGAN Masukkan**: `node_modules/` (sangat berat & tidak diperlukan di server), `public/hot`, `.git/`.

### B. Langkah di Server Hosting (Setelah Ekstrak ZIP)
Di server hosting, Anda **TIDAK PERLU** menjalankan `npm install` atau `npm run dev`:
1. Ekstrak file `.zip` ke File Manager hosting.
2. Salin `.env.example` menjadi `.env`, lalu atur koneksi database dan domain:
   ```ini
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://domain-anda.com
   ```
3. Generate application key (jika belum):
   ```bash
   php artisan key:generate --force
   ```
4. Jalankan migrasi dan seeding database:
   ```bash
   php artisan migrate --seed --force
   ```
5. Buat tautan storage agar gambar tampil:
   ```bash
   php artisan storage:link
   ```
6. Website sudah siap dan langsung tampil normal.

---

## Konfigurasi Fitur Notifikasi Email (SMTP)

Website ini dilengkapi sistem notifikasi email otomatis berbasis template responsif untuk modul Reservasi:
- **Email Masuk (`ReservationReceived`)**: Dikirim otomatis ke pengunjung saat pertama kali mengirim formulir reservasi online.
- **Email Konfirmasi (`ReservationConfirmed`)**: Dikirim otomatis saat admin menyetujui reservasi di Admin Panel.
- **Email Penolakan (`ReservationRejected`)**: Dikirim otomatis saat admin menolak reservasi.

Karena berkas `.env` **TIDAK** disertakan ke Git (`.gitignore`), Anda wajib mengisi konfigurasi SMTP pada `.env` di server hosting Anda:

### Opsi A: Menggunakan Gmail SMTP (Gratis & Mudah)
1. Aktifkan **2-Step Verification** pada akun Google Anda.
2. Buka menu **Security > 2-Step Verification > App Passwords** (Sandi Aplikasi).
3. Buat password aplikasi baru (misal dengan nama `Web Sanggar`) dan salin 16 karakter password yang diberikan.
4. Masukkan ke file `.env` server:
```ini
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=alamatemailanda@gmail.com
MAIL_PASSWORD=enambelaskarakterpasswordapp
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=alamatemailanda@gmail.com
MAIL_FROM_NAME="Sanggar Paiketan Swara"
```

### Opsi B: Menggunakan Webmail / cPanel Hosting SMTP
Gunakan akun email domain kustom dari cPanel hosting Anda (misal `kontak@domain-sanggar.com`):
```ini
MAIL_MAILER=smtp
MAIL_HOST=mail.domain-anda.com
MAIL_PORT=465
MAIL_USERNAME=kontak@domain-anda.com
MAIL_PASSWORD=password_email_cpanel
MAIL_ENCRYPTION=ssl
MAIL_FROM_ADDRESS=kontak@domain-anda.com
MAIL_FROM_NAME="Sanggar Paiketan Swara"
```

### Opsi C: Mode Pengujian Lokal / Tanpa Pengiriman Asli (Log)
Jika di lingkungan lokal dan tidak ingin mengirim email asli:
```ini
MAIL_MAILER=log
```
*(Seluruh isi email akan dicatat di dalam berkas `storage/logs/laravel.log`).*

> **Tips:** Setelah mengubah konfigurasi email di file `.env`, jalankan selalu `php artisan config:clear` dan `php artisan config:cache`.

---

## Kredensial Administrator Default

Setelah proses database seeding selesai dijalankan (`php artisan db:seed`), akun admin default adalah:

- **URL Login Admin**: `https://domain-anda.com/admin`
- **Email**: `admin@sanggar.com`
- **Password**: `password`

> **PENTING**: Segera ubah password dan email administrator setelah pertama kali berhasil login di lingkungan produksi.

---

## Ringkasan Perintah Cepat Deployment (Cheatsheet)

```bash
# 1. Update kode & dependensi
git pull origin main
composer install --no-dev --optimize-autoloader
npm install && npm run build

# 2. Update database & storage
php artisan migrate --force
php artisan storage:link

# 3. Refresh cache produksi
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache
```

---

## Pengembangan Lokal (Local Development)

Untuk menjalankan proyek di lingkungan pengembangan lokal:

1. Salin `.env`: `cp .env.example .env`
2. Pasang dependensi: `composer install` dan `npm install`
3. Generate key: `php artisan key:generate`
4. Buat database & migrasi: `php artisan migrate --seed`
5. Tautkan storage: `php artisan storage:link`
6. Jalankan server Laravel: `php artisan serve`
7. Jalankan compiler Vite: `npm run dev`
8. Akses website di `http://127.0.0.1:8000`
