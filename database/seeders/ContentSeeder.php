<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\WebsiteContent;

class ContentSeeder extends Seeder
{
    public function run(): void
    {
        $contents = [
            // Beranda
            ['key' => 'home_hero_title', 'value' => 'Mengenal Budaya Bali melalui Gamelan dan Tari', 'type' => 'text', 'section' => 'beranda'],
            ['key' => 'home_hero_desc', 'value' => 'Selamat datang di Sanggar Paiketan Swara, ruang pelestarian seni, pembelajaran budaya, dan kebersamaan masyarakat di Desa Bantas, Tabanan, Bali. Kami mengajak Anda mengenal gamelan dan tari secara langsung bersama para pelaku seni lokal.', 'type' => 'text', 'section' => 'beranda'],
            ['key' => 'home_about_title', 'value' => 'Belajar, Berinteraksi, dan Berkarya Bersama', 'type' => 'text', 'section' => 'beranda'],
            ['key' => 'home_about_desc1', 'value' => 'Sanggar Paiketan Swara bukan sekadar tempat berlatih, melainkan wadah komunitas di mana nilai-nilai luhur Bali dihidupkan kembali. Melalui program edu-wisata kami, pengunjung diajak untuk tidak hanya menonton, tetapi juga terlibat langsung, menyentuh instrumen, dan merasakan ritme pernapasan tarian Bali.', 'type' => 'text', 'section' => 'beranda'],
            ['key' => 'home_about_desc2', 'value' => 'Kami merancang pengalaman partisipatif yang otentik, menghubungkan kearifan lokal dengan rasa ingin tahu wisatawan global maupun pelajar lokal.', 'type' => 'text', 'section' => 'beranda'],
            ['key' => 'home_about_image', 'value' => 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop', 'type' => 'image', 'section' => 'beranda'],

            // Tentang Kami
            ['key' => 'about_banner_image', 'value' => '/images/about_banner.png', 'type' => 'image', 'section' => 'tentangkami'],
            ['key' => 'about_title', 'value' => 'Merajut Harmoni, Melestarikan Budaya', 'type' => 'text', 'section' => 'tentangkami'],
            ['key' => 'about_subtitle', 'value' => 'Menjaga tradisi, menghidupkan budaya, dan mewariskan keindahan seni Bali kepada dunia.', 'type' => 'text', 'section' => 'tentangkami'],
            ['key' => 'about_visi_title', 'value' => 'Pusat Pelestarian Seni Budaya Bali', 'type' => 'text', 'section' => 'tentangkami'],
            ['key' => 'about_visi_desc', 'value' => '"Menjadi ruang terdepan dalam menjaga, mengembangkan, dan mempromosikan kekayaan seni tari dan tabuh tradisional Bali di kancah nasional maupun internasional."', 'type' => 'text', 'section' => 'tentangkami'],
            ['key' => 'about_misi1_title', 'value' => 'Pendidikan Seni Berkualitas', 'type' => 'text', 'section' => 'tentangkami'],
            ['key' => 'about_misi1_desc', 'value' => 'Menyelenggarakan pendidikan dan pelatihan seni tari dan gamelan Bali yang berkualitas untuk segala usia dan tingkat keahlian.', 'type' => 'text', 'section' => 'tentangkami'],
            ['key' => 'about_misi2_title', 'value' => 'Inovasi Berakar Tradisi', 'type' => 'text', 'section' => 'tentangkami'],
            ['key' => 'about_misi2_desc', 'value' => 'Menciptakan karya seni inovatif dan kolaboratif yang tetap berakar kuat pada nilai-nilai tradisi leluhur Bali.', 'type' => 'text', 'section' => 'tentangkami'],
            ['key' => 'about_misi3_title', 'value' => 'Pemberdayaan Komunitas', 'type' => 'text', 'section' => 'tentangkami'],
            ['key' => 'about_misi3_desc', 'value' => 'Membangun komunitas seniman muda yang berdedikasi tinggi dan berdaya secara ekonomi maupun sosial di masyarakat.', 'type' => 'text', 'section' => 'tentangkami'],
        ];

        foreach ($contents as $content) {
            WebsiteContent::updateOrCreate(
                ['key' => $content['key']],
                $content
            );
        }
    }
}
