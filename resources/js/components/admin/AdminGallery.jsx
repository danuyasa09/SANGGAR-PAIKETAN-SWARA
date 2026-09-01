import React, { useState, useEffect, useCallback } from 'react';
import axios from '../../lib/axios';
import {
    Image as ImageIcon, Video, Plus, Trash2, RefreshCw,
    Loader2, AlertCircle, Check, Upload, Link, Tag, Eye
} from 'lucide-react';

/* ─── Shared categories (must match Gallery.jsx public page) ─── */
const CATEGORIES = [
    { id: 'gamelan',    label: 'Latihan Gamelan' },
    { id: 'tari',       label: 'Latihan Tari' },
    { id: 'pertunjukan', label: 'Pertunjukan' },
    { id: 'eduwisata',  label: 'Edu-Wisata' },
    { id: 'kegiatan',   label: 'Kegiatan Masyarakat' },
    { id: 'pelatihan',  label: 'Pelatihan dan Pendampingan' },
    { id: 'bantas',     label: 'Dokumentasi Desa Bantas' },
    { id: 'general',    label: 'Umum / Lainnya' },
];

const resolveImg = (path) => {
    if (!path) return null;
    if (path.startsWith('http') || path.startsWith('/')) return path;
    return `/storage/${path}`;
};

/* Extract YouTube embed URL from various YouTube link formats */
const toEmbedUrl = (url) => {
    if (!url) return url;
    const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
    if (m) return `https://www.youtube.com/embed/${m[1]}`;
    return url; // return as-is if not YouTube
};

