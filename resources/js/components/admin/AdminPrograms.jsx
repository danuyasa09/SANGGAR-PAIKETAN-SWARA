import React, { useState, useEffect, useCallback } from 'react';
import axios from '../../lib/axios';
import {
    Map, Plus, Pencil, Trash2, RefreshCw, X, Check,
    GripVertical, ChevronUp, ChevronDown, ImagePlus,
    Clock, Users, Tag, Loader2, Eye, EyeOff, AlertCircle
} from 'lucide-react';

const EMPTY_FORM = {
    code: '',
    title: '',
    description: '',
    activities: [''],
    duration: '',
    capacity: '',
    thumbnail_url: '',
    price: '',
    btn_label: 'Pesan Sekarang',
    is_custom_btn: false,
    order: 0,
    is_active: true,
};

export default function AdminPrograms() {
    const [programs, setPrograms]           = useState([]);
    const [loading, setLoading]             = useState(true);
    const [modalOpen, setModalOpen]         = useState(false);
    const [editingId, setEditingId]         = useState(null);
    const [form, setForm]                   = useState(EMPTY_FORM);
    const [saving, setSaving]               = useState(false);
    const [uploading, setUploading]         = useState(false);
    const [deletingId, setDeletingId]       = useState(null);
    const [error, setError]                 = useState(null);
    const [toast, setToast]                 = useState(null);
    const [previewImg, setPreviewImg]       = useState('');

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchPrograms = useCallback(async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('admin_token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const res = await axios.get('/api/admin/programs');
            setPrograms(res.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchPrograms(); }, [fetchPrograms]);

    /* -------- Modal Helpers -------- */
    const openCreate = () => {
        setEditingId(null);
        setForm({ ...EMPTY_FORM, order: programs.length + 1 });
        setPreviewImg('');
        setError(null);
        setModalOpen(true);
    };

    const openEdit = (prog) => {
        setEditingId(prog.id);
        setForm({
            code:           prog.code         ?? '',
            title:          prog.title        ?? '',
            description:    prog.description  ?? '',
            activities:     prog.activities?.length ? prog.activities : [''],
            duration:       prog.duration     ?? '',
            capacity:       prog.capacity     ?? '',
            thumbnail_url:  prog.thumbnail_url ?? '',
            price:          prog.price        ?? '',
            btn_label:      prog.btn_label    ?? 'Pesan Sekarang',
            is_custom_btn:  prog.is_custom_btn ?? false,
            order:          prog.order        ?? 0,
            is_active:      prog.is_active    ?? true,
        });
        setPreviewImg(prog.thumbnail_url ?? '');
        setError(null);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingId(null);
        setError(null);
    };

    /* -------- Activities -------- */
    const addActivity = () => setForm(f => ({ ...f, activities: [...f.activities, ''] }));
    const removeActivity = (idx) => setForm(f => ({
        ...f, activities: f.activities.filter((_, i) => i !== idx)
    }));
    const updateActivity = (idx, val) => setForm(f => {
        const acts = [...f.activities];
        acts[idx] = val;
        return { ...f, activities: acts };
    });

    /* -------- Upload Thumbnail -------- */
    const handleThumbnailUpload = async (file) => {
        if (!file) return;
        setUploading(true);
        try {
            const fd = new FormData();
            fd.append('image', file);
            const res = await axios.post('/api/programs/upload-thumbnail', fd, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setForm(f => ({ ...f, thumbnail_url: res.data.url }));
            setPreviewImg(res.data.url);
        } catch (e) {
            showToast('Gagal upload gambar.', 'error');
        } finally {
            setUploading(false);
        }
    };

    /* -------- Save -------- */
    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        try {
            const payload = {
                ...form,
                activities: form.activities.filter(a => a.trim() !== ''),
            };
            if (editingId) {
                await axios.put(`/api/programs/${editingId}`, payload);
                showToast('Program berhasil diperbarui!');
            } else {
                await axios.post('/api/programs', payload);
                showToast('Program berhasil ditambahkan!');
            }
            closeModal();
            fetchPrograms();
        } catch (err) {
            const errors = err.response?.data?.errors;
            if (errors) {
                const msgs = Object.values(errors).flat().join(' ');
                setError(msgs);
            } else {
                setError(err.response?.data?.message || 'Terjadi kesalahan.');
            }
        } finally {
            setSaving(false);
        }
    };

    /* -------- Delete -------- */
    const handleDelete = async (id) => {
        if (!window.confirm('Hapus program ini? Tindakan tidak dapat dibatalkan.')) return;
        setDeletingId(id);
        try {
            await axios.delete(`/api/programs/${id}`);
            showToast('Program dihapus.');
            fetchPrograms();
        } catch (e) {
            showToast('Gagal menghapus.', 'error');
        } finally {
            setDeletingId(null);
        }
    };

    /* -------- Toggle Active -------- */
    const toggleActive = async (prog) => {
        try {
            await axios.put(`/api/programs/${prog.id}`, {
                ...prog,
                activities: prog.activities ?? [],
                is_active: !prog.is_active,
            });
            fetchPrograms();
        } catch (e) {
            showToast('Gagal mengubah status.', 'error');
        }
    };

    /* -------- Reorder -------- */
    const moveOrder = async (prog, direction) => {
        const newOrder = prog.order + direction;
        if (newOrder < 1) return;
        try {
            await axios.put(`/api/programs/${prog.id}`, {
                ...prog,
                activities: prog.activities ?? [],
                order: newOrder,
            });
            fetchPrograms();
        } catch (e) {
            showToast('Gagal mengubah urutan.', 'error');
        }
    };

    const resolveImg = (url) => {
        if (!url) return null;
        if (url.startsWith('http') || url.startsWith('/')) return url;
        return `/storage/${url}`;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-admin-primary/10 flex items-center justify-center text-admin-primary">
                        <Map size={20} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-admin-serif font-bold text-admin-text">Program Edu-Wisata</h1>
                        <p className="text-sm text-admin-text/50">Kelola paket program yang tampil di halaman publik</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button onClick={fetchPrograms} disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-admin-text/70 shadow-sm transition-colors">
                        <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                        Refresh
                    </button>
                    <button onClick={openCreate}
                        className="flex items-center gap-2 px-4 py-2 text-sm bg-admin-primary text-white rounded-lg hover:bg-admin-primary/90 shadow-sm transition-colors font-semibold">
                        <Plus size={16} />
                        Tambah Program
                    </button>
                </div>
            </div>

            {/* Program Cards */}
            {loading ? (
                <div className="flex items-center justify-center py-24 text-admin-text/40">
                    <Loader2 size={28} className="animate-spin mr-2" /> Memuat program...
                </div>
            ) : programs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-admin-text/40 gap-4 border-2 border-dashed border-gray-200 rounded-2xl">
                    <Map size={48} strokeWidth={1} />
                    <p className="text-sm">Belum ada program. Klik "Tambah Program" untuk mulai.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                    {programs.map((prog) => (
                        <div key={prog.id}
                            className={`bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col transition-all ${prog.is_active ? 'border-gray-200' : 'border-gray-200 opacity-60'}`}>
                            {/* Thumbnail */}
                            <div className="relative h-44 bg-gray-100 overflow-hidden">
                                {prog.thumbnail_url ? (
                                    <img src={resolveImg(prog.thumbnail_url)} alt={prog.title}
                                        className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                        <ImagePlus size={40} strokeWidth={1} />
                                    </div>
                                )}
                                {/* Code Badge */}
                                <span className="absolute top-3 left-3 bg-[#C99B53] text-[#261E14] text-[10px] font-bold tracking-wider px-3 py-1 rounded-md uppercase shadow">
                                    {prog.code || '—'}
                                </span>
                                {/* Active Badge */}
                                <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full ${prog.is_active ? 'bg-emerald-500 text-white' : 'bg-gray-400 text-white'}`}>
                                    {prog.is_active ? 'Aktif' : 'Nonaktif'}
                                </span>
                                {/* Order Badge */}
                                <span className="absolute bottom-3 left-3 bg-black/50 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                                    Urutan #{prog.order}
                                </span>
                            </div>

                            {/* Body */}
                            <div className="p-5 flex-1 flex flex-col gap-3">
                                <div>
                                    <h3 className="font-admin-serif font-bold text-admin-text text-lg leading-tight">{prog.title}</h3>
                                    <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{prog.description}</p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {prog.duration && (
                                        <span className="flex items-center gap-1 text-[11px] text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                                            <Clock size={11} />{prog.duration}
                                        </span>
                                    )}
                                    {prog.capacity && (
                                        <span className="flex items-center gap-1 text-[11px] text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                                            <Users size={11} />{prog.capacity}
                                        </span>
                                    )}
                                    {prog.price && (
                                        <span className="flex items-center gap-1 text-[11px] text-[#C99B53] bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full font-semibold">
                                            <Tag size={11} />{prog.price}
                                        </span>
                                    )}
                                </div>

                                {prog.activities?.length > 0 && (
                                    <ul className="text-xs text-gray-500 space-y-0.5">
                                        {prog.activities.slice(0, 3).map((a, i) => (
                                            <li key={i} className="flex items-start gap-1.5">
                                                <span className="text-[#C99B53] mt-0.5">•</span>{a}
                                            </li>
                                        ))}
                                        {prog.activities.length > 3 && (
                                            <li className="text-gray-400 italic">+{prog.activities.length - 3} aktivitas lainnya</li>
                                        )}
                                    </ul>
                                )}

                                {/* Actions */}
                                <div className="flex items-center gap-2 pt-2 border-t border-gray-100 mt-auto flex-wrap">
                                    <button onClick={() => openEdit(prog)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-semibold">
                                        <Pencil size={12} /> Edit
                                    </button>
                                    <button onClick={() => toggleActive(prog)}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-colors font-semibold ${prog.is_active ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}>
                                        {prog.is_active ? <><EyeOff size={12} /> Nonaktifkan</> : <><Eye size={12} /> Aktifkan</>}
                                    </button>
                                    <div className="flex gap-1 ml-auto">
                                        <button onClick={() => moveOrder(prog, -1)} title="Naik"
                                            className="p-1.5 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
                                            <ChevronUp size={14} />
                                        </button>
                                        <button onClick={() => moveOrder(prog, 1)} title="Turun"
                                            className="p-1.5 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
                                            <ChevronDown size={14} />
                                        </button>
                                        <button onClick={() => handleDelete(prog.id)} disabled={deletingId === prog.id}
                                            className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors disabled:opacity-50">
                                            {deletingId === prog.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ========== MODAL FORM ========== */}
            {modalOpen && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />

                    {/* Panel */}
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col z-10">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                            <h2 className="text-lg font-admin-serif font-bold text-admin-text">
                                {editingId ? 'Edit Program' : 'Tambah Program Baru'}
                            </h2>
                            <button onClick={closeModal} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-5">

                            {/* Error */}
                            {error && (
                                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs">
                                    <AlertCircle size={14} className="shrink-0 mt-0.5" />
                                    <span>{error}</span>
                                </div>
                            )}

                            {/* Row: Code & Title */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-700">Kode Paket</label>
                                    <input type="text" value={form.code}
                                        onChange={e => setForm(f => ({ ...f, code: e.target.value }))}
                                        placeholder="Paket A"
                                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-admin-primary/60 focus:ring-1 focus:ring-admin-primary/20" />
                                </div>
                                <div className="col-span-2 space-y-1.5">
                                    <label className="text-xs font-bold text-gray-700">Judul Program <span className="text-red-500">*</span></label>
                                    <input type="text" required value={form.title}
                                        onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                        placeholder="Pengenalan Gamelan Bali"
                                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-admin-primary/60 focus:ring-1 focus:ring-admin-primary/20" />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-700">Deskripsi <span className="text-red-500">*</span></label>
                                <textarea required rows={3} value={form.description}
                                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                    placeholder="Deskripsi singkat tentang program ini..."
                                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-admin-primary/60 focus:ring-1 focus:ring-admin-primary/20 resize-none" />
                            </div>

                            {/* Activities */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-bold text-gray-700">Materi / Aktivitas</label>
                                    <button type="button" onClick={addActivity}
                                        className="flex items-center gap-1 text-xs text-admin-primary hover:text-admin-primary/80 font-semibold transition-colors">
                                        <Plus size={12} /> Tambah Aktivitas
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {form.activities.map((act, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <GripVertical size={14} className="text-gray-300 shrink-0" />
                                            <input type="text" value={act}
                                                onChange={e => updateActivity(idx, e.target.value)}
                                                placeholder={`Aktivitas ${idx + 1}`}
                                                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-admin-primary/60 focus:ring-1 focus:ring-admin-primary/20" />
                                            {form.activities.length > 1 && (
                                                <button type="button" onClick={() => removeActivity(idx)}
                                                    className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                    <X size={14} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Row: Duration & Capacity */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-700">Durasi</label>
                                    <input type="text" value={form.duration}
                                        onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}
                                        placeholder="60 - 90 menit"
                                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-admin-primary/60 focus:ring-1 focus:ring-admin-primary/20" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-700">Kapasitas Peserta</label>
                                    <input type="text" value={form.capacity}
                                        onChange={e => setForm(f => ({ ...f, capacity: e.target.value }))}
                                        placeholder="10 - 30 peserta"
                                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-admin-primary/60 focus:ring-1 focus:ring-admin-primary/20" />
                                </div>
                            </div>

                            {/* Row: Price & Order */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-700">Harga</label>
                                    <input type="text" value={form.price}
                                        onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                                        placeholder="Rp150.000"
                                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-admin-primary/60 focus:ring-1 focus:ring-admin-primary/20" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-700">Urutan Tampil</label>
                                    <input type="number" min="1" value={form.order}
                                        onChange={e => setForm(f => ({ ...f, order: parseInt(e.target.value) || 0 }))}
                                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-admin-primary/60 focus:ring-1 focus:ring-admin-primary/20" />
                                </div>
                            </div>

                            {/* Thumbnail */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-700">Foto / Thumbnail Program</label>
                                <div className="flex items-start gap-4">
                                    {/* Preview */}
                                    <div className="w-28 h-20 rounded-xl overflow-hidden border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center shrink-0">
                                        {previewImg || form.thumbnail_url ? (
                                            <img src={resolveImg(previewImg || form.thumbnail_url)} alt="Preview"
                                                className="w-full h-full object-cover" />
                                        ) : (
                                            <ImagePlus size={22} className="text-gray-300" />
                                        )}
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <label className={`flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-admin-primary/50 hover:bg-admin-primary/5 transition-colors text-sm text-gray-500 ${uploading ? 'pointer-events-none opacity-60' : ''}`}>
                                            {uploading ? <Loader2 size={14} className="animate-spin" /> : <ImagePlus size={14} />}
                                            {uploading ? 'Mengupload...' : 'Pilih Gambar'}
                                            <input type="file" accept="image/*" className="hidden"
                                                onChange={e => handleThumbnailUpload(e.target.files[0])} />
                                        </label>
                                        <p className="text-[11px] text-gray-400">Atau isi URL gambar langsung:</p>
                                        <input type="text" value={form.thumbnail_url}
                                            onChange={e => { setForm(f => ({ ...f, thumbnail_url: e.target.value })); setPreviewImg(e.target.value); }}
                                            placeholder="https://..."
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-admin-primary/60" />
                                    </div>
                                </div>
                            </div>

                            {/* Label Button & Toggles */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-700">Label Tombol CTA</label>
                                    <input type="text" value={form.btn_label}
                                        onChange={e => setForm(f => ({ ...f, btn_label: e.target.value }))}
                                        placeholder="Pesan Sekarang"
                                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-admin-primary/60 focus:ring-1 focus:ring-admin-primary/20" />
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <button type="button" onClick={() => setForm(f => ({ ...f, is_active: !f.is_active }))}
                                            className={`relative w-11 h-6 rounded-full transition-colors ${form.is_active ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                                            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${form.is_active ? 'left-5' : 'left-0.5'}`} />
                                        </button>
                                        <span className="text-xs font-medium text-gray-700">Program Aktif (tampil di halaman publik)</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button type="button" onClick={() => setForm(f => ({ ...f, is_custom_btn: !f.is_custom_btn }))}
                                            className={`relative w-11 h-6 rounded-full transition-colors ${form.is_custom_btn ? 'bg-[#C99B53]' : 'bg-gray-300'}`}>
                                            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${form.is_custom_btn ? 'left-5' : 'left-0.5'}`} />
                                        </button>
                                        <span className="text-xs font-medium text-gray-700">Tombol Gaya Kustom (warna emas)</span>
                                    </div>
                                </div>
                            </div>
                        </form>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                            <button type="button" onClick={closeModal}
                                className="px-5 py-2.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors font-medium">
                                Batal
                            </button>
                            <button type="submit" form="" onClick={handleSave} disabled={saving}
                                className="flex items-center gap-2 px-6 py-2.5 text-sm bg-admin-primary text-white rounded-xl hover:bg-admin-primary/90 transition-colors font-semibold disabled:opacity-60">
                                {saving ? <><Loader2 size={14} className="animate-spin" /> Menyimpan...</> : <><Check size={14} /> {editingId ? 'Simpan Perubahan' : 'Tambahkan Program'}</>}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast */}
            {toast && (
                <div className={`fixed bottom-6 right-6 z-[90] flex items-center gap-2.5 px-5 py-3 rounded-xl shadow-xl text-sm font-semibold text-white transition-all ${toast.type === 'error' ? 'bg-red-500' : 'bg-emerald-500'}`}>
                    {toast.type === 'error' ? <AlertCircle size={16} /> : <Check size={16} />}
                    {toast.msg}
                </div>
            )}
        </div>
    );
}
