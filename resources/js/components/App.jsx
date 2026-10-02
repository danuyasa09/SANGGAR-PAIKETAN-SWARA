import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../lib/axios';
import Navbar from './Navbar';
import Footer from './Footer';
import PageWrapper from './PageWrapper';
import Home from '../pages/Home';
import About from '../pages/About';
import Programs from '../pages/Programs';
import News from '../pages/News';
import NewsDetail from '../pages/NewsDetail';
import Gallery from '../pages/Gallery';
import Partnership from '../pages/Partnership';
import Contact from '../pages/Contact';
import Reservation from '../pages/Reservation';

// Peta URL path ke nama halaman internal
const PATH_TO_PAGE = {
    '/':            'home',
    '/tentang':     'about',
    '/program':     'programs',
    '/berita':      'news',
    '/galeri':      'gallery',
    '/kemitraan':   'partnership',
    '/kontak':      'contact',
    '/reservasi':   'reservation',
};

// Peta nama halaman ke URL path
const PAGE_TO_PATH = {
    home:        '/',
    about:       '/tentang',
    programs:    '/program',
    news:        '/berita',
    gallery:     '/galeri',
    partnership: '/kemitraan',
    contact:     '/kontak',
    reservation: '/reservasi',
};

// Ekstrak page + articleId dari lokasi URL saat ini
const resolvePageFromLocation = (location) => {
    const path = location.pathname;
    // Cek apakah path adalah artikel berita: /berita/:id
    const newsDetailMatch = path.match(/^\/berita\/(\d+)$/);
    if (newsDetailMatch) {
        return { page: 'news-detail', articleId: parseInt(newsDetailMatch[1]) };
    }
    const page = PATH_TO_PAGE[path] || 'home';
    return { page, articleId: null };
};

export default function App() {
    const navigate   = useNavigate();
    const location   = useLocation();

    const initial    = resolvePageFromLocation(location);
    const [page, setPage]               = useState(initial.page);
    const [articleId, setArticleId]     = useState(initial.articleId);
    const [renderedPage, setRenderedPage] = useState(initial.page);
    const [visible, setVisible]         = useState(true);
    const [progress, setProgress]       = useState(0);
    const [progressVisible, setProgressVisible] = useState(false);
    const [siteContent, setSiteContent] = useState([]);

    // Navigasi antar halaman: update URL sekaligus
    const changePage = useCallback((newPage, id = null) => {
        if (newPage === page && id === articleId) return;

        // Tentukan URL baru
        let newPath;
        if (newPage === 'news-detail' && id) {
            newPath = `/berita/${id}`;
        } else {
            newPath = PAGE_TO_PATH[newPage] || '/';
        }
        navigate(newPath);

        setProgressVisible(true);
        setProgress(30);
        setVisible(false);
        setPage(newPage);
        setArticleId(id);
    }, [page, articleId, navigate]);

    // Tangani tombol back/forward browser
    useEffect(() => {
        const resolved = resolvePageFromLocation(location);
        if (resolved.page !== page || resolved.articleId !== articleId) {
            setProgressVisible(true);
            setProgress(30);
            setVisible(false);
            setPage(resolved.page);
            setArticleId(resolved.articleId);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    // Fetch konten dinamis
    useEffect(() => {
        axios.get('/api/content').then(res => {
            setSiteContent(res.data);
        }).catch(err => console.error(err));
    }, []);

    // Animasi transisi halaman
    useEffect(() => {
        if (!visible) {
            const timer = setTimeout(() => {
                setRenderedPage(page);
                setVisible(true);
                window.scrollTo({ top: 0, behavior: 'instant' });

                setProgress(100);
                const hideTimer = setTimeout(() => {
                    setProgressVisible(false);
                    setProgress(0);
                }, 300);

                const reflowTimer = setTimeout(() => {
                    window.dispatchEvent(new Event('scroll'));
                    window.scrollBy(0, 1);
                    window.scrollBy(0, -1);
                }, 50);

                return () => {
                    clearTimeout(hideTimer);
                    clearTimeout(reflowTimer);
                };
            }, 150);
            return () => clearTimeout(timer);
        }
    }, [page, visible]);

    const getContent = (key, fallback) => {
        const item = siteContent.find(c => c.key === key);
        return item ? item.value : fallback;
    };

    const renderCurrentPage = () => {
        switch (renderedPage) {
            case 'home':
                return <Home changePage={changePage} content={getContent} />;
            case 'about':
                return <About content={getContent} changePage={changePage} />;
            case 'programs':
                return <Programs changePage={changePage} content={getContent} />;
            case 'news':
                return <News content={getContent} changePage={changePage} />;
            case 'news-detail':
                return <NewsDetail changePage={changePage} articleId={articleId} />;
            case 'gallery':
                return <Gallery content={getContent} />;
            case 'partnership':
                return <Partnership content={getContent} />;
            case 'contact':
                return <Contact content={getContent} />;
            case 'reservation':
                return <Reservation content={getContent} />;
            default:
                return <Home changePage={changePage} content={getContent} />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#FAF6F0] text-[#261E14] font-sans selection:bg-[#C99B53] selection:text-white overflow-x-hidden">
            {/* Top Gold Loading Bar */}
            <div
                className="fixed top-0 left-0 h-[3px] bg-[#C99B53] z-[9999] transition-all duration-300 ease-out shadow-[0_0_8px_#C99B53] pointer-events-none"
                style={{
                    width: `${progress}%`,
                    opacity: progressVisible ? 1 : 0
                }}
            />

            <Navbar currentPage={page} changePage={changePage} />
            <main className="flex-grow min-h-[75vh] overflow-x-hidden">
                <PageWrapper visible={visible}>
                    {renderCurrentPage()}
                </PageWrapper>
            </main>
            <Footer changePage={changePage} content={getContent} />
        </div>
    );
}
