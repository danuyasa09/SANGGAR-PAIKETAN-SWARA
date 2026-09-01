import React from 'react';
import { Users, Award, Shield, Compass, Heart, Activity, Calendar, Flag, BookOpen, Sparkles, Sprout, CheckCircle2 } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export default function About({ content, changePage }) {
    const nilaiNilai = [
        {
            icon: <Shield className="w-6 h-6 text-[#C99B53]" />,
            title: "Pelestarian",
            desc: "Menjaga seni dan pengetahuan budaya agar terus hidup dan diwariskan kepada generasi berikutnya."
        },
        {
            icon: <Users className="w-6 h-6 text-[#C99B53]" />,
            title: "Kebersamaan",
            desc: "Menjalankan kegiatan dengan semangat gotong royong dan rasa saling menghormati."
        },
        {
            icon: <BookOpen className="w-6 h-6 text-[#C99B53]" />,
            title: "Pendidikan",
            desc: "Menjadikan seni sebagai media pembelajaran, pembentukan karakter, dan pertukaran pengetahuan."
        },
        {
            icon: <Sparkles className="w-6 h-6 text-[#C99B53]" />,
            title: "Autentisitas",
            desc: "Memperkenalkan budaya secara jujur tanpa menghilangkan identitas dan nilai lokal."
        },
        {
            icon: <Sprout className="w-6 h-6 text-[#C99B53]" />,
            title: "Keberlanjutan",
            desc: "Mengembangkan kegiatan yang bermanfaat bagi budaya, masyarakat, dan generasi mendatang."
        }
    ];

    const misiList = [
        "Melestarikan seni gamelan dan tari Bali.",
        "Mendorong keterlibatan generasi muda dalam kegiatan seni dan budaya.",
        "Menyelenggarakan pembelajaran budaya yang edukatif dan partisipatif.",
        "Mengembangkan paket edu-wisata berbasis masyarakat.",
        "Meningkatkan kemampuan anggota dalam pengelolaan sanggar dan pelayanan pengunjung.",
        "Membangun kerja sama dengan desa, sekolah, perguruan tinggi, komunitas, dan pelaku pariwisata.",
        "Memberikan manfaat sosial dan ekonomi kepada masyarakat lokal."
    ];

    return (
        <div className="bg-[#FAF6F0] min-h-screen">
            
            {/* HERO HEADER */}
            <section className="relative py-32 md:py-44 flex items-center justify-center overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${content('about_banner_image', '/images/about_banner.png').startsWith('http') || content('about_banner_image', '/images/about_banner.png').startsWith('/') ? content('about_banner_image', '/images/about_banner.png') : `/storage/${content('about_banner_image', '/images/about_banner.png')}`}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-[#FAF6F0]" />

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-12 space-y-6">
                    <span className="text-xs font-bold tracking-widest text-[#C99B53] uppercase block">
                        — PROFIL SANGGAR —
                    </span>
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white font-bold leading-tight">
                        {content('about_title', 'Tentang Sanggar Paiketan Swara')}
                    </h1>
                    <div className="h-[2px] w-20 bg-[#C99B53] mx-auto" />
                    <p className="text-base sm:text-lg text-gray-100 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
                        {content('about_subtitle', 'Ruang latihan gamelan dan tari, pembinaan karakter, pelestarian budaya, serta kebersamaan lintas generasi di Desa Bantas.')}
                    </p>
                </div>
            </section>

            {/* CERITA KAMI SECTION */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <ScrollReveal className="lg:col-span-6 space-y-6" distance="40px">
                        <div className="space-y-2">
                            <span className="text-xs font-bold tracking-widest text-[#C99B53] uppercase block">
                                — SEJARAH & PERJALANAN —
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-serif text-[#261E14] font-bold leading-tight">
                                {content('about_story_title', 'Cerita Kami')}
                            </h2>
                        </div>
                        <div className="h-[2px] w-16 bg-[#C99B53]" />
                        
                        <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed font-sans font-medium">
                            <p>
                                {content('about_story_p1', 'Seni tumbuh bersama kehidupan masyarakat Desa Bantas. Gamelan dan tari hadir dalam upacara adat, kegiatan desa, serta berbagai peristiwa yang mempererat hubungan sosial masyarakat.')}
                            </p>
                            <p>
                                {content('about_story_p2', 'Dari lingkungan inilah Sanggar Paiketan Swara berkembang. Sanggar menjadi tempat bagi anggota masyarakat dan generasi muda untuk berlatih, berkarya, serta belajar mengenai disiplin, kebersamaan, dan tanggung jawab.')}
                            </p>
                            <p>
                                {content('about_story_p3', 'Seiring berkembangnya pariwisata berbasis pengalaman, sanggar mulai mengemas aktivitas seni menjadi program edu-wisata. Program tersebut memberikan kesempatan kepada pengunjung untuk tidak hanya melihat, tetapi juga memahami dan mencoba seni Bali secara langsung.')}
                            </p>
                            <p>
                                {content('about_story_p4', 'Pengembangan ini dilakukan dengan tetap menjaga autentisitas, etika, dan batas antara seni yang dapat diperkenalkan kepada pengunjung dengan praktik budaya yang memiliki nilai sakral.')}
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal className="lg:col-span-6" delay={200} distance="40px">
                        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#C99B53]/20">
                            <img
                                src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1000&auto=format&fit=crop"
                                alt="Kegiatan Sanggar Paiketan Swara"
                                className="w-full h-auto object-cover aspect-[4/3]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6 text-white text-xs font-serif italic">
                                "Menjaga autentisitas seni tradisi sekaligus membina generasi muda di Desa Bantas."
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* VISI & MISI SECTION */}
            <section className="py-20 bg-white border-t border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                        
                        {/* Left: Visi Card */}
                        <ScrollReveal className="lg:col-span-5 flex" distance="40px">
                            <div className="bg-[#261E14] text-[#FAF6F0] rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col justify-between items-start w-full border border-neutral-800">
                                <div className="space-y-4">
                                    <span className="text-xs font-bold tracking-widest text-[#C99B53] uppercase flex items-center gap-2">
                                        <Compass size={16} /> VISI KAMI
                                    </span>
                                    <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-white">
                                        {content('about_visi_title', 'Visi')}
                                    </h3>
                                    <div className="h-[2px] w-12 bg-[#C99B53]" />
                                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans italic pt-2">
                                        "{content('about_visi_desc', 'Menjadi sanggar seni berbasis masyarakat yang berperan aktif dalam pelestarian budaya Bali, pendidikan generasi muda, dan pengembangan edu-wisata yang bertanggung jawab.')}"
                                    </p>
                                </div>
                                
                                <button
                                    onClick={() => changePage && changePage('reservation')}
                                    className="mt-8 w-full py-4 bg-[#C99B53] hover:bg-[#B7863F] text-[#261E14] font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-3 transition-colors duration-200 uppercase tracking-wider cursor-pointer"
                                >
                                    <Calendar size={18} />
                                    <span>Reservasi Kunjungan</span>
                                </button>
                            </div>
                        </ScrollReveal>

                        {/* Right: 7 Misi Points */}
                        <ScrollReveal className="lg:col-span-7 space-y-6 flex flex-col justify-center" delay={200} distance="40px">
                            <div className="space-y-2">
                                <span className="text-xs font-bold tracking-widest text-[#C99B53] uppercase flex items-center gap-2">
                                    <Flag size={16} /> MISI KAMI
                                </span>
                                <h3 className="text-2xl sm:text-3xl font-serif text-[#261E14] font-bold">
                                    {content('about_misi_title', 'Misi')}
                                </h3>
                            </div>

                            <div className="space-y-2.5">
                                {misiList.map((misi, idx) => (
                                    <div 
                                        key={idx} 
                                        className="bg-[#FAF6F0]/80 border border-[#C99B53]/15 rounded-xl p-4 flex items-start gap-3.5 shadow-xs hover:bg-[#FAF6F0] transition-colors"
                                    >
                                        <span className="w-6 h-6 rounded-full bg-[#C99B53] text-[#261E14] text-xs font-bold font-serif flex items-center justify-center shrink-0 mt-0.5">
                                            {idx + 1}
                                        </span>
                                        <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-sans font-medium">
                                            {misi}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* NILAI-NILAI KAMI SECTION */}
            <section className="py-24 bg-[#FAF6F0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal className="text-center mb-16 space-y-3" distance="30px">
                        <span className="text-xs font-bold tracking-widest text-[#C99B53] uppercase block">
                            — PRINSIP & INTEGRITAS —
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-serif text-[#261E14] font-bold">
                            Nilai-Nilai Kami
                        </h2>
                        <div className="h-[2px] w-20 bg-[#C99B53] mx-auto mt-2" />
                        <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto font-medium">
                            Prinsip utama yang menjadi pondasi seluruh kegiatan seni, pembelajaran, dan pelayanan di Sanggar Paiketan Swara.
                        </p>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                        {nilaiNilai.map((val, idx) => (
                            <ScrollReveal
                                key={idx}
                                delay={idx * 80}
                                distance="30px"
                                className="flex"
                            >
                                <div className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start w-full border border-gray-100">
                                    <div className="w-12 h-12 bg-[#261E14] rounded-xl flex items-center justify-center mb-5 text-[#C99B53] shadow-sm">
                                        {val.icon}
                                    </div>
                                    <h3 className="text-lg font-serif font-bold text-[#261E14] mb-2">
                                        {val.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                                        {val.desc}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
