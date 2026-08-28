import React, { useState, useRef } from 'react';
import { Landmark, GraduationCap, Home, Plane, Bed, Users, Newspaper, Heart, Handshake, Check } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export default function Partnership({ content }) {
    const [submitted, setSubmitted] = useState(false);
    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        institution: '',
        email: '',
        phone: '',
        partnershipType: '',
        notes: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setSubmitted(true);
        }, 500);
    };

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const partners = [
        { icon: <Landmark size={20} />, title: "Pemerintah Desa dan Daerah" },
        { icon: <GraduationCap size={20} />, title: "Sekolah dan Perguruan Tinggi" },
        { icon: <Home size={20} />, title: "Desa Wisata" },
        { icon: <Plane size={20} />, title: "Biro Perjalanan" },
        { icon: <Bed size={20} />, title: "Hotel dan Industri Pariwisata" },
        { icon: <Users size={20} />, title: "Komunitas Seni dan Budaya" },
        { icon: <Newspaper size={20} />, title: "Media" },
        { icon: <Heart size={20} />, title: "Lembaga Sosial" },
        { icon: <Handshake size={20} />, title: "Mitra Program CSR" }
    ];

    const getBannerImage = () => {
        const banner = content('partnership_banner', '/images/partnership_banner.png');
        if (banner.startsWith('http') || banner.startsWith('/')) {
            return banner;
        }
    ];

    return (
        <div className="bg-[#FAF6F0] min-h-screen pb-20 font-sans">
            
            {/* HERO BANNER */}
            <section className="relative py-32 md:py-40 flex items-center justify-center overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${getBannerImage()}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-[#261E14]/30" />

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-12 space-y-6">
                    <h1 className="text-3xl sm:text-5xl font-serif text-white font-bold leading-tight tracking-wide">
                        {content('partnership_hero_title', 'Kemitraan & Kolaborasi Budaya')}
                    </h1>
                    <p className="text-sm sm:text-base text-gray-200 max-w-2xl mx-auto leading-relaxed whitespace-pre-wrap">
                        {content('partnership_hero_desc', 'Bergabunglah bersama Sanggar Paiketan Swara dalam misi melestarikan warisan seni budaya Bali melalui kemitraan strategis yang berkelanjutan.')}
                    </p>
                    <button 
                        onClick={scrollToForm}
                        className="px-8 py-3.5 bg-[#C99B53] hover:bg-[#B7863F] text-[#261E14] font-bold text-xs rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer uppercase tracking-wider"
                    >
                        Ajukan Kerja Sama
                    </button>
                </div>

                {/* SVG Curve Divider */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
                    <svg 
                        viewBox="0 0 1200 120" 
                        preserveAspectRatio="none" 
                        className="relative block w-full h-[35px] md:h-[50px] text-[#FAF6F0]"
                        fill="currentColor"
                    >
                        <path d="M0,0 C600,120 1200,0 1200,0 L1200,120 L0,120 Z"></path>
                    </svg>
                </div>
            </section>

            {/* MAIN CONTAINER */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                {/* SECTION: MITRA POTENSIAL */}
                <section className="space-y-12">
                    <div className="text-center">
                        <h2 className="text-3xl font-serif font-bold text-[#261E14]">
                            Mitra Potensial
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {partners.map((partner, idx) => (
                            <ScrollReveal 
                                key={idx} 
                                delay={idx * 80}
                                distance="30px" 
                                className="flex"
                            >
                                <div className="bg-white border border-gray-100 rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-4 hover:shadow-md transition-shadow cursor-pointer shadow-sm w-full group">
                                    <div className="w-12 h-12 bg-[#FAF6F0] rounded-full flex items-center justify-center text-[#C99B53] border border-[#C99B53]/15 transition-transform duration-300 group-hover:scale-110">
                                        {partner.icon}
                                    </div>
                                    <h4 className="font-bold text-[#261E14] font-serif text-sm tracking-wide">
                                        {partner.title}
                                    </h4>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>

                {/* Bottom Callout */}
                <ScrollReveal distance="30px" className="mt-16 mb-20">
                    <div className="bg-[#1A2F1C] text-[#FAF6F0] rounded-2xl p-8 sm:p-12 border border-[#C99B53]/20 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-8 space-y-4">
                            <span className="text-[#C99B53] font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                                <Heart size={16} /> Kolaborasi CSR & Penelitian
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                                {content('partnership_callout_title', 'Bekerja Sama Membuat Dampak Sosial Nyata')}
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl font-sans whitespace-pre-wrap">
                                {content('partnership_callout_desc', 'Apakah institusi Anda memiliki fokus riset etnologi musik, program CSR pemberdayaan perempuan pelaku seni, atau kunjungan tahunan siswa? Kami dapat merancang proyek kerja sama jangka panjang yang relevan dan transparan.')}
                            </p>
                        </div>
                        <div className="lg:col-span-4 flex justify-end">
                            <button onClick={scrollToForm} className="w-full lg:w-auto px-6 py-3.5 bg-[#C99B53] hover:bg-[#B7863F] text-[#261E14] font-bold text-xs rounded-md shadow-md flex items-center justify-center gap-2 transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer">
                                Ajukan Proposal
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                {/* SECTION: FORMULIR PENDAFTARAN */}
                <div ref={formRef} className="scroll-mt-24">
                    <ScrollReveal distance="40px" className="mt-16">
                        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-100 shadow-sm max-w-4xl mx-auto">
                            {submitted ? (
                                <div className="text-center py-12 space-y-6">
                                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                                        <Check size={32} />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-serif font-bold text-[#261E14]">
                                            Proposal Dikirim!
                                        </h3>
                                        <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
                                            Terima kasih, perwakilan dari <span className="font-semibold text-[#261E14]">{formData.institution || formData.name}</span>. Proposal kemitraan Anda telah diterima di sistem kami.
                                        </p>
                                    </div>
                                    <div className="bg-[#FAF6F0] rounded-xl p-6 border border-[#C99B53]/15 max-w-md mx-auto text-left text-xs space-y-2.5">
                                        <div className="flex justify-between"><span className="text-gray-500">Bentuk Kemitraan:</span> <span className="font-semibold text-[#261E14]">{formData.partnershipType || 'Lainnya'}</span></div>
                                        <div className="flex justify-between"><span className="text-gray-500">Kontak Person:</span> <span className="font-semibold text-[#261E14]">{formData.name}</span></div>
                                        <div className="flex justify-between"><span className="text-gray-500">Telepon / WhatsApp:</span> <span className="font-semibold text-[#261E14]">{formData.phone}</span></div>
                                        <div className="flex justify-between"><span className="text-gray-500">Surel:</span> <span className="font-semibold text-[#261E14]">{formData.email}</span></div>
                                    </div>
                                    <p className="text-xs text-gray-400 max-w-sm mx-auto">
                                        Tim Hubungan Kemitraan kami akan meninjau pengajuan Anda dan menghubungi Anda kembali dalam waktu maksimal 3 hari kerja.
                                    </p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="px-6 py-2.5 bg-[#C99B53] text-[#261E14] font-bold text-xs rounded-md shadow-sm hover:bg-[#B7863F] transition-colors cursor-pointer"
                                    >
                                        Ajukan Kemitraan Lainnya
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-1 text-center">
                                        <h2 className="text-2xl font-serif font-bold text-[#261E14]">
                                            {content('partnership_form_title', 'Ajukan Kerja Sama')}
                                        </h2>
                                        <p className="text-xs sm:text-sm text-gray-500 max-w-2xl mx-auto">
                                            {content('partnership_form_desc', 'Silakan lengkapi formulir di bawah ini dengan detail institusi dan bentuk kolaborasi yang Anda harapkan. Tim kami akan segera menghubungi Anda.')}
                                        </p>
                                    </div>

                                    <div className="space-y-5">
                                        {/* Row 1: Nama Lengkap & Institusi */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label htmlFor="name" className="text-xs font-bold text-gray-700">
                                                    Nama Lengkap
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    placeholder="Masukkan nama Anda"
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#C99B53] focus:ring-1 focus:ring-[#C99B53] outline-none text-sm transition-all duration-200 bg-white"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label htmlFor="institution" className="text-xs font-bold text-gray-700">
                                                    Nama Institusi / Perusahaan
                                                </label>
                                                <input
                                                    type="text"
                                                    id="institution"
                                                    name="institution"
                                                    required
                                                    value={formData.institution}
                                                    onChange={handleInputChange}
                                                    placeholder="Masukkan nama institusi"
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#C99B53] focus:ring-1 focus:ring-[#C99B53] outline-none text-sm transition-all duration-200 bg-white"
                                                />
                                            </div>
                                        </div>

                                        {/* Row 2: Surel & WhatsApp */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label htmlFor="email" className="text-xs font-bold text-gray-700">
                                                    Alamat Surel
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="email@contoh.com"
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#C99B53] focus:ring-1 focus:ring-[#C99B53] outline-none text-sm transition-all duration-200 bg-white"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label htmlFor="phone" className="text-xs font-bold text-gray-700">
                                                    Nomor Telepon / WhatsApp
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    required
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    placeholder="+62 8xx xxxx xxxx"
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#C99B53] focus:ring-1 focus:ring-[#C99B53] outline-none text-sm transition-all duration-200 bg-white"
                                                />
                                            </div>
                                        </div>

                                        {/* Bentuk Kemitraan Dropdown */}
                                        <div className="space-y-1.5">
                                            <label htmlFor="partnershipType" className="text-xs font-bold text-gray-700">
                                                Bentuk Kemitraan yang Diminati
                                            </label>
                                            <div className="relative">
                                                <select
                                                    id="partnershipType"
                                                    name="partnershipType"
                                                    required
                                                    value={formData.partnershipType}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 pr-8 rounded-lg border border-gray-200 focus:border-[#C99B53] focus:ring-1 focus:ring-[#C99B53] outline-none text-sm transition-all duration-200 bg-white appearance-none cursor-pointer"
                                                >
                                                    <option value="" disabled>Pilih salah satu...</option>
                                                    <option value="Pemerintah Desa/Daerah">Pemerintah Desa dan Daerah</option>
                                                    <option value="Sekolah/Universitas">Sekolah dan Perguruan Tinggi</option>
                                                    <option value="Desa Wisata">Desa Wisata</option>
                                                    <option value="Biro Perjalanan/Hotel">Biro Perjalanan & Akomodasi Wisata</option>
                                                    <option value="Komunitas Seni/Budaya">Komunitas Seni dan Budaya</option>
                                                    <option value="Lembaga Sosial/CSR">Lembaga Sosial & Program CSR</option>
                                                </select>
                                                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-500 w-0 h-0" />
                                            </div>
                                        </div>

                                        {/* Rencana Kolaborasi */}
                                        <div className="space-y-1.5">
                                            <label htmlFor="notes" className="text-xs font-bold text-gray-700">
                                                Pesan Singkat / Rencana Kolaborasi
                                            </label>
                                            <textarea
                                                id="notes"
                                                name="notes"
                                                rows="5"
                                                value={formData.notes}
                                                onChange={handleInputChange}
                                                placeholder="Ceritakan sedikit tentang ide kolaborasi Anda..."
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#C99B53] focus:ring-1 focus:ring-[#C99B53] outline-none text-sm resize-none transition-all duration-200 bg-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="px-10 py-3.5 bg-black hover:bg-zinc-900 text-white font-bold text-sm rounded-lg shadow-sm transition-colors duration-200 cursor-pointer block mx-auto uppercase tracking-wider"
                                    >
                                        Ajukan Kerja Sama
                                    </button>
                                </form>
                            )}
                        </div>
                    </ScrollReveal>
                </div>

            </div>
        </div>
    );
}
