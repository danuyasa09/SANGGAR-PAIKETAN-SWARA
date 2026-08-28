import React, { useState } from 'react';
import { Eye, Image as ImageIcon } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export default function Gallery({ content }) {
    const [filter, setFilter] = useState('all');
    const [items, setItems] = useState([]);

    const categories = [
        { id: 'all', label: 'Semua' },
        { id: 'gamelan', label: 'Gamelan' },
        { id: 'tari', label: 'Tari Bali' },
        { id: 'upacara', label: 'Upacara & Sosial' },
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
                        — DOKUMENTASI KEGIATAN
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
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setFilter(cat.id)}
                                className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 cursor-pointer ${
                                    filter === cat.id
                                        ? 'bg-[#C99B53] text-[#261E14] shadow-md'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredItems.map((item, idx) => (
                        <ScrollReveal
                            key={idx}
                            delay={(idx % 3) * 150}
                            distance="30px"
                            className="flex"
                        >
                            <div
                                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group relative cursor-pointer w-full"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden bg-gray-900">
                                <img
                                    src={`/storage/${item.image_path}`}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:opacity-75"
                                />
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white">
                                        <Eye size={20} />
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <span className="text-[9px] tracking-widest font-bold text-[#C99B53] uppercase mb-2 block">
                                    {item.category}
                                </span>
                                <h3 className="text-lg font-serif font-bold text-[#261E14]">
                                    {item.title}
                                </h3>
                            </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

            </div>
        </div>
    );
}
