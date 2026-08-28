import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './components/App';

import AdminLayout from './components/admin/AdminLayout';
import Login from './components/admin/Login';
import AdminContent from './components/admin/AdminContent';
import AdminGallery from './components/admin/AdminGallery';

import AdminPageEditor from './components/admin/AdminPageEditor';

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
                    </Route>
                    <Route path="/*" element={<App />} />
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    );
}
