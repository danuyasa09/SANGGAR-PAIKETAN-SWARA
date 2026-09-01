import React from 'react';
import { Music, Activity, Sparkles, GraduationCap, Check, ChevronRight, User, Home as HomeIcon, Compass, Heart, MapPin, Phone, Users, Clock, ShieldCheck, TreePine, Sparkle } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export default function Home({ changePage, content }) {
    const resolveImage = (key, def) => {
        const src = content(key, def);
        if (!src) return def || '';
        if (src.startsWith('http') || src.startsWith('/')) {
            return src;
        }
        return `/storage/${src}`;
    };

    const experiences = [
        {
            icon: <Music className="w-6 h-6 text-[#C99B53]" />,
            title: "Belajar Gamelan Bali",
            desc: "Kenali berbagai instrumen gamelan, cara memainkannya, serta peran setiap instrumen dalam menciptakan sebuah komposisi yang harmonis.",
            img: resolveImage('home_program_1_img', 'https://images.unsplash.com/photo-1620801582341-237ab047de0f?q=80&w=600&auto=format&fit=crop')
        },
        {
            icon: <Activity className="w-6 h-6 text-[#C99B53]" />,
            title: "Belajar Tari Bali",
            desc: "Pelajari gerakan dasar, ekspresi, postur, dan makna yang terdapat dalam seni tari Bali melalui pendampingan anggota sanggar.",
            img: resolveImage('home_program_2_img', 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=600&auto=format&fit=crop')
        },
        {
            icon: <Sparkles className="w-6 h-6 text-[#C99B53]" />,
            title: "Pertunjukan Seni",
            desc: "Nikmati pertunjukan gamelan dan tari yang dibawakan oleh para seniman Sanggar Paiketan Swara.",
            img: resolveImage('home_program_3_img', 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?q=80&w=600&auto=format&fit=crop')
        },
        {
            icon: <GraduationCap className="w-6 h-6 text-[#C99B53]" />,
            title: "Kunjungan Edukasi",
            desc: "Program khusus untuk sekolah, perguruan tinggi, komunitas, keluarga, dan kelompok wisata yang ingin mempelajari budaya Bali secara lebih dekat.",
            img: resolveImage('home_program_4_img', 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=600&auto=format&fit=crop')
        }
    ];

    const eduwisataChecklist = [
        "Penyambutan peserta",
        "Pengenalan Sanggar Paiketan Swara",
        "Cerita mengenai seni dan budaya Desa Bantas",
        "Pengenalan instrumen gamelan",
        "Demonstrasi gamelan dan tari Bali",
        "Praktik langsung bersama anggota sanggar",
        "Pertunjukan atau kolaborasi singkat",
        "Refleksi dan sesi dokumentasi"
    ];

    const whyPoints = [
        {
            icon: <User className="w-6 h-6 text-[#C99B53]" />,
            title: "Berinteraksi Langsung dengan Pelaku Seni Lokal",
            desc: "Belajar dan berdiskusi langsung dengan seniman dan pengrawit asli Desa Bantas yang berdedikasi."
        },
        {
            icon: <Heart className="w-6 h-6 text-[#C99B53]" />,
            title: "Pengalaman Budaya Partisipatif",
            desc: "Tidak hanya menyaksikan pertunjukan, melainkan turut serta menyentuh, mencoba, dan merasakan proses berkesenian."
        },
        {
            icon: <Music className="w-6 h-6 text-[#C99B53]" />,
            title: "Mempelajari Dasar Gamelan dan Tari Bali",
            desc: "Mendapatkan pengenalan teknik dasar tabuh dan gerak tari yang mudah dipahami bagi pemula dari segala usia."
        },
        {
            icon: <Sparkle className="w-6 h-6 text-[#C99B53]" />,
            title: "Mendukung Pelestarian dan Regenerasi",
            desc: "Setiap kunjungan Anda berkontribusi nyata pada pembinaan generasi muda dan pelestarian seni tradisi."
        },
        {
            icon: <Users className="w-6 h-6 text-[#C99B53]" />,
            title: "Pariwisata Berbasis Masyarakat",
            desc: "Mendukung pengembangan ekonomi kreatif lokal dan pemberdayaan masyarakat desa secara berkelanjutan."
        },
        {
            icon: <TreePine className="w-6 h-6 text-[#C99B53]" />,
            title: "Suasana Asri Perdesaan Desa Bantas",
            desc: "Menikmati ketenangan dan keasrian suasana Banjar Bantas Tengah Kaja, Tabanan, jauh dari hiruk-pikuk kota."
        }
    ];

    return (
        <div className="bg-[#FAF6F0] font-sans">
            
            {/* HERO SECTION */}
            <section className="relative min-h-screen flex items-center justify-start pt-24 pb-28 md:pb-36 lg:pb-44 overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${resolveImage('home_hero_bg', '/images/image.png')}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#1C150C]/90 via-[#261E14]/75 to-[#261E14]/30" />
 
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left mt-8 space-y-6">
                    <span className="text-xs font-bold tracking-widest text-[#C99B53] uppercase block">
                        — SANGGAR PAIKETAN SWARA —
                    </span>
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#FAF6F0] font-bold leading-[1.15] max-w-3xl" dangerouslySetInnerHTML={{ __html: content('home_hero_title', 'Mengenal <span class="font-serif italic font-normal text-[#C99B53]">Budaya Bali</span> melalui <span class="font-serif italic font-normal text-[#C99B53]">Gamelan</span> dan <span class="font-serif italic font-normal text-[#C99B53]">Tari</span>') }}>
                    </h1>
                    <p className="text-sm sm:text-base text-gray-300 max-w-2xl font-sans leading-relaxed">
                        {content('home_hero_desc', 'Selamat datang di Sanggar Paiketan Swara, ruang pelestarian seni, pembelajaran budaya, dan kebersamaan masyarakat di Desa Bantas, Tabanan, Bali. Kami mengajak pelajar, wisatawan, komunitas, dan pencinta budaya untuk mengenal gamelan dan tari Bali secara langsung bersama para pelaku seni lokal.')}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-start gap-4 pt-4">
                        <button
                            onClick={() => changePage('programs')}
                            className="w-full sm:w-auto px-8 py-3.5 bg-[#C99B53] hover:bg-[#B7863F] text-[#261E14] font-bold text-xs rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer uppercase tracking-wider"
                        >
                            Jelajahi Program
                        </button>
                        <button
                            onClick={() => changePage('reservation')}
                            className="w-full sm:w-auto px-8 py-3.5 border border-[#C99B53] text-[#C99B53] hover:bg-[#C99B53]/15 font-bold text-xs rounded-lg transition-all duration-300 cursor-pointer uppercase tracking-wider"
                        >
                            Reservasi Kunjungan
                        </button>
                    </div>
                </div>

                {/* SVG Curve Divider */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
                    <svg 
                        viewBox="0 0 1200 120" 
                        preserveAspectRatio="none" 
                        className="relative block w-full h-[35px] md:h-[50px] text-[#FAF6F0]"
                        fill="currentColor"
                    >
                        <path d="M0,0 C600,120 1200,0 1200,0 L1200,120 L0,120 Z"></path>
                    </svg>
                </div>
            </section>

            {/* SECTION: BELAJAR, BERINTERAKSI, DAN BERKARYA BERSAMA */}
            <section className="py-20 bg-[#FAF6F0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <ScrollReveal className="lg:col-span-6 space-y-6" distance="40px">
                            <span className="text-[10px] font-bold tracking-widest text-[#C99B53] uppercase block">
                                — PENGALAMAN BUDAYA —
                            </span>
                            <h2 className="text-2xl sm:text-4xl font-serif text-[#261E14] font-bold leading-tight">
                                {content('home_about_title', 'Belajar, Berinteraksi, dan Berkarya Bersama')}
                            </h2>
                            <div className="h-[2px] w-16 bg-[#C99B53]" />
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans font-medium">
                                {content('home_about_desc1', 'Di Sanggar Paiketan Swara, pengunjung tidak hanya menyaksikan pertunjukan. Melalui program edu-wisata, peserta dapat mendengarkan cerita budaya, mengenal instrumen gamelan, mempelajari gerakan dasar tari, serta mencoba berkesenian bersama anggota sanggar.')}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans font-medium">
                                {content('home_about_desc2', 'Setiap kegiatan dirancang untuk memberikan pengalaman yang edukatif, partisipatif, dan tetap menghormati nilai budaya Bali.')}
                            </p>
                        </ScrollReveal>
                        <ScrollReveal className="lg:col-span-6" delay={200} distance="40px">
                            <div className="relative rounded-2xl overflow-hidden shadow-md transform hover:scale-[1.01] transition-transform duration-300">
                                <img
                                    src={resolveImage('home_about_image', 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop')}
                                    alt="Belajar Bersama di Sanggar"
                                    className="w-full h-auto object-cover aspect-[4/3] rounded-2xl"
                                />
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* SECTION: PENGALAMAN YANG KAMI TAWARKAN */}
            <section className="py-20 bg-white border-t border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <ScrollReveal distance="30px" className="space-y-2">
                        <span className="text-[10px] font-bold tracking-widest text-[#C99B53] uppercase block">
                            — PENGALAMAN KAMI —
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-serif text-[#261E14] font-bold">
                            Pengalaman yang Kami Tawarkan
                        </h2>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                        {experiences.map((item, idx) => (
                            <ScrollReveal
                                key={idx}
                                delay={idx * 100}
                                distance="30px"
                                className="flex"
                            >
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col group text-left w-full relative">
                                    {/* Photo Header */}
                                    <div className="relative h-44 overflow-hidden">
                                        <img 
                                            src={item.img} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                                    </div>
                                    
                                    {/* Floating Pin Badge */}
                                    <div className="absolute right-4 top-38 w-10 h-10 rounded-full bg-white border border-[#C99B53]/25 shadow-sm flex items-center justify-center text-[#C99B53] z-10">
                                        {item.icon}
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-5 pt-7 flex-grow flex flex-col space-y-2">
                                        <h3 className="text-sm sm:text-base font-serif font-bold text-[#261E14]">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 leading-relaxed font-sans">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION: PAKET EDU-WISATA SENI BUDAYA */}
            <section className="py-20 bg-[#FAF6F0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal distance="30px" className="space-y-2 text-center mb-12">
                        <span className="text-[10px] font-bold tracking-widest text-[#C99B53] uppercase block">
                            — PROGRAM UTAMA —
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-serif text-[#261E14] font-bold">
                            {content('home_eduwisata_title', 'Paket Edu-Wisata Seni Budaya')}
                        </h2>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        {/* Kolom Kiri: Informasi Paket */}
                        <ScrollReveal className="lg:col-span-7 space-y-6" distance="30px">
                            <div className="space-y-3">
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans font-medium">
                                    {content('home_eduwisata_desc', 'Program edu-wisata Sanggar Paiketan Swara dirancang untuk kelompok berjumlah 10–30 peserta dengan durasi sekitar 60–90 menit. Program dapat disesuaikan dengan usia, jumlah peserta, waktu kunjungan, dan tujuan pembelajaran.')}
                                </p>
                                
                                <div className="flex flex-wrap items-center gap-4 pt-1">
                                    <div className="flex items-center gap-2 text-xs font-bold text-[#261E14] bg-white px-3.5 py-2 rounded-lg border border-gray-200">
                                        <Users size={14} className="text-[#C99B53]" />
                                        <span>10–30 Peserta</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-bold text-[#261E14] bg-white px-3.5 py-2 rounded-lg border border-gray-200">
                                        <Clock size={14} className="text-[#C99B53]" />
                                        <span>60–90 Menit</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-[#261E14] mb-3">
                                    Rangkaian Kegiatan Meliputi:
                                </h4>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    {eduwisataChecklist.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-700 font-medium">
                                            <span className="w-4.5 h-4.5 rounded-full bg-[#C99B53]/15 flex items-center justify-center text-[#C99B53] shrink-0 mt-0.5">
                                                <Check size={11} strokeWidth={3} />
                                            </span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pt-2">
                                <button
                                    onClick={() => changePage('programs')}
                                    className="px-8 py-3.5 bg-[#C99B53] hover:bg-[#B7863F] text-[#261E14] font-bold text-xs rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer uppercase tracking-wider inline-block"
                                >
                                    Lihat Paket Edu-Wisata
                                </button>
                            </div>
                        </ScrollReveal>

                        {/* Kolom Kanan: Foto Paket */}
                        <ScrollReveal className="lg:col-span-5" delay={200} distance="30px">
                            <div className="relative rounded-2xl overflow-hidden shadow-md">
                                <img
                                    src={resolveImage('home_package_image', 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=800&auto=format&fit=crop')}
                                    alt="Paket Edu-Wisata"
                                    className="w-full h-auto object-cover aspect-[4/3] rounded-2xl shadow-sm"
                                />
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* SECTION: MENGAPA BERKUNJUNG KE SANGGAR PAIKETAN SWARA? */}
            <section className="py-20 bg-white border-t border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 space-y-2">
                        <span className="text-[10px] font-bold tracking-widest text-[#C99B53] uppercase block">
                            — NILAI & MANFAAT —
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-serif text-[#261E14] font-bold">
                            {content('home_why_title', 'Mengapa Berkunjung ke Sanggar Paiketan Swara?')}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {whyPoints.map((feat, idx) => (
                            <ScrollReveal 
                                key={idx} 
                                delay={idx * 80}
                                distance="30px" 
                                className="flex"
                            >
                                <div className="bg-[#FAF6F0]/40 rounded-2xl p-6 border border-gray-100/80 hover:shadow-md transition-all duration-200 flex flex-col space-y-4 w-full">
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-[#C99B53]/15 text-[#C99B53]">
                                        {feat.icon}
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-sm sm:text-base font-serif font-bold text-[#261E14]">
                                            {feat.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 leading-relaxed font-sans">
                                            {feat.desc}
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION: TENTANG KAMI TEASER */}
            <section className="py-20 bg-[#FAF6F0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <ScrollReveal className="lg:col-span-6" distance="30px">
                            <div className="relative rounded-2xl overflow-hidden shadow-md">
                                <img
                                    src={resolveImage('home_about_us_image', 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?q=80&w=800&auto=format&fit=crop')}
                                    alt="Sanggar Paiketan Swara Desa Bantas"
                                    className="w-full h-auto object-cover aspect-[4/3] rounded-2xl"
                                />
                            </div>
                        </ScrollReveal>

                        <ScrollReveal className="lg:col-span-6 space-y-6" delay={200} distance="30px">
                            <div className="space-y-2">
                                <span className="text-[10px] font-bold tracking-widest text-[#C99B53] uppercase block">
                                    — RUANG PELESTARIAN BUDAYA —
                                </span>
                                <h2 className="text-2xl sm:text-4xl font-serif text-[#261E14] font-bold leading-tight">
                                    Tentang Sanggar Paiketan Swara
                                </h2>
                            </div>
                            <div className="h-[2px] w-16 bg-[#C99B53]" />
                            
                            <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed font-sans font-medium">
                                <p>
                                    {content('home_about_teaser_p1', 'Sanggar Paiketan Swara merupakan kelompok seni yang berlokasi di Banjar Dinas Bantas Tengah Kaja, Desa Bantas, Kecamatan Selemadeg Timur, Kabupaten Tabanan, Bali.')}
                                </p>
                                <p>
                                    {content('home_about_teaser_p2', 'Sanggar ini menjadi ruang latihan gamelan dan tari, pembinaan karakter, pelestarian budaya, serta kebersamaan lintas generasi. Anggota sanggar terlibat dalam kegiatan adat, pertunjukan budaya, pelatihan seni, dan pengembangan pengalaman edu-wisata.')}
                                </p>
                                <p>
                                    {content('home_about_teaser_p3', 'Melalui semangat gotong royong, kami berupaya menjaga seni budaya Bali agar tetap hidup, dipahami, dan diwariskan kepada generasi berikutnya.')}
                                </p>
                            </div>

                            <button
                                onClick={() => changePage('about')}
                                className="inline-flex items-center gap-2 text-[#C99B53] hover:text-[#B7863F] font-bold text-xs uppercase tracking-wider transition-colors duration-200 group cursor-pointer"
                            >
                                <span>Pelajari Lebih Lanjut Tentang Kami</span>
                                <ChevronRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                            </button>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* SECTION: BOTTOM CTA BANNER */}
            <section className="relative py-28 overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${resolveImage('home_cta_bg', 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=1600&auto=format&fit=crop')}')` }}
                />
                <div className="absolute inset-0 bg-black/75" />
                
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-6">
                    <h2 className="text-3xl sm:text-5xl font-serif text-[#FAF6F0] font-bold leading-tight" dangerouslySetInnerHTML={{ __html: content('cta_bottom_title', 'Mari <span class="font-serif italic font-normal text-[#C99B53]">Mengenal Budaya Bali</span> Lebih Dekat') }} />
                    <p className="text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed font-sans">
                        {content('cta_bottom_desc', 'Datang, belajar, dan berkarya bersama Sanggar Paiketan Swara. Setiap kunjungan Anda turut mendukung pelestarian seni, pendidikan generasi muda, dan pemberdayaan masyarakat Desa Bantas.')}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-start gap-4 pt-4">
                        <button
                            onClick={() => changePage('reservation')}
                            className="w-full sm:w-auto px-8 py-3.5 bg-[#C99B53] hover:bg-[#B7863F] text-[#261E14] font-bold text-xs rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer uppercase tracking-wider"
                        >
                            Reservasi Sekarang
                        </button>
                        <button
                            onClick={() => changePage('contact')}
                            className="w-full sm:w-auto px-8 py-3.5 border border-[#C99B53] text-[#C99B53] hover:bg-[#C99B53]/15 font-bold text-xs rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
                        >
                            Hubungi Kami
                        </button>
                    </div>
                </div>
            </section>

        </div>
    );
}
