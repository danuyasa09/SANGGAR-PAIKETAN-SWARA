import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export default function Contact({ content }) {
    return (
        <div className="bg-[#FAF6F0] min-h-screen">
            
            {/* HERO BANNER */}
            <section className="relative py-32 md:py-40 pb-24 md:pb-32 flex items-center justify-center overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${content('contact_banner', '/images/contact_banner.png').startsWith('http') || content('contact_banner', '/images/contact_banner.png').startsWith('/') ? content('contact_banner', '/images/contact_banner.png') : `/storage/${content('contact_banner', '')}`}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#1C150C]/95 via-[#261E14]/85 to-[#261E14]/40" />

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-12 space-y-6">
                    <span className="text-xs font-bold tracking-widest text-[#C99B53] uppercase block">
                        — HUBUNGI KAMI —
                    </span>
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white font-bold leading-tight">
                        {content('contact_hero_title', 'Ada Pertanyaan?')}
                    </h1>
                    <div className="h-[2px] w-20 bg-[#C99B53] mx-auto" />
                    <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed whitespace-pre-wrap">
                        {content('contact_hero_desc', 'Kami sangat terbuka untuk berdiskusi tentang program, kunjungan khusus, maupun rencana kolaborasi seni. Silakan hubungi kami.')}
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
                                    Informasi Kontak
                                </h3>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <MapPin className="text-[#C99B53] shrink-0 mt-1" size={20} />
                                        <div>
                                            <h4 className="font-serif font-bold text-sm text-white">Alamat Sanggar</h4>
                                            <p className="text-xs text-gray-400 mt-1 whitespace-pre-wrap">{content('contact_address', 'Banjar Dinas Bantas Tengah Kaja, Desa Bantas, Kecamatan Selemadeg Timur, Kabupaten Tabanan, Bali.')}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <Phone className="text-[#C99B53] shrink-0 mt-1" size={20} />
                                        <div>
                                            <h4 className="font-serif font-bold text-sm text-white">Telepon / WhatsApp</h4>
                                            <p className="text-xs text-gray-400 mt-1 whitespace-pre-wrap">{content('contact_phone', '+62 812-3456-7890 (Kemitraan)')}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <Mail className="text-[#C99B53] shrink-0 mt-1" size={20} />
                                        <div>
                                            <h4 className="font-serif font-bold text-sm text-white">Email</h4>
                                            <p className="text-xs text-gray-400 mt-1 whitespace-pre-wrap">{content('contact_email', 'info@sanggarpaiketanswara.org')}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <Clock className="text-[#C99B53] shrink-0 mt-1" size={20} />
                                        <div>
                                            <h4 className="font-serif font-bold text-sm text-white">Jam Operasional</h4>
                                            <p className="text-xs text-gray-400 mt-1 whitespace-pre-wrap">{content('contact_hours', 'Setiap Hari: 08:00 - 18:00 WITA')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-800 text-xs text-gray-400">
                                Pesan Anda akan direspons oleh tim Humas Sanggar dalam waktu maksimal 1x24 jam.
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Right: Real-time Map */}
                    <ScrollReveal className="lg:col-span-7 flex" delay={200} distance="40px">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[450px] flex flex-col w-full">
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

            </div>
        </div>
    );
}
