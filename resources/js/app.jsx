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
                    <Route path="/*" element={<App />} />
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    );
}
