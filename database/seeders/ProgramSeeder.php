<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Program;

class ProgramSeeder extends Seeder
{
    public function run(): void
    {
        // Truncate or clean existing programs to ensure clean sync with docx
        Program::truncate();

        $programs = [
            [
                'code'          => 'Paket 1',
                'title'         => 'Pengalaman Gamelan Bali',
                'description'   => 'Peserta diajak mengenal gamelan Bali, memahami fungsi beberapa instrumen, menyaksikan demonstrasi, dan mencoba memainkan pola sederhana bersama anggota sanggar.',
                'activities'    => [
                    'Pengenalan sanggar dan budaya Desa Bantas',
                    'Pengenalan instrumen gamelan',
                    'Demonstrasi oleh anggota sanggar',
                    'Praktik teknik dasar',
                    'Permainan gamelan secara berkelompok',
                    'Dokumentasi bersama',
                ],
                'duration'      => '60–90 menit',
                'capacity'      => '10–30 peserta',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1513829096963-8a30ef68ad66?q=80&w=600&auto=format&fit=crop',
                'price'         => 'Hubungi kami untuk penawaran',
                'btn_label'     => 'Pesan Reservasi',
                'is_custom_btn' => false,
                'order'         => 1,
                'is_active'     => true,
            ],
            [
                'code'          => 'Paket 2',
                'title'         => 'Pengalaman Tari Bali',
                'description'   => 'Peserta diperkenalkan pada karakteristik tari Bali, mulai dari posisi tubuh, gerak tangan, langkah, hingga ekspresi dasar.',
                'activities'    => [
                    'Pengenalan seni tari Bali',
                    'Penjelasan makna dan karakter tari',
                    'Demonstrasi oleh penari sanggar',
                    'Latihan gerakan dasar',
                    'Praktik singkat secara berkelompok',
                    'Dokumentasi bersama',
                ],
                'duration'      => '60–90 menit',
                'capacity'      => '10–30 peserta',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop',
                'price'         => 'Hubungi kami untuk penawaran',
                'btn_label'     => 'Pesan Reservasi',
                'is_custom_btn' => false,
                'order'         => 2,
                'is_active'     => true,
            ],
            [
                'code'          => 'Paket 3',
                'title'         => 'Gamelan dan Tari Bali',
                'description'   => 'Pengalaman terpadu bagi peserta yang ingin mengenal dua unsur penting seni pertunjukan Bali dalam satu kunjungan.',
                'activities'    => [
                    'Penyambutan dan pengenalan budaya',
                    'Demonstrasi gamelan dan tari',
                    'Praktik gamelan',
                    'Praktik gerakan tari',
                    'Kolaborasi atau pertunjukan penutup',
                    'Dokumentasi bersama',
                ],
                'duration'      => 'Disesuaikan dengan kebutuhan',
                'capacity'      => '10–30 peserta',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1537884944318-390069bb8665?q=80&w=600&auto=format&fit=crop',
                'price'         => 'Hubungi kami untuk penawaran',
                'btn_label'     => 'Pesan Reservasi',
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
