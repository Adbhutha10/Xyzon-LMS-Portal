import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, ArrowRight, Loader2 } from 'lucide-react';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('student', JSON.stringify(response.data.student));

            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-lms-light flex items-center justify-center p-4">
            {/* Background Blobs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-lms-mint rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-lms-charon rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-lms-cascades/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

            <div className="w-full max-w-md relative">
                <div className="bg-white border border-lms-mint/50 rounded-[2rem] p-10 shadow-2xl shadow-lms-charon/10">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-lms-black mb-2">Student Login</h1>
                        <p className="text-lms-charon font-medium">Welcome back! Please enter your details.</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl mb-6 text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-lms-black mb-2 px-1">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-lms-charon">
                                    <User size={18} />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-lms-light/50 border border-lms-mint text-lms-black pl-11 pr-4 py-4 rounded-2xl focus:ring-4 focus:ring-lms-cascades/10 focus:border-lms-cascades transition-all outline-none placeholder:text-lms-charon/50 font-medium"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-lms-black mb-2 px-1">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-lms-charon">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-lms-light/50 border border-lms-mint text-lms-black pl-11 pr-4 py-4 rounded-2xl focus:ring-4 focus:ring-lms-cascades/10 focus:border-lms-cascades transition-all outline-none placeholder:text-lms-charon/50 font-medium"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-lms-black hover:bg-lms-cascades text-white font-bold py-4 rounded-2xl shadow-xl shadow-lms-black/10 transform transition-all active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-70"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-lms-charon text-sm font-medium">
                        Don't have an account?{' '}
                        <Link to="/" className="text-lms-cascades hover:text-lms-smoke font-bold underline underline-offset-4">
                            Return Home
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
