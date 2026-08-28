import React from 'react';
import { Users, Award, Shield, Compass, Heart, Activity, Calendar, Flag } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export default function About({ content, changePage }) {
    const coreValues = [
        {
            icon: <Users className="w-6 h-6 text-[#C99B53]" />,
            title: "Pasemetonan",
            desc: "Kekeluargaan dan persaudaraan yang erat antar anggota sanggar."
        },
        {
            icon: <Award className="w-6 h-6 text-[#C99B53]" />,
            title: "Kualitas Tinggi",
            desc: "Dedikasi untuk selalu memberikan penampilan dan pembelajaran terbaik."
        },
        {
            icon: <Shield className="w-6 h-6 text-[#C99B53]" />,
            title: "Taksu",
            desc: "Menjaga aura spiritual dan jiwa dalam setiap gerakan dan nada."
        },
        {
            icon: <Activity className="w-6 h-6 text-[#C99B53]" />,
            title: "Inovasi",
            desc: "Terbuka terhadap perkembangan zaman tanpa meninggalkan akar tradisi."
        },
        {
            icon: <Heart className="w-6 h-6 text-[#C99B53]" />,
            title: "Pengabdian",
            desc: "Berkontribusi aktif dalam melestarikan budaya Bali untuk generasi mendatang."
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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                    
                    {/* Left: Call to Action Card */}
                    <ScrollReveal className="lg:col-span-5 flex" distance="40px">
                        <div className="bg-[#261E14] text-[#FAF6F0] rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col justify-between items-start w-full border border-neutral-800">
                            <div className="space-y-4">
                                <h3 className="font-serif text-3xl font-bold leading-tight text-white">
                                    Mari Melestarikan Budaya Bali Bersama Kami
                                </h3>
                                <p className="text-sm text-gray-300 leading-relaxed font-sans">
                                    Bergabunglah dengan komunitas kami untuk menjaga warisan leluhur atau jadwalkan kunjungan edukasi Anda hari ini.
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

                    {/* Right Visi & Misi texts */}
                    <ScrollReveal className="lg:col-span-7 space-y-8 flex flex-col justify-center" delay={200} distance="40px">
                        {/* Visi */}
                        <div className="space-y-3">
                            <span className="text-xs font-bold tracking-widest text-[#C99B53] uppercase flex items-center gap-2">
                                <Compass size={16} /> VISI KAMI
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-serif text-[#261E14] font-bold">
                                {content('about_visi_title', 'Pusat Pelestarian Seni Budaya Bali')}
                            </h2>
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-sans italic">
                                    {content('about_visi_desc', '"Menjadi ruang terdepan dalam menjaga, mengembangkan, dan mempromosikan kekayaan seni tari dan tabuh tradisional Bali di kancah nasional maupun internasional."')}
                                </p>
                            </div>
                        </div>

                        {/* Misi */}
                        <div className="space-y-4">
                            <span className="text-xs font-bold tracking-widest text-[#C99B53] uppercase flex items-center gap-2">
                                <Flag size={16} /> MISI KAMI
                            </span>
                            <div className="space-y-3">
                                <div className="bg-[#FAF6F0]/60 border border-[#C99B53]/10 rounded-xl p-5 flex items-start gap-4 shadow-sm">
                                    <span className="font-serif text-sm font-bold text-[#C99B53] shrink-0 mt-0.5">01</span>
                                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
                                        {content('about_misi1_desc', 'Menyelenggarakan pendidikan dan pelatihan seni tari dan gamelan Bali yang berkualitas.')}
                                    </p>
                                </div>
                                <div className="bg-[#FAF6F0]/60 border border-[#C99B53]/10 rounded-xl p-5 flex items-start gap-4 shadow-sm">
                                    <span className="font-serif text-sm font-bold text-[#C99B53] shrink-0 mt-0.5">02</span>
                                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
                                        {content('about_misi2_desc', 'Menciptakan karya seni inovatif yang tetap berakar pada tradisi leluhur.')}
                                    </p>
                                </div>
                                <div className="bg-[#FAF6F0]/60 border border-[#C99B53]/10 rounded-xl p-5 flex items-start gap-4 shadow-sm">
                                    <span className="font-serif text-sm font-bold text-[#C99B53] shrink-0 mt-0.5">03</span>
                                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
                                        {content('about_misi3_desc', 'Membangun komunitas seniman muda yang berdedikasi tinggi terhadap budaya.')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* 5 CORE VALUES SECTION */}
            <section className="py-24 bg-[#FAF6F0] border-t border-[#C99B53]/15">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal className="text-center mb-16 space-y-3" distance="30px">
                        <h2 className="text-3xl sm:text-4xl font-serif text-[#261E14] font-bold">
                            5 Nilai Inti
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">
                            Prinsip-prinsip yang membimbing setiap langkah kami dalam berkarya dan berinteraksi.
                        </p>
                    </ScrollReveal>

                    <div className="flex flex-wrap gap-8 justify-center">
                        {coreValues.map((value, idx) => (
                            <ScrollReveal
                                key={idx}
                                delay={idx * 100}
                                distance="40px"
                                className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)] flex max-w-sm"
                            >
                                <div
                                    className="bg-white rounded-2xl p-8 shadow-md flex flex-col items-start w-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 border border-gray-50"
                                >
                                    <div className="w-12 h-12 bg-[#261E14] rounded-xl flex items-center justify-center mb-6 text-[#C99B53] shadow-md">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-lg font-serif font-bold text-[#261E14] mb-2">
                                        {value.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans">
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
