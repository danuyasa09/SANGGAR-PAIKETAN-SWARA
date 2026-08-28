import React, { useState, useEffect } from 'react';
import axios from '../../lib/axios';

export default function AdminContent() {
    const [contents, setContents] = useState([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        const response = await axios.get('/api/content');
        setContents(response.data);
    };

    const handleChange = (index, key, value) => {
        const newContents = [...contents];
        newContents[index][key] = value;
        setContents(newContents);
    };

    const handleImageUpload = async (index, file) => {
        if (!file) return;
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await axios.post('/api/content/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            handleChange(index, 'value', res.data.path);
        } catch (err) {
            alert('Gagal upload gambar konten.');
        }
    };

    const handleAdd = () => {
        setContents([...contents, { key: '', value: '', type: 'text', section: 'Beranda' }]);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await axios.post('/api/content', { contents });
            alert('Berhasil disimpan!');
        } catch (e) {
            alert('Gagal menyimpan.');
        }
        setSaving(false);
    };

    // Grouping
    const sections = [...new Set(contents.map(item => item.section || 'Lain-lain'))];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-[#261E14]">Kelola Teks & Gambar Halaman</h1>
                <button onClick={handleSave} disabled={saving} className="bg-[#C99B53] hover:bg-[#B7863F] text-white px-6 py-2 rounded font-semibold shadow">
                    {saving ? 'Menyimpan...' : 'Simpan Semua'}
                </button>
            </div>
            
            <div className="space-y-8">
                {sections.length === 0 && (
                    <div className="bg-white p-6 rounded shadow text-center text-gray-500">
                        Belum ada konten. Silakan tambah konten baru.
                    </div>
                )}

                {sections.map(section => (
                    <div key={section} className="bg-white p-6 rounded shadow border-t-4 border-[#8B261E]">
                        <h2 className="text-2xl font-bold mb-4 text-[#8B261E] capitalize">{section}</h2>
                        <div className="space-y-6">
                            {contents.map((item, index) => {
                                if ((item.section || 'Lain-lain') !== section) return null;
                                return (
                                    <div key={index} className="grid grid-cols-12 gap-4 border-b pb-4 items-start">
                                        <div className="col-span-3 space-y-3">
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-500">Key (Nama Variabel)</label>
                                                <input type="text" value={item.key} onChange={e => handleChange(index, 'key', e.target.value)} className="mt-1 w-full p-2 border rounded text-sm" placeholder="home_title" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-500">Tipe</label>
                                                <select value={item.type} onChange={e => handleChange(index, 'type', e.target.value)} className="mt-1 w-full p-2 border rounded text-sm">
                                                    <option value="text">Teks / Paragraf</option>
                                                    <option value="image">Gambar</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-500">Halaman / Section</label>
                                                <input type="text" value={item.section} onChange={e => handleChange(index, 'section', e.target.value)} className="mt-1 w-full p-2 border rounded text-sm" placeholder="Beranda" />
                                            </div>
                                        </div>
                                        
                                        <div className="col-span-9">
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                {item.type === 'image' ? 'Upload Gambar' : 'Isi Teks (Value)'}
                                            </label>
                                            
                                            {item.type === 'text' && (
                                                <textarea rows="5" value={item.value || ''} onChange={e => handleChange(index, 'value', e.target.value)} className="w-full p-3 border rounded" placeholder="Ketik isi teks di sini..."></textarea>
                                            )}
                                            
                                            {item.type === 'image' && (
                                                <div className="border-2 border-dashed border-gray-300 p-4 rounded text-center">
                                                    {item.value && (
                                                        <div className="mb-3">
                                                            <img src={`/storage/${item.value}`} alt="Preview" className="h-32 mx-auto object-cover rounded shadow" />
                                                            <p className="text-xs text-gray-500 mt-1">{item.value}</p>
                                                        </div>
                                                    )}
                                                    <input type="file" accept="image/*" onChange={e => handleImageUpload(index, e.target.files[0])} className="text-sm" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                <button onClick={handleAdd} className="w-full py-4 border-2 border-dashed border-gray-400 text-gray-600 rounded font-bold hover:bg-gray-50 transition">
                    + Tambah Konten Baru
                </button>
            </div>
        </div>
    );
}
