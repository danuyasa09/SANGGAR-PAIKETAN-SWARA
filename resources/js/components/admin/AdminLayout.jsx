import React, { useEffect } from 'react';
import { Outlet, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../../lib/axios';
import { LogOut, Home, Info, Image, Map, Phone, Newspaper, Handshake } from 'lucide-react';

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('admin_token');

    if (!token) {
        return <Navigate to="/admin/login" />;
    }

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.get('/api/user').catch(() => {
            localStorage.removeItem('admin_token');
            navigate('/admin/login');
        });
    }, []);

    const handleLogout = async () => {
        await axios.post('/api/logout');
        localStorage.removeItem('admin_token');
        navigate('/admin/login');
    };

    const navItems = [
        { path: '/admin/page/beranda', label: 'Beranda', icon: <Home size={18} /> },
        { path: '/admin/page/tentangkami', label: 'Tentang Kami', icon: <Info size={18} /> },
        { path: '/admin/page/program', label: 'Program Edu-Wisata', icon: <Map size={18} /> },
        { path: '/admin/page/berita', label: 'Berita', icon: <Newspaper size={18} /> },
        { path: '/admin/page/kemitraan', label: 'Kemitraan', icon: <Handshake size={18} /> },
        { path: '/admin/page/kontak', label: 'Kontak', icon: <Phone size={18} /> },
        { path: '/admin/gallery', label: 'Galeri', icon: <Image size={18} /> },
    ];

    return (
        <div className="flex min-h-screen bg-admin-bg font-admin-sans">
            <aside className="w-72 bg-admin-primary text-white flex flex-col shadow-2xl z-20">
                <div className="p-8 border-b border-white/10">
                    <h2 className="text-2xl font-admin-serif font-bold tracking-tight">Sanggar Admin</h2>
                    <p className="text-sm text-admin-secondary mt-1 font-medium">Ubud Ethos CMS</p>
                </div>
                
                <nav className="flex-1 space-y-1 p-4 mt-4">
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
                </nav>

                <div className="p-6 border-t border-white/10">
                    <button 
                        onClick={handleLogout} 
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-300 hover:text-white hover:bg-red-500/20 rounded transition-colors font-medium"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>
            
            <main className="flex-1 flex flex-col min-w-0 max-w-[1440px] mx-auto h-screen overflow-hidden">
                {/* Topbar for profile / quick actions (optional, per design) */}
                <header className="bg-white/50 backdrop-blur border-b border-admin-primary/10 h-16 flex items-center justify-between px-8 z-10 shrink-0">
                    <div className="text-sm font-medium text-admin-text/60">
                        Anda masuk sebagai <span className="text-admin-primary font-bold">Admin</span>
                    </div>
                </header>
                
                <div className="flex-1 overflow-auto p-8 lg:p-10">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
