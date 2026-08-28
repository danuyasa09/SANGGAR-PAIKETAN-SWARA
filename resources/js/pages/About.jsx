import React from 'react';
import { Users, Award, Shield, Compass, Heart, Activity } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export default function About({ content }) {
    const coreValues = [
        {
            icon: <Users className="w-8 h-8 text-[#C99B53]" />,
            title: "Pasemetonan",
            desc: "Kekeluargaan dan persaudaraan yang erat antar anggota sanggar, menciptakan rasa saling memiliki."
        },
        {
            icon: <Award className="w-8 h-8 text-[#C99B53]" />,
            title: "Kualitas Tinggi",
            desc: "Dedikasi untuk selalu memberikan penampilan dan pembelajaran terbaik bagi seluruh peserta."
        },
        {
            icon: <Shield className="w-8 h-8 text-[#C99B53]" />,
            title: "Taksu",
            desc: "Menjaga aura spiritual dan jiwa (taksu) dalam setiap gerakan tarian dan hentakan nada gamelan."
        },
        {
            icon: <Activity className="w-8 h-8 text-[#C99B53]" />,
            title: "Inovasi",
            desc: "Terbuka terhadap perkembangan zaman dan kolaborasi baru tanpa meninggalkan akar tradisi."
        },
        {
            icon: <Heart className="w-8 h-8 text-[#C99B53]" />,
            title: "Pengabdian",
            desc: "Berkontribusi aktif dalam melestarikan warisan leluhur dan budaya Bali untuk generasi mendatang."
        }
    ];

    return (
        <div className="bg-[#FAF6F0] min-h-screen">
            
            {/* HERO HEADER */}
            <section className="relative py-32 md:py-44 flex items-center justify-center overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${content('about_banner_image', '/images/about_banner.png').startsWith('http') || content('about_banner_image', '/images/about_banner.png').startsWith('/') ? content('about_banner_image', '/images/about_banner.png') : `/storage/${content('about_banner_image', '/images/about_banner.png')}`}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-[#FAF6F0]" />

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-12 space-y-6">
                    <span className="text-xs font-bold tracking-widest text-[#C99B53] uppercase block">
                        — TENTANG KAMI
                    </span>
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white font-bold leading-tight">
                        {content('about_title', 'Merajut Harmoni, Melestarikan Budaya')}
                    </h1>
                    <div className="h-[2px] w-20 bg-[#C99B53] mx-auto" />
                    <p className="text-base sm:text-lg text-gray-100 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
                        {content('about_subtitle', 'Menjaga tradisi, menghidupkan budaya, dan mewariskan keindahan seni Bali kepada dunia.')}
                    </p>
                </div>
            </section>

            {/* VISI & MISI SECTION */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left Graphic Mockup representation of "5 Core Values" */}
                    <ScrollReveal className="lg:col-span-5" distance="40px">
                        <div className="bg-white rounded-2xl p-6 border border-[#C99B53]/20 shadow-md">
                            <div className="space-y-4">
                                <span className="text-xs font-bold text-[#C99B53] uppercase tracking-wider block">
                                    SANGGAR PAIKETAN SWARA
                                </span>
                                <h3 className="text-xl font-serif font-bold text-[#261E14]">
                                    5 Nilai Inti Kami
                                </h3>
                                <div className="h-[1px] bg-gray-200 w-full" />
                                <div className="grid grid-cols-1 gap-3.5">
                                    <div className="bg-[#FAF6F0] p-3 rounded-lg border border-[#C99B53]/10 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-bold text-[#C99B53]">1</div>
                                        <span className="font-serif text-sm font-semibold text-[#261E14]">Pasemetonan</span>
                                    </div>
                                    <div className="bg-[#FAF6F0] p-3 rounded-lg border border-[#C99B53]/10 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-bold text-[#C99B53]">2</div>
                                        <span className="font-serif text-sm font-semibold text-[#261E14]">Kualitas Tinggi</span>
                                    </div>
                                    <div className="bg-[#FAF6F0] p-3 rounded-lg border border-[#C99B53]/10 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-bold text-[#C99B53]">3</div>
                                        <span className="font-serif text-sm font-semibold text-[#261E14]">Taksu</span>
                                    </div>
                                    <div className="bg-[#FAF6F0] p-3 rounded-lg border border-[#C99B53]/10 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-bold text-[#C99B53]">4</div>
                                        <span className="font-serif text-sm font-semibold text-[#261E14]">Inovasi</span>
                                    </div>
                                    <div className="bg-[#FAF6F0] p-3 rounded-lg border border-[#C99B53]/10 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-bold text-[#C99B53]">5</div>
                                        <span className="font-serif text-sm font-semibold text-[#261E14]">Pengabdian</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Right Visi & Misi texts */}
                    <ScrollReveal className="lg:col-span-7 space-y-10" delay={200} distance="40px">
                        {/* Visi */}
                        <div className="space-y-4">
                            <span className="text-xs font-bold tracking-widest text-[#C99B53] uppercase flex items-center gap-2">
                                <Compass size={16} /> VISI KAMI
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-serif text-[#261E14] font-bold">
                                {content('about_visi_title', 'Pusat Pelestarian Seni Budaya Bali')}
                            </h2>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-sans border-l-4 border-[#C99B53] pl-4 py-1 italic">
                                {content('about_visi_desc', '"Menjadi ruang terdepan dalam menjaga, mengembangkan, dan mempromosikan kekayaan seni tari dan tabuh tradisional Bali di kancah nasional maupun internasional."')}
                            </p>
                        </div>

                        {/* Misi */}
                        <div className="space-y-6">
                            <span className="text-xs font-bold tracking-widest text-[#C99B53] uppercase flex items-center gap-2">
                                <Activity size={16} /> MISI KAMI
                            </span>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <span className="font-serif text-2xl font-bold text-[#C99B53] leading-none">01</span>
                                    <div>
                                        <h4 className="font-serif font-bold text-[#261E14] text-base">{content('about_misi1_title', 'Pendidikan Seni Berkualitas')}</h4>
                                        <p className="text-sm text-gray-600 mt-1">{content('about_misi1_desc', 'Menyelenggarakan pendidikan dan pelatihan seni tari dan gamelan Bali yang berkualitas untuk segala usia dan tingkat keahlian.')}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <span className="font-serif text-2xl font-bold text-[#C99B53] leading-none">02</span>
                                    <div>
                                        <h4 className="font-serif font-bold text-[#261E14] text-base">{content('about_misi2_title', 'Inovasi Berakar Tradisi')}</h4>
                                        <p className="text-sm text-gray-600 mt-1">{content('about_misi2_desc', 'Menciptakan karya seni inovatif dan kolaboratif yang tetap berakar kuat pada nilai-nilai tradisi leluhur Bali.')}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <span className="font-serif text-2xl font-bold text-[#C99B53] leading-none">03</span>
                                    <div>
                                        <h4 className="font-serif font-bold text-[#261E14] text-base">{content('about_misi3_title', 'Pemberdayaan Komunitas')}</h4>
                                        <p className="text-sm text-gray-600 mt-1">{content('about_misi3_desc', 'Membangun komunitas seniman muda yang berdedikasi tinggi dan berdaya secara ekonomi maupun sosial di masyarakat.')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* 5 CORE VALUES SECTION */}
            <section className="py-24 bg-white border-t border-[#C99B53]/15">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal className="text-center mb-16 space-y-3" distance="30px">
                        <span className="text-xs font-bold tracking-widest text-[#C99B53] uppercase block">
                            — PRINSIP UTAMA —
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-serif text-[#261E14] font-bold">
                            5 Nilai Inti Sanggar
                        </h2>
                        <p className="text-sm text-gray-500 max-w-xl mx-auto">
                            Prinsip-prinsip yang membimbing setiap langkah kami dalam berkarya, berlatih, dan berinteraksi sehari-hari.
                        </p>
                        <div className="h-[2px] w-20 bg-[#C99B53] mx-auto mt-2" />
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {coreValues.map((value, idx) => (
                            <ScrollReveal
                                key={idx}
                                delay={idx * 150}
                                distance="40px"
                                className="flex"
                            >
                                <div
                                    className="bg-[#FAF6F0] rounded-xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start group w-full"
                                >
                                    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-inner mb-6 group-hover:scale-105 transition-transform duration-200">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-lg font-serif font-bold text-[#261E14] mb-3">
                                        {value.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-relaxed font-sans">
                                        {value.desc}
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
