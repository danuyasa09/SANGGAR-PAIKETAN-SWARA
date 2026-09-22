import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

export const getSavedLanguage = () => {
    // 1. Cek cookie googtrans
    const match = document.cookie.match(/(^|;\s*)googtrans=([^;]+)/);
    if (match) {
        const val = decodeURIComponent(match[2]);
        if (val.endsWith('/en')) return 'en';
        if (val.endsWith('/id')) return 'id';
    }
    // 2. Cek localStorage
    const saved = localStorage.getItem('user_language');
    if (saved === 'en' || saved === 'id') return saved;

    return 'id';
};

export const switchLanguage = (targetLang) => {
    const hostname = window.location.hostname;
    const expirePast = '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    // Hapus cookie lama
    document.cookie = `googtrans${expirePast}`;
    document.cookie = `googtrans${expirePast} domain=${hostname};`;
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
        document.cookie = `googtrans${expirePast} domain=.${hostname};`;
    }

    if (targetLang === 'id') {
        localStorage.setItem('user_language', 'id');
        document.cookie = 'googtrans=/id/id; path=/;';
        if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
            document.cookie = `googtrans=/id/id; domain=.${hostname}; path=/;`;
        }
        
        const combo = document.querySelector('.goog-te-combo');
        if (combo) {
            combo.value = '';
            combo.dispatchEvent(new Event('change'));
        }
        window.location.reload();
        return;
    }

    // Jika ganti ke 'en'
    localStorage.setItem('user_language', 'en');
    const cookieVal = `/id/${targetLang}`;
    document.cookie = `googtrans=${cookieVal}; path=/;`;
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
        document.cookie = `googtrans=${cookieVal}; domain=.${hostname}; path=/;`;
    }

    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
        combo.value = targetLang;
        combo.dispatchEvent(new Event('change'));
    } else {
        window.location.reload();
    }
};

export default function LanguageSwitcher({ className = '' }) {
    const [currentLang, setCurrentLang] = useState('id');

    useEffect(() => {
        setCurrentLang(getSavedLanguage());

        const interval = setInterval(() => {
            const detected = getSavedLanguage();
            if (detected !== currentLang) {
                setCurrentLang(detected);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [currentLang]);

    const handleSelect = (lang) => {
        if (lang === currentLang) return;
        setCurrentLang(lang);
        switchLanguage(lang);
    };

    return (
        <div
            className={`notranslate flex items-center bg-black/40 border border-[#C99B53]/30 rounded-full p-1 shadow-inner backdrop-blur-md transition-all ${className}`}
            translate="no"
        >
            <div className="flex items-center pl-2 pr-1 text-[#C99B53]/80">
                <Globe size={14} />
            </div>
            <div className="flex items-center gap-1">
                <button
                    type="button"
                    onClick={() => handleSelect('id')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                        currentLang === 'id'
                            ? 'bg-[#C99B53] text-[#1C150C] shadow-sm font-bold'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                    title="Bahasa Indonesia"
                >
                    ID
                </button>
                <button
                    type="button"
                    onClick={() => handleSelect('en')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                        currentLang === 'en'
                            ? 'bg-[#C99B53] text-[#1C150C] shadow-sm font-bold'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                    title="English"
                >
                    EN
                </button>
            </div>
        </div>
    );
}
