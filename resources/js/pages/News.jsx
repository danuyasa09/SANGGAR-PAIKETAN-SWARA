import React, { useState, useEffect } from 'react';
import { Clock, Eye, Calendar, Loader2 } from 'lucide-react';
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

    const featured   = articles[0] ?? null;
    const restList   = articles.slice(1);

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
                        — INFORMASI &amp; ACARA SANGGAR —
                    </span>
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white font-bold leading-tight">
                        {content('news_hero_title', 'Berita Terkini')}
                    </h1>
                    <div className="h-[2px] w-20 bg-[#C99B53] mx-auto" />
                    <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        {content('news_hero_desc', 'Ikuti perkembangan terbaru, acara, dan cerita seputar pelestarian seni budaya Bali di Sanggar Paiketan Swara.')}
                    </p>
                </div>

                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px] text-[#FAF6F0]" fill="currentColor">
                        <path d="M0,120 L600,45 L1200,120 Z" />
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
                    <>
                        {/* Featured Article */}
                        {featured && (
                            <ScrollReveal distance="40px">
                                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md mb-16 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                                    onClick={() => changePage('news-detail', featured.id)}>
                                    <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                                        <div className="lg:col-span-6 relative min-h-[280px] overflow-hidden bg-gray-100">
                                            <img src={resolveUrl(featured.cover_url)} alt={featured.title}
                                                className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                        <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center space-y-5">
                                            <span className="self-start text-[9px] tracking-widest font-bold bg-[#E8F0EC] text-[#2F523E] px-2.5 py-1 rounded uppercase">
                                                {featured.tag}
                                            </span>
                                            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#261E14] leading-tight group-hover:text-[#C99B53] transition-colors">
                                                {featured.title}
                                            </h2>
                                            <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                                                {featured.published_at && <span className="flex items-center gap-1"><Calendar size={11} />{formatDate(featured.published_at)}</span>}
                                                {featured.read_time && <span className="flex items-center gap-1"><Clock size={11} />{featured.read_time}</span>}
                                                {featured.views > 0 && <span className="flex items-center gap-1"><Eye size={11} />Dibaca {featured.views.toLocaleString()} kali</span>}
                                            </div>
                                            {featured.content?.[0]?.text && (
                                                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 font-sans">{featured.content[0].text}</p>
                                            )}
                                            <button onClick={e => { e.stopPropagation(); changePage('news-detail', featured.id); }}
                                                className="self-start inline-flex items-center text-xs font-bold text-[#C99B53] hover:text-[#B7863F] uppercase tracking-wider transition-colors cursor-pointer mt-2">
                                                BACA SELENGKAPNYA
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        )}

                        {/* Articles Grid */}
                        {restList.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                                {restList.map((art, idx) => (
                                    <ScrollReveal key={art.id} delay={(idx % 3) * 150} distance="30px" className="flex">
                                        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between w-full pb-6 cursor-pointer group"
                                            onClick={() => changePage('news-detail', art.id)}>
                                            <div>
                                                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                                                    <img src={resolveUrl(art.cover_url)} alt={art.title}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                                </div>
                                                <div className="p-6 space-y-3">
                                                    <span className="text-[9px] tracking-widest font-bold bg-[#E8F0EC] text-[#2F523E] px-2.5 py-1 rounded uppercase inline-block">
                                                        {art.tag}
                                                    </span>
                                                    <h3 className="text-lg font-serif font-bold text-[#261E14] leading-snug group-hover:text-[#C99B53] transition-colors">
                                                        {art.title}
                                                    </h3>
                                                    {art.content?.[0]?.text && (
                                                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 font-sans">
                                                            {art.content[0].text}
                                                        </p>
                                                    )}
                                                    <div className="flex gap-3 text-[10px] text-gray-400 pt-1">
                                                        {art.published_at && <span className="flex items-center gap-1"><Calendar size={10} />{formatDate(art.published_at)}</span>}
                                                        {art.read_time && <span className="flex items-center gap-1"><Clock size={10} />{art.read_time}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="px-6 pt-2">
                                                <button onClick={e => { e.stopPropagation(); changePage('news-detail', art.id); }}
                                                    className="inline-flex items-center text-xs font-bold text-[#C99B53] hover:text-[#B7863F] uppercase tracking-wider transition-colors cursor-pointer">
                                                    BACA SELENGKAPNYA
                                                </button>
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
