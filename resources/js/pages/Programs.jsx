import React from 'react';
import { Clock, Users, Check, MessageSquare, BookOpen, Heart, Shield, UsersRound, School, Landmark, Home, Compass, UserCheck, Briefcase } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export default function Programs({ changePage, content }) {
    const targets = [
        { icon: <School className="w-5 h-5" />, label: "Siswa Sekolah" },
        { icon: <Landmark className="w-5 h-5" />, label: "Mahasiswa" },
        { icon: <Home className="w-5 h-5" />, label: "Keluarga" },
        { icon: <UsersRound className="w-5 h-5" />, label: "Komunitas" },
        { icon: <Compass className="w-5 h-5" />, label: "Wisatawan Nusantara" },
        { icon: <Compass className="w-5 h-5" />, label: "Wisatawan Mancanegara" },
        { icon: <BookOpen className="w-5 h-5" />, label: "Kelompok Studi Budaya" },
        { icon: <Briefcase className="w-5 h-5" />, label: "Perusahaan / Organisasi" }
    ];

    const packageDetails = [
        {
            num: "1",
            title: "Pengalaman Gamelan Bali",
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
            customBtn: false
        },
        {
            num: "2",
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
            customBtn: false
        },
        {
            num: "3",
            title: "Gamelan dan Tari Bali",
            desc: "Pengalaman terpadu bagi peserta yang ingin mengenal dua unsur penting seni pertunjukan Bali dalam satu kunjungan.",
            activities: [
                "Penyambutan dan pengenalan budaya",
                "Demonstrasi gamelan dan tari",
                "Praktik gamelan",
                "Praktik gerakan tari",
                "Kolaborasi atau pertunjukan penutup",
                "Dokumentasi bersama"
            ],
            duration: "Disesuaikan",
            capacity: "10 - 30 peserta",
            btnLabel: "Minta Program Khusus",
            customBtn: true
        }
    ];

    const customNeeds = [
        "Kunjungan sekolah/perguruan tinggi",
        "Lokakarya seni budaya",
        "Rombongan wisata",
        "Kegiatan komunitas",
        "Pertunjukan acara tertentu",
        "Program pengenalan budaya Bali",
        "Dokumentasi/produksi konten"
    ];

    return (
        <div className="bg-[#FAF6F0] min-h-screen">
            
            {/* HERO BANNER */}
            <section className="relative py-32 md:py-40 pb-28 md:pb-36 lg:pb-44 flex items-center justify-center overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ 
                        backgroundImage: `url('${
                            content('program_banner', 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?q=80&w=1600&auto=format&fit=crop').startsWith('http') || content('program_banner', 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?q=80&w=1600&auto=format&fit=crop').startsWith('/')
                                ? content('program_banner', 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?q=80&w=1600&auto=format&fit=crop')
                                : `/storage/${content('program_banner')}`
                        }')` 
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#1C150C]/95 via-[#261E14]/85 to-[#261E14]/40" />

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-12 space-y-6">
                    <span className="text-xs font-bold tracking-widest text-[#C99B53] uppercase block">
                        — PROGRAM UTAMA
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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                    
                    {/* Left: About Program */}
                    <ScrollReveal className="lg:col-span-7 flex flex-col justify-center space-y-8" distance="40px">
                        <div className="space-y-4">
                            <span className="text-xs font-bold tracking-widest text-[#C99B53] uppercase block">
                                — PILAR PROGRAM
                            </span>
                            <h2 className="text-3xl font-serif text-[#261E14] font-bold">
                                Tentang Program Kami
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-sans">
                                Di Sanggar Paiketan Swara, pengunjung tidak hanya menyaksikan pertunjukan. Peserta dapat mendengarkan cerita budaya, mengenal instrumen gamelan, mempelajari gerakan dasar tari, serta mencoba berkarya bersama para pelaku seni. Setiap kegiatan dirancang untuk menghormati nilai budaya Bali dengan cara yang edukatif dan kolaboratif.
                            </p>
                        </div>

                        {/* 4 Pillars Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-[#C99B53]/20 text-[#C99B53] shrink-0">
                                    <UserCheck size={18} />
                                </div>
                                <div>
                                    <h4 className="font-serif font-bold text-[#261E14]">Interaktif & Partisipatif</h4>
                                    <p className="text-xs text-gray-500 mt-1">Peserta terlibat langsung dalam seluruh rangkaian kegiatan pelatihan.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-[#C99B53]/20 text-[#C99B53] shrink-0">
                                    <BookOpen size={18} />
                                </div>
                                <div>
                                    <h4 className="font-serif font-bold text-[#261E14]">Edukasi Bermakna</h4>
                                    <p className="text-xs text-gray-500 mt-1">Menyampaikan filosofi dan sejarah di balik setiap kesenian.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-[#C99B53]/20 text-[#C99B53] shrink-0">
                                    <Shield size={18} />
                                </div>
                                <div>
                                    <h4 className="font-serif font-bold text-[#261E14]">Autentik & Berbudaya</h4>
                                    <p className="text-xs text-gray-500 mt-1">Dipandu langsung oleh praktisi seni lokal yang merawat tradisi.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-[#C99B53]/20 text-[#C99B53] shrink-0">
                                    <Heart size={18} />
                                </div>
                                <div>
                                    <h4 className="font-serif font-bold text-[#261E14]">Dikelola Lokal</h4>
                                    <p className="text-xs text-gray-500 mt-1">Seluruh pendapatan dialokasikan untuk kelestarian sanggar dan masyarakat Bantas.</p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Right: Targets Dark Green Box */}
                    <ScrollReveal className="lg:col-span-5 flex" delay={200} distance="40px">
                        <div className="bg-[#1A2F1C] text-[#FAF6F0] rounded-2xl p-8 border border-emerald-950/20 shadow-xl flex flex-col justify-center space-y-6 w-full">
                            <div className="text-center">
                                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#C99B53] mb-2">
                                    Untuk Siapa Program Ini?
                                </h3>
                                <p className="text-xs text-gray-300">
                                    Fleksibel untuk berbagai kelompok dan tingkat kemahiran.
                                </p>
                            </div>
                            <div className="h-[1px] bg-emerald-900 w-full" />
                            <div className="grid grid-cols-2 gap-4">
                                {targets.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/30 hover:border-[#C99B53]/40 transition-colors duration-200">
                                        <span className="text-[#C99B53]">{item.icon}</span>
                                        <span className="text-xs font-sans font-medium text-gray-200">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* DETAILED PACKAGES SECTION */}
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
                                    className="bg-[#FAF6F0] rounded-2xl border border-gray-100 p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 group w-full"
                                >
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center">
                                            <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-[#C99B53] text-[#261E14] font-serif font-bold text-sm shadow-sm">
                                                {pkg.num}
                                            </span>
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#261E14] tracking-wide">
                                            {pkg.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                                            {pkg.desc}
                                        </p>
                                        
                                        <div className="h-[1px] bg-gray-200 w-full" />
                                        
                                        <div>
                                            <h4 className="text-xs font-bold text-[#C99B53] tracking-widest uppercase mb-3">— AKTIVITAS:</h4>
                                            <ul className="space-y-2">
                                                {pkg.activities.map((act, aIdx) => (
                                                    <li key={aIdx} className="flex items-start gap-2.5 text-xs text-gray-600 font-sans">
                                                        <Check size={14} className="text-[#C99B53] shrink-0 mt-0.5" />
                                                        <span>{act}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-dashed border-gray-200 space-y-5">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <Clock size={16} className="text-[#C99B53]" />
                                                <span>{pkg.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500 text-right justify-end">
                                                <Users size={16} className="text-[#C99B53]" />
                                                <span>{pkg.capacity}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => changePage('reservation')}
                                            className={`w-full py-3 text-center font-bold text-xs rounded-md shadow-sm transition-all duration-200 cursor-pointer ${
                                                pkg.customBtn
                                                    ? 'border border-[#C99B53] text-[#C99B53] hover:bg-[#C99B53]/10'
                                                    : 'bg-[#261E14] text-white hover:bg-black'
                                            }`}
                                        >
                                            {pkg.btnLabel}
                                        </button>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                    <p className="text-center text-xs text-gray-400 mt-10 italic">
                        * Harga dapat berubah sewaktu-waktu. Hubungi kami untuk informasi terbaru dan kebutuhan khusus.
                    </p>
                </div>
            </section>

            {/* CUSTOM PROGRAMS SECTION */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left: Custom checklist */}
                    <ScrollReveal className="lg:col-span-7 space-y-6" distance="40px">
                        <span className="text-xs font-bold tracking-widest text-[#C99B53] uppercase block">
                            — PROGRAM KHUSUS (CUSTOM)
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
                        <div className="bg-white rounded-2xl p-8 border border-[#C99B53]/25 shadow-md flex flex-col items-center text-center space-y-5">
                            <div className="w-14 h-14 bg-[#FAF6F0] rounded-full border border-[#C99B53]/20 flex items-center justify-center text-[#C99B53] shadow-inner">
                                <MessageSquare size={26} />
                            </div>
                            <h3 className="text-lg font-serif font-bold text-[#261E14]">
                                Rencanakan Kunjungan Anda
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans">
                                Silakan sampaikan jumlah peserta, rentang usia, waktu kunjungan, dan tujuan kegiatan. Tim kami akan membantu menyiapkan program yang sesuai.
                            </p>
                            <button
                                onClick={() => changePage('reservation')}
                                className="w-full py-3 bg-[#261E14] hover:bg-black text-white text-xs font-bold rounded-lg shadow-sm transition-all duration-200 cursor-pointer"
                            >
                                Isi Formulir Program Khusus
                            </button>
                        </div>
                    </ScrollReveal>

                </div>
            </section>
        </div>
    );
}
