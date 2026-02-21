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
        <div className="ui-shell flex">
            {/* Left Panel — Branding */}
            <div className="hidden lg:flex flex-col justify-between w-2/5 p-12 relative overflow-hidden bg-gradient-to-br from-primary-700 to-teal-700">
                {/* Decorative circles */}
                <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/5" />
                <div className="absolute bottom-24 -right-12 w-52 h-52 rounded-full bg-white/5" />

                <div className="relative">
                    <img src="/xyzon-logo.png" alt="Xyzon LMS" className="h-10 w-auto object-contain" />

                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl font-black leading-tight mb-4 text-white">Welcome back, learner!</h2>
                            <p className="text-lg leading-relaxed text-primary-200">Sign in to continue your journey toward mastery and achieve your learning goals.</p>
                        </div>
                        <div className="space-y-4">
                            {[
                                { icon: BookOpen, text: '380+ expert-led courses' },
                                { icon: ShieldCheck, text: 'Industry-verified certificates' },
                                { icon: Star, text: 'Rated 4.9/5 by 12,000+ students' },
                            ].map(({ icon: Icon, text }) => (
                                <div key={text} className="flex items-center gap-4 text-white/90">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/15">
                                        <Icon size={18} className="text-white" />
                                    </div>
                                    <span className="font-semibold text-sm">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Testimonial */}
                <div className="relative rounded-2xl p-6 bg-white/10 border border-white/20">
                    <div className="flex items-start gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                        ))}
                    </div>
                    <p className="text-sm font-medium leading-relaxed italic mb-3 text-white/90">"Xyzon LMS changed how I learn. The courses are world-class and the experience is seamless."</p>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary-200">— Priya S., Software Engineer</span>
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
                        <h1 className="text-3xl font-black mb-2 text-ink">Sign in to your account</h1>
                        <p className="font-medium text-ink-muted">Enter your email and password to continue.</p>
                    </div>

                    {error && (
                        <div className="px-4 py-4 rounded-2xl mb-6 text-sm font-semibold flex items-center gap-3 bg-red-50 border border-red-200 text-red-700">
                            <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 font-black text-xs bg-red-100">!</span>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold mb-2 text-ink">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-ink-faint">
                                    <User size={18} />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="ui-input pl-12"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-bold text-ink">Password</label>
                                <button type="button" className="text-sm font-semibold text-primary-600">Forgot password?</button>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-ink-faint">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="ui-input pl-12"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="ui-btn-primary w-full py-4 text-base active:scale-[0.98] disabled:opacity-70"
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

                    <p className="mt-8 text-center text-sm font-medium text-ink-muted">
                        Don't have an account?{' '}
                        <Link to="/" className="font-bold underline underline-offset-4 text-primary-600">
                            Return Home
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
