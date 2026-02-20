import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, ShieldCheck, ArrowRight } from 'lucide-react';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-lms-light text-lms-black selection:bg-lms-cascades/20">
            {/* Header */}
            <nav className="border-b border-lms-mint/50 bg-white/70 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <GraduationCap className="text-lms-cascades" size={32} />
                        <span className="text-xl font-bold tracking-tight text-lms-black">Xyzon LMS</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link to="/login" className="text-sm font-medium text-lms-charon hover:text-lms-black transition-colors">
                            Sign In
                        </Link>
                        <Link to="/login" className="bg-lms-black text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-lms-cascades transition-all shadow-lg shadow-lms-black/10">
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative overflow-hidden pt-24 pb-32">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-lms-cascades/5 blur-[120px] rounded-full"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-lms-black leading-tight">
                            Master New Skills <br />With <span className="text-lms-cascades">Xyzon LMS</span>
                        </h1>
                        <p className="text-lg text-lms-charon max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                            Experience the future of learning with our modern, intuitive, and feature-rich LMS platform designed for students around the world.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-lms-cascades hover:bg-lms-smoke rounded-2xl font-bold text-white shadow-xl shadow-lms-cascades/20 flex items-center justify-center gap-2 group transition-all">
                                Browse Courses
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <button className="w-full sm:w-auto px-8 py-4 bg-white border border-lms-mint hover:bg-lms-light rounded-2xl font-bold text-lms-black transition-all shadow-sm">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="py-24 border-t border-lms-mint/30 bg-white/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-3xl bg-white border border-lms-mint/50 hover:border-lms-cascades/50 transition-all group shadow-sm hover:shadow-xl hover:-translate-y-1">
                            <div className="w-12 h-12 bg-lms-light rounded-2xl flex items-center justify-center mb-6">
                                <BookOpen className="text-lms-cascades" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-lms-black">Vast Library</h3>
                            <p className="text-lms-charon leading-relaxed">Access hundreds of high-quality courses curated by industry experts.</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-white border border-lms-mint/50 hover:border-lms-cascades/50 transition-all group shadow-sm hover:shadow-xl hover:-translate-y-1">
                            <div className="w-12 h-12 bg-lms-light rounded-2xl flex items-center justify-center mb-6">
                                <ShieldCheck className="text-lms-cascades" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-lms-black">Certified Learning</h3>
                            <p className="text-lms-charon leading-relaxed">Earn recognized certificates upon completion of your learning journey.</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-white border border-lms-mint/50 hover:border-lms-cascades/50 transition-all group shadow-sm hover:shadow-xl hover:-translate-y-1">
                            <div className="w-12 h-12 bg-lms-light rounded-2xl flex items-center justify-center mb-6">
                                <GraduationCap className="text-lms-cascades" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-lms-black">Expert Led</h3>
                            <p className="text-lms-charon leading-relaxed">Learn from professionals with years of experience in their fields.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
