import React, { useState } from 'react';
import { ArrowLeft, Clock, Eye, Calendar, Share2, Facebook, Twitter, MessageCircle, Link2, ChevronRight, BookOpen, Tag } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

/* ─────────────────────────────────────────────
   Dummy data – in a real app this would come
   from an API endpoint based on an article ID
   ───────────────────────────────────────────── */
const ARTICLE = {
    id: 1,
    tag: 'PELESTARIAN',
    readTime: '5 menit baca',
    views: '2.841',
    date: '24 Agustus 2026',
    title: 'Festival Gamelan Bali Tahunan Kembali Digelar di Sanggar Paiketan Swara',
    cover: 'https://images.unsplash.com/photo-1513829096963-8a30ef68ad66?q=80&w=1600&auto=format&fit=crop',
    author: {
        name: 'Tim Sanggar Paiketan',
        role: 'Penulis & Pengelola Konten',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    },
    content: [
        {
            type: 'lead',
            text: 'Menyambut bulan purnama, Sanggar Paiketan Swara kembali menjadi tuan rumah Festival Gamelan Bali Tahunan yang mempertemukan lebih dari 50 seniman gamelan dari seluruh penjuru Bali.'
        },
        {
            type: 'paragraph',
            text: 'Festival yang digelar setiap tahun ini bertujuan untuk melestarikan langgam-langgam kuno yang jarang dimainkan di era modern. Tahun ini, festival berlangsung selama tiga hari penuh, mulai dari tanggal 20 hingga 22 Agustus 2026, dengan berbagai pertunjukan, lokakarya, dan sesi diskusi terbuka untuk umum.'
        },
        {
            type: 'quote',
            text: '"Gamelan bukan sekadar musik. Ia adalah bahasa yang menghubungkan kita dengan leluhur, dengan alam, dan dengan sesama."',
            author: 'I Made Sukerta, Maestro Gamelan Bali'
        },
        {
            type: 'paragraph',
            text: 'Tahun ini menjadi yang paling istimewa karena pertama kalinya festival menghadirkan kolaborasi lintas generasi. Para maestro berusia 60-an memainkan gongan bersama anak-anak didik berusia 12 tahun. Perpaduan ini menghasilkan harmonisasi yang menyentuh hati para penonton yang memadati area panggung terbuka sanggar.'
        },
        {
            type: 'heading',
            text: 'Lokakarya untuk Pengunjung Umum'
        },
        {
            type: 'paragraph',
            text: 'Salah satu daya tarik utama festival adalah sesi lokakarya interaktif yang terbuka untuk pengunjung umum. Para peserta diajarkan cara memegang tabuh dengan benar, memahami pola ritme dasar, hingga mencoba memainkan instrumen bersama anggota sanggar. Antusiasme yang tinggi terlihat dari lebih dari 200 peserta yang mendaftarkan diri untuk sesi lokakarya ini.'
        },
        {
            type: 'paragraph',
            text: 'Tidak hanya bagi wisatawan mancanegara, lokakarya ini juga diminati oleh generasi muda lokal yang ingin mengenal warisan budaya mereka sendiri lebih dekat. Ini menjadi sinyal positif bahwa seni tradisional Bali masih relevan dan dicintai oleh berbagai kalangan usia.'
        },
        {
            type: 'heading',
            text: 'Rencana ke Depan'
        },
        {
            type: 'paragraph',
            text: 'Melihat keberhasilan festival tahun ini, pihak sanggar berencana untuk memperluas skala festival di tahun mendatang dengan mengundang seniman gamelan dari luar Bali, termasuk dari Jawa dan Lombok. Selain itu, dokumentasi festival akan dijadikan arsip digital yang bisa diakses secara luas sebagai bagian dari upaya pelestarian budaya berbasis teknologi.'
        },
    ]
};

const RELATED_ARTICLES = [
    {
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=400&auto=format&fit=crop',
        tag: 'EDUKASI',
        title: 'Program Tari Anak-Anak Mencapai Rekor Peserta',
        date: '18 Ags 2026',
    },
    {
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=400&auto=format&fit=crop',
        tag: 'PELESTARIAN',
        title: 'Restorasi Instrumen Gamelan Kuno Abad ke-19',
        date: '10 Ags 2026',
    },
    {
        image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=400&auto=format&fit=crop',
        tag: 'KOLABORASI',
        title: 'Kolaborasi Seni Lintas Budaya dengan Seniman Internasional',
        date: '3 Ags 2026',
    },
];

/* ─────────────────────────────────────────────
   Component
   ───────────────────────────────────────────── */
