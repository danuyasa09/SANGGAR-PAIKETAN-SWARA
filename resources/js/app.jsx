import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './components/App';

import AdminLayout from './components/admin/AdminLayout';
import Login from './components/admin/Login';
import AdminContent from './components/admin/AdminContent';
import AdminGallery from './components/admin/AdminGallery';
import AdminPageEditor from './components/admin/AdminPageEditor';
import AdminPartnerships from './components/admin/AdminPartnerships';
import AdminReservations from './components/admin/AdminReservations';
import AdminPrograms from './components/admin/AdminPrograms';
import AdminNews from './components/admin/AdminNews';

const root = document.getElementById('app');
if (root) {
    ReactDOM.createRoot(root).render(
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    {/* Admin routes */}
                    <Route path="/admin/login" element={<Login />} />
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<Navigate to="/admin/page/beranda" replace />} />
                        <Route path="content" element={<Navigate to="/admin/page/beranda" replace />} />
                        <Route path="page/:slug" element={<AdminPageEditor />} />
                        <Route path="gallery" element={<AdminGallery />} />
                        <Route path="partnerships" element={<AdminPartnerships />} />
                        <Route path="reservations" element={<AdminReservations />} />
                        <Route path="programs" element={<AdminPrograms />} />
                        <Route path="news" element={<AdminNews />} />
                    </Route>

                    {/* Public routes — semua ditangani oleh App.jsx yang mengelola state navigasi */}
                    <Route path="/"          element={<App />} />
                    <Route path="/tentang"   element={<App />} />
                    <Route path="/program"   element={<App />} />
                    <Route path="/berita"    element={<App />} />
                    <Route path="/berita/:id" element={<App />} />
                    <Route path="/galeri"    element={<App />} />
                    <Route path="/kemitraan" element={<App />} />
                    <Route path="/kontak"    element={<App />} />
                    <Route path="/reservasi" element={<App />} />
                    {/* Fallback: redirect path tidak dikenal ke home */}
                    <Route path="/*"         element={<App />} />
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    );
}
