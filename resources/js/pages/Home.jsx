import React from 'react';
import { Music, Activity, Sparkles, GraduationCap, Check, ChevronRight, User, Home as HomeIcon, Compass, Heart, MapPin, Phone } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export default function Home({ changePage, content }) {
    const resolveImage = (key, def) => {
        const src = content(key, def);
        if (src.startsWith('http') || src.startsWith('/')) {
            return src;
        }
        return `/storage/${src}`;
    };

    const programs = [
        {
            icon: <Music className="w-6 h-6 text-[#C99B53]" />,
            title: content('home_program_1_title', 'Kelas Gamelan'),
            desc: content('home_program_1_desc', 'Belajar memainkan instrumen gamelan Bali bersama para instruktur ahli.'),
            img: resolveImage('home_program_1_img', 'https://images.unsplash.com/photo-1620801582341-237ab047de0f?q=80&w=600&auto=format&fit=crop')
        },
        {
            icon: <Activity className="w-6 h-6 text-[#C99B53]" />,
            title: content('home_program_2_title', 'Kelas Tari'),
            desc: content('home_program_2_desc', 'Pelajari gerak tari tradisional Bali yang anggun dan dinamis.'),
            img: resolveImage('home_program_2_img', 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=600&auto=format&fit=crop')
        },
        {
            icon: <Sparkles className="w-6 h-6 text-[#C99B53]" />,
            title: content('home_program_3_title', 'Pertunjukan Seni'),
            desc: content('home_program_3_desc', 'Nikmati pentas seni tari dan gamelan kolaboratif yang menakjubkan.'),
            img: resolveImage('home_program_3_img', 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?q=80&w=600&auto=format&fit=crop')
        },
        {
            icon: <GraduationCap className="w-6 h-6 text-[#C99B53]" />,
            title: content('home_program_4_title', 'Program Khusus'),
            desc: content('home_program_4_desc', 'Program kustom untuk rombongan sekolah, instansi, atau komunitas.'),
            img: resolveImage('home_program_4_img', 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=600&auto=format&fit=crop')
        }
    ];

    const whyChooseUs = [
        {
            icon: <User className="w-6 h-6 text-[#C99B53]" />,
            title: "Pelatih Berpengalaman",
            desc: "Semua kelas dibimbing langsung oleh seniman lokal berpengalaman."
        },
        {
            icon: <Music className="w-6 h-6 text-[#C99B53]" />,
            title: "Alat Musik Lengkap",
            desc: "Fasilitas instrumen gamelan Bali lengkap untuk seluruh peserta."
        },
        {
            icon: <HomeIcon className="w-6 h-6 text-[#C99B53]" />,
            title: "Lingkungan Otentik",
            desc: "Lokasi sanggar di pedesaan asri Bantas dengan suasana tradisional."
        },
        {
            icon: <Compass className="w-6 h-6 text-[#C99B53]" />,
            title: "Fleksibel & Kustom",
            desc: "Jadwal dan materi dapat disesuaikan dengan kebutuhan rombongan."
        },
        {
            icon: <Heart className="w-6 h-6 text-[#C99B53]" />,
            title: "Berdampak Sosial",
            desc: "Membantu memberdayakan seniman lokal dan melestarikan seni tradisi."
        },
        {
            icon: <MapPin className="w-6 h-6 text-[#C99B53]" />,
            title: "Lokasi Strategis",
            desc: "Mudah diakses dari pusat pariwisata namun tetap tenang dan damai."
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
 
                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left mt-8 space-y-6">
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#FAF6F0] font-bold leading-[1.1] max-w-3xl" dangerouslySetInnerHTML={{ __html: content('home_hero_title', 'Mengenal <span class="font-serif italic font-normal text-[#C99B53]">Budaya Bali</span> <br /> melalui <span class="font-serif italic font-normal text-[#C99B53]">Gamelan</span> dan <span class="font-serif italic font-normal text-[#C99B53]">Tari</span>') }}>
                    </h1>
                    <p className="text-sm sm:text-base text-gray-300 max-w-2xl font-sans leading-relaxed">
                        {content('home_hero_desc', 'Kami mengajak pelajar, wisatawan, komunitas, dan pencinta budaya untuk mengenal lebih dekat seni Bali secara langsung bersama para pelaku seni lokal.')}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-start gap-4 pt-4">
                        <button
                            onClick={() => changePage('reservation')}
                            className="w-full sm:w-auto px-8 py-3.5 bg-[#C99B53] hover:bg-[#B7863F] text-[#261E14] font-bold text-xs rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer uppercase tracking-wider"
                        >
                            Ajukan Reservasi
                        </button>
                        <button
                            onClick={() => changePage('programs')}
                            className="w-full sm:w-auto px-8 py-3.5 border border-[#C99B53] text-[#C99B53] hover:bg-[#C99B53]/15 font-bold text-xs rounded-lg transition-all duration-300 cursor-pointer uppercase tracking-wider"
                        >
                            Pilihan Program
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
                            <h2 className="text-2xl sm:text-4xl font-serif text-[#261E14] font-bold leading-tight">
                                {content('home_about_title', 'Belajar, Berinteraksi, dan Berkarya Bersama')}
                            </h2>
                            <div className="h-[2px] w-16 bg-[#C99B53]" />
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans font-medium">
                                {content('home_about_desc1', 'Di Sanggar Paiketan Swara, kami tidak hanya menyajikan pertunjukan, tetapi juga mengajak Anda untuk menjadi bagian dari proses seni itu sendiri. Belajar menabuh gamelan, melangkah dalam gerak tari Bali, dan memahami makna filosofis yang terkandung di dalamnya.')}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans font-medium">
                                {content('home_about_desc2', 'Semua dipandu langsung oleh para seniman lokal yang berdedikasi tinggi menjaga kelestarian seni tradisi Bali agar tetap hidup dan diwariskan.')}
                            </p>
                        </ScrollReveal>
                        <ScrollReveal className="lg:col-span-6" delay={200} distance="40px">
                            <div className="relative rounded-2xl overflow-hidden shadow-md transform hover:scale-[1.01] transition-transform duration-300">
                                <img
                                    src={resolveImage('home_about_image', 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop')}
                                    alt="Belajar Gamelan"
                                    className="w-full h-auto object-cover aspect-[4/3] rounded-2xl"
                                />
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* SECTION: PROGRAM PILIHAN */}
            <section className="py-20 bg-white border-t border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <ScrollReveal distance="30px" className="space-y-2">
                        <span className="text-[10px] font-bold tracking-widest text-[#C99B53] uppercase block">
                            — PROGRAM PILIHAN —
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-serif text-[#261E14] font-bold">
                            Temukan Program Terbaik Kami
                        </h2>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                        {programs.map((item, idx) => (
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

            {/* SECTION: PILIHAN PAKET / PAKET EDU-WISATA SENI BUDAYA */}
            <section className="py-20 bg-[#FAF6F0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal distance="30px" className="space-y-2 text-center mb-12">
                        <span className="text-[10px] font-bold tracking-widest text-[#C99B53] uppercase block">
                            — PILIHAN PAKET —
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-serif text-[#261E14] font-bold">
                            Paket Edu-Wisata Seni Budaya
                        </h2>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        {/* Kolom Kiri: Informasi Paket */}
                        <ScrollReveal className="lg:col-span-6 space-y-6" distance="30px">
                            <div className="space-y-2">
                                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#261E14]">
                                    {content('home_package_title', 'Program Terpadu Mengenal Budaya Bali')}
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans font-medium">
                                    {content('home_package_desc', 'Nikmati pengalaman komprehensif yang dirancang untuk memperkenalkan Anda pada keindahan seni tari dan musik gamelan Bali secara mendalam dalam suasana sanggar yang ramah dan otentik.')}
                                </p>
                            </div>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <li className="flex items-start gap-3">
                                    <span className="w-5 h-5 rounded-full bg-[#FAF6F0] border border-[#C99B53]/35 flex items-center justify-center text-[#C99B53] shrink-0 mt-0.5">
                                        <Check size={12} />
                                    </span>
                                    <div>
                                        <h5 className="text-xs font-bold text-[#261E14]">Kelas Gamelan</h5>
                                        <p className="text-[10px] text-gray-500">Belajar teknik dasar menabuh gamelan Bali.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-5 h-5 rounded-full bg-[#FAF6F0] border border-[#C99B53]/35 flex items-center justify-center text-[#C99B53] shrink-0 mt-0.5">
                                        <Check size={12} />
                                    </span>
                                    <div>
                                        <h5 className="text-xs font-bold text-[#261E14]">Kelas Tari Bali</h5>
                                        <p className="text-[10px] text-gray-500">Mengenal gerakan dasar tari Bali.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-5 h-5 rounded-full bg-[#FAF6F0] border border-[#C99B53]/35 flex items-center justify-center text-[#C99B53] shrink-0 mt-0.5">
                                        <Check size={12} />
                                    </span>
                                    <div>
                                        <h5 className="text-xs font-bold text-[#261E14]">Konsumsi Tradisional</h5>
                                        <p className="text-[10px] text-gray-500">Sajian makan siang / kudapan khas Bali.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-5 h-5 rounded-full bg-[#FAF6F0] border border-[#C99B53]/35 flex items-center justify-center text-[#C99B53] shrink-0 mt-0.5">
                                        <Check size={12} />
                                    </span>
                                    <div>
                                        <h5 className="text-xs font-bold text-[#261E14]">Instruktur Lokal</h5>
                                        <p className="text-[10px] text-gray-500">Dipandu langsung seniman lokal berpengalaman.</p>
                                    </div>
                                </li>
                            </ul>

                            <button
                                onClick={() => changePage('reservation')}
                                className="px-8 py-3.5 bg-[#C99B53] hover:bg-[#B7863F] text-[#261E14] font-bold text-xs rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer uppercase tracking-wider block"
                            >
                                Daftar Sekarang
                            </button>
                        </ScrollReveal>

                        {/* Kolom Kanan: Foto Paket */}
                        <ScrollReveal className="lg:col-span-6" delay={200} distance="30px">
                            <div className="relative rounded-2xl overflow-hidden shadow-md">
                                <img
                                    src={resolveImage('home_package_image', 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=800&auto=format&fit=crop')}
                                    alt="Paket Budaya Bali"
                                    className="w-full h-auto object-cover aspect-[4/3] rounded-2xl shadow-sm"
                                />
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* SECTION: MENGAPA MEMILIH KAMI */}
            <section className="py-20 bg-white border-t border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 space-y-2">
                        <span className="text-[10px] font-bold tracking-widest text-[#C99B53] uppercase block">
                            — KEUNGGULAN KAMI —
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-serif text-[#261E14] font-bold">
                            Mengapa Sanggar Paiketan Swara?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {whyChooseUs.map((feat, idx) => (
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

            {/* SECTION: TENTANG KAMI */}
            <section className="py-20 bg-[#FAF6F0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <ScrollReveal className="lg:col-span-6" distance="30px">
                            <div className="relative rounded-2xl overflow-hidden shadow-md">
                                <img
                                    src={resolveImage('home_about_us_image', 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?q=80&w=800&auto=format&fit=crop')}
                                    alt="Sanggar Seni Paiketan Swara"
                                    className="w-full h-auto object-cover aspect-[4/3] rounded-2xl"
                                />
                            </div>
                        </ScrollReveal>

                        <ScrollReveal className="lg:col-span-6 space-y-6" delay={200} distance="30px">
                            <div className="space-y-2">
                                <span className="text-[10px] font-bold tracking-widest text-[#C99B53] uppercase block">
                                    — TENTANG KAMI —
                                </span>
                                <h2 className="text-2xl sm:text-4xl font-serif text-[#261E14] font-bold leading-tight">
                                    Sanggar Seni Paiketan Swara
                                </h2>
                            </div>
                            <div className="h-[2px] w-16 bg-[#C99B53]" />
                            
                            <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed font-sans font-medium">
                                <p>
                                    {content('home_about_us_desc1', 'Sanggar Seni Paiketan Swara didirikan sebagai wadah pelestarian dan pengembangan seni budaya Bali. Kami mendedikasikan diri untuk melestarikan seni gamelan dan tari tradisional melalui pendidikan, pertunjukan, dan kolaborasi budaya.')}
                                </p>
                                <p>
                                    {content('home_about_us_desc2', 'Kami berkomitmen untuk memberikan pengalaman budaya yang otentik dan edukatif bagi semua kalangan, mulai dari anak-anak lokal hingga wisatawan mancanegara. Bersama-sama, kita menjaga agar api seni tradisi ini tetap menyala.')}
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
                
                <div className="relative z-10 max-w-4xl mx-auto px-4 text-left space-y-6">
                    <h2 className="text-3xl sm:text-5xl font-serif text-[#FAF6F0] font-bold leading-tight" dangerouslySetInnerHTML={{ __html: content('home_cta_title', 'Mari <span class="font-serif italic font-normal text-[#C99B53]">Mengenal Budaya Bali</span> Lebih Dekat') }} />
                    <p className="text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed font-sans">
                        {content('home_cta_desc', 'Hubungi kami hari ini untuk merencanakan kunjungan, pementasan, atau kolaborasi seni yang berkesan bersama kami.')}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-start gap-4 pt-4">
                        <button
                            onClick={() => changePage('contact')}
                            className="w-full sm:w-auto px-8 py-3.5 bg-[#C99B53] hover:bg-[#B7863F] text-[#261E14] font-bold text-xs rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer uppercase tracking-wider"
                        >
                            Hubungi Kami
                        </button>
                        <a
                            href="https://wa.me/6281234567890"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-8 py-3.5 border border-[#C99B53] text-[#C99B53] hover:bg-[#C99B53]/15 font-bold text-xs rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
                        >
                            <Phone size={12} />
                            <span>Hubungi WhatsApp</span>
                        </a>
                    </div>
                </div>
            </section>

        </div>
    );
}
