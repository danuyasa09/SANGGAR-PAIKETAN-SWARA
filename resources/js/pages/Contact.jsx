import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ChevronDown, MessageSquare, ExternalLink } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export default function Contact({ content }) {
    const [openFaq, setOpenFaq] = useState(null);

    const faqs = [
        {
            q: "Apakah peserta harus memiliki pengalaman bermain gamelan atau menari?",
            a: "Tidak. Program dapat diikuti oleh pemula dan akan disesuaikan dengan kemampuan peserta."
        },
        {
            q: "Berapa jumlah peserta dalam satu sesi?",
            a: "Paket reguler dirancang untuk sekitar 10–30 peserta. Hubungi kami apabila kelompok Anda memiliki jumlah peserta yang berbeda."
        },
        {
            q: "Berapa lama kegiatan berlangsung?",
            a: "Kegiatan reguler berlangsung sekitar 60–90 menit. Durasi dapat disesuaikan untuk program khusus."
        },
        {
            q: "Apakah program dapat diikuti anak-anak?",
            a: "Ya. Materi dan cara penyampaian akan disesuaikan dengan usia peserta."
        },
        {
            q: "Apakah tersedia program untuk sekolah atau perguruan tinggi?",
            a: "Ya. Kami dapat menyesuaikan kegiatan dengan tujuan pembelajaran dan kebutuhan institusi."
        },
        {
            q: "Apakah wisatawan mancanegara dapat mengikuti kegiatan?",
            a: "Ya. Ketersediaan pendampingan dalam bahasa asing perlu dikonfirmasi saat reservasi."
        },
        {
            q: "Apakah pengunjung boleh mengambil foto dan video?",
            a: "Foto dan video dapat diambil pada bagian kegiatan yang diperbolehkan. Peserta diminta menghormati arahan pengelola dan tidak mendokumentasikan aktivitas yang bersifat terbatas atau sakral."
        },
        {
            q: "Bagaimana cara mengetahui harga paket?",
            a: "Harga disesuaikan dengan jenis kegiatan, jumlah peserta, durasi, dan kebutuhan tambahan. Silakan menghubungi pengelola untuk mendapatkan penawaran."
        }
    ];

    const toggleFaq = (idx) => {
        setOpenFaq(openFaq === idx ? null : idx);
    };

    return (
        <div className="bg-[#FAF6F0] min-h-screen font-sans">
            
            {/* HERO BANNER */}
            <section className="relative py-32 md:py-40 pb-24 md:pb-32 flex items-center justify-center overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${content('contact_banner_image', '/images/contact_banner.png').startsWith('http') || content('contact_banner_image', '/images/contact_banner.png').startsWith('/') ? content('contact_banner_image', '/images/contact_banner.png') : `/storage/${content('contact_banner_image', '')}`}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#1C150C]/95 via-[#261E14]/85 to-[#261E14]/40" />

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-12 space-y-6">
                    <span className="text-xs font-bold tracking-widest text-[#C99B53] uppercase block">
                        — INFORMASI & LOKASI —
                    </span>
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white font-bold leading-tight">
                        {content('contact_title', 'Hubungi Kami')}
                    </h1>
                    <div className="h-[2px] w-20 bg-[#C99B53] mx-auto" />
                    <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        {content('contact_desc', 'Ingin belajar gamelan, mencoba tari Bali, menyaksikan pertunjukan, atau merencanakan kunjungan kelompok? Hubungi Sanggar Paiketan Swara.')}
                    </p>
                </div>

                {/* SVG V-Shape Dip Divider */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
                    <svg 
                        viewBox="0 0 1200 120" 
                        preserveAspectRatio="none" 
                        className="relative block w-full h-[30px] md:h-[50px] text-[#FAF6F0]"
                        fill="currentColor"
                    >
                        <path d="M0,20 L600,100 L1200,20 L1200,120 L0,120 Z"></path>
                    </svg>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                    
                    {/* Left: Contact Info details */}
                    <ScrollReveal className="lg:col-span-5 flex" distance="40px">
                        <div className="bg-[#261E14] text-[#FAF6F0] rounded-2xl p-8 sm:p-10 border border-[#C99B53]/15 shadow-xl flex flex-col justify-between space-y-8 w-full">
                            <div>
                                <h3 className="text-2xl font-serif font-bold text-[#C99B53] mb-6">
                                    Informasi Sanggar
                                </h3>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <MapPin className="text-[#C99B53] shrink-0 mt-1" size={20} />
                                        <div>
                                            <h4 className="font-serif font-bold text-sm text-white">Alamat</h4>
                                            <p className="text-xs text-gray-300 mt-1 leading-relaxed">{content('contact_address', 'Banjar Dinas Bantas Tengah Kaja, Desa Bantas, Kecamatan Selemadeg Timur, Kabupaten Tabanan, Bali, Indonesia')}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <Phone className="text-[#C99B53] shrink-0 mt-1" size={20} />
                                        <div>
                                            <h4 className="font-serif font-bold text-sm text-white">WhatsApp</h4>
                                            <p className="text-xs text-gray-300 mt-1">{content('contact_phone', '+62 812-3456-7890')}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <Mail className="text-[#C99B53] shrink-0 mt-1" size={20} />
                                        <div>
                                            <h4 className="font-serif font-bold text-sm text-white">Email</h4>
                                            <p className="text-xs text-gray-300 mt-1">{content('contact_email', 'sanggarpaiketanswara@gmail.com')}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <Clock className="text-[#C99B53] shrink-0 mt-1" size={20} />
                                        <div>
                                            <h4 className="font-serif font-bold text-sm text-white">Jam Layanan</h4>
                                            <p className="text-xs text-gray-300 mt-1">{content('contact_hours', 'Senin – Minggu: 08.00 – 18.00 WITA')}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Media Sosial */}
                                <div className="pt-6 mt-6 border-t border-gray-800 space-y-3">
                                    <h4 className="font-serif font-bold text-xs text-gray-400 uppercase tracking-wider">Media Sosial</h4>
                                    <div className="flex items-center gap-3">
                                        <a href={content('contact_instagram', 'https://instagram.com/sanggarpaiketanswara')} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#C99B53] hover:text-[#261E14] text-white flex items-center justify-center transition-colors">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                                                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                                            </svg>
                                        </a>
                                        <a href={content('contact_facebook', 'https://facebook.com/sanggarpaiketanswara')} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#C99B53] hover:text-[#261E14] text-white flex items-center justify-center transition-colors">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                                            </svg>
                                        </a>
                                        <a href={content('contact_youtube', 'https://youtube.com/@sanggarpaiketanswara')} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#C99B53] hover:text-[#261E14] text-white flex items-center justify-center transition-colors">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/>
                                                <polygon points="10 15 15 12 10 9"/>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Direct Action Buttons */}
                            <div className="pt-6 border-t border-gray-800 space-y-3">
                                <a
                                    href={`https://wa.me/${content('contact_phone', '6281234567890').replace(/[^0-9]/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-3.5 bg-[#C99B53] hover:bg-[#B7863F] text-[#261E14] font-bold text-xs rounded-xl flex items-center justify-center gap-2 uppercase tracking-wider transition-colors shadow-md"
                                >
                                    <Phone size={14} />
                                    <span>Hubungi melalui WhatsApp</span>
                                </a>
                                <a
                                    href="https://maps.google.com/?q=Banjar+Tengah+Kaja+Bantas+Tabanan"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-3 border border-white/20 hover:bg-white/10 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 uppercase tracking-wider transition-colors"
                                >
                                    <ExternalLink size={14} />
                                    <span>Buka Google Maps</span>
                                </a>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Right: Real-time Map */}
                    <ScrollReveal className="lg:col-span-7 flex flex-col space-y-6" delay={200} distance="40px">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[420px] flex flex-col w-full flex-grow">
                            <iframe
                                title="Peta Lokasi Sanggar Paiketan Swara"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5580.396428584112!2d115.06011712833347!3d-8.505580192249806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2316564c3bb5f%3A0x838599112c3e12c2!2sBanjar%20Tengah%20Kaja%20bantas!5e0!3m2!1sen!2sus!4v1787570221505!5m2!1sen!2sus"
                                className="w-full h-full border-0 flex-grow"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="strict-origin-when-cross-origin"
                            ></iframe>
                        </div>
                    </ScrollReveal>

                </div>

                {/* FAQ SECTION (8 PERTANYAAN RESMI DOKUMEN) */}
                <section className="mt-24 pt-16 border-t border-gray-200">
                    <ScrollReveal className="text-center mb-12 space-y-2" distance="30px">
                        <span className="text-[10px] font-bold tracking-widest text-[#C99B53] uppercase block">
                            — TANYA JAWAB —
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-serif text-[#261E14] font-bold">
                            Pertanyaan yang Sering Diajukan
                        </h2>
                        <div className="h-[2px] w-20 bg-[#C99B53] mx-auto mt-2" />
                    </ScrollReveal>

                    <div className="max-w-4xl mx-auto space-y-4">
                        {faqs.map((faq, idx) => (
                            <ScrollReveal key={idx} delay={idx * 40} distance="20px">
                                <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden transition-all duration-200">
                                    <button
                                        onClick={() => toggleFaq(idx)}
                                        className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50/60 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="w-6 h-6 rounded-full bg-[#C99B53]/15 text-[#C99B53] font-bold text-xs flex items-center justify-center shrink-0">
                                                {idx + 1}
                                            </span>
                                            <span className="text-sm sm:text-base font-serif font-bold text-[#261E14]">
                                                {faq.q}
                                            </span>
                                        </div>
                                        <ChevronDown
                                            size={18}
                                            className={`text-[#C99B53] shrink-0 transition-transform duration-300 ${
                                                openFaq === idx ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </button>
                                    {openFaq === idx && (
                                        <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed font-sans border-t border-gray-100">
                                            <p className="pt-2">{faq.a}</p>
                                        </div>
                                    )}
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}
