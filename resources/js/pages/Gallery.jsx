import React, { useState, useEffect } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const toEmbedUrl = (url) => {
    if (!url) return url;
    const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
    if (m) return `https://www.youtube.com/embed/${m[1]}`;
    return url;
};

export default function Gallery({ content }) {
    const [filter, setFilter] = useState('all');
    const [photos, setPhotos]   = useState([]);
    const [videos, setVideos]   = useState([]);
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const [lightboxPhoto, setLightboxPhoto] = useState(null);

    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') setLightboxPhoto(null); };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

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

    useEffect(() => {
        fetch('/api/gallery')
            .then(res => res.json())
            .then(data => {
                setPhotos(data.filter(i => (i.type || 'photo') === 'photo'));
                setVideos(data.filter(i => i.type === 'video'));
            })
            .catch(err => console.error(err));
    }, []);

    const filteredPhotos = filter === 'all'
        ? photos
        : photos.filter(item => item.category === filter);

    const displayedPhotos = showAllPhotos ? filteredPhotos : filteredPhotos.slice(0, 6);


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
                        {content('gallery_title', 'Cerita Kami dalam Gambar')}
                    </h1>
                    <div className="h-[2px] w-20 bg-[#C99B53] mx-auto" />
                    <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        {content('gallery_desc', 'Lihat berbagai kegiatan Sanggar Paiketan Swara, mulai dari latihan rutin, pertunjukan, pembelajaran gamelan dan tari, kegiatan masyarakat, hingga kunjungan edu-wisata.')}
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
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-12 max-w-4xl mx-auto">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => { setFilter(cat.id); setShowAllPhotos(false); }}
                                className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all duration-200 cursor-pointer ${
                                    filter === cat.id
                                        ? 'bg-[#C99B53] text-[#261E14] shadow-md border border-[#C99B53]'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                        {videos.length > 0 && (
                            <button
                                onClick={() => document.getElementById('video-section')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all duration-200 cursor-pointer bg-[#261E14] hover:bg-black text-[#FAF6F0] border border-[#261E14]"
                            >
                                Tonton Video
                            </button>
                        )}
                    </div>
                </ScrollReveal>

                {/* Photo Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedPhotos.map((item, idx) => (
                        <ScrollReveal
                            key={idx}
                            delay={(idx % 3) * 150}
                            distance="30px"
                            className="flex"
                        >
                            <div
                                onClick={() => setLightboxPhoto(item)}
                                className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 w-full cursor-pointer aspect-[4/3] bg-gray-900"
                            >
                                <img
                                    src={item.image_path && (item.image_path.startsWith('http') || item.image_path.startsWith('/')) ? item.image_path : `/storage/${item.image_path}`}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {filteredPhotos.length > 6 && (
                    <div className="flex justify-center mt-12 mb-20">
                        <button
                            onClick={() => setShowAllPhotos(prev => !prev)}
                            className="px-6 py-3.5 bg-[#C99B53] hover:bg-[#B7863F] text-[#261E14] font-bold text-xs rounded-lg shadow-sm transition-colors duration-200 cursor-pointer"
                        >
                            {showAllPhotos ? 'Tampilkan Lebih Sedikit' : 'Lihat Semua Foto'}
                        </button>
                    </div>
                )}
            </div>

            {/* VIDEO DOKUMENTASI SECTION — from API */}
            {videos.length > 0 && (
            <section id="video-section" className="py-24 bg-[#FAF6F0] border-t border-[#C99B53]/15">
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
                        {videos.map((vid, idx) => {
                            const embedUrl = toEmbedUrl(vid.video_url);
                            const thumbSrc = vid.image_path
                                ? (vid.image_path.startsWith('http') || vid.image_path.startsWith('/') ? vid.image_path : `/storage/${vid.image_path}`)
                                : null;
                            return (
                                <ScrollReveal key={vid.id ?? idx} delay={idx * 150} distance="40px" className="flex flex-col space-y-4">
                                    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-md group bg-gray-900">
                                        {embedUrl ? (
                                            <iframe
                                                src={embedUrl}
                                                title={vid.title}
                                                className="w-full h-full"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        ) : thumbSrc ? (
                                            <img src={thumbSrc} alt={vid.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-[#1A2F1C] text-gray-400">No preview</div>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-serif font-bold text-[#261E14] text-base leading-snug">{vid.title || 'Video Dokumentasi'}</h4>
                                        {vid.views && <p className="text-xs text-gray-500 font-sans">{vid.views}</p>}
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </section>
            )}
            {/* Lightbox Modal */}
            {lightboxPhoto && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setLightboxPhoto(null)}
                >
                    <button
                        onClick={() => setLightboxPhoto(null)}
                        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                    >
                        <X size={22} />
                    </button>
                    <div
                        className="max-w-5xl max-h-[85vh] flex flex-col items-center"
                        onClick={e => e.stopPropagation()}
                    >
                        <img
                            src={lightboxPhoto.image_path && (lightboxPhoto.image_path.startsWith('http') || lightboxPhoto.image_path.startsWith('/')) ? lightboxPhoto.image_path : `/storage/${lightboxPhoto.image_path}`}
                            alt={lightboxPhoto.title}
                            className="max-h-[75vh] max-w-full rounded-xl object-contain shadow-2xl"
                        />
                        {lightboxPhoto.title && (
                            <p className="text-white/90 text-sm md:text-base font-serif mt-4 text-center">
                                {lightboxPhoto.title}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
