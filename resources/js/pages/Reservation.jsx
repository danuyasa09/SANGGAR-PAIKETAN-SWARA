import React, { useState } from 'react';
import { Calendar, Users, Info, Send, Lock, Phone, Mail, User, MessageSquare, Check, Clock, Tag, Loader2, AlertCircle, MapPin, Globe, HelpCircle } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import axios from '../lib/axios';

export default function Reservation({ content }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        origin: '',
        visitDate: '',
        visitTime: 'Pagi (09.00 - 11.00 WITA)',
        participants: '',
        ageGroup: 'Campuran / Umum',
        packageType: 'Paket 1: Pengalaman Gamelan Bali',
        language: 'Bahasa Indonesia',
        notes: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await axios.post('/api/reservations', {
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                origin: formData.origin,
                visit_date: formData.visitDate,
                visit_time: formData.visitTime,
                participants: formData.participants,
                age_group: formData.ageGroup,
                package_type: formData.packageType,
                language: formData.language,
                notes: formData.notes,
            });
            setSubmitted(true);
        } catch (err) {
            const errors = err.response?.data?.errors;
            if (errors) {
                const first = Object.values(errors)[0];
                setError(Array.isArray(first) ? first[0] : first);
            } else {
                setError(err.response?.data?.message || 'Terjadi kesalahan. Silakan coba lagi.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#FAF6F0] min-h-screen font-sans pb-16">
            
            {/* HERO BANNER */}
            <section className="relative py-28 md:py-36 flex items-center justify-center overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${content('reservation_banner_image', '/images/reservation_banner.png').startsWith('http') || content('reservation_banner_image', '/images/reservation_banner.png').startsWith('/') ? content('reservation_banner_image', '/images/reservation_banner.png') : `/storage/${content('reservation_banner_image', '')}`}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#1C150C]/90 via-[#261E14]/75 to-[#261E14]/30" />

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-12 space-y-4">
                    <span className="text-xs font-bold tracking-widest text-[#C99B53] uppercase block">
                        — FORMULIR KUNJUNGAN —
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-serif text-white font-bold leading-tight tracking-wide">
                        {content('reservation_title', 'Rencanakan Kunjungan Anda')}
                    </h1>
                    <div className="h-[2px] w-20 bg-[#C99B53] mx-auto" />
                    <p className="text-sm sm:text-base text-gray-200 font-medium max-w-2xl mx-auto leading-relaxed">
                        {content('reservation_desc', 'Lengkapi formulir berikut agar kami dapat menyiapkan kegiatan yang sesuai. Tim Sanggar Paiketan Swara akan menghubungi Anda untuk mengonfirmasi ketersediaan jadwal, susunan kegiatan, dan biaya.')}
                    </p>
                </div>

                {/* SVG Curve Divider */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
                    <svg 
                        viewBox="0 0 1200 120" 
                        preserveAspectRatio="none" 
                        className="relative block w-full h-[35px] md:h-[50px] text-[#FAF6F0]"
                        fill="currentColor"
                    >
                        <path d="M0,0 C600,120 1200,0 1200,0 L1200,120 L0,120 Z"></path>
                    </svg>
                </div>
            </section>

            {/* MAIN CONTENT AREA */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* LEFT COLUMN: FORMULIR RESERVASI */}
                    <ScrollReveal className="lg:col-span-7 xl:col-span-8 flex" distance="40px">
                        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm w-full">
                            {submitted ? (
                                <div className="text-center py-12 space-y-6">
                                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                                        <Check size={32} />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-serif font-bold text-[#261E14]">
                                            Permintaan Reservasi Terkirim!
                                        </h3>
                                        <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
                                            Terima kasih telah mengajukan reservasi. Tim pengelola Sanggar Paiketan Swara akan segera menghubungi Anda melalui WhatsApp atau Email untuk konfirmasi detail kegiatan.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setSubmitted(false);
                                            setFormData({
                                                name: '', phone: '', email: '', origin: '',
                                                visitDate: '', visitTime: 'Pagi (09.00 - 11.00 WITA)',
                                                participants: '', ageGroup: 'Campuran / Umum',
                                                packageType: 'Paket 1: Pengalaman Gamelan Bali',
                                                language: 'Bahasa Indonesia', notes: ''
                                            });
                                        }}
                                        className="px-6 py-2.5 bg-[#C99B53] text-[#261E14] font-bold text-xs rounded-xl shadow-sm hover:bg-[#B7863F] transition-colors uppercase tracking-wider"
                                    >
                                        Ajukan Reservasi Lain
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="border-b border-gray-100 pb-4">
                                        <h2 className="text-xl font-serif font-bold text-[#261E14]">
                                            Data Pemesan & Jadwal Kunjungan
                                        </h2>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Mohon isi seluruh data berikut dengan benar agar tim kami dapat memproses permohonan Anda.
                                        </p>
                                    </div>

                                    {error && (
                                        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-xs text-red-600 font-medium">
                                            <AlertCircle size={16} className="shrink-0" />
                                            <span>{error}</span>
                                        </div>
                                    )}

                                    {/* Grid Input Fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        {/* Nama Pemesan atau Organisasi */}
                                        <div className="space-y-1.5 md:col-span-2">
                                            <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                                                <User size={13} className="text-[#C99B53]" />
                                                Nama Pemesan / Organisasi <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Contoh: Bpk. Wayan / Komunitas Seni Nusantara"
                                                className="w-full px-4 py-2.5 bg-[#FAF6F0]/40 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 outline-none focus:border-[#C99B53] focus:bg-white transition-all"
                                            />
                                        </div>

                                        {/* Telepon / WhatsApp */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                                                <Phone size={13} className="text-[#C99B53]" />
                                                Nomor Telepon / WhatsApp <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="Contoh: 081234567890"
                                                className="w-full px-4 py-2.5 bg-[#FAF6F0]/40 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 outline-none focus:border-[#C99B53] focus:bg-white transition-all"
                                            />
                                        </div>

                                        {/* Alamat Email */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                                                <Mail size={13} className="text-[#C99B53]" />
                                                Alamat Email <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="email@domain.com"
                                                className="w-full px-4 py-2.5 bg-[#FAF6F0]/40 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 outline-none focus:border-[#C99B53] focus:bg-white transition-all"
                                            />
                                        </div>

                                        {/* Asal Kota atau Negara */}
                                        <div className="space-y-1.5 md:col-span-2">
                                            <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                                                <MapPin size={13} className="text-[#C99B53]" />
                                                Asal Kota atau Negara
                                            </label>
                                            <input
                                                type="text"
                                                name="origin"
                                                value={formData.origin}
                                                onChange={handleInputChange}
                                                placeholder="Contoh: Denpasar, Jakarta, Australia, Jepang"
                                                className="w-full px-4 py-2.5 bg-[#FAF6F0]/40 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 outline-none focus:border-[#C99B53] focus:bg-white transition-all"
                                            />
                                        </div>

                                        {/* Tanggal Kunjungan */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                                                <Calendar size={13} className="text-[#C99B53]" />
                                                Tanggal Kunjungan <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                name="visitDate"
                                                required
                                                value={formData.visitDate}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 bg-[#FAF6F0]/40 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 outline-none focus:border-[#C99B53] focus:bg-white transition-all"
                                            />
                                        </div>

                                        {/* Waktu Kunjungan */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                                                <Clock size={13} className="text-[#C99B53]" />
                                                Waktu Kunjungan
                                            </label>
                                            <select
                                                name="visitTime"
                                                value={formData.visitTime}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 bg-[#FAF6F0]/40 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 outline-none focus:border-[#C99B53] focus:bg-white transition-all"
                                            >
                                                <option value="Pagi (09.00 - 11.00 WITA)">Pagi (09.00 - 11.00 WITA)</option>
                                                <option value="Siang (13.00 - 15.00 WITA)">Siang (13.00 - 15.00 WITA)</option>
                                                <option value="Sore (15.30 - 17.30 WITA)">Sore (15.30 - 17.30 WITA)</option>
                                                <option value="Waktu Khusus (Sesuai Kesepakatan)">Waktu Khusus (Sesuai Kesepakatan)</option>
                                            </select>
                                        </div>

                                        {/* Jumlah Peserta */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                                                <Users size={13} className="text-[#C99B53]" />
                                                Jumlah Peserta <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="participants"
                                                required
                                                value={formData.participants}
                                                onChange={handleInputChange}
                                                placeholder="Contoh: 15 orang"
                                                className="w-full px-4 py-2.5 bg-[#FAF6F0]/40 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 outline-none focus:border-[#C99B53] focus:bg-white transition-all"
                                            />
                                        </div>

                                        {/* Rentang Usia Peserta */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                                                <Users size={13} className="text-[#C99B53]" />
                                                Rentang Usia Peserta
                                            </label>
                                            <select
                                                name="ageGroup"
                                                value={formData.ageGroup}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 bg-[#FAF6F0]/40 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 outline-none focus:border-[#C99B53] focus:bg-white transition-all"
                                            >
                                                <option value="Anak-anak (TK - SD)">Anak-anak (TK - SD)</option>
                                                <option value="Remaja / Pelajar (SMP - SMA)">Remaja / Pelajar (SMP - SMA)</option>
                                                <option value="Mahasiswa / Dewasa">Mahasiswa / Dewasa</option>
                                                <option value="Campuran / Umum / Keluarga">Campuran / Umum / Keluarga</option>
                                                <option value="Lanjut Usia (Senior)">Lanjut Usia (Senior)</option>
                                            </select>
                                        </div>

                                        {/* Paket yang Dipilih */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                                                <Tag size={13} className="text-[#C99B53]" />
                                                Paket yang Dipilih <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                name="packageType"
                                                value={formData.packageType}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 bg-[#FAF6F0]/40 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 outline-none focus:border-[#C99B53] focus:bg-white transition-all"
                                            >
                                                <option value="Paket 1: Pengalaman Gamelan Bali">Paket 1: Pengalaman Gamelan Bali</option>
                                                <option value="Paket 2: Pengalaman Tari Bali">Paket 2: Pengalaman Tari Bali</option>
                                                <option value="Paket 3: Gamelan dan Tari Bali">Paket 3: Gamelan dan Tari Bali</option>
                                                <option value="Program Khusus / Kustom">Program Khusus / Kustom</option>
                                            </select>
                                        </div>

                                        {/* Pilihan Bahasa Pendampingan */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                                                <Globe size={13} className="text-[#C99B53]" />
                                                Pilihan Bahasa Pendampingan
                                            </label>
                                            <select
                                                name="language"
                                                value={formData.language}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 bg-[#FAF6F0]/40 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 outline-none focus:border-[#C99B53] focus:bg-white transition-all"
                                            >
                                                <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                                                <option value="Bahasa Bali">Bahasa Bali</option>
                                                <option value="Bahasa Inggris (English)">Bahasa Inggris (English)</option>
                                                <option value="Bahasa Lainnya">Bahasa Lainnya</option>
                                            </select>
                                        </div>

                                        {/* Tujuan atau Kebutuhan Khusus */}
                                        <div className="space-y-1.5 md:col-span-2">
                                            <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                                                <MessageSquare size={13} className="text-[#C99B53]" />
                                                Tujuan atau Kebutuhan Khusus (Catatan Tambahan)
                                            </label>
                                            <textarea
                                                name="notes"
                                                rows="3"
                                                value={formData.notes}
                                                onChange={handleInputChange}
                                                placeholder="Contoh: Kunjungan studi budaya, permintaan materi tabuh tertentu, fasilitas ramah disabilitas, dll."
                                                className="w-full px-4 py-2.5 bg-[#FAF6F0]/40 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 outline-none focus:border-[#C99B53] focus:bg-white transition-all resize-none"
                                            ></textarea>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-4 border-t border-gray-100">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full py-4 bg-[#C99B53] hover:bg-[#B7863F] text-[#261E14] font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 uppercase tracking-wider transition-all cursor-pointer disabled:opacity-60"
                                        >
                                            {loading ? (
                                                <>
                                                    <Loader2 size={16} className="animate-spin" />
                                                    <span>Memproses Permintaan...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={15} />
                                                    <span>Kirim Permintaan Reservasi</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </ScrollReveal>

                    {/* RIGHT COLUMN: SUMMARY & CATATAN PENTING */}
                    <ScrollReveal className="lg:col-span-5 xl:col-span-4 space-y-6" delay={200} distance="40px">
                        {/* Summary Widget */}
                        <div className="bg-[#261E14] text-[#FAF6F0] rounded-2xl p-6 sm:p-7 border border-[#C99B53]/20 shadow-xl space-y-5">
                            <h3 className="text-lg font-serif font-bold text-[#C99B53] border-b border-gray-800 pb-3">
                                Ringkasan Permintaan
                            </h3>

                            <div className="space-y-3.5 text-xs">
                                <div>
                                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Paket Pilihan</span>
                                    <span className="font-semibold text-white">{formData.packageType}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Tanggal & Waktu</span>
                                    <span className="font-semibold text-white">
                                        {formData.visitDate || 'Belum dipilih'} · {formData.visitTime}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Jumlah & Usia Peserta</span>
                                    <span className="font-semibold text-white">
                                        {formData.participants || '-'} ({formData.ageGroup})
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Bahasa Pendampingan</span>
                                    <span className="font-semibold text-white">{formData.language}</span>
                                </div>
                            </div>
                        </div>

                        {/* Catatan Penting Sesuai Docx */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-3 text-xs text-gray-600 leading-relaxed font-sans">
                            <h4 className="font-serif font-bold text-sm text-[#261E14] flex items-center gap-2">
                                <Info size={15} className="text-[#C99B53]" />
                                Catatan Reservasi:
                            </h4>
                            <p>
                                1. Reservasi dinyatakan berlaku setelah memperoleh konfirmasi dari pengelola sanggar.
                            </p>
                            <p>
                                2. Susunan kegiatan dapat disesuaikan dengan kondisi lapangan, jumlah peserta, dan kesepakatan bersama.
                            </p>
                            <p>
                                3. Apabila membutuhkan penawaran khusus atau pendampingan bahasa asing, silakan cantumkan pada kolom catatan.
                            </p>
                        </div>
                    </ScrollReveal>

                </div>
            </div>
        </div>
    );
}
