import React, { useState } from 'react';
import { Clock, Users, Check, MessageSquare, BookOpen, Heart, Shield, UsersRound, School, Landmark, Home, Compass, UserCheck, Briefcase, Award, Calendar, ChevronDown, Flag, GraduationCap, Globe, Building, Phone } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export default function Programs({ changePage, content }) {
    const [openFaq, setOpenFaq] = useState(null);

    const resolveImage = (key, def) => {
        const src = content(key, def);
        if (!src) return def || '';
        if (src.startsWith('http') || src.startsWith('/')) {
            return src;
        }
        return `/storage/${src}`;
    };

    const toggleFaq = (idx) => {
        setOpenFaq(openFaq === idx ? null : idx);
    };

    const packageDetails = [
        {
            num: "Paket A",
            title: "Pengenalan Gamelan Bali",
            desc: "Peserta diajak mengenal gamelan Bali, memahami fungsi beberapa instrumen, menyaksikan demonstrasi, dan mencoba memainkan pola sederhana bersama anggota sanggar.",
            activities: [
                "Pengenalan sanggar dan budaya Desa Bantas",
                "Pengenalan instrumen gamelan",
                "Demonstrasi oleh anggota sanggar",
                "Praktik teknik dasar",
                "Permainan gamelan secara berkelompok",
                "Dokumentasi bersama"
            ],
            duration: "60 - 90 menit",
            capacity: "10 - 30 peserta",
            btnLabel: "Pesan Paket Gamelan",
            thumbnail: "https://images.unsplash.com/photo-1513829096963-8a30ef68ad66?q=80&w=600&auto=format&fit=crop",
            icon: <Award className="w-5 h-5" />,
            customBtn: false
        },
        {
            num: "Paket B",
            title: "Pengalaman Tari Bali",
            desc: "Peserta diperkenalkan pada karakteristik tari Bali, mulai dari posisi tubuh, gerak tangan, langkah, hingga ekspresi dasar (nyeledet).",
            activities: [
                "Pengenalan seni tari Bali",
                "Penjelasan makna dan karakter tari",
                "Demonstrasi oleh penari sanggar",
                "Latihan gerakan dasar",
                "Praktik singkat secara berkelompok",
                "Dokumentasi bersama"
            ],
            duration: "60 - 90 menit",
            capacity: "10 - 30 peserta",
            btnLabel: "Pesan Paket Tari",
            thumbnail: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop",
            icon: <UserCheck className="w-5 h-5" />,
            customBtn: false
        },
        {
            num: "Paket C",
            title: "Kemah Budaya Bali",
            desc: "Pengalaman terpadu bagi peserta yang ingin mengenal dua unsur penting seni pertunjukan Bali dalam satu kunjungan menginap yang mendalam.",
            activities: [
                "Penyambutan dan pengenalan budaya",
                "Demonstrasi gamelan dan tari",
                "Praktik gamelan intensif",
                "Praktik gerakan tari intensif",
                "Kolaborasi atau pertunjukan malam penutup",
                "Dokumentasi bersama"
            ],
            duration: "2 Hari 1 Malam",
            capacity: "15 - 40 peserta",
            btnLabel: "Minta Program Khusus",
            thumbnail: "https://images.unsplash.com/photo-1537884944318-390069bb8665?q=80&w=600&auto=format&fit=crop",
            icon: <UsersRound className="w-5 h-5" />,
            customBtn: true
        }
    ];

    const customNeeds = [
        "Kunjungan sekolah/perguruan tinggi",
        "Lokakarya seni budaya",
        "Rombongan wisata nasional & mancanegara",
        "Kegiatan komunitas & reuni keluarga",
        "Pertunjukan acara privat khusus",
        "Program pengenalan budaya Bali intensif",
        "Dokumentasi/produksi konten akademis"
    ];

    const faqs = [
        {
            q: "Apakah perlu memiliki keahlian musik atau tari sebelumnya?",
            a: "Tidak perlu. Seluruh program dirancang dari tingkat paling dasar untuk pemula, sehingga semua peserta dari segala latar belakang dapat menikmatinya."
        },
        {
            q: "Berapa kapasitas minimum dan maksimal untuk rombongan?",
            a: "Rombongan kecil minimal 10 orang dan rombongan besar maksimal 50 orang per sesi. Silakan hubungi kami jika jumlah peserta Anda di luar rentang tersebut."
        },
        {
            q: "Apakah diperbolehkan membawa kamera sendiri?",
            a: "Sangat diperbolehkan! Anda bebas mengambil foto atau video selama sesi latihan sebagai dokumentasi pribadi."
        },
        {
            q: "Apakah program ini dapat dipandu dalam bahasa Inggris?",
            a: "Ya, kami menyediakan instruktur pemandu bilingual (Indonesia & Inggris) untuk melayani tamu mancanegara."
        },
        {
            q: "Apakah tersedia area parkir untuk kendaraan bus pariwisata?",
            a: "Ya, di lokasi sanggar Desa Bantas tersedia area parkir luas yang dapat menampung kendaraan besar seperti bus pariwisata."
        },
        {
            q: "Apakah ada batasan usia untuk peserta program?",
            a: "Program kami terbuka untuk segala usia, mulai dari anak-anak usia sekolah dasar, remaja, hingga dewasa dan lansia."
        },
        {
            q: "Bagaimana cara melakukan pembayaran dan konfirmasi pemesanan?",
            a: "Pembayaran dapat dilakukan melalui transfer bank setelah detail program disepakati. Konfirmasi final akan dikirimkan lewat email atau WhatsApp resmi sanggar."
        },
        {
            q: "Apakah jadwal kunjungan dapat disesuaikan di luar hari kerja?",
            a: "Bisa. Kami melayani kunjungan di hari kerja maupun akhir pekan (sabtu & minggu) dengan perjanjian terlebih dahulu melalui formulir reservasi."
        }
    ];

    return (
        <div className="bg-[#FAF6F0] min-h-screen">
            
            {/* HERO BANNER */}
            <section className="relative py-32 md:py-40 pb-28 md:pb-36 lg:pb-44 flex items-center justify-center overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${resolveImage('program_banner', 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?q=80&w=1600&auto=format&fit=crop')}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#1C150C]/95 via-[#261E14]/85 to-[#261E14]/40" />

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-12 space-y-6">
                    <span className="text-xs font-bold tracking-widest text-[#C99B53] uppercase block">
                        — PROGRAM UTAMA —
                    </span>
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white font-bold leading-tight">
                        Program Edu-Wisata
                    </h1>
                    <div className="h-[2px] w-20 bg-[#C99B53] mx-auto" />
                    <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Belajar, Berinteraksi, dan Berkarya Bersama. Program edu-wisata Sanggar Paiketan Swara dirancang untuk memberikan pengalaman budaya yang autentik, edukatif, partisipatif, dan menyenangkan bagi semua usia.
                    </p>
                </div>

                {/* SVG Wave Divider */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
                    <svg 
                        viewBox="0 0 1200 120" 
                        preserveAspectRatio="none" 
                        className="relative block w-full h-[60px] md:h-[100px] text-[#FAF6F0]"
                        fill="currentColor"
                    >
                        <path d="M0,60 C320,130 880,-10 1200,60 L1200,120 L0,120 Z"></path>
                    </svg>
                </div>
            </section>

            {/* INTRO & TARGET AUDIENCE SECTION */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left: About Program */}
                    <ScrollReveal className="lg:col-span-7 flex flex-col justify-center space-y-8" distance="40px">
                        <div className="space-y-4">
                            <span className="text-xs font-bold tracking-widest text-[#C99B53] uppercase block">
                                — PILAR PROGRAM —
                            </span>
                            <h2 className="text-3xl font-serif text-[#261E14] font-bold">
                                Tentang Program Kami
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-sans">
                                Di Sanggar Paiketan Swara, pengunjung tidak hanya menyaksikan pertunjukan. Peserta dapat mendengarkan cerita budaya, mengenal instrumen gamelan, mempelajari gerakan dasar tari, serta mencoba berkarya bersama para pelaku seni. Setiap kegiatan dirancang untuk menghormati nilai budaya Bali dengan cara yang edukatif dan kolaboratif.
                            </p>
                        </div>

                        {/* 4 Pillars Grid (Horizontal Layout matching mockup) */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200/60">
                            <div className="flex flex-col items-center text-center space-y-2.5">
                                <Award className="w-6 h-6 text-[#C99B53]" />
                                <span className="text-[10px] sm:text-xs font-serif font-bold text-[#261E14] leading-snug">Kurikulum Terstandar</span>
                            </div>
                            <div className="flex flex-col items-center text-center space-y-2.5">
                                <UserCheck className="w-6 h-6 text-[#C99B53]" />
                                <span className="text-[10px] sm:text-xs font-serif font-bold text-[#261E14] leading-snug">Pengajar Berpengalaman</span>
                            </div>
                            <div className="flex flex-col items-center text-center space-y-2.5">
                                <UsersRound className="w-6 h-6 text-[#C99B53]" />
                                <span className="text-[10px] sm:text-xs font-serif font-bold text-[#261E14] leading-snug">Aksesibilitas & Keterbukaan</span>
                            </div>
                            <div className="flex flex-col items-center text-center space-y-2.5">
                                <Heart className="w-6 h-6 text-[#C99B53]" />
                                <span className="text-[10px] sm:text-xs font-serif font-bold text-[#261E14] leading-snug">Kolaborasi Masyarakat Lokal</span>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Right: Targets Dark Image Box with Overlay */}
                    <ScrollReveal className="lg:col-span-5 flex flex-col" delay={200} distance="40px">
                        <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-lg group w-full">
                            <img
                                src="https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800&auto=format&fit=crop"
                                alt="Edu-Wisata Sanggar"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        {/* Translucent overlay matching mockup but pushed lower overlapping the bottom border */}
                        <div className="bg-[#261E14]/90 backdrop-blur-md rounded-2xl p-5 border border-white/5 shadow-2xl space-y-3.5 -mt-28 mx-4 relative z-10">
                            <h4 className="font-serif font-bold text-[#C99B53] text-sm tracking-wide text-center">
                                Sebaran Peserta Edu-Wisata Kami
                            </h4>
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    { label: "Sekolah Dasar", icon: <School size={14} className="text-[#C99B53]" /> },
                                    { label: "Sekolah Menengah", icon: <GraduationCap size={14} className="text-[#C99B53]" /> },
                                    { label: "Perguruan Tinggi", icon: <Landmark size={14} className="text-[#C99B53]" /> },
                                    { label: "Keluarga & Umum", icon: <Users size={14} className="text-[#C99B53]" /> },
                                    { label: "Wisatawan Domestik", icon: <Compass size={14} className="text-[#C99B53]" /> },
                                    { label: "Wisatawan Mancanegara", icon: <Globe size={14} className="text-[#C99B53]" /> },
                                    { label: "Komunitas Budaya", icon: <Heart size={14} className="text-[#C99B53]" /> },
                                    { label: "Instansi Pemerintah", icon: <Building size={14} className="text-[#C99B53]" /> }
                                ].map((target, idx) => (
                                    <div key={idx} className="flex items-center gap-2.5 p-2 bg-white/5 rounded-lg border border-white/5 text-[11px] text-gray-200">
                                        {target.icon}
                                        <span className="font-sans font-semibold leading-none">{target.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* DETAILED PACKAGES SECTION */}
            <section className="py-24 bg-white border-t border-b border-[#C99B53]/15">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal className="text-center mb-16 space-y-3" distance="30px">
                        <span className="text-xs font-bold tracking-widest text-[#C99B53] uppercase block">
                            — PILIHAN LAYANAN —
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-serif text-[#261E14] font-bold">
                            Paket Edu-Wisata Unggulan
                        </h2>
                        <div className="h-[2px] w-20 bg-[#C99B53] mx-auto mt-2" />
                    </ScrollReveal>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                        {packageDetails.map((pkg, idx) => (
                            <ScrollReveal
                                key={idx}
                                delay={idx * 150}
                                distance="40px"
                                className="flex"
                            >
                                <div
                                    className="bg-white rounded-2xl border border-gray-100 flex flex-col justify-between shadow-md hover:shadow-lg transition-all duration-300 group w-full overflow-hidden"
                                >
                                    <div className="relative">
                                        <div className="aspect-[16/10] overflow-hidden bg-gray-900">
                                            <img src={pkg.thumbnail} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        </div>
                                        {/* Corner Badge */}
                                        <span className="absolute top-4 left-4 bg-[#C99B53] text-[#261E14] text-[9px] font-bold tracking-wider px-3.5 py-1 rounded-md uppercase shadow-sm">
                                            {pkg.num}
                                        </span>
                                        {/* Circular Badge Overlap */}
                                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#1A2F1C] border-4 border-white flex items-center justify-center text-[#C99B53] shadow-md z-10">
                                            {pkg.icon}
                                        </div>
                                    </div>

                                    <div className="p-8 pt-10 flex-grow flex flex-col justify-between">
                                        <div className="space-y-4">
                                            <h3 className="text-xl font-serif font-bold text-[#261E14] tracking-wide">
                                                {pkg.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans">
                                                {pkg.desc}
                                            </p>
                                            
                                            <div className="h-[1px] bg-gray-100 w-full" />
                                            
                                            <div>
                                                <h4 className="text-xs font-bold text-[#C99B53] tracking-widest uppercase mb-3">— MATERI UTAMA:</h4>
                                                <ul className="space-y-2">
                                                    {pkg.activities.slice(0, 5).map((act, aIdx) => (
                                                        <li key={aIdx} className="flex items-start gap-2.5 text-xs text-gray-600 font-sans">
                                                            <span className="text-[#C99B53]">•</span>
                                                            <span>{act}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="mt-8 pt-6 border-t border-dashed border-gray-200 space-y-5">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="flex flex-col space-y-0.5">
                                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Durasi</span>
                                                    <span className="text-xs text-gray-700 font-semibold font-serif">{pkg.duration}</span>
                                                </div>
                                                <div className="flex flex-col space-y-0.5 text-right">
                                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Peserta</span>
                                                    <span className="text-xs text-gray-700 font-semibold font-serif">{pkg.capacity}</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => changePage('reservation')}
                                                className={`w-full py-3.5 text-center font-bold text-xs rounded-xl shadow-sm transition-all duration-200 cursor-pointer ${
                                                    pkg.customBtn
                                                        ? 'bg-[#C99B53] text-[#261E14] hover:bg-[#B7863F]'
                                                        : 'bg-[#1A2F1C] text-white hover:bg-black'
                                                }`}
                                            >
                                                {pkg.btnLabel}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                    <p className="text-center text-xs text-gray-400 mt-10 italic">
                        * Silakan hubungi kami untuk menyesuaikan pilihan durasi, kapasitas peserta, dan kustomisasi aktivitas khusus.
                    </p>
                </div>
            </section>

            {/* CUSTOM PROGRAMS SECTION */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left: Custom checklist */}
                    <ScrollReveal className="lg:col-span-7 space-y-6" distance="40px">
                        <span className="text-xs font-bold tracking-widest text-[#C99B53] uppercase block">
                            — PROGRAM KHUSUS (CUSTOM) —
                        </span>
                        <h2 className="text-3xl font-serif text-[#261E14] font-bold">
                            Ingin Merencanakan Program Sendiri?
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 font-sans leading-relaxed">
                            Kami melayani penyusunan program edu-wisata atau kegiatan seni budaya khusus yang disesuaikan secara personal dengan kebutuhan rombongan Anda, antara lain untuk:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-2">
                            {customNeeds.map((need, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-gray-700 font-sans">
                                    <div className="w-5 h-5 rounded-full bg-[#C99B53]/15 flex items-center justify-center text-[#C99B53] shrink-0">
                                        <Check size={12} />
                                    </div>
                                    <span>{need}</span>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>

                    {/* Right: CTA box */}
                    <ScrollReveal className="lg:col-span-5" delay={200} distance="40px">
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-md flex flex-col items-start space-y-5">
                            <div className="w-14 h-14 bg-[#FAF6F0] rounded-2xl flex items-center justify-center text-[#C99B53] shadow-inner">
                                <MessageSquare size={26} />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-[#261E14]">
                                Tanya Paket Custom Anda
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans">
                                Silakan sampaikan jumlah peserta, rentang usia, waktu kunjungan, dan tujuan kegiatan. Tim kami akan membantu menyiapkan program yang sesuai.
                            </p>
                            <button
                                onClick={() => changePage('reservation')}
                                className="w-full py-4 bg-[#261E14] hover:bg-black text-white text-xs font-bold rounded-xl shadow-sm transition-all duration-200 cursor-pointer uppercase tracking-wider"
                            >
                                Diskusi dengan Pengelola
                            </button>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="py-24 bg-white border-t border-[#C99B53]/15">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal className="text-center mb-16 space-y-3" distance="30px">
                        <span className="text-xs font-bold tracking-widest text-[#C99B53] uppercase block">
                            — TANYA JAWAB —
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-serif text-[#261E14] font-bold">
                            Pertanyaan yang Sering Diajukan
                        </h2>
                        <div className="h-[2px] w-20 bg-[#C99B53] mx-auto mt-2" />
                    </ScrollReveal>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <ScrollReveal key={idx} delay={idx * 50} distance="20px">
                                <div className="border border-gray-100 rounded-2xl overflow-hidden bg-[#FAF6F0]/40">
                                    <button
                                        onClick={() => toggleFaq(idx)}
                                        className="w-full py-5 px-6 text-left font-serif font-semibold text-[#261E14] hover:text-[#C99B53] flex justify-between items-center transition-colors duration-200 cursor-pointer text-sm sm:text-base"
                                    >
                                        <span>{faq.q}</span>
                                        <ChevronDown size={18} className={`text-gray-400 transform transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-[#C99B53]' : ''}`} />
                                    </button>
                                    <div
                                        className={`transition-all duration-300 overflow-hidden ${
                                            openFaq === idx ? 'max-h-40 border-t border-gray-100/50' : 'max-h-0'
                                        }`}
                                    >
                                        <p className="p-6 text-xs sm:text-sm text-gray-500 leading-relaxed font-sans bg-white">
                                            {faq.a}
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION: BOTTOM CTA BANNER */}
            <section className="relative py-28 overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${resolveImage('home_cta_bg', 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=1600&auto=format&fit=crop')}')` }}
                />
                <div className="absolute inset-0 bg-black/75" />
                
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-6">
                    <h2 className="text-3xl sm:text-5xl font-serif text-[#FAF6F0] font-bold leading-tight" dangerouslySetInnerHTML={{ __html: content('home_cta_title', 'Mari <span class="font-serif italic font-normal text-[#C99B53]">Mengenal Budaya Bali</span> Lebih Dekat') }} />
                    <p className="text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed font-sans">
                        {content('home_cta_desc', 'Hubungi kami hari ini untuk merencanakan kunjungan, pementasan, atau kolaborasi seni yang berkesan bersama kami.')}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-start gap-4 pt-4">
                        <button
                            onClick={() => changePage('contact')}
                            className="w-full sm:w-auto px-8 py-3.5 bg-[#C99B53] hover:bg-[#B7863F] text-[#261E14] font-bold text-xs rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer uppercase tracking-wider"
                        >
                            Hubungi Kami
                        </button>
                        <a
                            href="https://wa.me/6281234567890"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-8 py-3.5 border border-[#C99B53] text-[#C99B53] hover:bg-[#C99B53]/15 font-bold text-xs rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
                        >
                            <Phone size={12} />
                            <span>Hubungi WhatsApp</span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
