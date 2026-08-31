import React, { useState, useEffect, useCallback } from 'react';
import axios from '../../lib/axios';
import {
    Newspaper, Plus, Pencil, Trash2, RefreshCw, X, Check,
    ImagePlus, Loader2, Eye, EyeOff, AlertCircle, Calendar,
    ChevronDown, ChevronUp, GripVertical, Quote, Heading,
    AlignLeft, BookOpen, Tag, Clock, User, AtSign
} from 'lucide-react';

/* ─── Block Types ─────────────────────────────── */
const BLOCK_TYPES = [
    { value: 'lead',      label: 'Lead / Pembuka',   icon: <BookOpen size={13} />,   hint: 'Paragraf pertama dengan huruf besar (drop cap)' },
    { value: 'paragraph', label: 'Paragraf',          icon: <AlignLeft size={13} />,  hint: 'Teks biasa' },
    { value: 'heading',   label: 'Judul Sub-bagian',  icon: <Heading size={13} />,    hint: 'Judul H2' },
    { value: 'quote',     label: 'Kutipan / Quote',   icon: <Quote size={13} />,      hint: 'Blockquote dengan sumber kutipan' },
];

const EMPTY_BLOCK = { type: 'paragraph', text: '', author: '' };

const EMPTY_FORM = {
    tag: 'BERITA',
    title: '',
    cover_url: '',
    read_time: '3 menit baca',
    author_name: 'Tim Sanggar Paiketan',
    author_role: 'Penulis & Pengelola Konten',
    author_avatar_url: '',
    content: [{ ...EMPTY_BLOCK }],
    is_published: false,
};

/* ─── Helpers ─────────────────────────────────── */
const resolveUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http') || url.startsWith('/')) return url;
    return `/storage/${url}`;
};

const formatDate = (d) => d ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

/* ════════════════════════════════════════════════
   Main Component
   ════════════════════════════════════════════════ */
