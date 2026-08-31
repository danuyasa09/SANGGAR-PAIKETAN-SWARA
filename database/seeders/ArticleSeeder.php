<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;
use Carbon\Carbon;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        $articles = [
            [
                'tag'               => 'ACARA KHUSUS',
                'title'             => 'Festival Gamelan Bali Tahunan Kembali Digelar di Sanggar Paiketan Swara',
                'cover_url'         => 'https://images.unsplash.com/photo-1513829096963-8a30ef68ad66?q=80&w=1600&auto=format&fit=crop',
                'read_time'         => '5 menit baca',
                'author_name'       => 'Tim Sanggar Paiketan',
                'author_role'       => 'Penulis & Pengelola Konten',
                'author_avatar_url' => 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
                'views'             => 2841,
                'is_published'      => true,
                'published_at'      => Carbon::parse('2026-08-24'),
                'content'           => [
                    ['type' => 'lead',      'text' => 'Menyambut bulan purnama, Sanggar Paiketan Swara kembali menjadi tuan rumah Festival Gamelan Bali Tahunan yang mempertemukan lebih dari 50 seniman gamelan dari seluruh penjuru Bali.'],
                    ['type' => 'paragraph', 'text' => 'Festival yang digelar setiap tahun ini bertujuan untuk melestarikan langgam-langgam kuno yang jarang dimainkan di era modern. Tahun ini, festival berlangsung selama tiga hari penuh, mulai dari tanggal 20 hingga 22 Agustus 2026, dengan berbagai pertunjukan, lokakarya, dan sesi diskusi terbuka untuk umum.'],
                    ['type' => 'quote',     'text' => '"Gamelan bukan sekadar musik. Ia adalah bahasa yang menghubungkan kita dengan leluhur, dengan alam, dan dengan sesama."', 'author' => 'I Made Sukerta, Maestro Gamelan Bali'],
                    ['type' => 'paragraph', 'text' => 'Tahun ini menjadi yang paling istimewa karena pertama kalinya festival menghadirkan kolaborasi lintas generasi. Para maestro berusia 60-an memainkan gongan bersama anak-anak didik berusia 12 tahun.'],
                    ['type' => 'heading',   'text' => 'Lokakarya untuk Pengunjung Umum'],
                    ['type' => 'paragraph', 'text' => 'Salah satu daya tarik utama festival adalah sesi lokakarya interaktif yang terbuka untuk pengunjung umum. Para peserta diajarkan cara memegang tabuh dengan benar, memahami pola ritme dasar, hingga mencoba memainkan instrumen bersama anggota sanggar.'],
                    ['type' => 'heading',   'text' => 'Rencana ke Depan'],
                    ['type' => 'paragraph', 'text' => 'Melihat keberhasilan festival tahun ini, pihak sanggar berencana memperluas skala festival di tahun mendatang dengan mengundang seniman gamelan dari luar Bali, termasuk dari Jawa dan Lombok.'],
                ],
            ],
            [
                'tag'               => 'EDUKASI',
                'title'             => 'Program Tari Anak-Anak Mencapai Rekor Peserta',
                'cover_url'         => 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop',
                'read_time'         => '3 menit baca',
                'author_name'       => 'Tim Sanggar Paiketan',
                'author_role'       => 'Penulis & Pengelola Konten',
                'author_avatar_url' => null,
                'views'             => 1203,
                'is_published'      => true,
                'published_at'      => Carbon::parse('2026-08-18'),
                'content'           => [
                    ['type' => 'lead',      'text' => 'Antusiasme generasi muda terhadap seni tari tradisional Bali semakin meningkat. Bulan ini, kelas tari dasar kami menerima pendaftaran rekor baru.'],
                    ['type' => 'paragraph', 'text' => 'Dengan total 87 peserta baru yang mendaftar dalam satu bulan, program tari anak-anak di Sanggar Paiketan Swara mencatat angka tertinggi sepanjang sejarah sanggar berdiri. Peserta terdiri dari berbagai usia, mulai dari usia 6 tahun hingga remaja 17 tahun.'],
                    ['type' => 'quote',     'text' => '"Melihat anak-anak begitu bersemangat belajar tari Bali membuat hati kami bahagia dan semakin termotivasi untuk terus mengajar."', 'author' => 'Ni Luh Putu Sari, Instruktur Tari'],
                    ['type' => 'paragraph', 'text' => 'Untuk mengakomodasi jumlah peserta yang meningkat, sanggar telah menambah tiga kelas baru dengan jadwal pagi, sore, dan malam. Pendaftaran masih dibuka untuk kelas sore dan malam.'],
                ],
            ],
            [
                'tag'               => 'PELESTARIAN',
                'title'             => 'Restorasi Instrumen Gamelan Kuno Abad ke-19',
                'cover_url'         => 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop',
                'read_time'         => '4 menit baca',
                'author_name'       => 'Tim Sanggar Paiketan',
                'author_role'       => 'Penulis & Pengelola Konten',
                'author_avatar_url' => null,
                'views'             => 987,
                'is_published'      => true,
                'published_at'      => Carbon::parse('2026-08-10'),
                'content'           => [
                    ['type' => 'lead',      'text' => 'Bekerja sama dengan ahli konservasi, Sanggar Paiketan Swara memulai proyek ambisius untuk merestorasi satu set gamelan kuno warisan leluhur Desa Bantas.'],
                    ['type' => 'paragraph', 'text' => 'Gamelan tersebut diperkirakan berasal dari akhir abad ke-19, dengan usia lebih dari 130 tahun. Kondisinya sudah sangat rusak karena faktor usia dan kelembaban, namun nilai historis dan budayanya sangat tinggi.'],
                    ['type' => 'heading',   'text' => 'Proses Restorasi'],
                    ['type' => 'paragraph', 'text' => 'Proses restorasi melibatkan dua tahap utama: pembersihan fisik dan penyetelan nada. Setiap bilah gangsa dibersihkan secara manual dengan alat khusus, kemudian nada-nadanya diperiksa dan disesuaikan oleh empu gamelan berpengalaman.'],
                    ['type' => 'quote',     'text' => '"Memulihkan gamelan ini seperti menghidupkan kembali suara leluhur yang sudah lama terdiam."', 'author' => 'I Wayan Gede, Empu Gamelan'],
                ],
            ],
            [
                'tag'               => 'KOLABORASI',
                'title'             => 'Kolaborasi Seni Lintas Budaya dengan Seniman Internasional',
                'cover_url'         => 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1200&auto=format&fit=crop',
                'read_time'         => '4 menit baca',
                'author_name'       => 'Tim Sanggar Paiketan',
                'author_role'       => 'Penulis & Pengelola Konten',
                'author_avatar_url' => null,
                'views'             => 756,
                'is_published'      => true,
                'published_at'      => Carbon::parse('2026-08-03'),
                'content'           => [
                    ['type' => 'lead',      'text' => 'Menjembatani tradisi dan modernitas, pertunjukan bulan lalu menampilkan perpaduan unik antara melodi gamelan Bali tradisional dengan alat tiup barat.'],
                    ['type' => 'paragraph', 'text' => 'Kolaborasi ini lahir dari pertemuan antara anggota sanggar dengan musisi asal Belanda dan Jepang yang sedang melakukan residensi seni di Bali. Selama dua minggu mereka berlatih bersama, mengeksplorasi titik temu antara gamelan Bali dengan instrumen klasik barat.'],
                    ['type' => 'paragraph', 'text' => 'Pertunjukan puncak yang digelar di panggung terbuka sanggar berhasil menarik perhatian lebih dari 300 penonton dari berbagai negara.'],
                ],
            ],
        ];

        foreach ($articles as $data) {
            Article::create($data);
        }
    }
}
