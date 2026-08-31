<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Program;

class ProgramSeeder extends Seeder
{
    public function run(): void
    {
        $programs = [
            [
                'code'          => 'Paket A',
                'title'         => 'Pengenalan Gamelan Bali',
                'description'   => 'Peserta diajak mengenal gamelan Bali, memahami fungsi beberapa instrumen, menyaksikan demonstrasi, dan mencoba memainkan pola sederhana bersama anggota sanggar.',
                'activities'    => [
                    'Pengenalan sanggar dan budaya Desa Bantas',
                    'Pengenalan instrumen gamelan',
                    'Demonstrasi oleh anggota sanggar',
                    'Praktik teknik dasar',
                    'Permainan gamelan secara berkelompok',
                    'Dokumentasi bersama',
                ],
                'duration'      => '60 - 90 menit',
                'capacity'      => '10 - 30 peserta',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1513829096963-8a30ef68ad66?q=80&w=600&auto=format&fit=crop',
                'price'         => 'Rp150.000',
                'btn_label'     => 'Pesan Paket Gamelan',
                'is_custom_btn' => false,
                'order'         => 1,
                'is_active'     => true,
            ],
            [
                'code'          => 'Paket B',
                'title'         => 'Pengalaman Tari Bali',
                'description'   => 'Peserta diperkenalkan pada karakteristik tari Bali, mulai dari posisi tubuh, gerak tangan, langkah, hingga ekspresi dasar (nyeledet).',
                'activities'    => [
                    'Pengenalan seni tari Bali',
                    'Penjelasan makna dan karakter tari',
                    'Demonstrasi oleh penari sanggar',
                    'Latihan gerakan dasar',
                    'Praktik singkat secara berkelompok',
                    'Dokumentasi bersama',
                ],
                'duration'      => '60 - 90 menit',
                'capacity'      => '10 - 30 peserta',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop',
                'price'         => 'Rp150.000',
                'btn_label'     => 'Pesan Paket Tari',
                'is_custom_btn' => false,
                'order'         => 2,
                'is_active'     => true,
            ],
            [
                'code'          => 'Paket C',
                'title'         => 'Kemah Budaya Bali',
                'description'   => 'Pengalaman terpadu bagi peserta yang ingin mengenal dua unsur penting seni pertunjukan Bali dalam satu kunjungan menginap yang mendalam.',
                'activities'    => [
                    'Penyambutan dan pengenalan budaya',
                    'Demonstrasi gamelan dan tari',
                    'Praktik gamelan intensif',
                    'Praktik gerakan tari intensif',
                    'Kolaborasi atau pertunjukan malam penutup',
                    'Dokumentasi bersama',
                ],
                'duration'      => '2 Hari 1 Malam',
                'capacity'      => '15 - 40 peserta',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1537884944318-390069bb8665?q=80&w=600&auto=format&fit=crop',
                'price'         => 'Rp220.000',
                'btn_label'     => 'Minta Program Khusus',
                'is_custom_btn' => true,
                'order'         => 3,
                'is_active'     => true,
            ],
        ];

        foreach ($programs as $program) {
            Program::create($program);
        }
    }
}
