import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, ShieldCheck, ArrowRight } from 'lucide-react';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-purple-500/30">
            {/* Header */}
            <nav className="border-b border-white/5 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <GraduationCap className="text-purple-500" size={32} />
                        <span className="text-xl font-bold tracking-tight">Xyzon LMS</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                            Sign In
                        </Link>
                        <Link to="/login" className="bg-white text-slate-950 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors">
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative overflow-hidden pt-24 pb-32">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-purple-500/10 blur-[120px] rounded-full"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                            Master New Skills <br />With Xyzon LMS
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Experience the future of learning with our modern, intuitive, and feature-rich LMS platform designed for students around the world.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-xl font-bold shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 group transition-all">
                                Browse Courses
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl font-bold transition-all">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="py-24 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-colors group">
                            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
                                <BookOpen className="text-purple-500" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Vast Library</h3>
                            <p className="text-slate-400 leading-relaxed">Access hundreds of high-quality courses curated by industry experts.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                                <ShieldCheck className="text-blue-500" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Certified Learning</h3>
                            <p className="text-slate-400 leading-relaxed">Earn recognized certificates upon completion of your learning journey.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/50 transition-colors">
                            <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center mb-6">
                                <GraduationCap className="text-pink-500" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Expert Led</h3>
                            <p className="text-slate-400 leading-relaxed">Learn from professionals with years of experience in their fields.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
