import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, ArrowRight, Loader2, GraduationCap, BookOpen, ShieldCheck, Star } from 'lucide-react';
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
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
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
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-surface-50 to-teal-50 flex font-sans">
            {/* Left Panel — Branding */}
            <div className="hidden lg:flex flex-col justify-between w-2/5 bg-gradient-to-br from-primary-700 via-primary-600 to-teal-600 p-12 relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute -top-16 -left-16 w-64 h-64 bg-white/5 rounded-full" />
                <div className="absolute bottom-24 -right-12 w-52 h-52 bg-white/5 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full" />

                <div className="relative">
                    <div className="flex items-center gap-3 mb-16">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                            <GraduationCap className="text-white" size={26} />
                        </div>
                        <span className="text-2xl font-black text-white">Xyzon LMS</span>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl font-black text-white leading-tight mb-4">Welcome back, learner!</h2>
                            <p className="text-primary-200 text-lg leading-relaxed">Sign in to continue your journey toward mastery and achieve your learning goals.</p>
                        </div>
                        <div className="space-y-4">
                            {[
                                { icon: BookOpen, text: '380+ expert-led courses' },
                                { icon: ShieldCheck, text: 'Industry-verified certificates' },
                                { icon: Star, text: 'Rated 4.9/5 by 12,000+ students' },
                            ].map(({ icon: Icon, text }) => (
                                <div key={text} className="flex items-center gap-4 text-white/90">
                                    <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                                        <Icon size={18} className="text-white" />
                                    </div>
                                    <span className="font-semibold text-sm">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-start gap-3 mb-2">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                        ))}
                    </div>
                    <p className="text-white/90 text-sm font-medium leading-relaxed italic mb-3">"Xyzon LMS changed how I learn. The courses are world-class and the experience is seamless."</p>
                    <span className="text-primary-200 text-xs font-bold uppercase tracking-wider">— Priya S., Software Engineer</span>
                </div>
            </div>

            {/* Right Panel — Login Form */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-16">
                <div className="w-full max-w-md animate-fade-in">
                    <div className="mb-10">
                        <div className="flex items-center gap-2 mb-8 lg:hidden">
                            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                                <GraduationCap className="text-white" size={18} />
                            </div>
                            <span className="text-xl font-black text-ink">Xyzon <span className="text-primary-600">LMS</span></span>
                        </div>
                        <h1 className="text-3xl font-black text-ink mb-2">Sign in to your account</h1>
                        <p className="text-ink-muted font-medium">Enter your email and password to continue.</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-4 rounded-2xl mb-6 text-sm font-semibold flex items-center gap-3">
                            <span className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 font-black text-xs">!</span>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-ink mb-2">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-ink-faint">
                                    <User size={18} />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white border-2 border-surface-border text-ink pl-12 pr-4 py-4 rounded-2xl focus:ring-0 focus:border-primary-500 transition-all outline-none placeholder:text-ink-faint font-medium shadow-sm"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-bold text-ink">Password</label>
                                <button type="button" className="text-primary-600 text-sm font-semibold hover:underline">Forgot password?</button>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-ink-faint">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white border-2 border-surface-border text-ink pl-12 pr-4 py-4 rounded-2xl focus:ring-0 focus:border-primary-500 transition-all outline-none placeholder:text-ink-faint font-medium shadow-sm"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-black py-4 rounded-2xl shadow-xl shadow-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/40 hover:-translate-y-0.5 transform transition-all active:scale-[0.98] flex items-center justify-center gap-3 group disabled:opacity-70"
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

                    <p className="mt-8 text-center text-ink-muted text-sm font-medium">
                        Don't have an account?{' '}
                        <Link to="/" className="text-primary-600 hover:text-primary-700 font-bold underline underline-offset-4">
                            Return Home
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
