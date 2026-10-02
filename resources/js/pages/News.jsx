import React, { useState, useEffect, useRef } from 'react';
import { Clock, Eye, Calendar, Loader2, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import axios from '../lib/axios';

const ARTICLES_PER_PAGE = 6;

const resolveUrl = (url) => {
    if (!url) return 'https://images.unsplash.com/photo-1513829096963-8a30ef68ad66?q=80&w=800&auto=format&fit=crop';
    if (url.startsWith('http') || url.startsWith('/')) return url;
    return `/storage/${url}`;
};

const formatDate = (d) => d ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

export default function News({ content, changePage }) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading]   = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const gridRef = useRef(null);

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

    // Hitung pagination
    const totalPages   = Math.ceil(articles.length / ARTICLES_PER_PAGE);
    const startIndex   = (currentPage - 1) * ARTICLES_PER_PAGE;
    const currentArticles = articles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);

    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        // Scroll ke atas grid artikel
        gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // Reset ke halaman 1 jika artikel berubah
    useEffect(() => { setCurrentPage(1); }, [articles.length]);

    return (
        <div className="bg-[#FAF6F0] min-h-screen">

            {/* HERO BANNER */}
            <section className="relative py-32 md:py-40 pb-24 md:pb-32 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${resolveContent('news_banner', 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?q=80&w=1600&auto=format&fit=crop')}')` }} />
                <div className="absolute inset-0 bg-gradient-to-b from-[#1C150C]/95 via-[#261E14]/85 to-[#261E14]/40" />

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-12 space-y-6">
                    <span className="text-xs font-bold tracking-widest text-[#C99B53] uppercase block">
                        — DOKUMENTASI &amp; KABAR —
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
                    <>
                        {/* Anchor scroll ke atas grid */}
                        <div ref={gridRef} />

                        {/* Grid artikel */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {currentArticles.map((art, idx) => (
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

                        {/* Pagination controls */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-4 mb-8">
                                {/* Tombol Sebelumnya */}
                                <button
                                    onClick={() => goToPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-600 hover:bg-[#FAF6F0] hover:border-[#C99B53] hover:text-[#C99B53] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-gray-600 shadow-sm"
                                >
                                    <ChevronLeft size={15} />
                                    Sebelumnya
                                </button>

                                {/* Nomor halaman */}
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => {
                                        // Tampilkan halaman pertama, terakhir, current ±1, dan ellipsis
                                        const showPage =
                                            pageNum === 1 ||
                                            pageNum === totalPages ||
                                            Math.abs(pageNum - currentPage) <= 1;
                                        const showEllipsisBefore = pageNum === currentPage - 2 && currentPage > 3;
                                        const showEllipsisAfter  = pageNum === currentPage + 2 && currentPage < totalPages - 2;

                                        if (showEllipsisBefore || showEllipsisAfter) {
                                            return <span key={pageNum} className="px-1 text-gray-400 text-sm">…</span>;
                                        }
                                        if (!showPage) return null;
                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => goToPage(pageNum)}
                                                className={`w-9 h-9 rounded-xl text-sm font-bold transition-all shadow-sm ${
                                                    pageNum === currentPage
                                                        ? 'bg-[#C99B53] text-[#261E14] shadow-md'
                                                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-[#FAF6F0] hover:border-[#C99B53] hover:text-[#C99B53]'
                                                }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Tombol Berikutnya */}
                                <button
                                    onClick={() => goToPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-600 hover:bg-[#FAF6F0] hover:border-[#C99B53] hover:text-[#C99B53] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-gray-600 shadow-sm"
                                >
                                    Berikutnya
                                    <ChevronRight size={15} />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
