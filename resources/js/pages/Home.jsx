import React from 'react';
import { Music, Accessibility, Sparkles, GraduationCap, MessageCircle, Globe, Star, Heart, Users, Compass, ChevronRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export default function Home({ changePage, content }) {
    const programs = [
        {
            icon: <Music className="w-6 h-6 text-[#C99B53]" />,
            title: content('home_program_1_title', 'Belajar Gamelan Bali'),
            desc: content('home_program_1_desc', 'Kenali berbagai instrumen gamelan, cara memainkannya, serta peran setiap instrumen dalam menciptakan sebuah komposisi yang harmonis.'),
            img: content('home_program_1_img', '/images/news_banner.png').startsWith('http') || content('home_program_1_img', '/images/news_banner.png').startsWith('/') ? content('home_program_1_img', '/images/news_banner.png') : `/storage/${content('home_program_1_img')}`
        },
        {
            icon: <Accessibility className="w-6 h-6 text-[#C99B53]" />,
            title: content('home_program_2_title', 'Belajar Tari Bali'),
            desc: content('home_program_2_desc', 'Pelajari gerak-gerak dasar, ekspresi, postur dan kelenturan yang menjadi ciri khas tari Bali dari para penari terlatih dan berpengalaman.'),
            img: content('home_program_2_img', '/images/about_banner.png').startsWith('http') || content('home_program_2_img', '/images/about_banner.png').startsWith('/') ? content('home_program_2_img', '/images/about_banner.png') : `/storage/${content('home_program_2_img')}`
        },
        {
            icon: <Sparkles className="w-6 h-6 text-[#C99B53]" />,
            title: content('home_program_3_title', 'Pertunjukan Seni'),
            desc: content('home_program_3_desc', 'Saksikan kolaborasi pertunjukan gamelan dan tari yang dibawakan oleh para seniman berbakat dari Sanggar Paiketan Swara.'),
            img: content('home_program_3_img', '/images/partnership_banner.png').startsWith('http') || content('home_program_3_img', '/images/partnership_banner.png').startsWith('/') ? content('home_program_3_img', '/images/partnership_banner.png') : `/storage/${content('home_program_3_img')}`
        },
        {
            icon: <GraduationCap className="w-6 h-6 text-[#C99B53]" />,
            title: content('home_program_4_title', 'Kunjungan Edukasi'),
            desc: content('home_program_4_desc', 'Program khusus untuk sekolah, universitas, komunitas, atau kelompok wisatawan yang ingin mendalami budaya Bali secara komprehensif.'),
            img: content('home_program_4_img', '/images/gallery_banner.png').startsWith('http') || content('home_program_4_img', '/images/gallery_banner.png').startsWith('/') ? content('home_program_4_img', '/images/gallery_banner.png') : `/storage/${content('home_program_4_img')}`
        }
    ];

    const packages = [
        {
            num: "1",
            title: "Pengalaman Gamelan Bali",
            desc: "Sesi 2 jam interaktif mengenal dan memainkan alat musik gamelan dasar. Cocok untuk semua rentang usia.",
            price: "Rp150.000",
            features: ["Pengenalan Instrumen", "Latihan tabuh dasar", "Snack tradisional"]
        },
        {
            num: "2",
            title: "Pengalaman Tari Bali",
            desc: "Sesi 2 jam mempelajari keanggunan dan dinamika gerak tari Bali, lengkap dengan pengenalan busana.",
            price: "Rp150.000",
            features: ["Pemanasan & Agem dasar", "Latihan koreografi pendek", "Sesi foto berbusana"]
        },
        {
            num: "3",
            title: "Gamelan dan Tari Bali",
            desc: "Pengalaman komprehensif setengah hari yang seru, diakhiri dengan pertunjukan mini bersama.",
            price: "Rp220.000",
            features: ["Seni Gamelan Interaktif", "Seni Tari Interaktif", "Makan siang megibung"],
            populer: true
        }
    ];

    const features = [
        {
            icon: <MessageCircle className="w-6 h-6 text-[#C99B53]" />,
            title: "Berinteraksi",
            desc: "Dapatkan wawasan langsung dari para pelatih dan ahli gending menceritakan nilai seni luhur."
        },
        {
            icon: <Globe className="w-6 h-6 text-[#C99B53]" />,
            title: "Mendapatkan pengalaman budaya asli",
            desc: "Dapatkan wawasan langsung pada materialisme arsitektur radikal, tarian, dan upacara keagamaan."
        },
        {
            icon: <Star className="w-6 h-6 text-[#C99B53]" />,
            title: "Mempelajari dasar tari Bali",
            desc: "Kenalilah dasar, pementasan, mengerti akselerasi musikal. Belajar dari seniman tari dan dalang."
        },
        {
            icon: <Heart className="w-6 h-6 text-[#C99B53]" />,
            title: "Mendukung",
            desc: "Mendukung pelestarian langsung pementasan tradisional dan generasi di Desa Bantas."
        },
        {
            icon: <Users className="w-6 h-6 text-[#C99B53]" />,
            title: "Berkontribusi",
            desc: "Berkontribusi menjaga kesejahteraan pertahanan seni tingkat bawah seniman masyarakat."
        },
        {
            icon: <Compass className="w-6 h-6 text-[#C99B53]" />,
            title: "Menikmati",
            desc: "Jauh dari keramaian kotor dan kedamaian alam pedesaan yang sejuk di Bali."
        }
    ];

    return (
        <div className="bg-[#FAF6F0]">
            
            {/* HERO SECTION */}
            <section className="relative min-h-screen flex items-center justify-center pt-24 pb-28 md:pb-36 lg:pb-44 overflow-hidden">
                {/* Background image overlay */}
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ 
                        backgroundImage: `url('${
                            content('home_hero_bg', '/images/image.png').startsWith('http') || content('home_hero_bg', '/images/image.png').startsWith('/') 
                                ? content('home_hero_bg', '/images/image.png') 
                                : `/storage/${content('home_hero_bg')}`
                        }')` 
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#1C150C]/90 via-[#261E14]/80 to-[#261E14]/40" />
 
                <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-8">
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#FAF6F0] font-bold leading-[1.1] mb-6" dangerouslySetInnerHTML={{ __html: content('home_hero_title', 'Mengenal <span class="font-serif italic font-normal text-[#C99B53]">Budaya Bali</span> <br /> melalui <span class="font-serif italic font-normal text-[#C99B53]">Gamelan</span> dan <span class="font-serif italic font-normal text-[#C99B53]">Tari</span>') }}>
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto font-sans leading-relaxed mb-10">
                        {content('home_hero_desc', 'Selamat datang di Sanggar Paiketan Swara, ruang pelestarian seni, pembelajaran budaya, dan kebersamaan masyarakat di Desa Bantas, Tabanan, Bali. Kami mengajak Anda mengenal gamelan dan tari secara langsung bersama para pelaku seni lokal.')}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => changePage('programs')}
                            className="w-full sm:w-auto px-8 py-4 bg-[#C99B53] hover:bg-[#B7863F] text-[#261E14] font-bold rounded-md shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                        >
                            JELAJAHI PROGRAM
                        </button>
                        <button
                            onClick={() => changePage('reservation')}
                            className="w-full sm:w-auto px-8 py-4 border border-[#C99B53] text-[#C99B53] hover:bg-[#C99B53]/15 font-bold rounded-md transition-all duration-200 cursor-pointer"
                        >
                            RESERVASI KUNJUNGAN
                        </button>
                    </div>
                </div>

                {/* SVG Curve Divider */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
                    <svg 
                        viewBox="0 0 1200 120" 
                        preserveAspectRatio="none" 
                        className="relative block w-full h-[50px] md:h-[90px] text-[#FAF6F0]"
                        fill="currentColor"
                    >
                        <path d="M0,0 Q600,120 1200,0 L1200,120 L0,120 Z"></path>
                    </svg>
                </div>
            </section>

            {/* ABOUT SECTION */}
            <section className="py-24 bg-[#FAF6F0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <ScrollReveal className="lg:col-span-7 space-y-6" distance="40px">
                            <span className="text-xs font-bold tracking-widest text-[#C99B53] uppercase block">
                                — TENTANG KAMI
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#261E14] font-bold leading-tight">
                                {content('home_about_title', 'Belajar, Berinteraksi, dan Berkarya Bersama')}
                            </h2>
                            <div className="h-[2px] w-20 bg-[#C99B53]" />
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-sans">
                                {content('home_about_desc1', 'Sanggar Paiketan Swara bukan sekadar tempat berlatih, melainkan wadah komunitas di mana nilai-nilai luhur Bali dihidupkan kembali. Melalui program edu-wisata kami, pengunjung diajak untuk tidak hanya menonton, tetapi juga terlibat langsung, menyentuh instrumen, dan merasakan ritme pernapasan tarian Bali.')}
                            </p>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-sans">
                                {content('home_about_desc2', 'Kami merancang pengalaman partisipatif yang otentik, menghubungkan kearifan lokal dengan rasa ingin tahu wisatawan global maupun pelajar lokal.')}
                            </p>
                            <button
                                onClick={() => changePage('about')}
                                className="inline-flex items-center gap-2 text-[#C99B53] hover:text-[#B7863F] font-bold text-sm transition-colors duration-200 mt-4 group cursor-pointer"
                            >
                                Ketahui Lebih Lanjut 
                                <ChevronRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                            </button>
                        </ScrollReveal>
                        <ScrollReveal className="lg:col-span-5" delay={200} distance="40px">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#C99B53]/10 transform hover:scale-[1.01] transition-transform duration-300">
                                <img
                                    src={content('home_about_image', 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop').startsWith('http') ? content('home_about_image', 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop') : `/storage/${content('home_about_image')}`}
                                    alt="Belajar Gamelan"
                                    className="w-full h-auto object-cover aspect-[4/3]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* PROGRAMS SECTION */}
            <section className="py-24 bg-white border-t border-b border-[#C99B53]/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <ScrollReveal distance="30px">
                        <span className="text-xs font-bold tracking-widest text-[#C99B53] uppercase block mb-3">
                            — PROGRAM KAMI —
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-serif text-[#261E14] font-bold mb-4">
                            Pengalaman yang Kami Tawarkan
                        </h2>
                        <p className="text-sm text-gray-500 max-w-xl mx-auto mb-16">
                            Pilihlah petualangan budaya Anda, dari pemula hingga program khusus.
                        </p>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {programs.map((item, idx) => (
                            <ScrollReveal
                                key={idx}
                                delay={idx * 150}
                                distance="40px"
                                className="flex"
                            >
                                <div
                                    className="relative bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group text-left w-full"
                                >
                                    {/* Photo Header */}
                                    <div className="relative h-44 overflow-hidden">
                                        <img 
                                            src={item.img} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                    </div>
                                    
                                    {/* Floating Pin Badge */}
                                    <div className="absolute right-6 top-38 w-12 h-12 rounded-full bg-white border border-[#C99B53]/30 shadow-md flex items-center justify-center text-[#C99B53] z-10">
                                        {item.icon}
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-6 pt-8 flex-grow flex flex-col">
                                        <h3 className="text-lg font-serif font-bold text-[#261E14] mb-3">
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

            {/* PACKAGES SECTION */}
            <section className="py-24 bg-[#1C150C] text-[#FAF6F0] relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-black/20 to-transparent" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal className="text-center mb-16" distance="30px">
                        <span className="text-xs font-bold tracking-widest text-[#C99B53] uppercase block mb-3">
                            — PILIHAN PAKET —
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-serif text-white font-bold">
                            Paket Edu-Wisata Seni Budaya
                        </h2>
                        <div className="h-[2px] w-24 bg-[#C99B53] mx-auto mt-4" />
                    </ScrollReveal>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                        {packages.map((item, idx) => (
                            <ScrollReveal
                                key={idx}
                                delay={idx * 150}
                                distance="40px"
                                className="flex"
                            >
                                <div
                                    className={`rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 w-full ${
                                        item.populer
                                            ? 'bg-[#C99B53] text-[#261E14] ring-4 ring-[#C99B53]/30 scale-[1.03] lg:-translate-y-2'
                                            : 'bg-[#261E14] text-gray-200 border border-gray-800'
                                    }`}
                                >
                                    <div>
                                        {/* Tag Populer */}
                                        <div className="flex justify-between items-start mb-6">
                                            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                                                item.populer ? 'bg-[#261E14] text-[#C99B53]' : 'bg-[#C99B53] text-[#261E14]'
                                            }`}>
                                                {item.num}
                                            </span>
                                            {item.populer && (
                                                <span className="bg-[#8B261E] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                                    POPULER
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-2xl font-serif font-bold mb-4">{item.title}</h3>
                                        <p className={`text-sm leading-relaxed mb-6 ${item.populer ? 'text-[#261E14]/85' : 'text-gray-400'}`}>
                                            {item.desc}
                                        </p>

                                        <div className={`h-[1px] w-full my-6 ${item.populer ? 'bg-[#261E14]/20' : 'bg-gray-800'}`} />

                                        <ul className="space-y-3 mb-8">
                                            {item.features.map((feat, fIdx) => (
                                                <li key={fIdx} className="flex items-center gap-3 text-sm">
                                                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                                        item.populer ? 'bg-[#8B261E]' : 'bg-[#C99B53]'
                                                    }`} />
                                                    <span>{feat}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="pt-6 border-t border-dashed border-[#261E14]/15">
                                        <div className="flex items-baseline justify-between mb-6">
                                            <span className="text-xs uppercase tracking-widest text-opacity-80">
                                                Per Peserta
                                            </span>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-2xl sm:text-3xl font-serif font-bold">{item.price}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => changePage('reservation')}
                                            className={`w-full py-3.5 text-center font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                                                item.populer
                                                    ? 'bg-[#261E14] text-[#C99B53] hover:bg-[#1C150C] shadow-md'
                                                    : 'bg-[#C99B53] text-[#261E14] hover:bg-[#B7863F]'
                                            }`}
                                        >
                                            Pilih Paket
                                        </button>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="py-24 bg-[#FAF6F0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-serif text-[#261E14] font-bold">
                            Mengapa Berkunjung ke Sanggar Paiketan Swara?
                        </h2>
                        <div className="h-[2px] w-20 bg-[#C99B53] mx-auto mt-4" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feat, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md border border-gray-100 transition-all duration-200"
                            >
                                <div className="w-12 h-12 bg-[#FAF6F0] rounded-xl flex items-center justify-center mb-5 border border-[#C99B53]/15">
                                    {feat.icon}
                                </div>
                                <h3 className="text-lg font-serif font-bold text-[#261E14] mb-3">
                                    {feat.title}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {feat.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BOTTOM CTA BANNER */}
            <section className="relative py-28 overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1573790387438-4da9050393c2?q=80&w=1600&auto=format&fit=crop')` }}
                />
                <div className="absolute inset-0 bg-[#261E14]/90" />
                
                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
                    <h2 className="text-3xl sm:text-5xl font-serif text-[#FAF6F0] font-bold">
                        Mari Mengenal Budaya Bali Lebih Dekat
                    </h2>
                    <p className="text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
                        Kami siap menyambut kedatangan Anda. Rencanakan kunjungan kelompok, pementasan khusus, atau kolaborasi edukasi bersama kami.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                        <button
                            onClick={() => changePage('reservation')}
                            className="w-full sm:w-auto px-8 py-3.5 bg-[#C99B53] hover:bg-[#B7863F] text-[#261E14] font-bold rounded-md shadow-lg transition-all duration-200 cursor-pointer"
                        >
                            RESERVASI SEKARANG
                        </button>
                        <button
                            onClick={() => changePage('contact')}
                            className="w-full sm:w-auto px-8 py-3.5 border border-[#C99B53] text-[#C99B53] hover:bg-[#C99B53]/10 font-bold rounded-md transition-all duration-200 cursor-pointer"
                        >
                            HUBUNGI KAMI
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
