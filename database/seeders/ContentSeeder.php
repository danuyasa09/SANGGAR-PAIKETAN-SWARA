<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\WebsiteContent;

class ContentSeeder extends Seeder
{
    public function run(): void
    {
        $contents = [
            // ─── BERANDA ───
            ['key' => 'home_hero_title', 'value' => 'Mengenal Budaya Bali melalui Gamelan dan Tari', 'type' => 'text', 'section' => 'beranda'],
            ['key' => 'home_hero_desc', 'value' => 'Selamat datang di Sanggar Paiketan Swara, ruang pelestarian seni, pembelajaran budaya, dan kebersamaan masyarakat di Desa Bantas, Tabanan, Bali. Kami mengajak pelajar, wisatawan, komunitas, dan pencinta budaya untuk mengenal gamelan dan tari Bali secara langsung bersama para pelaku seni lokal.', 'type' => 'text', 'section' => 'beranda'],
            ['key' => 'home_about_title', 'value' => 'Belajar, Berinteraksi, dan Berkarya Bersama', 'type' => 'text', 'section' => 'beranda'],
            ['key' => 'home_about_desc1', 'value' => 'Di Sanggar Paiketan Swara, pengunjung tidak hanya menyaksikan pertunjukan. Melalui program edu-wisata, peserta dapat mendengarkan cerita budaya, mengenal instrumen gamelan, mempelajari gerakan dasar tari, serta mencoba berkesenian bersama anggota sanggar.', 'type' => 'text', 'section' => 'beranda'],
            ['key' => 'home_about_desc2', 'value' => 'Setiap kegiatan dirancang untuk memberikan pengalaman yang edukatif, partisipatif, dan tetap menghormati nilai budaya Bali.', 'type' => 'text', 'section' => 'beranda'],
            ['key' => 'home_about_image', 'value' => 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop', 'type' => 'image', 'section' => 'beranda'],
            ['key' => 'home_eduwisata_title', 'value' => 'Paket Edu-Wisata Seni Budaya', 'type' => 'text', 'section' => 'beranda'],
            ['key' => 'home_eduwisata_desc', 'value' => 'Program edu-wisata Sanggar Paiketan Swara dirancang untuk kelompok berjumlah 10–30 peserta dengan durasi sekitar 60–90 menit. Program dapat disesuaikan dengan usia, jumlah peserta, waktu kunjungan, dan tujuan pembelajaran.', 'type' => 'text', 'section' => 'beranda'],
            ['key' => 'home_why_title', 'value' => 'Mengapa Berkunjung ke Sanggar Paiketan Swara?', 'type' => 'text', 'section' => 'beranda'],
            ['key' => 'home_about_teaser_p1', 'value' => 'Sanggar Paiketan Swara merupakan kelompok seni yang berlokasi di Banjar Dinas Bantas Tengah Kaja, Desa Bantas, Kecamatan Selemadeg Timur, Kabupaten Tabanan, Bali.', 'type' => 'text', 'section' => 'beranda'],
            ['key' => 'home_about_teaser_p2', 'value' => 'Sanggar ini menjadi ruang latihan gamelan dan tari, pembinaan karakter, pelestarian budaya, serta kebersamaan lintas generasi. Anggota sanggar terlibat dalam kegiatan adat, pertunjukan budaya, pelatihan seni, dan pengembangan pengalaman edu-wisata.', 'type' => 'text', 'section' => 'beranda'],
            ['key' => 'home_about_teaser_p3', 'value' => 'Melalui semangat gotong royong, kami berupaya menjaga seni budaya Bali agar tetap hidup, dipahami, dan diwariskan kepada generasi berikutnya.', 'type' => 'text', 'section' => 'beranda'],

            // ─── TENTANG KAMI ───
            ['key' => 'about_banner_image', 'value' => '/images/about_banner.png', 'type' => 'image', 'section' => 'tentangkami'],
            ['key' => 'about_title', 'value' => 'Tentang Sanggar Paiketan Swara', 'type' => 'text', 'section' => 'tentangkami'],
            ['key' => 'about_subtitle', 'value' => 'Ruang latihan gamelan dan tari, pembinaan karakter, pelestarian budaya, serta kebersamaan lintas generasi di Desa Bantas.', 'type' => 'text', 'section' => 'tentangkami'],
            ['key' => 'about_story_title', 'value' => 'Cerita Kami', 'type' => 'text', 'section' => 'tentangkami'],
            ['key' => 'about_story_p1', 'value' => 'Seni tumbuh bersama kehidupan masyarakat Desa Bantas. Gamelan dan tari hadir dalam upacara adat, kegiatan desa, serta berbagai peristiwa yang mempererat hubungan sosial masyarakat.', 'type' => 'text', 'section' => 'tentangkami'],
            ['key' => 'about_story_p2', 'value' => 'Dari lingkungan inilah Sanggar Paiketan Swara berkembang. Sanggar menjadi tempat bagi anggota masyarakat dan generasi muda untuk berlatih, berkarya, serta belajar mengenai disiplin, kebersamaan, dan tanggung jawab.', 'type' => 'text', 'section' => 'tentangkami'],
            ['key' => 'about_story_p3', 'value' => 'Seiring berkembangnya pariwisata berbasis pengalaman, sanggar mulai mengemas aktivitas seni menjadi program edu-wisata. Program tersebut memberikan kesempatan kepada pengunjung untuk tidak hanya melihat, tetapi juga memahami dan mencoba seni Bali secara langsung.', 'type' => 'text', 'section' => 'tentangkami'],
            ['key' => 'about_story_p4', 'value' => 'Pengembangan ini dilakukan dengan tetap menjaga autentisitas, etika, dan batas antara seni yang dapat diperkenalkan kepada pengunjung dengan praktik budaya yang memiliki nilai sakral.', 'type' => 'text', 'section' => 'tentangkami'],
            ['key' => 'about_visi_title', 'value' => 'Visi Kami', 'type' => 'text', 'section' => 'tentangkami'],
            ['key' => 'about_visi_desc', 'value' => 'Menjadi sanggar seni berbasis masyarakat yang berperan aktif dalam pelestarian budaya Bali, pendidikan generasi muda, dan pengembangan edu-wisata yang bertanggung jawab.', 'type' => 'text', 'section' => 'tentangkami'],
            ['key' => 'about_misi_title', 'value' => 'Misi Kami', 'type' => 'text', 'section' => 'tentangkami'],

            // ─── PROGRAM EDU-WISATA ───
            ['key' => 'programs_banner_image', 'value' => '/images/programs_banner.png', 'type' => 'image', 'section' => 'program'],
            ['key' => 'programs_hero_title', 'value' => 'Program Edu-Wisata Seni Budaya', 'type' => 'text', 'section' => 'program'],
            ['key' => 'programs_hero_subtitle', 'value' => 'Belajar Budaya Bali Bersama Pelaku Seni Lokal', 'type' => 'text', 'section' => 'program'],
            ['key' => 'programs_hero_desc', 'value' => 'Program edu-wisata Sanggar Paiketan Swara menghadirkan pengalaman belajar gamelan dan tari secara langsung. Peserta akan didampingi oleh anggota sanggar dalam suasana yang ramah dan interaktif.', 'type' => 'text', 'section' => 'program'],

            // ─── GALERI ───
            ['key' => 'gallery_banner', 'value' => '/images/gallery_banner.png', 'type' => 'image', 'section' => 'galeri'],
            ['key' => 'gallery_title', 'value' => 'Cerita Kami dalam Gambar', 'type' => 'text', 'section' => 'galeri'],
            ['key' => 'gallery_desc', 'value' => 'Lihat berbagai kegiatan Sanggar Paiketan Swara, mulai dari latihan rutin, pertunjukan, pembelajaran gamelan dan tari, kegiatan masyarakat, hingga kunjungan edu-wisata.', 'type' => 'text', 'section' => 'galeri'],

            // ─── BERITA ───
            ['key' => 'news_banner_image', 'value' => '/images/news_banner.png', 'type' => 'image', 'section' => 'berita'],
            ['key' => 'news_title', 'value' => 'Kabar dari Sanggar', 'type' => 'text', 'section' => 'berita'],
            ['key' => 'news_subtitle', 'value' => 'Ikuti perkembangan, kegiatan, dan cerita terbaru dari Sanggar Paiketan Swara.', 'type' => 'text', 'section' => 'berita'],

            // ─── KEMITRAAN ───
            ['key' => 'partnership_banner_image', 'value' => '/images/partnership_banner.png', 'type' => 'image', 'section' => 'kemitraan'],
            ['key' => 'partnership_title', 'value' => 'Mari Bertumbuh dan Melestarikan Budaya Bersama', 'type' => 'text', 'section' => 'kemitraan'],
            ['key' => 'partnership_desc', 'value' => 'Sanggar Paiketan Swara terbuka untuk menjalin kerja sama dalam pelestarian seni, pengembangan edu-wisata, dan pemberdayaan masyarakat.', 'type' => 'text', 'section' => 'kemitraan'],

            // ─── RESERVASI ───
            ['key' => 'reservation_banner_image', 'value' => '/images/reservation_banner.png', 'type' => 'image', 'section' => 'reservasi'],
            ['key' => 'reservation_title', 'value' => 'Rencanakan Kunjungan Anda', 'type' => 'text', 'section' => 'reservasi'],
            ['key' => 'reservation_desc', 'value' => 'Lengkapi formulir berikut agar kami dapat menyiapkan kegiatan yang sesuai. Tim kami akan menghubungi Anda untuk mengonfirmasi ketersediaan jadwal, susunan kegiatan, dan biaya.', 'type' => 'text', 'section' => 'reservasi'],

            // ─── KONTAK ───
            ['key' => 'contact_banner_image', 'value' => '/images/contact_banner.png', 'type' => 'image', 'section' => 'kontak'],
            ['key' => 'contact_title', 'value' => 'Hubungi Kami', 'type' => 'text', 'section' => 'kontak'],
            ['key' => 'contact_desc', 'value' => 'Ingin belajar gamelan, mencoba tari Bali, menyaksikan pertunjukan, atau merencanakan kunjungan kelompok? Hubungi Sanggar Paiketan Swara.', 'type' => 'text', 'section' => 'kontak'],
            ['key' => 'contact_address', 'value' => 'Banjar Dinas Bantas Tengah Kaja, Desa Bantas, Kecamatan Selemadeg Timur, Kabupaten Tabanan, Bali, Indonesia', 'type' => 'text', 'section' => 'kontak'],
            ['key' => 'contact_phone', 'value' => '+62 812-3456-7890', 'type' => 'text', 'section' => 'kontak'],
            ['key' => 'contact_email', 'value' => 'sanggarpaiketanswara@gmail.com', 'type' => 'text', 'section' => 'kontak'],
            ['key' => 'contact_hours', 'value' => 'Senin – Minggu: 08.00 – 18.00 WITA', 'type' => 'text', 'section' => 'kontak'],
            ['key' => 'contact_instagram', 'value' => 'https://instagram.com/sanggarpaiketanswara', 'type' => 'text', 'section' => 'kontak'],
            ['key' => 'contact_facebook', 'value' => 'https://facebook.com/sanggarpaiketanswara', 'type' => 'text', 'section' => 'kontak'],
            ['key' => 'contact_youtube', 'value' => 'https://youtube.com/@sanggarpaiketanswara', 'type' => 'text', 'section' => 'kontak'],

            // ─── CTA BAWAH (GLOBAL) ───
            ['key' => 'cta_bottom_title', 'value' => 'Mari Mengenal Budaya Bali Lebih Dekat', 'type' => 'text', 'section' => 'global'],
            ['key' => 'cta_bottom_desc', 'value' => 'Datang, belajar, dan berkarya bersama Sanggar Paiketan Swara. Setiap kunjungan Anda turut mendukung pelestarian seni, pendidikan generasi muda, dan pemberdayaan masyarakat Desa Bantas.', 'type' => 'text', 'section' => 'global'],
        ];

        foreach ($contents as $content) {
            WebsiteContent::updateOrCreate(
                ['key' => $content['key']],
                $content
            );
        }
    }
}