export default function AdminNews() {
    const [articles, setArticles]       = useState([]);
    const [loading, setLoading]         = useState(true);
    const [modalOpen, setModalOpen]     = useState(false);
    const [editingId, setEditingId]     = useState(null);
    const [form, setForm]               = useState(EMPTY_FORM);
    const [saving, setSaving]           = useState(false);
    const [uploading, setUploading]     = useState(false);
    const [deletingId, setDeletingId]   = useState(null);
    const [error, setError]             = useState(null);
    const [toast, setToast]             = useState(null);
    const [previewCover, setPreviewCover] = useState('');
    const [expandedId, setExpandedId]   = useState(null);

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    /* ─── Fetch ──────────────────────────────────── */
    const fetchArticles = useCallback(async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('admin_token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const res = await axios.get('/api/admin/articles');
            setArticles(res.data);
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    }, []);

    useEffect(() => { fetchArticles(); }, [fetchArticles]);

    /* ─── Modal ──────────────────────────────────── */
    const openCreate = () => {
        setEditingId(null);
        setForm({ ...EMPTY_FORM, content: [{ type: 'lead', text: '', author: '' }] });
        setPreviewCover('');
        setError(null);
        setModalOpen(true);
    };

    const openEdit = (art) => {
        setEditingId(art.id);
        setForm({
            tag:              art.tag              ?? 'BERITA',
            title:            art.title            ?? '',
            cover_url:        art.cover_url        ?? '',
            read_time:        art.read_time        ?? '3 menit baca',
            author_name:      art.author_name      ?? '',
            author_role:      art.author_role      ?? '',
            author_avatar_url: art.author_avatar_url ?? '',
            content:          art.content?.length ? art.content.map(b => ({ ...b, author: b.author ?? '' })) : [{ ...EMPTY_BLOCK }],
            is_published:     art.is_published     ?? false,
        });
        setPreviewCover(art.cover_url ?? '');
        setError(null);
        setModalOpen(true);
    };

    const closeModal = () => { setModalOpen(false); setEditingId(null); setError(null); };

    /* ─── Content Blocks ─────────────────────────── */
    const addBlock = () => setForm(f => ({ ...f, content: [...f.content, { ...EMPTY_BLOCK }] }));

    const removeBlock = (idx) => setForm(f => ({
        ...f, content: f.content.filter((_, i) => i !== idx)
    }));

    const updateBlock = (idx, key, val) => setForm(f => {
        const blocks = [...f.content];
        blocks[idx] = { ...blocks[idx], [key]: val };
        return { ...f, content: blocks };
    });

    const moveBlock = (idx, dir) => setForm(f => {
        const blocks = [...f.content];
        const target = idx + dir;
        if (target < 0 || target >= blocks.length) return f;
        [blocks[idx], blocks[target]] = [blocks[target], blocks[idx]];
        return { ...f, content: blocks };
    });

    /* ─── Cover Upload ───────────────────────────── */
    const handleCoverUpload = async (file) => {
        if (!file) return;
        setUploading(true);
        try {
            const fd = new FormData();
            fd.append('image', file);
            const res = await axios.post('/api/articles/upload-cover', fd, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setForm(f => ({ ...f, cover_url: res.data.url }));
            setPreviewCover(res.data.url);
        } catch { showToast('Gagal upload gambar cover.', 'error'); }
        finally { setUploading(false); }
    };

    /* ─── Save ───────────────────────────────────── */
    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        try {
            const payload = {
                ...form,
                content: form.content.filter(b => b.text.trim() !== ''),
            };
            if (editingId) {
                await axios.put(`/api/articles/${editingId}`, payload);
                showToast('Artikel berhasil diperbarui!');
            } else {
                await axios.post('/api/articles', payload);
                showToast('Artikel berhasil dibuat!');
            }
            closeModal();
            fetchArticles();
        } catch (err) {
            const errs = err.response?.data?.errors;
            setError(errs ? Object.values(errs).flat().join(' ') : err.response?.data?.message || 'Terjadi kesalahan.');
        } finally { setSaving(false); }
    };

    /* ─── Delete ─────────────────────────────────── */
    const handleDelete = async (id) => {
        if (!window.confirm('Hapus artikel ini? Tindakan tidak dapat dibatalkan.')) return;
        setDeletingId(id);
        try {
            await axios.delete(`/api/articles/${id}`);
            showToast('Artikel dihapus.');
            fetchArticles();
        } catch { showToast('Gagal menghapus.', 'error'); }
        finally { setDeletingId(null); }
    };

    /* ─── Toggle Publish ─────────────────────────── */
    const togglePublish = async (art) => {
        try {
            await axios.put(`/api/articles/${art.id}`, { ...art, content: art.content ?? [], is_published: !art.is_published });
            fetchArticles();
        } catch { showToast('Gagal mengubah status.', 'error'); }
    };

    /* ════════════════════════════════════════════════
       RENDER
       ════════════════════════════════════════════════ */
    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-admin-primary/10 flex items-center justify-center text-admin-primary">
                        <Newspaper size={20} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-admin-serif font-bold text-admin-text">Manajemen Berita</h1>
                        <p className="text-sm text-admin-text/50">Kelola artikel dan berita yang tampil di halaman publik</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button onClick={fetchArticles} disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-admin-text/70 shadow-sm transition-colors">
                        <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />Refresh
                    </button>
                    <button onClick={openCreate}
                        className="flex items-center gap-2 px-4 py-2 text-sm bg-admin-primary text-white rounded-lg hover:bg-admin-primary/90 shadow-sm font-semibold transition-colors">
                        <Plus size={16} />Tulis Artikel
                    </button>
                </div>
            </div>

            {/* Article List */}
            {loading ? (
                <div className="flex items-center justify-center py-24 text-admin-text/40">
                    <Loader2 size={28} className="animate-spin mr-2" />Memuat artikel...
                </div>
            ) : articles.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4 border-2 border-dashed border-gray-200 rounded-2xl text-admin-text/40">
                    <Newspaper size={48} strokeWidth={1} />
                    <p className="text-sm">Belum ada artikel. Klik "Tulis Artikel" untuk memulai.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {articles.map(art => (
                        <div key={art.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="flex items-start gap-4 p-5">
                                {/* Thumbnail */}
                                <div className="w-24 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-100 border border-gray-200">
                                    {art.cover_url ? (
                                        <img src={resolveUrl(art.cover_url)} alt={art.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300"><ImagePlus size={22} strokeWidth={1} /></div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                        <span className="text-[9px] font-bold bg-amber-100 text-amber-700 border border-amber-200 px-2 py-0.5 rounded uppercase tracking-widest">{art.tag}</span>
                                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest ${art.is_published ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                                            {art.is_published ? '● Published' : '○ Draft'}
                                        </span>
                                    </div>
                                    <h3 className="font-admin-serif font-bold text-admin-text text-base leading-snug line-clamp-1">{art.title}</h3>
                                    <div className="flex flex-wrap items-center gap-3 mt-1 text-[11px] text-gray-400">
                                        <span className="flex items-center gap-1"><User size={10} />{art.author_name}</span>
                                        <span className="flex items-center gap-1"><Calendar size={10} />{formatDate(art.published_at)}</span>
                                        <span className="flex items-center gap-1"><Eye size={10} />{art.views?.toLocaleString() ?? 0} views</span>
                                        <span className="flex items-center gap-1"><Clock size={10} />{art.read_time}</span>
                                        <span className="flex items-center gap-1"><BookOpen size={10} />{art.content?.length ?? 0} blok konten</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
                                    <button onClick={() => openEdit(art)}
                                        className="flex items-center gap-1 px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-semibold transition-colors">
                                        <Pencil size={12} />Edit
                                    </button>
                                    <button onClick={() => togglePublish(art)}
                                        className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg font-semibold transition-colors ${art.is_published ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}>
                                        {art.is_published ? <><EyeOff size={12} />Jadikan Draft</> : <><Eye size={12} />Publish</>}
                                    </button>
                                    <button onClick={() => setExpandedId(expandedId === art.id ? null : art.id)}
                                        className="p-1.5 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
                                        {expandedId === art.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                    </button>
                                    <button onClick={() => handleDelete(art.id)} disabled={deletingId === art.id}
                                        className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors disabled:opacity-50">
                                        {deletingId === art.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                                    </button>
                                </div>
                            </div>

                            {/* Expanded: content preview */}
                            {expandedId === art.id && art.content?.length > 0 && (
                                <div className="border-t border-gray-100 px-5 pb-5 pt-4 space-y-2">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Preview Konten ({art.content.length} blok)</p>
                                    {art.content.slice(0, 4).map((block, i) => (
                                        <div key={i} className="flex items-start gap-2.5 p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                                            <span className={`shrink-0 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                                                block.type === 'lead' ? 'bg-amber-100 text-amber-700' :
                                                block.type === 'heading' ? 'bg-purple-100 text-purple-700' :
                                                block.type === 'quote' ? 'bg-blue-100 text-blue-700' :
                                                'bg-gray-200 text-gray-600'
                                            }`}>{block.type}</span>
                                            <p className="text-xs text-gray-600 line-clamp-1 flex-1">{block.text}</p>
                                        </div>
                                    ))}
                                    {art.content.length > 4 && (
                                        <p className="text-[11px] text-gray-400 italic pl-1">+{art.content.length - 4} blok lainnya...</p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* ════════ MODAL FORM ════════ */}
            {modalOpen && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col z-10">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
                            <h2 className="text-lg font-admin-serif font-bold text-admin-text">
                                {editingId ? 'Edit Artikel' : 'Tulis Artikel Baru'}
                            </h2>
                            <button onClick={closeModal} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"><X size={20} /></button>
                        </div>

                        {/* Modal Body */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {error && (
                                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs">
                                    <AlertCircle size={14} className="shrink-0 mt-0.5" /><span>{error}</span>
                                </div>
                            )}

                            {/* ── Section: Meta ── */}
                            <section className="space-y-4">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Informasi Artikel</h3>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-700 flex items-center gap-1"><Tag size={11} />Tag / Kategori</label>
                                        <input type="text" value={form.tag}
                                            onChange={e => setForm(f => ({ ...f, tag: e.target.value.toUpperCase() }))}
                                            placeholder="BERITA"
                                            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-admin-primary/60 focus:ring-1 focus:ring-admin-primary/20 uppercase" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-700 flex items-center gap-1"><Clock size={11} />Estimasi Baca</label>
                                        <input type="text" value={form.read_time}
                                            onChange={e => setForm(f => ({ ...f, read_time: e.target.value }))}
                                            placeholder="3 menit baca"
                                            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-admin-primary/60 focus:ring-1 focus:ring-admin-primary/20" />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-700">Judul Artikel <span className="text-red-500">*</span></label>
                                    <input type="text" required value={form.title}
                                        onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                        placeholder="Tulis judul artikel yang menarik..."
                                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-admin-primary/60 focus:ring-1 focus:ring-admin-primary/20 font-semibold" />
                                </div>
                            </section>

                            {/* ── Section: Cover ── */}
                            <section className="space-y-3">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Foto Cover</h3>
                                <div className="flex items-start gap-4">
                                    <div className="w-32 h-20 rounded-xl overflow-hidden border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center shrink-0">
                                        {previewCover || form.cover_url ? (
                                            <img src={resolveUrl(previewCover || form.cover_url)} alt="preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <ImagePlus size={22} className="text-gray-300" />
                                        )}
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <label className={`flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-admin-primary/50 hover:bg-admin-primary/5 transition-colors text-sm text-gray-500 ${uploading ? 'pointer-events-none opacity-60' : ''}`}>
                                            {uploading ? <Loader2 size={14} className="animate-spin" /> : <ImagePlus size={14} />}
                                            {uploading ? 'Mengupload...' : 'Pilih Foto Cover'}
                                            <input type="file" accept="image/*" className="hidden" onChange={e => handleCoverUpload(e.target.files[0])} />
                                        </label>
                                        <p className="text-[11px] text-gray-400">Atau masukkan URL gambar:</p>
                                        <input type="text" value={form.cover_url}
                                            onChange={e => { setForm(f => ({ ...f, cover_url: e.target.value })); setPreviewCover(e.target.value); }}
                                            placeholder="https://..."
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-admin-primary/60" />
                                    </div>
                                </div>
                            </section>

                            {/* ── Section: Author ── */}
                            <section className="space-y-3">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Informasi Penulis</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-700 flex items-center gap-1"><User size={11} />Nama Penulis</label>
                                        <input type="text" value={form.author_name}
                                            onChange={e => setForm(f => ({ ...f, author_name: e.target.value }))}
                                            placeholder="Tim Sanggar Paiketan"
                                            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-admin-primary/60 focus:ring-1 focus:ring-admin-primary/20" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-700 flex items-center gap-1"><AtSign size={11} />Role Penulis</label>
                                        <input type="text" value={form.author_role}
                                            onChange={e => setForm(f => ({ ...f, author_role: e.target.value }))}
                                            placeholder="Penulis & Pengelola Konten"
                                            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-admin-primary/60 focus:ring-1 focus:ring-admin-primary/20" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-700">URL Avatar Penulis</label>
                                    <input type="text" value={form.author_avatar_url}
                                        onChange={e => setForm(f => ({ ...f, author_avatar_url: e.target.value }))}
                                        placeholder="https://... (opsional)"
                                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-admin-primary/60 focus:ring-1 focus:ring-admin-primary/20" />
                                </div>
                            </section>

                            {/* ── Section: Content Blocks ── */}
                            <section className="space-y-3">
                                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Konten Artikel</h3>
                                    <button type="button" onClick={addBlock}
                                        className="flex items-center gap-1 text-xs text-admin-primary font-semibold hover:text-admin-primary/80 transition-colors">
                                        <Plus size={12} />Tambah Blok
                                    </button>
                                </div>

                                {form.content.length === 0 && (
                                    <p className="text-xs text-gray-400 italic text-center py-4">Belum ada blok konten. Klik "Tambah Blok" untuk memulai.</p>
                                )}

                                <div className="space-y-3">
                                    {form.content.map((block, idx) => (
                                        <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50/50">
                                            {/* Block header bar */}
                                            <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 border-b border-gray-200">
                                                <GripVertical size={14} className="text-gray-300 cursor-grab" />
                                                <span className="text-[10px] font-bold text-gray-500">Blok {idx + 1}</span>

                                                {/* Type selector */}
                                                <select value={block.type}
                                                    onChange={e => updateBlock(idx, 'type', e.target.value)}
                                                    className="flex-1 text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white outline-none focus:border-admin-primary/60">
                                                    {BLOCK_TYPES.map(bt => (
                                                        <option key={bt.value} value={bt.value}>{bt.label}</option>
                                                    ))}
                                                </select>

                                                {/* Move up/down */}
                                                <button type="button" onClick={() => moveBlock(idx, -1)} disabled={idx === 0}
                                                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 transition-colors">
                                                    <ChevronUp size={13} />
                                                </button>
                                                <button type="button" onClick={() => moveBlock(idx, 1)} disabled={idx === form.content.length - 1}
                                                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 transition-colors">
                                                    <ChevronDown size={13} />
                                                </button>
                                                <button type="button" onClick={() => removeBlock(idx)}
                                                    className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                                                    <X size={13} />
                                                </button>
                                            </div>

                                            {/* Block content */}
                                            <div className="p-3 space-y-2">
                                                <textarea
                                                    rows={block.type === 'paragraph' ? 4 : block.type === 'lead' ? 3 : 2}
                                                    value={block.text}
                                                    onChange={e => updateBlock(idx, 'text', e.target.value)}
                                                    placeholder={
                                                        block.type === 'lead'      ? 'Paragraf pembuka artikel (akan muncul dengan huruf besar di depan)...' :
                                                        block.type === 'heading'   ? 'Judul sub-bagian...' :
                                                        block.type === 'quote'     ? 'Isi kutipan...' :
                                                        'Isi paragraf...'
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-admin-primary/60 focus:ring-1 focus:ring-admin-primary/20 resize-none bg-white"
                                                />
                                                {block.type === 'quote' && (
                                                    <input type="text" value={block.author}
                                                        onChange={e => updateBlock(idx, 'author', e.target.value)}
                                                        placeholder="Sumber kutipan (nama, jabatan)..."
                                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-admin-primary/60 bg-white" />
                                                )}
                                                <p className="text-[10px] text-gray-400 italic">
                                                    {BLOCK_TYPES.find(bt => bt.value === block.type)?.hint}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* ── Publish Toggle ── */}
                            <section className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                <button type="button" onClick={() => setForm(f => ({ ...f, is_published: !f.is_published }))}
                                    className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${form.is_published ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                                    <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${form.is_published ? 'left-5' : 'left-0.5'}`} />
                                </button>
                                <div>
                                    <p className="text-sm font-bold text-gray-700">{form.is_published ? 'Artikel Published' : 'Simpan sebagai Draft'}</p>
                                    <p className="text-xs text-gray-400">{form.is_published ? 'Artikel akan tampil di halaman Berita publik.' : 'Artikel hanya terlihat di admin panel.'}</p>
                                </div>
                            </section>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl shrink-0">
                            <button type="button" onClick={closeModal}
                                className="px-5 py-2.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-100 font-medium transition-colors">
                                Batal
                            </button>
                            <button onClick={handleSave} disabled={saving}
                                className="flex items-center gap-2 px-6 py-2.5 text-sm bg-admin-primary text-white rounded-xl hover:bg-admin-primary/90 font-semibold disabled:opacity-60 transition-colors">
                                {saving ? <><Loader2 size={14} className="animate-spin" />Menyimpan...</> : <><Check size={14} />{editingId ? 'Simpan Perubahan' : 'Buat Artikel'}</>}
                            </button>
                        </div>
                    </div>
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
