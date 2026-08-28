import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../lib/axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await axios.get('/sanctum/csrf-cookie');
            const response = await axios.post('/api/login', { email, password });
            localStorage.setItem('admin_token', response.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            navigate('/admin/content');
        } catch (err) {
            setError('Gagal login. Periksa email atau password Anda.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAF6F0]">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-[#261E14]">Admin Login</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                
                <label className="block mb-4">
                    <span className="text-sm font-semibold">Email</span>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" />
                </label>
                
                <label className="block mb-6">
                    <span className="text-sm font-semibold">Password</span>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" />
                </label>
                
                <button type="submit" className="w-full bg-[#8B261E] hover:bg-red-800 text-white font-bold py-2 px-4 rounded">
                    Login
                </button>
            </form>
        </div>
    );
}
