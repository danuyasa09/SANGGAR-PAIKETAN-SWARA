<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;
use Carbon\Carbon;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        Article::truncate();

        $articles = [
            [
                'tag'               => 'EDU-WISATA',
                'title'             => 'Belajar Gamelan Bersama Sanggar Paiketan Swara',
                'cover_url'         => 'https://images.unsplash.com/photo-1513829096963-8a30ef68ad66?q=80&w=1600&auto=format&fit=crop',
                'read_time'         => '4 menit baca',
                'author_name'       => 'Tim Sanggar Paiketan',
                'author_role'       => 'Pengelola Edukasi & Budaya',
                'author_avatar_url' => 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
                'views'             => 3420,
                'is_published'      => true,
                'published_at'      => Carbon::parse('2026-08-28'),
                'content'           => [
                    ['type' => 'lead',      'text' => 'Suara gamelan memenuhi ruang latihan ketika para peserta mulai mencoba memainkan instrumen untuk pertama kalinya.'],
                    ['type' => 'paragraph', 'text' => 'Dengan pendampingan anggota sanggar, peserta belajar bahwa gamelan bukan sekadar kumpulan alat musik, melainkan permainan bersama yang membutuhkan konsentrasi, kerja sama, dan kemampuan saling mendengarkan.'],
                    ['type' => 'quote',     'text' => '"Gamelan bukan hanya tentang memukul bilah perunggu, melainkan menyatukan rasa, ritme napas, dan harmoni kebersamaan."', 'author' => 'I Ketut Sudana, Pengurus Sanggar'],
                    ['type' => 'heading',   'text' => 'Pengalaman Budaya yang Partisipatif'],
                    ['type' => 'paragraph', 'text' => 'Melalui kegiatan ini, peserta memperoleh pengalaman langsung sekaligus pemahaman yang lebih dekat mengenai seni dan kehidupan masyarakat Bali di Desa Bantas.'],
                    ['type' => 'paragraph', 'text' => 'Program edu-wisata ini terbuka untuk sekolah, perguruan tinggi, komunitas, dan rombongan keluarga yang ingin merasakan atmosfer belajar budaya Bali yang otentik dan hangat.'],
                ],
            ],
            [
                'tag'               => 'PELESTARIAN',
                'title'             => 'Harmoni Generasi: Regenerasi Penabuh dan Penari di Desa Bantas',
                'cover_url'         => 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop',
                'read_time'         => '3 menit baca',
                'author_name'       => 'Tim Sanggar Paiketan',
                'author_role'       => 'Dokumentasi Sanggar',
                'author_avatar_url' => null,
                'views'             => 1420,
                'is_published'      => true,
                'published_at'      => Carbon::parse('2026-08-18'),
                'content'           => [
                    ['type' => 'lead',      'text' => 'Semangat gotong royong dan kecintaan pada warisan leluhur terus membara di Banjar Dinas Bantas Tengah Kaja.'],
                    ['type' => 'paragraph', 'text' => 'Setiap minggunya, anak-anak dan generasi muda Desa Bantas berkumpul di sanggar untuk mengasah kepekaan tabuh dan gerak tari tradisional. Melalui pembinaan karakter yang disiplin, sanggar berupaya mencetak bibit-bibit seniman berdedikasi tinggi.'],
                    ['type' => 'paragraph', 'text' => 'Keterlibatan lintas generasi ini memastikan nilai-nilai adiluhung budaya Bali tetap lestari dan relevan di tengah perubahan zaman.'],
                ],
            ],
            [
                'tag'               => 'KEGIATAN MASYARAKAT',
                'title'             => 'Persiapan Upacara Adat dan Pementasan Seni Budaya Desa',
                'cover_url'         => 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop',
                'read_time'         => '4 menit baca',
                'author_name'       => 'Tim Sanggar Paiketan',
                'author_role'       => 'Dokumentasi Sanggar',
                'author_avatar_url' => null,
                'views'             => 1180,
                'is_published'      => true,
                'published_at'      => Carbon::parse('2026-08-10'),
                'content'           => [
                    ['type' => 'lead',      'text' => 'Keterlibatan Sanggar Paiketan Swara dalam berbagai kegiatan adat dan keagamaan di Desa Bantas.'],
                    ['type' => 'paragraph', 'text' => 'Gamelan dan tari bukan sekadar pertunjukan komersial, melainkan persembahan tulus (ngayah) yang menyatu dengan denyut spiritual masyarakat Bali.'],
                    ['type' => 'paragraph', 'text' => 'Para anggota sanggar secara rutin mempersiapkan gending-gending sakral yang mengiringi upacara piodalan dan upacara adat di pura desa.'],
                ],
            ],
        ];

        foreach ($articles as $data) {
            Article::create($data);
        }
    }
}
