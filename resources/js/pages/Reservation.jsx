import React, { useState } from 'react';
import { Calendar, Users, Info, Send, Lock, Phone, Mail, User, MessageSquare, Check, Clock, Tag, Loader2, AlertCircle } from 'lucide-react';
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
        visitDate: '',
        participants: '',
        packageType: '',
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
                visit_date: formData.visitDate,
                participants: formData.participants,
                package_type: formData.packageType,
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
            <section className="relative py-28 md:py-32 flex items-center justify-center overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('/images/reservation_banner.png')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#1C150C]/90 via-[#261E14]/75 to-[#261E14]/30" />

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-12 space-y-4">
                    <h1 className="text-3xl sm:text-5xl font-serif text-white font-bold leading-tight tracking-wide">
                        Reservasi Kunjungan
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium">
                        <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">Beranda</span>
                        <span className="text-gray-400">&gt;</span>
                        <span className="text-[#C99B53]">Reservasi Kunjungan</span>
                    </div>
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
                                            Reservasi Diterima!
                                        </h3>
                                        <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
                                            Terima kasih, <span className="font-semibold text-[#261E14]">{formData.name}</span>. Permintaan reservasi kunjungan Anda pada tanggal <span className="font-semibold text-[#261E14]">{formData.visitDate}</span> telah terdaftar di sistem kami.
                                        </p>
                                    </div>
                                    <div className="bg-[#FAF6F0] rounded-xl p-6 border border-[#C99B53]/15 max-w-md mx-auto text-left text-xs space-y-2.5">
                                        <div className="flex justify-between"><span className="text-gray-500">Pilihan Paket:</span> <span className="font-semibold text-[#261E14]">{formData.packageType === 'paket1' ? 'Paket 1: Gamelan' : formData.packageType === 'paket2' ? 'Paket 2: Tari' : formData.packageType === 'paket3' ? 'Paket 3: Gamelan & Tari' : 'Program Khusus'}</span></div>
                                        <div className="flex justify-between"><span className="text-gray-500">Jumlah Peserta:</span> <span className="font-semibold text-[#261E14]">{formData.participants} Orang</span></div>
                                        <div className="flex justify-between"><span className="text-gray-500">Nomor WhatsApp:</span> <span className="font-semibold text-[#261E14]">{formData.phone}</span></div>
                                        <div className="flex justify-between"><span className="text-gray-500">Email:</span> <span className="font-semibold text-[#261E14]">{formData.email}</span></div>
                                    </div>
                                    <p className="text-xs text-gray-400 max-w-sm mx-auto">
                                        Detail konfirmasi ketersediaan jadwal beserta langkah selanjutnya sedang kami siapkan untuk dikirimkan melalui WhatsApp/email.
                                    </p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="px-6 py-2.5 bg-[#C99B53] text-[#261E14] font-bold text-xs rounded-md shadow-sm hover:bg-[#B7863F] transition-colors cursor-pointer"
                                    >
                                        Buat Pemesanan Baru
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-1">
                                        <h2 className="text-2xl font-serif font-bold text-[#261E14]">Formulir Reservasi</h2>
                                        <p className="text-xs sm:text-sm text-gray-500">
                                            Isi formulir di bawah ini untuk melakukan reservasi kunjungan ke Sanggar Paiketan Swara.
                                        </p>
                                    </div>

                                    <div className="space-y-5">
                                        {/* Nama Lengkap */}
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-xs font-bold text-gray-700">
                                                Nama Lengkap <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                                    <User size={16} />
                                                </span>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    placeholder="Masukkan nama lengkap Anda"
                                                    className="w-full px-4 py-3 pl-11 rounded-lg border border-gray-200 focus:border-[#C99B53] focus:ring-1 focus:ring-[#C99B53] outline-none text-sm transition-all duration-200 bg-white"
                                                />
                                            </div>
                                        </div>

                                        {/* WhatsApp */}
                                        <div className="space-y-2">
                                            <label htmlFor="phone" className="text-xs font-bold text-gray-700">
                                                WhatsApp <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                                    <Phone size={16} />
                                                </span>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    required
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    placeholder="Contoh: 0812 3456 7890"
                                                    className="w-full px-4 py-3 pl-11 rounded-lg border border-gray-200 focus:border-[#C99B53] focus:ring-1 focus:ring-[#C99B53] outline-none text-sm transition-all duration-200 bg-white"
                                                />
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-xs font-bold text-gray-700">
                                                Email <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                                    <Mail size={16} />
                                                </span>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="nama@email.com"
                                                    className="w-full px-4 py-3 pl-11 rounded-lg border border-gray-200 focus:border-[#C99B53] focus:ring-1 focus:ring-[#C99B53] outline-none text-sm transition-all duration-200 bg-white"
                                                />
                                            </div>
                                        </div>

                                        {/* Tanggal Kunjungan */}
                                        <div className="space-y-2">
                                            <label htmlFor="visitDate" className="text-xs font-bold text-gray-700">
                                                Tanggal Kunjungan <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                                    <Calendar size={16} />
                                                </span>
                                                <input
                                                    type="date"
                                                    id="visitDate"
                                                    name="visitDate"
                                                    required
                                                    value={formData.visitDate}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 pl-11 rounded-lg border border-gray-200 focus:border-[#C99B53] focus:ring-1 focus:ring-[#C99B53] outline-none text-sm transition-all duration-200 bg-white"
                                                />
                                            </div>
                                        </div>

                                        {/* Jumlah Peserta & Pilihan Paket (Two Columns) */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label htmlFor="participants" className="text-xs font-bold text-gray-700">
                                                    Jumlah Peserta <span className="text-red-500">*</span>
                                                </label>
                                                <div className="relative">
                                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                                        <Users size={16} />
                                                    </span>
                                                    <select
                                                        id="participants"
                                                        name="participants"
                                                        required
                                                        value={formData.participants}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 pl-11 pr-8 rounded-lg border border-gray-200 focus:border-[#C99B53] focus:ring-1 focus:ring-[#C99B53] outline-none text-sm transition-all duration-200 bg-white appearance-none cursor-pointer"
                                                    >
                                                        <option value="" disabled>Pilih jumlah peserta</option>
                                                        <option value="10-20">10 - 20 Orang</option>
                                                        <option value="21-30">21 - 30 Orang</option>
                                                        <option value="31-50">31 - 50 Orang</option>
                                                        <option value="50+">Lebih dari 50 Orang</option>
                                                    </select>
                                                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-500 w-0 h-0" />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="packageType" className="text-xs font-bold text-gray-700">
                                                    Pilihan Paket <span className="text-red-500">*</span>
                                                </label>
                                                <div className="relative">
                                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                                        <Tag size={16} />
                                                    </span>
                                                    <select
                                                        id="packageType"
                                                        name="packageType"
                                                        required
                                                        value={formData.packageType}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 pl-11 pr-8 rounded-lg border border-gray-200 focus:border-[#C99B53] focus:ring-1 focus:ring-[#C99B53] outline-none text-sm transition-all duration-200 bg-white appearance-none cursor-pointer"
                                                    >
                                                        <option value="" disabled>Pilih paket edu-wisata</option>
                                                        <option value="paket1">Paket 1: Pengalaman Gamelan Bali</option>
                                                        <option value="paket2">Paket 2: Pengalaman Tari Bali</option>
                                                        <option value="paket3">Paket 3: Gamelan dan Tari Bali</option>
                                                        <option value="custom">Kustom / Program Khusus</option>
                                                    </select>
                                                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-500 w-0 h-0" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Pesan Tambahan */}
                                        <div className="space-y-2">
                                            <label htmlFor="notes" className="text-xs font-bold text-gray-700">
                                                Pesan Tambahan (Opsional)
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3.5 top-5 text-gray-400 pointer-events-none">
                                                    <MessageSquare size={16} />
                                                </span>
                                                <textarea
                                                    id="notes"
                                                    name="notes"
                                                    rows="4"
                                                    value={formData.notes}
                                                    onChange={handleInputChange}
                                                    placeholder="Tuliskan kebutuhan khusus atau informasi tambahan lainnya"
                                                    className="w-full px-4 py-3 pl-11 rounded-lg border border-gray-200 focus:border-[#C99B53] focus:ring-1 focus:ring-[#C99B53] outline-none text-sm resize-none transition-all duration-200 bg-white"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Info Alert */}
                                    <div className="bg-[#FAF6F0] rounded-xl p-4 border border-[#C99B53]/20 flex items-start gap-3">
                                        <Info className="text-[#C99B53] shrink-0 mt-0.5" size={16} />
                                        <p className="text-xs text-gray-600 leading-relaxed font-medium">
                                            Reservasi akan kami konfirmasi melalui WhatsApp atau email maksimal 1x24 jam pada hari kerja.
                                        </p>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="space-y-3 pt-2">
                                        {error && (
                                            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs">
                                                <AlertCircle size={14} className="shrink-0" />
                                                <span>{error}</span>
                                            </div>
                                        )}
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full py-3.5 bg-[#1A2F1C] hover:bg-[#0f1d11] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                                        >
                                            {loading ? <><Loader2 size={14} className="animate-spin" /><span>Mengirim...</span></> : <><Send size={14} /><span>Kirim Reservasi</span></>}
                                        </button>
                                        
                                        <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
                                            <Lock size={12} />
                                            <span>Data Anda aman dan hanya digunakan untuk keperluan reservasi.</span>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>
                    </ScrollReveal>

                    {/* RIGHT COLUMN: SIDEBAR WIDGETS */}
                    <ScrollReveal className="lg:col-span-5 xl:col-span-4 flex flex-col space-y-6" delay={200} distance="40px">
                        <div className="w-full space-y-6">
                            
                            {/* WIDGET 1: INFORMASI PENTING */}
                            <div className="bg-[#FAF6F0] rounded-2xl p-6 border border-[#C99B53]/15 shadow-sm space-y-5">
                                <h3 className="text-lg font-serif font-bold text-[#261E14]">
                                    Informasi Penting
                                </h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-white border border-[#C99B53]/25 flex items-center justify-center text-[#C99B53] shrink-0">
                                            <Users size={14} />
                                        </div>
                                        <p className="text-xs text-gray-600 leading-relaxed">
                                            Minimal peserta <span className="font-bold">10 orang</span> dan maksimal 30 orang.
                                        </p>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-white border border-[#C99B53]/25 flex items-center justify-center text-[#C99B53] shrink-0">
                                            <Calendar size={14} />
                                        </div>
                                        <p className="text-xs text-gray-600 leading-relaxed">
                                            Reservasi sebaiknya dilakukan <span className="font-bold">minimal 2 hari</span> sebelumnya.
                                        </p>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-white border border-[#C99B53]/25 flex items-center justify-center text-[#C99B53] shrink-0">
                                            <Clock size={14} />
                                        </div>
                                        <p className="text-xs text-gray-600 leading-relaxed">
                                            Paket dan jadwal dapat <span className="font-bold">disesuaikan dengan kebutuhan</span> kelompok Anda.
                                        </p>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-white border border-[#C99B53]/25 flex items-center justify-center text-[#C99B53] shrink-0">
                                            <Phone size={14} />
                                        </div>
                                        <p className="text-xs text-gray-600 leading-relaxed">
                                            Untuk informasi lebih lanjut, <span className="font-bold">silakan hubungi kami melalui WhatsApp</span>.
                                        </p>
                                    </li>
                                </ul>
                            </div>

                            {/* WIDGET 2: PILIHAN PAKET EDU-WISATA */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-serif font-bold text-[#261E14] px-1">
                                    Pilihan Paket Edu-Wisata
                                </h3>
                                <div className="space-y-3">
                                    {/* Paket 1 */}
                                    <div className="bg-white border border-gray-100 rounded-xl p-3.5 flex gap-3.5 shadow-sm hover:shadow-md transition-shadow">
                                        <div 
                                            className="w-16 h-16 rounded-lg bg-cover bg-center shrink-0 bg-gray-100"
                                            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1620801582341-237ab047de0f?q=80&w=200&auto=format&fit=crop')` }}
                                        />
                                        <div className="space-y-1">
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Paket 1</span>
                                            <h4 className="text-xs sm:text-sm font-bold text-[#261E14] font-serif leading-tight">Pengalaman Gamelan Bali</h4>
                                            <p className="text-[10px] text-gray-400">60 - 90 menit | 10 - 30 orang</p>
                                            <p className="text-xs font-bold text-[#C99B53]">Rp150.000 <span className="text-[10px] text-gray-400 font-normal">/ peserta</span></p>
                                        </div>
                                    </div>

                                    {/* Paket 2 */}
                                    <div className="bg-white border border-gray-100 rounded-xl p-3.5 flex gap-3.5 shadow-sm hover:shadow-md transition-shadow">
                                        <div 
                                            className="w-16 h-16 rounded-lg bg-cover bg-center shrink-0 bg-gray-100"
                                            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=200&auto=format&fit=crop')` }}
                                        />
                                        <div className="space-y-1">
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Paket 2</span>
                                            <h4 className="text-xs sm:text-sm font-bold text-[#261E14] font-serif leading-tight">Pengalaman Tari Bali</h4>
                                            <p className="text-[10px] text-gray-400">60 - 90 menit | 10 - 30 orang</p>
                                            <p className="text-xs font-bold text-[#C99B53]">Rp150.000 <span className="text-[10px] text-gray-400 font-normal">/ peserta</span></p>
                                        </div>
                                    </div>

                                    {/* Paket 3 */}
                                    <div className="bg-white border border-gray-100 rounded-xl p-3.5 flex gap-3.5 shadow-sm hover:shadow-md transition-shadow">
                                        <div 
                                            className="w-16 h-16 rounded-lg bg-cover bg-center shrink-0 bg-gray-100"
                                            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506084868230-bb9d95c24759?q=80&w=200&auto=format&fit=crop')` }}
                                        />
                                        <div className="space-y-1">
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Paket 3</span>
                                            <h4 className="text-xs sm:text-sm font-bold text-[#261E14] font-serif leading-tight">Gamelan dan Tari Bali</h4>
                                            <p className="text-[10px] text-gray-400">90 - 120 menit | 10 - 30 orang</p>
                                            <p className="text-xs font-bold text-[#C99B53]">Rp220.000 <span className="text-[10px] text-gray-400 font-normal">/ peserta</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* WIDGET 3: BUTUH BANTUAN? */}
                            <div className="bg-[#F3EFE9] rounded-2xl p-6 border border-gray-200/50 shadow-sm text-center relative overflow-hidden group">
                                {/* Decorative background outline icon */}
                                <div className="absolute -right-8 -top-8 text-gray-300/15 pointer-events-none transition-transform group-hover:scale-110 duration-500">
                                    <MessageSquare size={130} />
                                </div>

                                <div className="relative z-10 space-y-4">
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1A2F1C] mx-auto shadow-sm">
                                        <MessageSquare size={18} />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-bold text-[#261E14]">Butuh Bantuan?</h4>
                                        <p className="text-[11px] text-gray-500 leading-relaxed max-w-[220px] mx-auto">
                                            Hubungi kami langsung melalui WhatsApp untuk konsultasi atau informasi lebih lanjut.
                                        </p>
                                    </div>
                                    <a 
                                        href="https://wa.me/6281234567890" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-full py-2.5 bg-[#1A2F1C] hover:bg-[#0f1d11] text-white font-bold text-xs rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <Phone size={12} />
                                        <span>Chat WhatsApp</span>
                                    </a>
                                </div>
                            </div>

                        </div>
                    </ScrollReveal>

                </div>
            </div>

        </div>
    );
}