export default function NewsDetail({ changePage, articleId }) {
    const [linkCopied, setLinkCopied] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href).catch(() => {});
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
    };

    return (
        <div className="bg-[#FAF6F0] min-h-screen font-sans">

            {/* ── COVER HERO ─────────────────────────────── */}
            <section className="relative h-[55vh] min-h-[380px] flex items-end overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url('${ARTICLE.cover}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C150C] via-[#261E14]/70 to-transparent" />

                {/* Breadcrumb */}
                <div className="absolute top-6 left-0 right-0 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                    <div className="flex items-center gap-2 text-xs text-gray-300/80">
                        <button onClick={() => changePage('home')} className="hover:text-[#C99B53] transition-colors cursor-pointer">Beranda</button>
                        <ChevronRight size={12} className="text-gray-500" />
                        <button onClick={() => changePage('news')} className="hover:text-[#C99B53] transition-colors cursor-pointer">Berita</button>
                        <ChevronRight size={12} className="text-gray-500" />
                        <span className="text-[#C99B53] line-clamp-1 max-w-[200px]">{ARTICLE.title}</span>
                    </div>
                </div>

                {/* Title Block */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
                    <div className="max-w-3xl space-y-4">
                        <span className="inline-flex items-center gap-1.5 text-[9px] tracking-widest font-bold bg-[#C99B53] text-[#261E14] px-3 py-1.5 rounded uppercase">
                            <Tag size={10} />
                            {ARTICLE.tag}
                        </span>
                        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-white font-bold leading-tight">
                            {ARTICLE.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-300">
                            <span className="flex items-center gap-1.5"><Calendar size={12} className="text-[#C99B53]" />{ARTICLE.date}</span>
                            <span className="flex items-center gap-1.5"><Clock size={12} className="text-[#C99B53]" />{ARTICLE.readTime}</span>
                            <span className="flex items-center gap-1.5"><Eye size={12} className="text-[#C99B53]" />Dibaca {ARTICLE.views} kali</span>
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
                            {/* Article Meta Bar */}
                            <div className="flex items-center gap-3 px-8 py-4 border-b border-gray-100 bg-gray-50/50">
                                <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#C99B53] uppercase tracking-widest">
                                    <BookOpen size={12} />
                                    BERITA
                                </span>
                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                <span className="text-[11px] text-gray-400 flex items-center gap-1">
                                    <Clock size={11} />{ARTICLE.readTime}
                                </span>
                            </div>

                            {/* Article Content */}
                            <div className="px-6 sm:px-10 py-8 space-y-6">
                                {ARTICLE.content.map((block, idx) => {
                                    if (block.type === 'lead') return (
                                        <p key={idx} className="text-base sm:text-lg font-serif font-semibold text-[#261E14] leading-relaxed border-l-4 border-[#C99B53] pl-5 first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#C99B53] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
                                            {block.text}
                                        </p>
                                    );
                                    if (block.type === 'paragraph') return (
                                        <p key={idx} className="text-sm sm:text-base text-gray-600 leading-[1.9] font-sans">
                                            {block.text}
                                        </p>
                                    );
                                    if (block.type === 'heading') return (
                                        <h2 key={idx} className="text-xl sm:text-2xl font-serif font-bold text-[#261E14] pt-4 border-t border-gray-100">
                                            {block.text}
                                        </h2>
                                    );
                                    if (block.type === 'quote') return (
                                        <blockquote key={idx} className="relative bg-[#FAF6F0] border border-[#C99B53]/25 rounded-xl px-8 py-6 my-6">
                                            <div className="absolute -top-4 left-6 w-8 h-8 bg-[#C99B53] rounded-full flex items-center justify-center text-white font-serif text-xl font-bold leading-none">"</div>
                                            <p className="text-sm sm:text-base text-[#261E14] font-serif font-semibold leading-relaxed italic">{block.text}</p>
                                            {block.author && (
                                                <footer className="mt-3 text-xs text-gray-500 font-sans font-medium">— {block.author}</footer>
                                            )}
                                        </blockquote>
                                    );
                                    return null;
                                })}
                            </div>

                            {/* ── Author & Share Bar ─────────────────── */}
                            <div className="mx-6 sm:mx-10 mb-8 bg-[#FAF6F0] rounded-xl border border-[#C99B53]/15 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                                {/* Author */}
                                <div className="flex items-center gap-3">
                                    <img
                                        src={ARTICLE.author.avatar}
                                        alt={ARTICLE.author.name}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-[#C99B53]/30 shadow-sm"
                                    />
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Ditulis oleh</p>
                                        <p className="text-sm font-bold text-[#261E14] font-serif leading-none mt-0.5">{ARTICLE.author.name}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{ARTICLE.author.role}</p>
                                    </div>
                                </div>

                                {/* Share Buttons */}
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-1 flex items-center gap-1.5">
                                        <Share2 size={11} /> Bagikan:
                                    </span>
                                    <a
                                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                                        target="_blank" rel="noopener noreferrer"
                                        className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:opacity-80 transition-opacity shadow-sm"
                                        title="Bagikan ke Facebook"
                                    >
                                        <Facebook size={14} />
                                    </a>
                                    <a
                                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(ARTICLE.title)}&url=${encodeURIComponent(window.location.href)}`}
                                        target="_blank" rel="noopener noreferrer"
                                        className="w-8 h-8 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white hover:opacity-80 transition-opacity shadow-sm"
                                        title="Bagikan ke Twitter/X"
                                    >
                                        <Twitter size={14} />
                                    </a>
                                    <a
                                        href={`https://wa.me/?text=${encodeURIComponent(ARTICLE.title + ' ' + window.location.href)}`}
                                        target="_blank" rel="noopener noreferrer"
                                        className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:opacity-80 transition-opacity shadow-sm"
                                        title="Bagikan ke WhatsApp"
                                    >
                                        <MessageCircle size={14} />
                                    </a>
                                    <button
                                        onClick={handleCopyLink}
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-all shadow-sm ${linkCopied ? 'bg-emerald-500' : 'bg-gray-500'}`}
                                        title="Salin tautan"
                                    >
                                        <Link2 size={14} />
                                    </button>
                                    {linkCopied && (
                                        <span className="text-[11px] text-emerald-600 font-semibold animate-pulse">Tautan disalin!</span>
                                    )}
                                </div>
                            </div>

                            {/* Back Button */}
                            <div className="px-6 sm:px-10 pb-8">
                                <button
                                    onClick={() => changePage('news')}
                                    className="inline-flex items-center gap-2 text-xs font-bold text-[#261E14] hover:text-[#C99B53] transition-colors uppercase tracking-widest cursor-pointer group"
                                >
                                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                                    Kembali ke Semua Berita
                                </button>
                            </div>
                        </article>
                    </ScrollReveal>

                    {/* ── RIGHT: Sidebar ───────────────────────── */}
                    <ScrollReveal className="lg:col-span-4 flex flex-col gap-6" delay={150} distance="30px">

                        {/* Author Card */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            {/* Decorative top stripe */}
                            <div className="h-1.5 bg-gradient-to-r from-[#261E14] via-[#C99B53] to-[#261E14]" />
                            <div className="p-6 flex flex-col items-center text-center gap-3">
                                <div className="relative">
                                    <img
                                        src={ARTICLE.author.avatar}
                                        alt={ARTICLE.author.name}
                                        className="w-20 h-20 rounded-full object-cover border-4 border-[#C99B53]/20 shadow-md"
                                    />
                                    <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#C99B53] rounded-full flex items-center justify-center shadow">
                                        <BookOpen size={10} className="text-white" />
                                    </span>
                                </div>
                                <div>
                                    <p className="font-serif font-bold text-[#261E14] text-base leading-none">{ARTICLE.author.name}</p>
                                    <p className="text-[10px] font-bold text-[#C99B53] uppercase tracking-widest mt-1">{ARTICLE.author.role}</p>
                                </div>
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    Mendokumentasikan dan mempublikasikan perjalanan seni budaya Sanggar Paiketan Swara kepada khalayak luas.
                                </p>
                            </div>
                        </div>

                        {/* Read Also */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#C99B53]" />
                                <h3 className="text-xs font-bold text-[#261E14] uppercase tracking-widest">Baca Juga</h3>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {RELATED_ARTICLES.map((rel, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => changePage('news')}
                                        className="w-full flex items-start gap-3 p-4 hover:bg-[#FAF6F0] transition-colors cursor-pointer text-left group"
                                    >
                                        <div className="w-16 h-14 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                                            <img src={rel.image} alt={rel.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <span className="text-[9px] font-bold text-[#C99B53] uppercase tracking-wider">{rel.tag}</span>
                                            <p className="text-xs font-semibold text-[#261E14] leading-snug line-clamp-2 font-serif group-hover:text-[#C99B53] transition-colors">
                                                {rel.title}
                                            </p>
                                            <p className="text-[10px] text-gray-400">{rel.date}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* CTA Card */}
                        <div className="relative bg-[#1A2F1C] rounded-2xl overflow-hidden shadow-lg">
                            {/* Decorative circles */}
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
                                <button
                                    onClick={() => changePage('reservation')}
                                    className="w-full py-3 bg-[#C99B53] hover:bg-[#B7863F] text-[#261E14] font-bold text-xs rounded-xl shadow transition-all duration-200 cursor-pointer uppercase tracking-wider"
                                >
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
