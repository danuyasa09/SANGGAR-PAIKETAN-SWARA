import React, { useState } from 'react';
import { Eye, Image as ImageIcon } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export default function Gallery({ content }) {
    const [filter, setFilter] = useState('all');
    const [items, setItems] = useState([]);

    const categories = [
        { id: 'all', label: 'Semua' },
        { id: 'gamelan', label: 'Latihan Gamelan' },
        { id: 'tari', label: 'Latihan Tari' },
        { id: 'pertunjukan', label: 'Pertunjukan' },
        { id: 'eduwisata', label: 'Edu-Wisata' },
        { id: 'kegiatan', label: 'Kegiatan Masyarakat' },
        { id: 'pelatihan', label: 'Pelatihan dan Pendampingan' },
        { id: 'bantas', label: 'Dokumentasi Desa Bantas' }
    ];

    const videos = [
        {
            thumbnail: "https://images.unsplash.com/photo-1513829096963-8a30ef68ad66?q=80&w=600&auto=format&fit=crop",
            title: "Latihan Gamelan - Paiketan Swara",
            views: "28,567 views"
        },
        {
            thumbnail: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop",
            title: "Pentas Tari Legong - Paiketan Swara",
            views: "35,150 views"
        },
        {
            thumbnail: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=600&auto=format&fit=crop",
            title: "Kegiatan Sosial - Paiketan Swara",
            views: "26,592 views"
        }
    ];

    React.useEffect(() => {
        fetch('/api/gallery')
            .then(res => res.json())
            .then(data => setItems(data))
            .catch(err => console.error(err));
    }, []);

    const filteredItems = filter === 'all' 
        ? items 
        : items.filter(item => item.category === filter);

    return (
        <div className="bg-[#FAF6F0] min-h-screen">
            
            {/* HERO BANNER */}
            <section className="relative py-32 md:py-40 pb-24 md:pb-32 flex items-center justify-center overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ 
                        backgroundImage: `url('${
                            content('gallery_banner', '/images/gallery_banner.png').startsWith('http') || content('gallery_banner', '/images/gallery_banner.png').startsWith('/') 
                                ? content('gallery_banner', '/images/gallery_banner.png') 
                                : `/storage/${content('gallery_banner')}`
                        }')` 
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#1C150C]/95 via-[#261E14]/85 to-[#261E14]/40" />

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-12 space-y-6">
                    <span className="text-xs font-bold tracking-widest text-[#C99B53] uppercase block">
                        — DOKUMENTASI KEGIATAN —
                    </span>
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white font-bold leading-tight">
                        {content('gallery_title', 'Galeri Sanggar')}
                    </h1>
                    <div className="h-[2px] w-20 bg-[#C99B53] mx-auto" />
                    <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        {content('gallery_desc', 'Mengabadikan momen pembelajaran, pementasan, dan kebersamaan pelestarian budaya di Sanggar Paiketan Swara.')}
                    </p>
                </div>

                {/* SVG Asymmetric Swoosh Divider */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
                    <svg 
                        viewBox="0 0 1200 120" 
                        preserveAspectRatio="none" 
                        className="relative block w-full h-[40px] md:h-[70px] text-[#FAF6F0]"
                        fill="currentColor"
                    >
                        <path d="M0,100 C300,100 450,20 1200,100 L1200,120 L0,120 Z"></path>
                    </svg>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {/* Filters */}
                <ScrollReveal distance="20px">
                    <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-4xl mx-auto">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setFilter(cat.id)}
                                className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all duration-200 cursor-pointer ${
                                    filter === cat.id
                                        ? 'bg-[#C99B53] text-[#261E14] shadow-md border border-[#C99B53]'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Photo Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredItems.map((item, idx) => (
                        <ScrollReveal
                            key={idx}
                            delay={(idx % 3) * 150}
                            distance="30px"
                            className="flex"
                        >
                            <div
                                className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 w-full group relative cursor-pointer aspect-[4/3] bg-gray-900"
                            >
                                <img
                                    src={item.image_path && (item.image_path.startsWith('http') || item.image_path.startsWith('/')) ? item.image_path : `/storage/${item.image_path}`}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white">
                                        <Eye size={20} />
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Center CTA Buttons */}
                <div className="flex justify-center gap-4 mt-12 mb-20">
                    <button className="px-6 py-3.5 bg-[#C99B53] hover:bg-[#B7863F] text-[#261E14] font-bold text-xs rounded-lg shadow-sm transition-colors duration-200 cursor-pointer">
                        Lihat Semua Foto
                    </button>
                    <button className="px-6 py-3.5 bg-[#261E14] hover:bg-black text-[#FAF6F0] font-bold text-xs rounded-lg shadow-sm transition-colors duration-200 cursor-pointer">
                        Tonton Video
                    </button>
                </div>
            </div>

            {/* VIDEO DOKUMENTASI SECTION */}
            <section className="py-24 bg-[#FAF6F0] border-t border-[#C99B53]/15">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal className="text-center mb-16 space-y-3" distance="30px">
                        <span className="text-xs font-bold tracking-widest text-[#C99B53] uppercase block">
                            — PILIHAN PASTI —
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-serif text-[#261E14] font-bold">
                            Video Dokumentasi
                        </h2>
                        <div className="h-[2px] w-20 bg-[#C99B53] mx-auto mt-2" />
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {videos.map((vid, idx) => (
                            <ScrollReveal
                                key={idx}
                                delay={idx * 150}
                                distance="40px"
                                className="flex flex-col space-y-4"
                            >
                                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-md group cursor-pointer bg-gray-900">
                                    <img
                                        src={vid.thumbnail}
                                        alt={vid.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {/* Play Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors duration-300 group-hover:bg-black/25">
                                        <div className="w-12 h-12 rounded-full bg-[#C99B53] text-[#261E14] flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110">
                                            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current ml-0.5" stroke="none">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-serif font-bold text-[#261E14] text-base leading-snug">
                                        {vid.title}
                                    </h4>
                                    <p className="text-xs text-gray-500 font-sans">
                                        {vid.views}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
