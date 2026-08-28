<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Gallery;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin Sanggar',
            'email' => 'admin@sanggar.com',
            'password' => bcrypt('password'),
        ]);

        $galleries = [
            [
                'image_path' => 'https://images.unsplash.com/photo-1513829096963-8a30ef68ad66?q=80&w=800&auto=format&fit=crop',
                'title' => 'Latihan Tabuh Gamelan Rombongan',
                'category' => 'gamelan',
                'description' => 'Latihan berkala gamelan di pendopo utama.'
            ],
            [
                'image_path' => 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop',
                'title' => 'Pelatihan Tari Legong Dasar',
                'category' => 'tari',
                'description' => 'Anak-anak belajar gerakan dasar tari Bali.'
            ],
            [
                'image_path' => 'https://images.unsplash.com/photo-1537884944318-390069bb8665?q=80&w=800&auto=format&fit=crop',
                'title' => 'Pementasan Tari Kecak Pura',
                'category' => 'pertunjukan',
                'description' => 'Pertunjukan tari Kecak kolosal.'
            ],
            [
                'image_path' => 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800&auto=format&fit=crop',
                'title' => 'Kunjungan Edu-Wisata Sekolah Menengah',
                'category' => 'eduwisata',
                'description' => 'Siswa sekolah belajar gamelan langsung.'
            ],
            [
                'image_path' => 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop',
                'title' => 'Gotong Royong Kebersihan Banjar Bantas',
                'category' => 'kegiatan',
                'description' => 'Kegiatan rutin pelestarian lingkungan desa.'
            ],
            [
                'image_path' => 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
                'title' => 'Pelatihan Manajemen Organisasi Sanggar',
                'category' => 'pelatihan',
                'description' => 'Rapat rutin pengurus internal sanggar.'
            ],
            [
                'image_path' => 'https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=800&auto=format&fit=crop',
                'title' => 'Pemandangan Persawahan Desa Bantas',
                'category' => 'bantas',
                'description' => 'Keindahan alam sekitar desa Bantas.'
            ],
            [
                'image_path' => 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800&auto=format&fit=crop',
                'title' => 'Penyelarasan Nada Kendang Bali',
                'category' => 'gamelan',
                'description' => 'Praktisi menyelaraskan nada kendang.'
            ]
        ];

        foreach ($galleries as $g) {
            Gallery::create($g);
        }

        $this->call([
            ContentSeeder::class,
        ]);
    }
}
