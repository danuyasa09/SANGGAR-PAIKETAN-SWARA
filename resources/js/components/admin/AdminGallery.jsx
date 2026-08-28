import React, { useState, useEffect } from 'react';
import axios from '../../lib/axios';

export default function AdminGallery() {
    const [galleries, setGalleries] = useState([]);
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('general');
    const [uploading, setUploading] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    };

    useEffect(() => {
        fetchGallery();
    }, []);

    const fetchGallery = async () => {
        const response = await axios.get('/api/gallery');
        setGalleries(response.data);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!image) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', title);
        formData.append('category', category);

        try {
            await axios.post('/api/gallery', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setImage(null);
            setTitle('');
            fetchGallery();
            showToast('Upload berhasil!');
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Gagal upload gambar.';
            showToast(errorMsg, 'error');
        }
        setUploading(false);
    };

    const handleDelete = async (id) => {
        if (!confirm('Hapus gambar ini?')) return;
        try {
            await axios.delete(`/api/gallery/${id}`);
            fetchGallery();
            showToast('Gambar berhasil dihapus!');
        } catch (err) {
            showToast('Gagal menghapus gambar.', 'error');
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-[#261E14] mb-6">Kelola Galeri</h1>
            
            <div className="bg-white p-6 rounded shadow mb-8">
                <h2 className="text-xl font-semibold mb-4">Upload Gambar Baru</h2>
                <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                        <label className="block text-sm mb-1">Pilih File</label>
                        <input type="file" onChange={e => setImage(e.target.files[0])} accept="image/*" required className="w-full" />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Judul / Keterangan</label>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded" placeholder="Judul gambar" />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Kategori</label>
                        <select value={category} onChange={e => setCategory(e.target.value)} className="w-full p-2 border rounded">
                            <option value="general">Umum</option>
                            <option value="tari">Tari</option>
                            <option value="gamelan">Gamelan</option>
                        </select>
                    </div>
                    <div>
                        <button type="submit" disabled={uploading} className="w-full bg-[#8B261E] text-white p-2 rounded hover:bg-red-800 font-bold">
                            {uploading ? 'Mengupload...' : 'Upload'}
                        </button>
                    </div>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {galleries.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded shadow relative">
                        <img src={`/storage/${item.image_path}`} alt={item.title} className="w-full h-40 object-cover rounded mb-2" />
                        <h3 className="font-semibold text-sm truncate">{item.title || 'Tanpa Judul'}</h3>
                        <p className="text-xs text-gray-500 mb-2">Kat: {item.category}</p>
                        <button onClick={() => handleDelete(item.id)} className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-800 text-xs shadow">
                            Hapus
                        </button>
                    </div>
                ))}
            </div>

            {/* Custom Toast Notification */}
            {toast.show && (
                <div className={`fixed bottom-8 right-8 px-6 py-3 rounded-lg shadow-lg font-semibold text-sm transform transition-all duration-300 translate-y-0 opacity-100 flex items-center gap-3 z-50 ${toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'}`}>
                    {toast.type === 'error' ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    )}
                    {toast.message}
                </div>
            )}
        </div>
    );
}
