import React from 'react';
import { ChevronRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export default function News({ content }) {
    const articles = [
        {
            image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop",
            tag: "EDUKASI",
            title: "Program Tari Anak-Anak Mencapai Rekor Peserta",
            desc: "Antusiasme generasi muda terhadap seni tari tradisional Bali semakin meningkat. Bulan ini, kelas tari dasar kami menerima pendaftaran rekor baru dengan total peserta..."
        },
        {
            image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop",
            tag: "PELESTARIAN",
            title: "Restorasi Instrumen Gamelan Kuno Abad ke-19",
            desc: "Bekerja sama dengan ahli konservasi, Sanggar Paiketan Swara memulai proyek ambisius untuk merestorasi satu set gamelan kuno warisan leluhur Desa Bantas..."
        },
        {
            image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=800&auto=format&fit=crop",
            tag: "KOLABORASI",
            title: "Kolaborasi Seni Lintas Budaya dengan Seniman Internasional",
            desc: "Menjembatani tradisi dan modernitas, pertunjukan bulan lalu menampilkan perpaduan unik antara melodi gamelan Bali tradisional dengan alat tiup barat..."
        }
    ];

    return (
        <div className="bg-[#FAF6F0] min-h-screen">
            
            {/* HERO BANNER */}
            <section className="relative py-32 md:py-40 pb-24 md:pb-32 flex items-center justify-center overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${content('news_banner', '/images/news_banner.png').startsWith('http') || content('news_banner', '/images/news_banner.png').startsWith('/') ? content('news_banner', '/images/news_banner.png') : `/storage/${content('news_banner', '')}`}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#1C150C]/95 via-[#261E14]/85 to-[#261E14]/40" />

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-12 space-y-6">
                    <span className="text-xs font-bold tracking-widest text-[#C99B53] uppercase block">
                        — INFORMASI & ACARA SANGGAR
                    </span>
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white font-bold leading-tight">
                        {content('news_hero_title', 'Berita Terkini')}
                    </h1>
                    <div className="h-[2px] w-20 bg-[#C99B53] mx-auto" />
                    <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed whitespace-pre-wrap">
                        {content('news_hero_desc', 'Ikuti perkembangan terbaru, acara, dan cerita seputar pelestarian seni budaya Bali di Sanggar Paiketan Swara.')}
                    </p>
                </div>

                {/* SVG Geometric Peak Divider */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
                    <svg 
                        viewBox="0 0 1200 120" 
                        preserveAspectRatio="none" 
                        className="relative block w-full h-[40px] md:h-[60px] text-[#FAF6F0]"
                        fill="currentColor"
                    >
                        <path d="M0,120 L600,45 L1200,120 Z"></path>
                    </svg>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {/* Hero Featured Article */}
                <ScrollReveal distance="40px">
                    <div className="bg-white rounded-2xl overflow-hidden border border-[#C99B53]/15 shadow-md mb-16 hover:shadow-lg transition-all duration-300">
                        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                            <div className="lg:col-span-6 relative min-h-[300px]">
                                <img
                                    src="https://images.unsplash.com/photo-1513829096963-8a30ef68ad66?q=80&w=1200&auto=format&fit=crop"
                                    alt="Festival Gamelan"
                                    className="w-full h-full object-cover absolute inset-0"
                                />
                            </div>
                            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center space-y-6">
                                <span className="self-start text-[10px] tracking-widest font-bold bg-[#FAF6F0] text-[#C99B53] px-3.5 py-1.5 rounded-full border border-[#C99B53]/15">
                                    ACARA KHUSUS
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#261E14] leading-tight">
                                    Festival Gamelan Bali Tahunan Kembali Digelar di Sanggar Paiketan Swara
                                </h2>
                                <p className="text-sm text-gray-600 leading-relaxed font-sans">
                                    Menyambut bulan purnama, sanggar kami menjadi tuan rumah bagi lebih dari 50 seniman gamelan dari seluruh penjuru Bali. Festival ini bertujuan untuk melestarikan langgam-langgam kuno yang jarang dimainkan di era modern.
                                </p>
                                <button className="self-start inline-flex items-center gap-1.5 text-xs font-bold text-[#C99B53] hover:text-[#B7863F] uppercase tracking-wider transition-colors duration-200 mt-2 cursor-pointer">
                                    BACA SELENGKAPNYA <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {articles.map((item, idx) => (
                        <ScrollReveal
                            key={idx}
                            delay={(idx % 3) * 150}
                            distance="30px"
                            className="flex"
                        >
                            <div
                                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:border-[#C99B53]/25 transition-all duration-300 flex flex-col justify-between w-full"
                            >
                                <div>
                                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <span className="text-[9px] tracking-widest font-bold text-[#C99B53] uppercase bg-[#FAF6F0] px-2.5 py-1 rounded border border-[#C99B53]/10 inline-block">
                                            {item.tag}
                                        </span>
                                        <h3 className="text-lg font-serif font-bold text-[#261E14] leading-snug">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans line-clamp-3">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                                <div className="p-6 pt-0 border-t border-dashed border-gray-100 mt-4">
                                    <button className="inline-flex items-center gap-1 text-xs font-bold text-[#C99B53] hover:text-[#B7863F] uppercase tracking-wider transition-colors duration-200 cursor-pointer">
                                        BACA SELENGKAPNYA <ChevronRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Pagination Button */}
                <div className="flex justify-center">
                    <button className="px-8 py-3.5 border border-[#C99B53]/40 text-[#261E14] hover:bg-[#C99B53] hover:text-white text-xs font-bold rounded-lg shadow-sm transition-all duration-200 cursor-pointer">
                        MUAT LEBIH BANYAK
                    </button>
                </div>

            </div>
        </div>
    );
}
