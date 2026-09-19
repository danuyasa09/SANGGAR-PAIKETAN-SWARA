import React from 'react';
import { MapPin, Phone } from 'lucide-react';

export default function Footer({ changePage }) {
    const handleFooterClick = (pageId) => {
        changePage(pageId);
    };

    return (
        <footer className="bg-[#1C150C] text-[#FAF6F0] border-t border-[#C99B53]/20 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-gray-800">
                    
                    {/* Left Column: Brand & Address */}
                    <div className="md:col-span-5 space-y-5">
                        <div 
                            className="flex items-center gap-3 cursor-pointer group"
                            onClick={() => handleFooterClick('home')}
                        >
                            <div className="w-11 h-11 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                                <img
                                    src="/images/logo.png"
                                    alt="Logo Sanggar Paiketan Swara"
                                    className="w-11 h-11 object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
                                />
                            </div>
                            <div>
                                <span className="block font-serif text-lg font-bold tracking-wide text-[#C99B53]">
                                    SANGGAR PAIKETAN SWARA
                                </span>
                                <span className="block text-[9px] tracking-[0.15em] font-medium text-gray-400 uppercase">
                                    Gamelan & Tari Bali
                                </span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                            Melestarikan budaya, memberdayakan masyarakat, dan menghubungkan generasi melalui seni.
                        </p>
                        <div className="flex gap-3 text-sm text-gray-400 max-w-sm">
                            <MapPin className="text-[#C99B53] shrink-0 mt-1" size={18} />
                            <span>
                                Banjar Dinas Bantas Tengah Kaja, Desa Bantas, Kecamatan Selemadeg Timur, Kabupaten Tabanan, Bali.
                            </span>
                        </div>
                    </div>

                    {/* Center Column: Quick Navigation Links */}
                    <div className="md:col-span-4 space-y-4">
                        <h4 className="font-serif text-lg font-semibold text-[#C99B53] tracking-wide">
                            MENU
                        </h4>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                            <button
                                onClick={() => handleFooterClick('home')}
                                className="text-left text-sm text-gray-400 hover:text-[#C99B53] transition-colors duration-200 cursor-pointer"
                            >
                                Beranda
                            </button>
                            <button
                                onClick={() => handleFooterClick('about')}
                                className="text-left text-sm text-gray-400 hover:text-[#C99B53] transition-colors duration-200 cursor-pointer"
                            >
                                Tentang Kami
                            </button>
                            <button
                                onClick={() => handleFooterClick('programs')}
                                className="text-left text-sm text-gray-400 hover:text-[#C99B53] transition-colors duration-200 cursor-pointer"
                            >
                                Program Edu-Wisata
                            </button>
                            <button
                                onClick={() => handleFooterClick('gallery')}
                                className="text-left text-sm text-gray-400 hover:text-[#C99B53] transition-colors duration-200 cursor-pointer"
                            >
                                Galeri
                            </button>
                            <button
                                onClick={() => handleFooterClick('news')}
                                className="text-left text-sm text-gray-400 hover:text-[#C99B53] transition-colors duration-200 cursor-pointer"
                            >
                                Berita
                            </button>
                            <button
                                onClick={() => handleFooterClick('partnership')}
                                className="text-left text-sm text-gray-400 hover:text-[#C99B53] transition-colors duration-200 cursor-pointer"
                            >
                                Kemitraan
                            </button>
                            <button
                                onClick={() => handleFooterClick('reservation')}
                                className="text-left text-sm text-gray-400 hover:text-[#C99B53] transition-colors duration-200 cursor-pointer"
                            >
                                Reservasi
                            </button>
                            <button
                                onClick={() => handleFooterClick('contact')}
                                className="text-left text-sm text-gray-400 hover:text-[#C99B53] transition-colors duration-200 cursor-pointer"
                            >
                                Kontak
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Social Media Icons */}
                    <div className="md:col-span-3 space-y-4">
                        <h4 className="font-serif text-lg font-semibold text-[#C99B53] tracking-wide">
                            IKUTI KAMI
                        </h4>
                        <div className="flex gap-4">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noreferrer"
                                className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:border-[#C99B53] hover:text-[#C99B53] transition-all duration-200 text-gray-400 animate-none"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                                </svg>
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noreferrer"
                                className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:border-[#C99B53] hover:text-[#C99B53] transition-all duration-200 text-gray-400 animate-none"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                                </svg>
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noreferrer"
                                className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:border-[#C99B53] hover:text-[#C99B53] transition-all duration-200 text-gray-400 animate-none"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/>
                                    <polygon points="10 15 15 12 10 9"/>
                                </svg>
                            </a>
                            <a
                                href="https://wa.me/6281234567890"
                                target="_blank"
                                rel="noreferrer"
                                className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:border-[#C99B53] hover:text-[#C99B53] transition-all duration-200"
                            >
                                <Phone size={20} />
                            </a>
                        </div>
                    </div>

                </div>

                <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                    <p>© 2026 Sanggar Paiketan Swara. Hak cipta dilindungi.</p>
                    <div className="flex gap-2 items-center text-[#C99B53]">
                        {/* Balinese lotus style SVG representation */}
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                            <path d="M12 2c1.1 4 4 6.9 8 8-4 1.1-6.9 4-8 8-1.1-4-4-6.9-8-8 4-1.1 6.9-4 8-8z"/>
                        </svg>
                        <span className="font-serif">Merajut Harmoni, Melestarikan Budaya</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
