import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, ArrowRight, Loader2, BookOpen, ShieldCheck, Star } from 'lucide-react';
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
        <div className="min-h-screen flex font-sans" style={{ background: '#f8faff' }}>
            {/* Left Panel — Branding */}
            <div className="hidden lg:flex flex-col justify-between w-2/5 p-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #4338ca, #0d9488)' }}>
                {/* Decorative circles */}
                <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }} />
                <div className="absolute bottom-24 -right-12 w-52 h-52 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }} />

                <div className="relative">
                    <img src="/xyzon-logo.png" alt="Xyzon LMS" className="h-10 w-auto object-contain" />

                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl font-black leading-tight mb-4" style={{ color: '#fff' }}>Welcome back, learner!</h2>
                            <p className="text-lg leading-relaxed" style={{ color: 'rgba(199,210,254,0.9)' }}>Sign in to continue your journey toward mastery and achieve your learning goals.</p>
                        </div>
                        <div className="space-y-4">
                            {[
                                { icon: BookOpen, text: '380+ expert-led courses' },
                                { icon: ShieldCheck, text: 'Industry-verified certificates' },
                                { icon: Star, text: 'Rated 4.9/5 by 12,000+ students' },
                            ].map(({ icon: Icon, text }) => (
                                <div key={text} className="flex items-center gap-4" style={{ color: 'rgba(255,255,255,0.9)' }}>
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.15)' }}>
                                        <Icon size={18} className="text-white" />
                                    </div>
                                    <span className="font-semibold text-sm">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Testimonial */}
                <div className="relative rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                    <div className="flex items-start gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                        ))}
                    </div>
                    <p className="text-sm font-medium leading-relaxed italic mb-3" style={{ color: 'rgba(255,255,255,0.9)' }}>"Xyzon LMS changed how I learn. The courses are world-class and the experience is seamless."</p>
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'rgba(199,210,254,0.8)' }}>— Priya S., Software Engineer</span>
                </div>
            </div>

            {/* Right Panel — Form */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-16">
                <div className="w-full max-w-md">
                    <div className="mb-10">
                        {/* Mobile logo */}
                        <div className="mb-8 lg:hidden">
                            <img src="/xyzon-logo.png" alt="Xyzon LMS" className="h-10 w-auto object-contain" />
                        </div>
                        <h1 className="text-3xl font-black mb-2" style={{ color: '#1e1b4b' }}>Sign in to your account</h1>
                        <p className="font-medium" style={{ color: '#6b7280' }}>Enter your email and password to continue.</p>
                    </div>

                    {error && (
                        <div className="px-4 py-4 rounded-2xl mb-6 text-sm font-semibold flex items-center gap-3" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c' }}>
                            <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 font-black text-xs" style={{ background: '#fee2e2' }}>!</span>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold mb-2" style={{ color: '#1e1b4b' }}>Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none" style={{ color: '#9ca3af' }}>
                                    <User size={18} />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl outline-none font-medium transition-all"
                                    style={{ background: '#fff', border: '2px solid #e5e9f5', color: '#1e1b4b' }}
                                    onFocus={(e) => e.target.style.borderColor = '#4338ca'}
                                    onBlur={(e) => e.target.style.borderColor = '#e5e9f5'}
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-bold" style={{ color: '#1e1b4b' }}>Password</label>
                                <button type="button" className="text-sm font-semibold" style={{ color: '#4338ca' }}>Forgot password?</button>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none" style={{ color: '#9ca3af' }}>
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl outline-none font-medium transition-all"
                                    style={{ background: '#fff', border: '2px solid #e5e9f5', color: '#1e1b4b' }}
                                    onFocus={(e) => e.target.style.borderColor = '#4338ca'}
                                    onBlur={(e) => e.target.style.borderColor = '#e5e9f5'}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full font-black py-4 rounded-2xl flex items-center justify-center gap-3 group transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-70"
                            style={{ background: '#4338ca', color: '#fff', boxShadow: '0 10px 30px rgba(67,56,202,0.35)' }}
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

                    <p className="mt-8 text-center text-sm font-medium" style={{ color: '#6b7280' }}>
                        Don't have an account?{' '}
                        <Link to="/" className="font-bold underline underline-offset-4" style={{ color: '#4338ca' }}>
                            Return Home
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
