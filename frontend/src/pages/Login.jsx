import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await API.post('/login', { email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);
            localStorage.setItem('email', response.data.email);

            if (response.data.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/teacher');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Terjadi kesalahan saat login');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-indigo-800 mb-6">School Ticket System</h2>

                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700">Email Address</label>
                        <input
                            type="email"
                            className="mt-1 block w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="e.g., teacher1@test.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700">Password</label>
                        <input
                            type="password"
                            className="mt-1 block w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white p-2.5 rounded-md font-bold hover:bg-indigo-700 transition"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6 border-t pt-4 text-xs text-slate-500 space-y-1">
                    <p className="font-semibold">Akun Uji Coba (Hardcoded):</p>
                    <p>• admin@test.com | password123 (Admin)</p>
                    <p>• teacher1@test.com | password123 (Teacher 1)</p>
                    <p>• teacher2@test.com | password123 (Teacher 2)</p>
                </div>
            </div>
        </div>
    );
}

export default Login;