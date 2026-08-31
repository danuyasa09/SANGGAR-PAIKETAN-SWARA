import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Info, Map, Image, Newspaper, Handshake, Phone, CalendarDays } from 'lucide-react';

export default function Navbar({ currentPage, changePage }) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const menuItems = [
        { id: 'home',        label: 'Beranda',          icon: <Home size={18} /> },
        { id: 'about',       label: 'Tentang Kami',     icon: <Info size={18} /> },
        { id: 'programs',    label: 'Program Edu-Wisata', icon: <Map size={18} /> },
        { id: 'gallery',     label: 'Galeri',           icon: <Image size={18} /> },
        { id: 'news',        label: 'Berita',           icon: <Newspaper size={18} /> },
        { id: 'partnership', label: 'Kemitraan',        icon: <Handshake size={18} /> },
        { id: 'contact',     label: 'Kontak',           icon: <Phone size={18} /> },
    ];

    const handleNavClick = (pageId) => {
        changePage(pageId);
        setIsOpen(false);
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? 'bg-[#1C150C]/95 backdrop-blur-md shadow-lg py-3 border-b border-[#C99B53]/20'
                        : 'bg-transparent py-5'
                }`}
            >
                <div className="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo Section */}
                        <div
                            className="flex items-center gap-2 cursor-pointer group"
                            onClick={() => handleNavClick('home')}
                        >
                            <div className="relative flex items-center justify-center w-12 h-12 bg-white rounded-full border-2 border-[#C99B53] shadow-md transition-transform duration-300 group-hover:scale-105">
                                <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#C99B53]" fill="currentColor">
                                    <path d="M12 2L4.5 9h15zM4 11h16v2H4zm1 4h14l-1.5 5h-11z" />
                                    <circle cx="12" cy="6" r="1" className="text-[#261E14]" />
                                </svg>
                            </div>
                            <div>
                                <span className="block font-serif text-lg md:text-xl font-bold tracking-wide text-[#C99B53] leading-none group-hover:text-white transition-colors duration-200">
                                    SANGGAR PAIKETAN SWARA
                                </span>
                                <span className="block text-[10px] tracking-[0.2em] font-medium text-gray-300 uppercase leading-none mt-1">
                                    Gamelan &amp; Tari Bali
                                </span>
                            </div>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center gap-6">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavClick(item.id)}
                                    className={`text-sm tracking-wide font-medium transition-all duration-200 relative py-1 cursor-pointer ${
                                        currentPage === item.id
                                            ? 'text-[#C99B53]'
                                            : 'text-gray-200 hover:text-[#C99B53]'
                                    }`}
                                >
                                    {item.label}
                                    {currentPage === item.id && (
                                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C99B53] rounded-full" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* CTA Button (Desktop) */}
                        <div className="hidden lg:block">
                            <button
                                onClick={() => handleNavClick('reservation')}
                                className="px-5 py-2.5 bg-[#C99B53] hover:bg-[#B7863F] text-[#261E14] text-sm font-semibold rounded-md shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                            >
                                Reservasi Kunjungan
                            </button>
                        </div>

                        {/* Mobile Hamburger Button */}
                        <div className="flex lg:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                aria-label="Toggle menu"
                                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 text-[#C99B53] hover:bg-white/20 transition-colors duration-200 cursor-pointer"
                            >
                                {isOpen ? <X size={22} /> : <Menu size={22} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu — Full-Screen Drawer */}
            {/* Backdrop */}
            <div
                onClick={() => setIsOpen(false)}
                className={`lg:hidden fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
                    isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            />

            {/* Drawer Panel */}
            <div
                className={`lg:hidden fixed top-0 right-0 bottom-0 z-[70] w-[85vw] max-w-sm bg-[#1C150C] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-[#C99B53]/20">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 flex items-center justify-center bg-[#C99B53]/15 rounded-full border border-[#C99B53]/30">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#C99B53]" fill="currentColor">
                                <path d="M12 2L4.5 9h15zM4 11h16v2H4zm1 4h14l-1.5 5h-11z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-[#C99B53] font-serif font-bold text-sm leading-none">SANGGAR PAIKETAN</p>
                            <p className="text-gray-400 text-[10px] tracking-widest uppercase leading-none mt-1">SWARA</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = currentPage === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                                    isActive
                                        ? 'bg-[#C99B53]/15 text-[#C99B53] border border-[#C99B53]/30'
                                        : 'text-gray-300 hover:bg-white/5 hover:text-white border border-transparent'
                                }`}
                            >
                                <span className={`shrink-0 ${isActive ? 'text-[#C99B53]' : 'text-gray-500'}`}>
                                    {item.icon}
                                </span>
                                <span className="font-medium text-sm tracking-wide">{item.label}</span>
                                {isActive && (
                                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#C99B53]" />
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* CTA at bottom */}
                <div className="px-4 py-6 border-t border-[#C99B53]/20 space-y-3">
                    <button
                        onClick={() => handleNavClick('reservation')}
                        className="w-full py-3.5 bg-[#C99B53] hover:bg-[#B7863F] active:bg-[#A0722E] text-[#261E14] font-bold text-sm rounded-xl shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                    >
                        <CalendarDays size={16} />
                        Reservasi Kunjungan
                    </button>
                    <p className="text-center text-[10px] text-gray-600 tracking-wide uppercase">
                        Sanggar Paiketan Swara · Ubud
                    </p>
                </div>
            </div>
        </>
    );
}
