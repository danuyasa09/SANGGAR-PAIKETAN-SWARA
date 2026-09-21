import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../../lib/axios';
import { LogOut, Home, Info, Image, Map, Phone, Newspaper, Handshake, CalendarDays, Menu, X } from 'lucide-react';

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('admin_token');
    const [pendingCounts, setPendingCounts] = useState({ partnerships: 0, reservations: 0 });
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (!token) {
        return <Navigate to="/admin/login" />;
    }

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.get('/api/user').catch(() => {
            localStorage.removeItem('admin_token');
            navigate('/admin/login');
        });

        // Fetch pending counts for badges
        const fetchCounts = async () => {
            try {
                const [pRes, rRes] = await Promise.all([
                    axios.get('/api/partnerships?status=pending'),
                    axios.get('/api/reservations?status=pending'),
                ]);
                setPendingCounts({
                    partnerships: pRes.data.counts?.pending ?? 0,
                    reservations: rRes.data.counts?.pending ?? 0,
                });
            } catch (e) {
                // silently fail
            }
        };
        fetchCounts();
    }, []);

    // Close sidebar when route changes (mobile navigation)
    useEffect(() => {
        setSidebarOpen(false);
    }, [location.pathname]);

    const handleLogout = async () => {
        await axios.post('/api/logout');
        localStorage.removeItem('admin_token');
        navigate('/admin/login');
    };

    const navItems = [
        { path: '/admin/page/beranda', label: 'Beranda', icon: <Home size={18} /> },
        { path: '/admin/page/tentangkami', label: 'Tentang Kami', icon: <Info size={18} /> },
        { path: '/admin/programs', label: 'Program Edu-Wisata', icon: <Map size={18} /> },
        { path: '/admin/news', label: 'Berita', icon: <Newspaper size={18} /> },
        { path: '/admin/page/kemitraan', label: 'Kemitraan', icon: <Handshake size={18} /> },
        { path: '/admin/page/kontak', label: 'Kontak', icon: <Phone size={18} /> },
        { path: '/admin/gallery', label: 'Galeri', icon: <Image size={18} /> },
    ];

    const submissionItems = [
        {
            path: '/admin/partnerships',
            label: 'Pengajuan Kemitraan',
            icon: <Handshake size={18} />,
            badge: pendingCounts.partnerships,
        },
        {
            path: '/admin/reservations',
            label: 'Reservasi',
            icon: <CalendarDays size={18} />,
            badge: pendingCounts.reservations,
        },
    ];

    const SidebarInner = () => (
        <>
            {/* Brand */}
            <div className="p-5 border-b border-white/10 flex items-center gap-3 shrink-0">
                <img
                    src="/images/logo.png"
                    alt="Logo Sanggar"
                    className="w-10 h-10 object-contain drop-shadow shrink-0"
                />
                <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-admin-serif font-bold tracking-tight leading-none text-white truncate">Sanggar Admin</h2>
                    <p className="text-xs text-admin-secondary mt-1 font-medium">Ubud Ethos CMS</p>
                </div>
                {/* Close button — mobile only */}
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="md:hidden p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                    aria-label="Tutup menu"
                >
                    <X size={18} />
                </button>
            </div>

            <nav className="flex-1 space-y-1 p-4 mt-2 overflow-y-auto">
                {/* Section: Konten Halaman */}
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 px-4 pb-1 pt-2">
                    Konten Halaman
                </p>
                {navItems.map((item) => {
                    const isActive = location.pathname.startsWith(item.path);
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 py-3 px-4 rounded transition-all duration-200 ${
                                isActive
                                    ? 'bg-white/10 text-white border-l-4 border-admin-secondary font-medium shadow-sm'
                                    : 'text-white/70 hover:bg-white/5 hover:text-white border-l-4 border-transparent'
                            }`}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    );
                })}

                {/* Section: Submissions */}
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 px-4 pb-1 pt-4">
                    Pengajuan & Reservasi
                </p>
                {submissionItems.map((item) => {
                    const isActive = location.pathname.startsWith(item.path);
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 py-3 px-4 rounded transition-all duration-200 ${
                                isActive
                                    ? 'bg-white/10 text-white border-l-4 border-admin-secondary font-medium shadow-sm'
                                    : 'text-white/70 hover:bg-white/5 hover:text-white border-l-4 border-transparent'
                            }`}
                        >
                            {item.icon}
                            <span className="flex-1">{item.label}</span>
                            {item.badge > 0 && (
                                <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-amber-400 text-[#261E14] text-[10px] font-bold flex items-center justify-center">
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-5 border-t border-white/10 shrink-0">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-red-300 hover:text-white hover:bg-red-500/20 rounded transition-colors font-medium"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </>
    );

    return (
        <div className="flex min-h-screen bg-admin-bg font-admin-sans">

            {/* ── DESKTOP SIDEBAR (md and up) ── */}
            <aside className="hidden md:flex w-72 bg-admin-primary text-white flex-col shadow-2xl z-20 shrink-0">
                <SidebarInner />
            </aside>

            {/* ── MOBILE: backdrop overlay ── */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* ── MOBILE: slide-in drawer ── */}
            <aside
                className={`fixed top-0 left-0 h-full w-72 bg-admin-primary text-white flex flex-col shadow-2xl z-40 md:hidden transition-transform duration-300 ease-in-out ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <SidebarInner />
            </aside>

            {/* ── MAIN CONTENT ── */}
            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Topbar */}
                <header className="bg-white/50 backdrop-blur border-b border-admin-primary/10 h-14 md:h-16 flex items-center gap-3 px-4 md:px-8 z-10 shrink-0">
                    {/* Hamburger — mobile only */}
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="md:hidden p-2 -ml-1 rounded-lg text-admin-primary hover:bg-admin-primary/10 transition-colors shrink-0"
                        aria-label="Buka menu navigasi"
                    >
                        <Menu size={22} />
                    </button>

                    <div className="text-sm font-medium text-admin-text/60 hidden sm:block">
                        Anda masuk sebagai <span className="text-admin-primary font-bold">Admin</span>
                    </div>

                    {/* Pending badges summary */}
                    {(pendingCounts.partnerships > 0 || pendingCounts.reservations > 0) && (
                        <div className="flex items-center gap-2 text-xs ml-auto flex-wrap">
                            {pendingCounts.partnerships > 0 && (
                                <Link
                                    to="/admin/partnerships"
                                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-full font-semibold hover:bg-amber-100 transition-colors whitespace-nowrap"
                                >
                                    <Handshake size={12} />
                                    <span className="hidden sm:inline">{pendingCounts.partnerships} kemitraan baru</span>
                                    <span className="sm:hidden font-bold">{pendingCounts.partnerships}</span>
                                </Link>
                            )}
                            {pendingCounts.reservations > 0 && (
                                <Link
                                    to="/admin/reservations"
                                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-full font-semibold hover:bg-amber-100 transition-colors whitespace-nowrap"
                                >
                                    <CalendarDays size={12} />
                                    <span className="hidden sm:inline">{pendingCounts.reservations} reservasi baru</span>
                                    <span className="sm:hidden font-bold">{pendingCounts.reservations}</span>
                                </Link>
                            )}
                        </div>
                    )}
                </header>

                <div className="flex-1 overflow-auto p-4 md:p-8 lg:p-10">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

