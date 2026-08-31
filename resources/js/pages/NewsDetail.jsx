import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Eye, Calendar, Share2, MessageCircle, Link2, ChevronRight, BookOpen, Tag, Loader2 } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import axios from '../lib/axios';

/* Inline SVG for social icons removed from lucide-react */
const IconFacebook = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
);
const IconTwitterX = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
);

const resolveUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http') || url.startsWith('/')) return url;
    return `/storage/${url}`;
};

const formatDate = (d) => d ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop';

export default function NewsDetail({ changePage, articleId }) {
    const [article, setArticle]     = useState(null);
    const [related, setRelated]     = useState([]);
    const [loading, setLoading]     = useState(true);
    const [linkCopied, setLinkCopied] = useState(false);

    useEffect(() => {
        if (!articleId) return;
        setLoading(true);
        axios.get(`/api/articles/${articleId}`)
            .then(res => setArticle(res.data))
            .catch(() => setArticle(null))
            .finally(() => setLoading(false));

        // Fetch related (all articles, pick 3 excluding current)
        axios.get('/api/articles')
            .then(res => setRelated(res.data.filter(a => a.id !== articleId).slice(0, 3)))
            .catch(() => setRelated([]));
    }, [articleId]);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href).catch(() => {});
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
    };

    /* ─── Loading ───────────────────────────── */
    if (loading) return (
        <div className="bg-[#FAF6F0] min-h-screen flex items-center justify-center">
            <div className="text-center space-y-3">
                <Loader2 size={32} className="animate-spin text-[#C99B53] mx-auto" />
                <p className="text-sm text-gray-400">Memuat artikel...</p>
            </div>
        </div>
    );

    /* ─── Not found ─────────────────────────── */
    if (!article) return (
        <div className="bg-[#FAF6F0] min-h-screen flex items-center justify-center">
            <div className="text-center space-y-4">
                <p className="text-2xl font-serif text-[#261E14] font-bold">Artikel tidak ditemukan</p>
                <button onClick={() => changePage('news')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#261E14] text-white rounded-xl text-sm font-bold hover:bg-black transition-colors cursor-pointer">
                    <ArrowLeft size={14} />Kembali ke Berita
                </button>
            </div>
        </div>
    );

    const coverUrl    = resolveUrl(article.cover_url);
    const avatarUrl   = resolveUrl(article.author_avatar_url) || DEFAULT_AVATAR;

    return (
        <div className="bg-[#FAF6F0] min-h-screen font-sans">

            {/* ── COVER HERO ─────────────────────────────── */}
            <section className="relative h-[55vh] min-h-[380px] flex items-end overflow-hidden">
                {coverUrl ? (
                    <div className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-700"
                        style={{ backgroundImage: `url('${coverUrl}')` }} />
                ) : (
                    <div className="absolute inset-0 bg-[#261E14]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C150C] via-[#261E14]/70 to-transparent" />

                {/* Breadcrumb */}
                <div className="absolute top-6 left-0 right-0 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                    <div className="flex items-center gap-2 text-xs text-gray-300/80">
                        <button onClick={() => changePage('home')} className="hover:text-[#C99B53] transition-colors cursor-pointer">Beranda</button>
                        <ChevronRight size={12} className="text-gray-500" />
                        <button onClick={() => changePage('news')} className="hover:text-[#C99B53] transition-colors cursor-pointer">Berita</button>
                        <ChevronRight size={12} className="text-gray-500" />
                        <span className="text-[#C99B53] line-clamp-1 max-w-[200px]">{article.title}</span>
                    </div>
                </div>

                {/* Title block */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
                    <div className="max-w-3xl space-y-4">
                        {article.tag && (
                            <span className="inline-flex items-center gap-1.5 text-[9px] tracking-widest font-bold bg-[#C99B53] text-[#261E14] px-3 py-1.5 rounded uppercase">
                                <Tag size={10} />{article.tag}
                            </span>
                        )}
                        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-white font-bold leading-tight">
                            {article.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-300">
                            {article.published_at && <span className="flex items-center gap-1.5"><Calendar size={12} className="text-[#C99B53]" />{formatDate(article.published_at)}</span>}
                            {article.read_time    && <span className="flex items-center gap-1.5"><Clock size={12} className="text-[#C99B53]" />{article.read_time}</span>}
                            {article.views > 0    && <span className="flex items-center gap-1.5"><Eye size={12} className="text-[#C99B53]" />Dibaca {article.views.toLocaleString()} kali</span>}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── MAIN CONTENT ───────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                    {/* ── LEFT: Article Body ───────────────────── */}
                    <ScrollReveal className="lg:col-span-8" distance="30px">
                        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            {/* Meta bar */}
                            <div className="flex items-center gap-3 px-8 py-4 border-b border-gray-100 bg-gray-50/50">
                                <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#C99B53] uppercase tracking-widest">
                                    <BookOpen size={12} />BERITA
                                </span>
                                {article.read_time && (
                                    <>
                                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                                        <span className="text-[11px] text-gray-400 flex items-center gap-1"><Clock size={11} />{article.read_time}</span>
                                    </>
                                )}
                            </div>

                            {/* Content blocks */}
                            <div className="px-6 sm:px-10 py-8 space-y-6">
                                {(!article.content || article.content.length === 0) && (
                                    <p className="text-gray-400 italic text-sm text-center py-8">Konten artikel belum tersedia.</p>
                                )}
                                {article.content?.map((block, idx) => {
                                    if (block.type === 'lead') return (
                                        <p key={idx} className="text-base sm:text-lg font-serif font-semibold text-[#261E14] leading-relaxed border-l-4 border-[#C99B53] pl-5 first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#C99B53] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
                                            {block.text}
                                        </p>
                                    );
                                    if (block.type === 'paragraph') return (
                                        <p key={idx} className="text-sm sm:text-base text-gray-600 leading-[1.9] font-sans">{block.text}</p>
                                    );
                                    if (block.type === 'heading') return (
                                        <h2 key={idx} className="text-xl sm:text-2xl font-serif font-bold text-[#261E14] pt-4 border-t border-gray-100">{block.text}</h2>
                                    );
                                    if (block.type === 'quote') return (
                                        <blockquote key={idx} className="relative bg-[#FAF6F0] border border-[#C99B53]/25 rounded-xl px-8 py-6 my-6">
                                            <div className="absolute -top-4 left-6 w-8 h-8 bg-[#C99B53] rounded-full flex items-center justify-center text-white font-serif text-xl font-bold leading-none">"</div>
                                            <p className="text-sm sm:text-base text-[#261E14] font-serif font-semibold leading-relaxed italic">{block.text}</p>
                                            {block.author && <footer className="mt-3 text-xs text-gray-500 font-sans font-medium">— {block.author}</footer>}
                                        </blockquote>
                                    );
                                    return null;
                                })}
                            </div>

                            {/* Author & Share bar */}
                            <div className="mx-6 sm:mx-10 mb-8 bg-[#FAF6F0] rounded-xl border border-[#C99B53]/15 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                                <div className="flex items-center gap-3">
                                    <img src={avatarUrl} alt={article.author_name}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-[#C99B53]/30 shadow-sm" />
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Ditulis oleh</p>
                                        <p className="text-sm font-bold text-[#261E14] font-serif leading-none mt-0.5">{article.author_name}</p>
                                        {article.author_role && <p className="text-xs text-gray-500 mt-0.5">{article.author_role}</p>}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-1 flex items-center gap-1.5">
                                        <Share2 size={11} />Bagikan:
                                    </span>
                                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                                        target="_blank" rel="noopener noreferrer"
                                        className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:opacity-80 transition-opacity shadow-sm">
                                        <IconFacebook />
                                    </a>
                                    <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`}
                                        target="_blank" rel="noopener noreferrer"
                                        className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white hover:opacity-80 transition-opacity shadow-sm">
                                        <IconTwitterX />
                                    </a>
                                    <a href={`https://wa.me/?text=${encodeURIComponent(article.title + ' ' + window.location.href)}`}
                                        target="_blank" rel="noopener noreferrer"
                                        className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:opacity-80 transition-opacity shadow-sm">
                                        <MessageCircle size={14} />
                                    </a>
                                    <button onClick={handleCopyLink}
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-all shadow-sm ${linkCopied ? 'bg-emerald-500' : 'bg-gray-500'}`}>
                                        <Link2 size={14} />
                                    </button>
                                    {linkCopied && <span className="text-[11px] text-emerald-600 font-semibold animate-pulse">Tautan disalin!</span>}
                                </div>
                            </div>

                            {/* Back button */}
                            <div className="px-6 sm:px-10 pb-8">
                                <button onClick={() => changePage('news')}
                                    className="inline-flex items-center gap-2 text-xs font-bold text-[#261E14] hover:text-[#C99B53] transition-colors uppercase tracking-widest cursor-pointer group">
                                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                                    Kembali ke Semua Berita
                                </button>
                            </div>
                        </article>
                    </ScrollReveal>

                    {/* ── RIGHT: Sidebar ───────────────────────── */}
                    <ScrollReveal className="lg:col-span-4 flex flex-col gap-6" delay={150} distance="30px">

                        {/* Author card */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="h-1.5 bg-gradient-to-r from-[#261E14] via-[#C99B53] to-[#261E14]" />
                            <div className="p-6 flex flex-col items-center text-center gap-3">
                                <div className="relative">
                                    <img src={avatarUrl} alt={article.author_name}
                                        className="w-20 h-20 rounded-full object-cover border-4 border-[#C99B53]/20 shadow-md" />
                                    <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#C99B53] rounded-full flex items-center justify-center shadow">
                                        <BookOpen size={10} className="text-white" />
                                    </span>
                                </div>
                                <div>
                                    <p className="font-serif font-bold text-[#261E14] text-base leading-none">{article.author_name}</p>
                                    {article.author_role && <p className="text-[10px] font-bold text-[#C99B53] uppercase tracking-widest mt-1">{article.author_role}</p>}
                                </div>
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    Mendokumentasikan dan mempublikasikan perjalanan seni budaya Sanggar Paiketan Swara kepada khalayak luas.
                                </p>
                            </div>
                        </div>

                        {/* Read Also */}
                        {related.length > 0 && (
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                                <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#C99B53]" />
                                    <h3 className="text-xs font-bold text-[#261E14] uppercase tracking-widest">Baca Juga</h3>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {related.map(rel => (
                                        <button key={rel.id} onClick={() => changePage('news-detail', rel.id)}
                                            className="w-full flex items-start gap-3 p-4 hover:bg-[#FAF6F0] transition-colors cursor-pointer text-left group">
                                            <div className="w-16 h-14 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                                                {rel.cover_url ? (
                                                    <img src={resolveUrl(rel.cover_url)} alt={rel.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-200" />
                                                )}
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                {rel.tag && <span className="text-[9px] font-bold text-[#C99B53] uppercase tracking-wider">{rel.tag}</span>}
                                                <p className="text-xs font-semibold text-[#261E14] leading-snug line-clamp-2 font-serif group-hover:text-[#C99B53] transition-colors">{rel.title}</p>
                                                {rel.published_at && <p className="text-[10px] text-gray-400">{formatDate(rel.published_at)}</p>}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* CTA Card */}
                        <div className="relative bg-[#1A2F1C] rounded-2xl overflow-hidden shadow-lg">
                            <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-[#C99B53]/10 pointer-events-none" />
                            <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-white/5 pointer-events-none" />
                            <div className="relative z-10 p-6 space-y-4">
                                <span className="inline-block text-[9px] font-bold uppercase tracking-widest text-[#C99B53] bg-[#C99B53]/15 px-2.5 py-1 rounded-full">
                                    Reservasi Kunjungan
                                </span>
                                <h3 className="text-lg font-serif font-bold text-white leading-snug">
                                    Rasakan Langsung Pengalaman Seni Budaya Bali!
                                </h3>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    Jangan hanya membaca — hadir dan rasakan sendiri keajaiban gamelan dan tari Bali bersama kami di Desa Bantas, Tabanan.
                                </p>
                                <button onClick={() => changePage('reservation')}
                                    className="w-full py-3 bg-[#C99B53] hover:bg-[#B7863F] text-[#261E14] font-bold text-xs rounded-xl shadow transition-all duration-200 cursor-pointer uppercase tracking-wider">
                                    Reservasi Sekarang →
                                </button>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </div>
    );
}
