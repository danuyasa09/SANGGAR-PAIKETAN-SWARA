import React, { useState, useEffect } from 'react';
import { Clock, Users, Check, MessageSquare, BookOpen, Heart, Shield, UsersRound, School, Landmark, Home, Compass, UserCheck, Briefcase, Award, Calendar, Flag, GraduationCap, Globe, Building, Phone, ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import axios from '../lib/axios';

export default function Programs({ changePage, content }) {
    const [packageDetails, setPackageDetails] = useState([]);
    const [loadingPackages, setLoadingPackages] = useState(true);

    const packageIcons = [
        <Award className="w-5 h-5" />,
        <UserCheck className="w-5 h-5" />,
        <UsersRound className="w-5 h-5" />,
        <GraduationCap className="w-5 h-5" />,
        <Globe className="w-5 h-5" />,
    ];

    useEffect(() => {
        axios.get('/api/programs')
            .then(res => {
                const mapped = res.data.map((prog, idx) => ({
                    id: prog.id,
                    num: prog.code || `Paket ${idx + 1}`,
                    title: prog.title,
                    desc: prog.description,
                    activities: prog.activities || [],
                    duration: prog.duration,
                    capacity: prog.capacity,
                    price: prog.price || 'Hubungi kami untuk penawaran',
                    btnLabel: prog.btn_label || 'Pesan Reservasi',
                    thumbnail: prog.thumbnail_url || 'https://images.unsplash.com/photo-1513829096963-8a30ef68ad66?q=80&w=600&auto=format&fit=crop',
                    icon: packageIcons[idx % packageIcons.length],
                    customBtn: prog.is_custom_btn,
                }));
                setPackageDetails(mapped);
            })
            .catch(() => {
                // Fallback sesuai docx
                setPackageDetails([
                    {
                        num: "Paket 1", title: "Pengalaman Gamelan Bali",
                        desc: "Peserta diajak mengenal gamelan Bali, memahami fungsi beberapa instrumen, menyaksikan demonstrasi, dan mencoba memainkan pola sederhana bersama anggota sanggar.",
                        activities: [
                            "Pengenalan sanggar dan budaya Desa Bantas",
                            "Pengenalan instrumen gamelan",
                            "Demonstrasi oleh anggota sanggar",
                            "Praktik teknik dasar",
                            "Permainan gamelan secara berkelompok",
                            "Dokumentasi bersama"
                        ],
                        duration: "60–90 menit", capacity: "10–30 peserta", price: "Hubungi kami untuk penawaran", btnLabel: "Pesan Reservasi",
                        thumbnail: "https://images.unsplash.com/photo-1513829096963-8a30ef68ad66?q=80&w=600&auto=format&fit=crop",
                        icon: <Award className="w-5 h-5" />, customBtn: false
                    },
                    {
                        num: "Paket 2", title: "Pengalaman Tari Bali",
                        desc: "Peserta diperkenalkan pada karakteristik tari Bali, mulai dari posisi tubuh, gerak tangan, langkah, hingga ekspresi dasar.",
                        activities: [
                            "Pengenalan seni tari Bali",
                            "Penjelasan makna dan karakter tari",
                            "Demonstrasi oleh penari sanggar",
                            "Latihan gerakan dasar",
                            "Praktik singkat secara berkelompok",
                            "Dokumentasi bersama"
                        ],
                        duration: "60–90 menit", capacity: "10–30 peserta", price: "Hubungi kami untuk penawaran", btnLabel: "Pesan Reservasi",
                        thumbnail: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop",
                        icon: <UserCheck className="w-5 h-5" />, customBtn: false
                    },
                    {
                        num: "Paket 3", title: "Gamelan dan Tari Bali",
                        desc: "Pengalaman terpadu bagi peserta yang ingin mengenal dua unsur penting seni pertunjukan Bali dalam satu kunjungan.",
                        activities: [
                            "Penyambutan dan pengenalan budaya",
                            "Demonstrasi gamelan dan tari",
                            "Praktik gamelan",
                            "Praktik gerakan tari",
                            "Kolaborasi atau pertunjukan penutup",
                            "Dokumentasi bersama"
                        ],
                        duration: "Disesuaikan dengan kebutuhan kelompok", capacity: "10–30 peserta", price: "Hubungi kami untuk penawaran", btnLabel: "Pesan Reservasi",
                        thumbnail: "https://images.unsplash.com/photo-1537884944318-390069bb8665?q=80&w=600&auto=format&fit=crop",
                        icon: <UsersRound className="w-5 h-5" />, customBtn: true
                    }
                ]);
            })
            .finally(() => setLoadingPackages(false));
    }, []);

    const targetAudiences = [
        { icon: <School className="w-5 h-5 text-[#C99B53]" />, label: "Siswa sekolah" },
        { icon: <GraduationCap className="w-5 h-5 text-[#C99B53]" />, label: "Mahasiswa" },
        { icon: <Home className="w-5 h-5 text-[#C99B53]" />, label: "Keluarga" },
        { icon: <UsersRound className="w-5 h-5 text-[#C99B53]" />, label: "Komunitas" },
        { icon: <Compass className="w-5 h-5 text-[#C99B53]" />, label: "Wisatawan nusantara" },
        { icon: <Globe className="w-5 h-5 text-[#C99B53]" />, label: "Wisatawan mancanegara" },
        { icon: <BookOpen className="w-5 h-5 text-[#C99B53]" />, label: "Kelompok studi budaya" },
        { icon: <Building className="w-5 h-5 text-[#C99B53]" />, label: "Perusahaan atau organisasi" }
    ];

    const customPrograms = [
        "Kunjungan sekolah dan perguruan tinggi",
        "Lokakarya seni dan budaya",
        "Rombongan wisata",
        "Kegiatan komunitas",
        "Pertunjukan pada acara tertentu",
        "Program pengenalan budaya Bali",
        "Dokumentasi dan produksi konten budaya"
    ];

    return (
        <div className="bg-[#FAF6F0] min-h-screen font-sans">
            
            {/* HERO HEADER */}
            <section className="relative py-32 md:py-44 flex items-center justify-center overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${content('programs_banner_image', '/images/programs_banner.png').startsWith('http') || content('programs_banner_image', '/images/programs_banner.png').startsWith('/') ? content('programs_banner_image', '/images/programs_banner.png') : `/storage/${content('programs_banner_image', '/images/programs_banner.png')}`}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-[#FAF6F0]" />

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-12 space-y-6">
                    <span className="text-xs font-bold tracking-widest text-[#C99B53] uppercase block">
                        — EDU-WISATA SENI BUDAYA —
                    </span>
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white font-bold leading-tight">
                        {content('programs_hero_subtitle', 'Belajar Budaya Bali Bersama Pelaku Seni Lokal')}
                    </h1>
                    <div className="h-[2px] w-20 bg-[#C99B53] mx-auto" />
                    <p className="text-base sm:text-lg text-gray-200 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
                        {content('programs_hero_desc', 'Program edu-wisata Sanggar Paiketan Swara menghadirkan pengalaman belajar gamelan dan tari secara langsung. Peserta akan didampingi oleh anggota sanggar dalam suasana yang ramah dan interaktif.')}
                    </p>
                </div>
            </section>

            {/* TARGET PESERTA */}
            <section className="py-12 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal distance="20px" className="text-center mb-8">
                        <span className="text-[10px] font-bold tracking-widest text-[#C99B53] uppercase block">
                            — PESERTA PROGRAM —
                        </span>
                        <h3 className="text-xl sm:text-2xl font-serif text-[#261E14] font-bold mt-1">
                            Program Ini Cocok Untuk:
                        </h3>
                    </ScrollReveal>

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
                        {targetAudiences.map((aud, idx) => (
                            <ScrollReveal key={idx} delay={idx * 50} distance="20px" className="flex">
                                <div className="bg-[#FAF6F0]/60 hover:bg-[#FAF6F0] p-4 rounded-xl border border-gray-100 flex items-center gap-3 w-full transition-all">
                                    <div className="w-9 h-9 rounded-lg bg-white shadow-xs flex items-center justify-center shrink-0">
                                        {aud.icon}
                                    </div>
                                    <span className="text-xs font-bold text-[#261E14]">{aud.label}</span>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3 PAKET REGULER */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal distance="30px" className="text-center mb-16 space-y-2">
                    <span className="text-[10px] font-bold tracking-widest text-[#C99B53] uppercase block">
                        — PILIHAN PAKET —
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-serif text-[#261E14] font-bold">
                        Pilihan Paket Edu-Wisata
                    </h2>
                    <div className="h-[2px] w-20 bg-[#C99B53] mx-auto mt-2" />
                </ScrollReveal>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    {packageDetails.map((pkg, idx) => (
                        <ScrollReveal
                            key={pkg.id || idx}
                            delay={idx * 150}
                            distance="40px"
                            className="flex"
                        >
                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col w-full overflow-hidden group">
                                {/* Thumbnail */}
                                <div className="relative h-48 overflow-hidden bg-gray-900">
                                    <img
                                        src={pkg.thumbnail}
                                        alt={pkg.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    
                                    <div className="absolute top-4 left-4 bg-[#261E14]/90 text-[#FAF6F0] text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border border-[#C99B53]/30">
                                        {pkg.num}
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-serif font-bold text-[#261E14] leading-tight">
                                            {pkg.title}
                                        </h3>
                                        <p className="text-xs text-gray-600 leading-relaxed font-sans font-medium">
                                            {pkg.desc}
                                        </p>

                                        {/* Meta specs */}
                                        <div className="pt-2 pb-1 flex flex-wrap gap-2 text-[11px]">
                                            <span className="inline-flex items-center gap-1.5 bg-[#FAF6F0] text-[#261E14] px-3 py-1.5 rounded-lg font-bold border border-gray-200/60">
                                                <Clock size={12} className="text-[#C99B53]" />
                                                {pkg.duration}
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 bg-[#FAF6F0] text-[#261E14] px-3 py-1.5 rounded-lg font-bold border border-gray-200/60">
                                                <Users size={12} className="text-[#C99B53]" />
                                                {pkg.capacity}
                                            </span>
                                        </div>

                                        {/* Activities checklist */}
                                        <div className="pt-2 space-y-2">
                                            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                                                Rangkaian Kegiatan:
                                            </span>
                                            <ul className="space-y-2">
                                                {pkg.activities.map((act, aIdx) => (
                                                    <li key={aIdx} className="flex items-start gap-2 text-xs text-gray-700 font-medium">
                                                        <span className="w-4 h-4 rounded-full bg-[#C99B53]/15 flex items-center justify-center text-[#C99B53] shrink-0 mt-0.5">
                                                            <Check size={10} strokeWidth={3} />
                                                        </span>
                                                        <span>{act}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Bottom CTA */}
                                    <div className="pt-4 border-t border-gray-100 space-y-3">
                                        <div className="text-center">
                                            <span className="text-[10px] text-gray-400 uppercase font-bold block">Biaya Program</span>
                                            <span className="text-xs font-serif italic text-gray-700 font-bold">{pkg.price}</span>
                                        </div>
                                        <button
                                            onClick={() => changePage('reservation')}
                                            className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm bg-[#C99B53] hover:bg-[#B7863F] text-[#261E14]"
                                        >
                                            {pkg.btnLabel}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* PROGRAM KHUSUS */}
            <section className="py-20 bg-white border-t border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <ScrollReveal className="lg:col-span-6 space-y-6" distance="30px">
                            <span className="text-xs font-bold tracking-widest text-[#C99B53] uppercase block">
                                — PROGRAM KHUSUS —
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-serif text-[#261E14] font-bold leading-tight">
                                Program Khusus & Kustom
                            </h2>
                            <div className="h-[2px] w-16 bg-[#C99B53]" />
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans font-medium">
                                Kami dapat membantu menyusun kegiatan khusus yang disesuaikan dengan kebutuhan institusi, rombongan, atau agenda pembelajaran Anda.
                            </p>

                            <div className="space-y-2.5 pt-2">
                                {customPrograms.map((prog, idx) => (
                                    <div key={idx} className="flex items-center gap-3 text-xs text-gray-800 font-semibold bg-[#FAF6F0] px-4 py-2.5 rounded-xl border border-gray-100">
                                        <span className="w-5 h-5 rounded-full bg-[#C99B53] text-[#261E14] flex items-center justify-center text-[10px] font-bold shrink-0">
                                            ✓
                                        </span>
                                        <span>{prog}</span>
                                    </div>
                                ))}
                            </div>

                            <p className="text-xs text-gray-500 italic pt-2">
                                Silakan sampaikan jumlah peserta, rentang usia, waktu kunjungan, dan tujuan kegiatan. Tim kami akan membantu menyiapkan program yang sesuai.
                            </p>

                            <button
                                onClick={() => changePage('contact')}
                                className="px-8 py-3.5 bg-[#C99B53] hover:bg-[#B7863F] text-[#261E14] font-bold text-xs rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer uppercase tracking-wider inline-flex items-center gap-2"
                            >
                                <span>Konsultasikan Program</span>
                                <ArrowRight size={14} />
                            </button>
                        </ScrollReveal>

                        <ScrollReveal className="lg:col-span-6" delay={200} distance="30px">
                            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                                <img
                                    src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop"
                                    alt="Program Edu-Wisata Khusus"
                                    className="w-full h-auto object-cover aspect-[4/3]"
                                />
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

        </div>
    );
}
