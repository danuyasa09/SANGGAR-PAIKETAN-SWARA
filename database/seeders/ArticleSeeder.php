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
            // ─── ARTIKEL 1: Anak-anak Ngayah ───────────────────────────────────────
            [
                'tag'               => 'NGAYAH',
                'title'             => 'Dedikasi Tanpa Pamrih: Generasi Muda Sanggar Paiketan Swara Ngayah di Upacara Adat',
                'cover_url'         => '/images/news_banner.png',
                'read_time'         => '4 menit baca',
                'author_name'       => 'Tim Sanggar Paiketan',
                'author_role'       => 'Dokumentasi Sanggar',
                'author_avatar_url' => '/images/pemilik_sanggar.jpg',
                'views'             => 1842,
                'is_published'      => true,
                'published_at'      => Carbon::parse('2026-09-20'),
                'content'           => [
                    [
                        'type' => 'lead',
                        'text' => 'Dengan penuh ketulusan dan rasa bhakti, para pemuda Sanggar Paiketan Swara hadir membawakan tabuh gamelan dalam sebuah upacara adat di lingkungan Desa Bantas — sebuah bentuk ngayah yang menjadi jiwa dari seni budaya Bali.',
                    ],
                    [
                        'type' => 'paragraph',
                        'text' => 'Mengenakan busana adat putih lengkap dengan udeng, para penabuh muda duduk bersila di halaman pura dengan khidmat. Di hadapan mereka tersusun rapi seperangkat gamelan baleganjur — kendang, cengceng, gender, dan saron — siap mengalunkan gending-gending sakral yang mengiringi jalannya upacara.',
                    ],
                    [
                        'type' => 'paragraph',
                        'text' => 'Ngayah, dalam filosofi Bali, adalah persembahan diri yang tulus tanpa mengharapkan imbalan. Bagi generasi muda Sanggar Paiketan Swara, ngayah bukan sekadar kewajiban adat, melainkan sebuah kehormatan — kesempatan untuk mengabdikan ilmu yang telah mereka pelajari selama berlatih di sanggar kepada Ida Sang Hyang Widhi dan masyarakat.',
                    ],
                    [
                        'type' => 'quote',
                        'text' => '"Ketika kami ngayah, rasanya berbeda dari sekadar tampil. Ada ketenangan dan kebahagiaan tersendiri yang sulit dijelaskan dengan kata-kata. Ini bukan pertunjukan, ini persembahan."',
                        'author' => 'Kadek Arya, Penabuh Muda Sanggar',
                    ],
                    [
                        'type' => 'heading',
                        'text' => 'Kaderisasi Seniman Bali yang Berakar pada Nilai Spiritual',
                    ],
                    [
                        'type' => 'paragraph',
                        'text' => 'Kegiatan ngayah ini adalah buah nyata dari proses latihan panjang yang konsisten di Sanggar Paiketan Swara. Para pemuda yang tampil bukan hanya menguasai teknik bermain gamelan, tetapi juga memahami makna dan konteks setiap gending dalam kehidupan ritual masyarakat Bali.',
                    ],
                    [
                        'type' => 'paragraph',
                        'text' => 'Sanggar Paiketan Swara percaya bahwa seni budaya Bali tidak akan lestari tanpa keterlibatan aktif generasi muda. Dengan membiasakan anak-anak dan remaja untuk ngayah sejak dini, sanggar ini menanamkan rasa memiliki dan tanggung jawab terhadap warisan leluhur yang tak ternilai harganya.',
                    ],
                    [
                        'type' => 'paragraph',
                        'text' => 'Momen ngayah seperti ini juga menjadi ruang sosial yang mempererat hubungan antar-generasi. Para sesepuh duduk mendampingi, memberikan arahan dan semangat, sementara para pemuda menunjukkan bahwa tongkat estafet budaya Bali ada di tangan yang tepat.',
                    ],
                ],
            ],

            // ─── ARTIKEL 2: Bule Ikut Kundangan / Silaturahmi ─────────────────────
            [
                'tag'               => 'KEBERSAMAAN',
                'title'             => 'Melampaui Batas Budaya: Tamu Mancanegara Merasakan Hangatnya Silaturahmi ala Bali di Sanggar Paiketan Swara',
                'cover_url'         => '/images/gallery_banner.png',
                'read_time'         => '5 menit baca',
                'author_name'       => 'Tim Sanggar Paiketan',
                'author_role'       => 'Pengelola Edukasi & Budaya',
                'author_avatar_url' => '/images/pemilik_sanggar.jpg',
                'views'             => 2671,
                'is_published'      => true,
                'published_at'      => Carbon::parse('2026-09-15'),
                'content'           => [
                    [
                        'type' => 'lead',
                        'text' => 'Mengenakan pakaian adat Bali — udeng di kepala dan kamen melilit di pinggang — sejumlah tamu dari berbagai negara berbaur dengan warga lokal dalam sebuah momen silaturahmi yang hangat dan penuh makna di Sanggar Paiketan Swara.',
                    ],
                    [
                        'type' => 'paragraph',
                        'text' => 'Hari itu, suasana sanggar terasa lebih meriah dari biasanya. Para tamu mancanegara yang sedang mengikuti program edukasi budaya di Sanggar Paiketan Swara mendapat kesempatan istimewa untuk ikut serta dalam tradisi kundangan — sebuah bentuk silaturahmi dan makan bersama yang menjadi bagian tak terpisahkan dari kehidupan sosial masyarakat Bali.',
                    ],
                    [
                        'type' => 'paragraph',
                        'text' => 'Dengan semangat dan senyum lebar, para tamu tersebut tak segan ikut mengambil nasi dan lauk-pauk khas Bali, duduk bersama warga desa, berbagi cerita dan tawa lintas bahasa. Momen sederhana itu menjadi bukti nyata bahwa kehangatan budaya Bali mampu menjembatani perbedaan jarak, bahasa, dan latar belakang.',
                    ],
                    [
                        'type' => 'quote',
                        'text' => '"Saya tidak menyangka bisa merasakan pengalaman seperti ini. Bukan sekadar wisata, tapi benar-benar diterima sebagai bagian dari keluarga besar di sini. Ini yang akan paling saya rindukan."',
                        'author' => 'James, tamu dari Inggris',
                    ],
                    [
                        'type' => 'heading',
                        'text' => 'Ketika Meja Makan Menjadi Jembatan Antar Bangsa',
                    ],
                    [
                        'type' => 'paragraph',
                        'text' => 'Tradisi kundangan dalam budaya Bali bukan sekadar acara makan-makan. Di baliknya tersimpan nilai gotong royong, rasa syukur, dan ketulusan dalam berbagi. Ketika para tamu dari luar negeri turut ambil bagian dalam tradisi ini, mereka tidak hanya mengisi perut, tetapi juga mengisi hati dengan pengalaman budaya yang autentik.',
                    ],
                    [
                        'type' => 'paragraph',
                        'text' => 'Sanggar Paiketan Swara secara konsisten membuka ruang-ruang seperti ini — di mana interaksi lintas budaya terjadi secara organik dan bermartabat. Bukan sebatas pertunjukan untuk penonton, melainkan pelibatan langsung yang membuat tamu merasa menjadi bagian dari komunitas.',
                    ],
                    [
                        'type' => 'paragraph',
                        'text' => 'Kegiatan ini menjadi salah satu contoh nyata bagaimana Sanggar Paiketan Swara menjalankan misinya: memperkenalkan budaya Bali kepada dunia bukan dengan cara mempertontonkannya dari balik kaca, melainkan dengan membuka pintu rumah dan mengundang semua orang untuk merasakannya bersama.',
                    ],
                ],
            ],

            // ─── ARTIKEL 3: Bule Belajar di Sanggar ───────────────────────────────
            [
                'tag'               => 'EDU-WISATA',
                'title'             => 'Dari Barat ke Bantas: Ketika Wisatawan Asing Duduk Bersila dan Menyimak Kearifan Lokal Bali',
                'cover_url'         => '/images/about_banner.png',
                'read_time'         => '5 menit baca',
                'author_name'       => 'Tim Sanggar Paiketan',
                'author_role'       => 'Pengelola Edukasi & Budaya',
                'author_avatar_url' => '/images/pemilik_sanggar.jpg',
                'views'             => 3105,
                'is_published'      => true,
                'published_at'      => Carbon::parse('2026-09-05'),
                'content'           => [
                    [
                        'type' => 'lead',
                        'text' => 'Di sebuah bale khas Bali beratap ijuk, seorang pemuda dari luar negeri duduk bersila dengan penuh perhatian, menyimak setiap kata yang disampaikan oleh seorang pengelola sanggar yang berpengalaman puluhan tahun — sebuah dialog lintas budaya yang sunyi namun bermakna dalam.',
                    ],
                    [
                        'type' => 'paragraph',
                        'text' => 'Program edukasi budaya Sanggar Paiketan Swara kembali menyambut tamu istimewa. Kali ini, sejumlah pemuda dari berbagai negara hadir untuk menyelami lebih dalam filosofi, seni, dan kehidupan spiritual masyarakat Bali — bukan sebagai wisatawan biasa, tetapi sebagai murid yang haus akan kebijaksanaan lokal.',
                    ],
                    [
                        'type' => 'paragraph',
                        'text' => 'Mengenakan udeng sebagai tanda penghormatan terhadap budaya tuan rumah, salah seorang peserta tampak larut dalam percakapan mendalam bersama I Wayan Raka, pengelola senior sanggar yang telah mengabdikan hidupnya untuk pelestarian seni budaya Bali. Duduk berhadapan di bale, keduanya saling bertukar pandangan tentang seni, tradisi, dan makna kehidupan.',
                    ],
                    [
                        'type' => 'quote',
                        'text' => '"Saya mengajarkan bukan hanya bagaimana memainkan gamelan atau menari. Saya mengajak mereka untuk merasakan — karena seni Bali itu hidup dari perasaan, bukan sekadar teknik."',
                        'author' => 'I Wayan Raka, Pengelola Senior Sanggar Paiketan Swara',
                    ],
                    [
                        'type' => 'heading',
                        'text' => 'Bali Bukan Sekadar Destinasi, Melainkan Guru Kehidupan',
                    ],
                    [
                        'type' => 'paragraph',
                        'text' => 'Program edukasi di Sanggar Paiketan Swara dirancang bukan sebagai paket wisata biasa. Para peserta diajak untuk memahami konteks yang lebih luas — mengapa gamelan dimainkan dalam upacara, apa makna di balik setiap gerak tari, dan bagaimana masyarakat Bali memandang hubungan antara manusia, alam, dan Tuhan dalam konsep Tri Hita Karana.',
                    ],
                    [
                        'type' => 'paragraph',
                        'text' => 'Sesi belajar seperti ini berlangsung dalam suasana yang intim dan personal. Tidak ada jarak antara guru dan murid, tidak ada dinding pembatas antara budaya yang satu dengan yang lain. Yang ada hanyalah ruang terbuka, angin sepoi Bali, dan pertukaran pengetahuan yang tulus.',
                    ],
                    [
                        'type' => 'paragraph',
                        'text' => 'Sanggar Paiketan Swara membuka program ini untuk individu maupun kelompok dari berbagai penjuru dunia. Melalui pendekatan yang personal dan mendalam, sanggar ini membuktikan bahwa pelestarian budaya dan keterbukaan terhadap dunia bukan dua hal yang bertentangan — melainkan dua kekuatan yang saling menguatkan.',
                    ],
                ],
            ],
        ];

        foreach ($articles as $data) {
            Article::create($data);
        }
    }
}