/* ═══════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════ */
export default function AdminGallery() {
    const [items, setItems]         = useState([]);
    const [loading, setLoading]     = useState(true);
    const [filterType, setFilterType] = useState('photo'); // 'all' | 'photo' | 'video'
    const [deletingId, setDeletingId] = useState(null);
    const [toast, setToast]         = useState(null);

    /* ─── Upload Photo State ─── */
    const [photoFile, setPhotoFile]       = useState(null);
    const [photoTitle, setPhotoTitle]     = useState('');
    const [photoCategory, setPhotoCategory] = useState('general');
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const [photoPreview, setPhotoPreview] = useState('');

    /* ─── Add Video State ─── */
    const [videoUrl, setVideoUrl]         = useState('');
    const [videoTitle, setVideoTitle]     = useState('');
    const [videoCategory, setVideoCategory] = useState('general');
    const [videoViews, setVideoViews]     = useState('');
    const [videoThumb, setVideoThumb]     = useState(null);
    const [videoThumbPreview, setVideoThumbPreview] = useState('');
    const [addingVideo, setAddingVideo]   = useState(false);

    /* ─── Active Tab ─── */
    const [activeTab, setActiveTab] = useState('photo'); // 'photo' | 'video'

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    /* ─── Fetch ─── */
    const fetchItems = useCallback(async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('admin_token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const res = await axios.get('/api/gallery');
            setItems(res.data);
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    }, []);

    useEffect(() => { fetchItems(); }, [fetchItems]);

    /* ─── Upload Photo ─── */
    const handlePhotoUpload = async (e) => {
        if (e) e.preventDefault();
        if (!photoFile) return;
        setUploadingPhoto(true);
        const fd = new FormData();
        fd.append('image', photoFile);
        fd.append('title', photoTitle);
        fd.append('category', photoCategory);
        fd.append('type', 'photo');
        try {
            await axios.post('/api/gallery', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
            setPhotoFile(null);
            setPhotoTitle('');
            setPhotoPreview('');
            showToast('Foto berhasil diupload!');
            fetchItems();
        } catch (err) {
            showToast(err.response?.data?.message || 'Gagal upload foto.', 'error');
        } finally { setUploadingPhoto(false); }
    };

    /* ─── Add Video ─── */
    const handleAddVideo = async (e) => {
        e.preventDefault();
        if (!videoUrl.trim()) return;
        setAddingVideo(true);
        const fd = new FormData();
        fd.append('type', 'video');
        fd.append('video_url', videoUrl);
        fd.append('title', videoTitle);
        fd.append('category', videoCategory);
        if (videoViews) fd.append('views', videoViews);
        if (videoThumb) fd.append('image', videoThumb);
        try {
            await axios.post('/api/gallery', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
            setVideoUrl('');
            setVideoTitle('');
            setVideoViews('');
            setVideoThumb(null);
            setVideoThumbPreview('');
            showToast('Video berhasil ditambahkan!');
            fetchItems();
        } catch (err) {
            showToast(err.response?.data?.message || 'Gagal menambah video.', 'error');
        } finally { setAddingVideo(false); }
    };

    /* ─── Delete ─── */
    const handleDelete = async (id) => {
        if (!window.confirm('Hapus item ini dari galeri?')) return;
        setDeletingId(id);
        try {
            await axios.delete(`/api/gallery/${id}`);
            showToast('Item berhasil dihapus.');
            fetchItems();
        } catch { showToast('Gagal menghapus.', 'error'); }
        finally { setDeletingId(null); }
    };

    const filtered = filterType === 'all' ? items : items.filter(i => (i.type || 'photo') === filterType);
    const photoCount = items.filter(i => (i.type || 'photo') === 'photo').length;
    const videoCount = items.filter(i => i.type === 'video').length;

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-admin-primary/10 flex items-center justify-center text-admin-primary">
                        <ImageIcon size={20} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-admin-serif font-bold text-admin-text">Kelola Galeri</h1>
                        <p className="text-sm text-admin-text/50">
                            {photoCount} foto · {videoCount} video
                        </p>
                    </div>
                </div>
                <button onClick={fetchItems} disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-admin-text/70 shadow-sm transition-colors">
                    <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />Refresh
                </button>
            </div>

            {/* ── UPLOAD FORM PANEL ── */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Tab Header */}
                <div className="flex border-b border-gray-100">
                    <button onClick={() => { setActiveTab('photo'); setFilterType('photo'); }}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-colors border-b-2 ${activeTab === 'photo' ? 'border-admin-primary text-admin-primary' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>
                        <ImageIcon size={16} />Tambah Foto
                    </button>
                    <button onClick={() => { setActiveTab('video'); setFilterType('video'); }}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-colors border-b-2 ${activeTab === 'video' ? 'border-admin-primary text-admin-primary' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>
                        <Video size={16} />Tambah Video
                    </button>
                </div>

                <div className="p-6">
                    {/* ─── PHOTO TAB ─── */}
                    {activeTab === 'photo' && (
                        <form onSubmit={handlePhotoUpload} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* File Picker */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-700 flex items-center gap-1"><Upload size={11} />File Foto <span className="text-red-500">*</span></label>
                                    <label className={`flex flex-col items-center justify-center gap-2 h-32 border-2 border-dashed rounded-xl cursor-pointer transition-colors text-sm text-gray-400 ${photoPreview ? 'border-gray-200 bg-gray-50' : 'border-gray-300 hover:border-admin-primary/50 hover:bg-admin-primary/5'}`}>
                                        {photoPreview ? (
                                            <img src={photoPreview} alt="preview" className="h-full w-full object-cover rounded-xl" />
                                        ) : (
                                            <>
                                                <ImageIcon size={24} className="text-gray-300" />
                                                <span>Klik untuk pilih foto</span>
                                                <span className="text-[11px] text-gray-400">JPG, PNG, WEBP · Maks 3MB</span>
                                            </>
                                        )}
                                        <input type="file" accept="image/*" className="hidden" required
                                            onChange={e => {
                                                const f = e.target.files[0];
                                                setPhotoFile(f);
                                                if (f) setPhotoPreview(URL.createObjectURL(f));
                                            }} />
                                    </label>
                                </div>

                                {/* Meta */}
                                <div className="space-y-3">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-700">Judul / Keterangan</label>
                                        <input type="text" value={photoTitle} onChange={e => setPhotoTitle(e.target.value)}
                                            placeholder="Keterangan foto..."
                                            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-admin-primary/60 focus:ring-1 focus:ring-admin-primary/20" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-700 flex items-center gap-1"><Tag size={11} />Kategori</label>
                                        <select value={photoCategory} onChange={e => setPhotoCategory(e.target.value)}
                                            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-admin-primary/60 bg-white">
                                            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                                        </select>
                                    </div>
                                    <button type="button" onClick={handlePhotoUpload} disabled={uploadingPhoto || !photoFile}
                                        className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-admin-primary text-white rounded-xl font-bold text-sm hover:bg-admin-primary/90 disabled:opacity-50 transition-colors shadow-sm">
                                        {uploadingPhoto ? <><Loader2 size={14} className="animate-spin" />Mengupload...</> : <><Upload size={14} />Upload Foto</>}
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}

                    {/* ─── VIDEO TAB ─── */}
                    {activeTab === 'video' && (
                        <form onSubmit={handleAddVideo} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Left: URL & Thumbnail */}
                                <div className="space-y-3">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-700 flex items-center gap-1"><Link size={11} />URL Video (YouTube) <span className="text-red-500">*</span></label>
                                        <input type="text" value={videoUrl} onChange={e => setVideoUrl(e.target.value)}
                                            placeholder="https://www.youtube.com/watch?v=..."
                                            required className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-admin-primary/60 focus:ring-1 focus:ring-admin-primary/20" />
                                        <p className="text-[10px] text-gray-400">Mendukung URL YouTube (watch, shorts, embed)</p>
                                    </div>

                                    {/* Thumbnail upload (optional) */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-700">Thumbnail Kustom (opsional)</label>
                                        <label className={`flex flex-col items-center justify-center gap-1.5 h-24 border-2 border-dashed rounded-xl cursor-pointer transition-colors text-xs text-gray-400 ${videoThumbPreview ? 'border-gray-200 bg-gray-50' : 'border-gray-300 hover:border-admin-primary/50 hover:bg-admin-primary/5'}`}>
                                            {videoThumbPreview ? (
                                                <img src={videoThumbPreview} alt="thumb" className="h-full w-full object-cover rounded-xl" />
                                            ) : (
                                                <><ImageIcon size={18} className="text-gray-300" /><span>Pilih thumbnail</span></>
                                            )}
                                            <input type="file" accept="image/*" className="hidden"
                                                onChange={e => {
                                                    const f = e.target.files[0];
                                                    setVideoThumb(f);
                                                    if (f) setVideoThumbPreview(URL.createObjectURL(f));
                                                }} />
                                        </label>
                                    </div>
                                </div>

                                {/* Right: Meta */}
                                <div className="space-y-3">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-700">Judul Video</label>
                                        <input type="text" value={videoTitle} onChange={e => setVideoTitle(e.target.value)}
                                            placeholder="Judul video..."
                                            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-admin-primary/60 focus:ring-1 focus:ring-admin-primary/20" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-700 flex items-center gap-1"><Tag size={11} />Kategori</label>
                                        <select value={videoCategory} onChange={e => setVideoCategory(e.target.value)}
                                            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-admin-primary/60 bg-white">
                                            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-700 flex items-center gap-1"><Eye size={11} />Jumlah Penonton (teks)</label>
                                        <input type="text" value={videoViews} onChange={e => setVideoViews(e.target.value)}
                                            placeholder="Contoh: 28,567 views"
                                            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-admin-primary/60 focus:ring-1 focus:ring-admin-primary/20" />
                                    </div>
                                    <button type="submit" disabled={addingVideo || !videoUrl.trim()}
                                        className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-admin-primary text-white rounded-xl font-bold text-sm hover:bg-admin-primary/90 disabled:opacity-50 transition-colors shadow-sm">
                                        {addingVideo ? <><Loader2 size={14} className="animate-spin" />Menyimpan...</> : <><Video size={14} />Tambah Video</>}
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            {/* ── FILTER BAR ── */}
            <div className="flex items-center gap-2 flex-wrap">
                {[{ id: 'all', label: 'Semua' }, { id: 'photo', label: 'Foto' }, { id: 'video', label: 'Video' }].map(f => (
                    <button key={f.id} onClick={() => setFilterType(f.id)}
                        className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors ${filterType === f.id ? 'bg-admin-primary text-white' : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                        {f.label}
                    </button>
                ))}
                <span className="text-xs text-gray-400 ml-auto">{filtered.length} item</span>
            </div>

            {/* ── GALLERY GRID ── */}
            {loading ? (
                <div className="flex items-center justify-center py-24 text-admin-text/40">
                    <Loader2 size={28} className="animate-spin mr-2" />Memuat galeri...
                </div>
            ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4 border-2 border-dashed border-gray-200 rounded-2xl text-admin-text/40">
                    <ImageIcon size={48} strokeWidth={1} />
                    <p className="text-sm">Belum ada {filterType !== 'all' ? filterType : 'item'} di galeri.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filtered.map(item => {
                        const isVideo = item.type === 'video';
                        const thumbSrc = item.image_path ? resolveImg(item.image_path) : null;
                        const embedUrl = isVideo ? toEmbedUrl(item.video_url) : null;
                        const catLabel = CATEGORIES.find(c => c.id === item.category)?.label ?? item.category;

                        return (
                            <div key={item.id} className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
                                {/* Thumbnail */}
                                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                                    {isVideo && embedUrl ? (
                                        <iframe
                                            src={embedUrl}
                                            title={item.title}
                                            className="w-full h-full pointer-events-none"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    ) : isVideo && !thumbSrc ? (
                                        /* No thumbnail: show embed preview link */
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-[#1A2F1C] text-white gap-2">
                                            <div className="w-10 h-10 rounded-full bg-[#C99B53] flex items-center justify-center">
                                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white ml-0.5"><path d="M8 5v14l11-7z" /></svg>
                                            </div>
                                            <p className="text-[10px] text-gray-300 text-center px-2 line-clamp-2">{item.title || 'Video'}</p>
                                        </div>
                                    ) : thumbSrc ? (
                                        <img src={thumbSrc} alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                            <ImageIcon size={28} strokeWidth={1} />
                                        </div>
                                    )}

                                    {/* Video badge */}
                                    {isVideo && (
                                        <span className="absolute top-2 left-2 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                                            <Video size={9} />VIDEO
                                        </span>
                                    )}

                                    {/* Delete button overlay */}
                                    <button onClick={() => handleDelete(item.id)} disabled={deletingId === item.id}
                                        className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 disabled:opacity-50 shadow">
                                        {deletingId === item.id ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                                    </button>
                                </div>

                                {/* Card Body */}
                                <div className="p-2.5">
                                    <p className="text-xs font-semibold text-admin-text truncate leading-snug">{item.title || (isVideo ? 'Video tanpa judul' : 'Tanpa judul')}</p>
                                    <div className="flex items-center justify-between mt-1">
                                        <span className="text-[10px] text-gray-400 truncate">{catLabel}</span>
                                        {isVideo && item.views && (
                                            <span className="text-[10px] text-gray-400 flex items-center gap-0.5"><Eye size={9} />{item.views}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Toast */}
            {toast && (
                <div className={`fixed bottom-6 right-6 z-[90] flex items-center gap-2.5 px-5 py-3 rounded-xl shadow-xl text-sm font-semibold text-white ${toast.type === 'error' ? 'bg-red-500' : 'bg-emerald-500'}`}>
                    {toast.type === 'error' ? <AlertCircle size={16} /> : <Check size={16} />}
                    {toast.msg}
                </div>
            )}
        </div>
    );
}
