import React, { useState, useEffect, useCallback } from 'react';
import axios from '../../lib/axios';
import { CalendarDays, Check, X, Trash2, RefreshCw, ChevronDown, Search, Phone, Mail, Users, Tag, MessageSquare } from 'lucide-react';

const STATUS_CONFIG = {
    pending: {
        label: 'Menunggu',
        badge: 'bg-amber-100 text-amber-700 border border-amber-200',
        dot: 'bg-amber-400',
    },
    confirmed: {
        label: 'Dikonfirmasi',
        badge: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
        dot: 'bg-emerald-400',
    },
    rejected: {
        label: 'Ditolak',
        badge: 'bg-red-100 text-red-700 border border-red-200',
        dot: 'bg-red-400',
    },
};

const PACKAGE_LABELS = {
    paket1: 'Paket 1: Gamelan Bali',
    paket2: 'Paket 2: Tari Bali',
    paket3: 'Paket 3: Gamelan & Tari',
    custom: 'Kustom / Program Khusus',
};

export default function AdminReservations() {
    const [reservations, setReservations] = useState([]);
    const [counts, setCounts] = useState({ all: 0, pending: 0, confirmed: 0, rejected: 0 });
    const [filterStatus, setFilterStatus] = useState('all');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);
    const [expandedId, setExpandedId] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('admin_token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const res = await axios.get(`/api/reservations?status=${filterStatus}`);
            setReservations(res.data.data);
            setCounts(res.data.counts);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [filterStatus]);

    useEffect(() => { fetchData(); }, [fetchData]);

    const updateStatus = async (id, status) => {
        setActionLoading(`${id}-${status}`);
        try {
            await axios.patch(`/api/reservations/${id}`, { status });
            await fetchData();
        } catch (e) {
            console.error(e);
        } finally {
            setActionLoading(null);
        }
    };

    const deleteRecord = async (id) => {
        if (!window.confirm('Hapus data reservasi ini?')) return;
        setActionLoading(`${id}-delete`);
        try {
            await axios.delete(`/api/reservations/${id}`);
            await fetchData();
        } catch (e) {
            console.error(e);
        } finally {
            setActionLoading(null);
        }
    };

    const filtered = reservations.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.email.toLowerCase().includes(search.toLowerCase()) ||
        r.phone.includes(search)
    );

    const filterTabs = [
        { key: 'all', label: 'Semua', count: counts.all },
        { key: 'pending', label: 'Menunggu', count: counts.pending },
        { key: 'confirmed', label: 'Dikonfirmasi', count: counts.confirmed },
        { key: 'rejected', label: 'Ditolak', count: counts.rejected },
    ];

    const formatVisitDate = (dateStr) => {
        if (!dateStr) return '-';
        return new Date(dateStr).toLocaleDateString('id-ID', {
            weekday: 'short', day: 'numeric', month: 'long', year: 'numeric'
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-admin-primary/10 flex items-center justify-center text-admin-primary">
                        <CalendarDays size={20} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-admin-serif font-bold text-admin-text">Reservasi</h1>
                        <p className="text-sm text-admin-text/50">Kelola permintaan kunjungan</p>
                    </div>
                </div>
                <button
                    onClick={fetchData}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-admin-text/70 shadow-sm"
                >
                    <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                    Refresh
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {filterTabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setFilterStatus(tab.key)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                            filterStatus === tab.key
                                ? 'bg-admin-primary text-white border-admin-primary shadow-md'
                                : 'bg-white border-gray-200 hover:border-admin-primary/40 text-admin-text'
                        }`}
                    >
                        <div className={`text-2xl font-bold ${filterStatus === tab.key ? 'text-white' : 'text-admin-primary'}`}>
                            {tab.count}
                        </div>
                        <div className={`text-xs mt-0.5 font-medium ${filterStatus === tab.key ? 'text-white/80' : 'text-admin-text/60'}`}>
                            {tab.label}
                        </div>
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Cari nama, email, atau nomor telepon..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-admin-primary/50 focus:ring-2 focus:ring-admin-primary/10 bg-white"
                />
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-20 text-admin-text/40">
                        <RefreshCw size={24} className="animate-spin mr-2" />
                        Memuat data...
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-admin-text/40 gap-3">
                        <CalendarDays size={40} strokeWidth={1.5} />
                        <p className="text-sm">Belum ada data reservasi.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {/* Table Header */}
                        <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider">
                            <div className="col-span-3">Pemesan</div>
                            <div className="col-span-2">Tanggal Kunjungan</div>
                            <div className="col-span-2">Paket</div>
                            <div className="col-span-1">Peserta</div>
                            <div className="col-span-2">Dikirim</div>
                            <div className="col-span-1">Status</div>
                            <div className="col-span-1 text-center">Aksi</div>
                        </div>

                        {filtered.map(item => {
                            const cfg = STATUS_CONFIG[item.status];
                            const isExpanded = expandedId === item.id;
                            const sentDate = new Date(item.created_at).toLocaleDateString('id-ID', {
                                day: 'numeric', month: 'short', year: 'numeric'
                            });

                            return (
                                <div key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-4 px-6 py-4 items-center">
                                        {/* Pemesan */}
                                        <div className="lg:col-span-3">
                                            <p className="font-semibold text-admin-text text-sm">{item.name}</p>
                                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                                <Mail size={11} />{item.email}
                                            </p>
                                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                                <Phone size={11} />{item.phone}
                                            </p>
                                        </div>

                                        {/* Tanggal Kunjungan */}
                                        <div className="lg:col-span-2">
                                            <p className="text-sm font-semibold text-admin-primary flex items-center gap-1.5">
                                                <CalendarDays size={13} className="shrink-0" />
                                                {formatVisitDate(item.visit_date)}
                                            </p>
                                        </div>

                                        {/* Paket */}
                                        <div className="lg:col-span-2">
                                            <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-1 rounded-md font-medium flex items-center gap-1 w-fit">
                                                <Tag size={10} />
                                                {PACKAGE_LABELS[item.package_type] || item.package_type}
                                            </span>
                                        </div>

                                        {/* Peserta */}
                                        <div className="lg:col-span-1">
                                            <span className="text-xs text-gray-600 flex items-center gap-1">
                                                <Users size={11} />{item.participants}
                                            </span>
                                        </div>

                                        {/* Dikirim */}
                                        <div className="lg:col-span-2">
                                            <p className="text-xs text-gray-500">{sentDate}</p>
                                        </div>

                                        {/* Status */}
                                        <div className="lg:col-span-1">
                                            <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2 py-1 rounded-full ${cfg.badge}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                                                {cfg.label}
                                            </span>
                                        </div>

                                        {/* Actions */}
                                        <div className="lg:col-span-1 flex items-center gap-1.5 justify-start lg:justify-center flex-wrap">
                                            {item.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => updateStatus(item.id, 'confirmed')}
                                                        disabled={actionLoading === `${item.id}-confirmed`}
                                                        title="Konfirmasi"
                                                        className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors disabled:opacity-50"
                                                    >
                                                        <Check size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => updateStatus(item.id, 'rejected')}
                                                        disabled={actionLoading === `${item.id}-rejected`}
                                                        title="Tolak"
                                                        className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </>
                                            )}
                                            {item.status === 'confirmed' && (
                                                <button
                                                    onClick={() => updateStatus(item.id, 'rejected')}
                                                    disabled={actionLoading === `${item.id}-rejected`}
                                                    title="Batalkan"
                                                    className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                                                >
                                                    <X size={14} />
                                                </button>
                                            )}
                                            {item.status === 'rejected' && (
                                                <button
                                                    onClick={() => updateStatus(item.id, 'confirmed')}
                                                    disabled={actionLoading === `${item.id}-confirmed`}
                                                    title="Konfirmasi"
                                                    className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors disabled:opacity-50"
                                                >
                                                    <Check size={14} />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                                                title="Detail"
                                                className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                                            >
                                                <ChevronDown size={14} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                            </button>
                                            <button
                                                onClick={() => deleteRecord(item.id)}
                                                disabled={actionLoading === `${item.id}-delete`}
                                                title="Hapus"
                                                className="p-1.5 rounded-lg bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Expanded Notes */}
                                    {isExpanded && (
                                        <div className="px-6 pb-4">
                                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                                <p className="text-xs font-bold text-gray-500 mb-2 flex items-center gap-1.5">
                                                    <MessageSquare size={12} />
                                                    Pesan Tambahan
                                                </p>
                                                {item.notes ? (
                                                    <p className="text-sm text-admin-text leading-relaxed">{item.notes}</p>
                                                ) : (
                                                    <p className="text-xs text-gray-400 italic">Tidak ada pesan tambahan.</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
