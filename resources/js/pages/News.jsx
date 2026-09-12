import React, { useState, useEffect } from 'react';
import { Clock, Eye, Calendar, Loader2, ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import axios from '../lib/axios';

const resolveUrl = (url) => {
    if (!url) return 'https://images.unsplash.com/photo-1513829096963-8a30ef68ad66?q=80&w=800&auto=format&fit=crop';
    if (url.startsWith('http') || url.startsWith('/')) return url;
    return `/storage/${url}`;
};

const formatDate = (d) => d ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

export default function News({ content, changePage }) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading]   = useState(true);

    useEffect(() => {
        axios.get('/api/articles')
            .then(res => setArticles(res.data))
            .catch(() => setArticles([]))
            .finally(() => setLoading(false));
    }, []);

    const resolveContent = (key, fallback) => {
        const src = content(key, fallback);
        if (!src) return fallback || '';
        if (src.startsWith('http') || src.startsWith('/')) return src;
        return `/storage/${src}`;
    };

    return (
        <div className="bg-[#FAF6F0] min-h-screen">

            {/* HERO BANNER */}
            <section className="relative py-32 md:py-40 pb-24 md:pb-32 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${resolveContent('news_banner', 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?q=80&w=1600&auto=format&fit=crop')}')` }} />
                <div className="absolute inset-0 bg-gradient-to-b from-[#1C150C]/95 via-[#261E14]/85 to-[#261E14]/40" />

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-12 space-y-6">
                    <span className="text-xs font-bold tracking-widest text-[#C99B53] uppercase block">
                        — DOKUMENTASI & KABAR —
                    </span>
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white font-bold leading-tight">
                        {content('news_title', 'Kabar dari Sanggar')}
                    </h1>
                    <div className="h-[2px] w-20 bg-[#C99B53] mx-auto" />
                    <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        {content('news_subtitle', 'Ikuti perkembangan, kegiatan, dan cerita terbaru dari Sanggar Paiketan Swara.')}
                    </p>
                </div>

                <div className="absolute -bottom-[2px] left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[35px] md:h-[50px] text-[#FAF6F0] translate-y-px" fill="currentColor">
                        <path d="M0,0 C150,0 350,100 600,100 C850,100 1050,0 1200,0 L1200,125 L0,125 Z" />
                    </svg>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {loading ? (
                    <div className="flex items-center justify-center py-24 text-[#261E14]/30">
                        <Loader2 size={28} className="animate-spin mr-2" />Memuat berita...
                    </div>
                ) : articles.length === 0 ? (
                    <div className="text-center py-24 text-gray-400">
                        <p className="text-lg font-serif">Belum ada berita yang dipublikasikan.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {articles.map((art, idx) => (
                            <ScrollReveal key={art.id} delay={(idx % 3) * 120} distance="30px" className="flex">
                                <div 
                                    className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between w-full cursor-pointer group hover:-translate-y-1"
                                    onClick={() => changePage('news-detail', art.id)}
                                >
                                    <div>
                                        {/* Cover Image with fixed uniform aspect ratio */}
                                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                                            <img 
                                                src={resolveUrl(art.cover_url)} 
                                                alt={art.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 space-y-3">
                                            <span className="text-[9px] tracking-widest font-bold bg-[#E8F0EC] text-[#2F523E] px-2.5 py-1 rounded uppercase inline-block">
                                                {art.tag}
                                            </span>
                                            <h3 className="text-lg font-serif font-bold text-[#261E14] leading-snug line-clamp-2 min-h-[3.25rem] group-hover:text-[#C99B53] transition-colors">
                                                {art.title}
                                            </h3>
                                            {art.content?.[0]?.text && (
                                                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 font-sans">
                                                    {art.content[0].text}
                                                </p>
                                            )}
                                            <div className="flex flex-wrap gap-3 text-[11px] text-gray-400 pt-1">
                                                {art.published_at && (
                                                    <span className="flex items-center gap-1">
                                                        <Calendar size={11} />{formatDate(art.published_at)}
                                                    </span>
                                                )}
                                                {art.read_time && (
                                                    <span className="flex items-center gap-1">
                                                        <Clock size={11} />{art.read_time}
                                                    </span>
                                                )}
                                                {art.views > 0 && (
                                                    <span className="flex items-center gap-1">
                                                        <Eye size={11} />{art.views.toLocaleString()}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-6 pb-6 pt-2 border-t border-gray-100/80 mt-auto">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); changePage('news-detail', art.id); }}
                                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C99B53] group-hover:text-[#B7863F] uppercase tracking-wider transition-colors cursor-pointer"
                                        >
                                            <span>Baca Selengkapnya</span>
                                            <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
                                        </button>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
