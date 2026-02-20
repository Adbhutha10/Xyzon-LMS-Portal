import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, ShieldCheck, ArrowRight, Users, Star, Play, Zap } from 'lucide-react';

const stats = [
    { label: 'Active Students', value: '12,400+' },
    { label: 'Expert Courses', value: '380+' },
    { label: 'Completion Rate', value: '94%' },
    { label: 'Certifications', value: '8,200+' },
];

const features = [
    {
        icon: BookOpen,
        title: 'Vast Course Library',
        desc: 'Access hundreds of curated courses across tech, design, business and more.',
        gradient: 'from-primary-500 to-primary-700',
        bg: 'bg-primary-50',
        text: 'text-primary-600',
    },
    {
        icon: ShieldCheck,
        title: 'Verified Certificates',
        desc: 'Earn industry-recognized certificates that matter to top employers worldwide.',
        gradient: 'from-teal-500 to-teal-700',
        bg: 'bg-teal-50',
        text: 'text-teal-600',
    },
    {
        icon: Users,
        title: 'Expert Instructors',
        desc: 'Learn directly from seasoned professionals with years of field experience.',
        gradient: 'from-amber-400 to-amber-600',
        bg: 'bg-amber-50',
        text: 'text-amber-600',
    },
];

const HomePage = () => {
    return (
        <div className="min-h-screen bg-surface-50 text-ink font-sans">
            {/* Navbar */}
            <nav className="bg-white/80 backdrop-blur-xl border-b border-surface-border sticky top-0 z-50 shadow-sm shadow-primary-100/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                            <GraduationCap className="text-white" size={20} />
                        </div>
                        <span className="text-xl font-bold text-ink">Xyzon <span className="text-primary-600">LMS</span></span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link to="/login" className="text-sm font-semibold text-ink-muted hover:text-ink transition-colors px-4 py-2">
                            Sign In
                        </Link>
                        <Link to="/login" style={{ background: '#4338ca', color: '#fff' }} className="px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-md">
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="relative pt-24 pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-surface-50 to-teal-50/40 pointer-events-none" />
                <div className="absolute top-16 right-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    {/* Badge */}
                    <div className="flex justify-center mb-8">
                        <span className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 font-semibold text-sm px-5 py-2 rounded-full border border-primary-200 shadow-sm">
                            <Zap size={14} className="fill-primary-500" />
                            #1 Learning Platform for Students
                        </span>
                    </div>

                    <div className="text-center max-w-5xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-primary-700 to-teal-600">
                                Learn Smarter.
                            </span>
                            <br />
                            <span className="text-ink">Grow Faster.</span>
                        </h1>
                        <p className="text-xl text-ink-muted max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
                            Join over 12,000 students mastering in-demand skills through expert-led courses, hands-on projects, and industry-recognized certifications.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/login"
                                style={{ background: '#4338ca', color: '#fff' }}
                                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 font-bold rounded-2xl shadow-xl hover:-translate-y-0.5 transition-all group"
                            >
                                <Play size={18} className="fill-white" />
                                Start Learning Free
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white border border-surface-border text-ink font-bold rounded-2xl hover:border-primary-300 hover:bg-surface-100 transition-all shadow-sm">
                                <Star size={18} className="fill-amber-400 text-amber-400" />
                                View Top Courses
                            </button>
                        </div>
                    </div>

                    {/* Stats Bar */}
                    <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.map((stat) => (
                            <div key={stat.label} className="bg-white/80 border border-surface-border rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-3xl font-black text-primary-600 mb-1">{stat.value}</div>
                                <div className="text-sm font-semibold text-ink-muted">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-24 bg-white border-t border-surface-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-ink mb-4">Why Students Choose Xyzon</h2>
                        <p className="text-ink-muted text-lg max-w-xl mx-auto font-medium">Everything you need to go from beginner to professional, in one place.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map(({ icon: Icon, title, desc, bg, text }) => (
                            <div key={title} className="group p-8 rounded-3xl border border-surface-border hover:border-primary-200 bg-white hover:bg-surface-50 transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-primary-100/50 cursor-default">
                                <div className={`w-14 h-14 ${bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <Icon className={text} size={26} />
                                </div>
                                <h3 className="text-xl font-bold text-ink mb-3">{title}</h3>
                                <p className="text-ink-muted leading-relaxed font-medium">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: '#3730a3' }} className="py-24">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: '#fff' }}>Ready to transform your future?</h2>
                    <p className="text-xl mb-10 font-medium" style={{ color: '#c7d2fe' }}>Join thousands of learners who are already advancing their careers.</p>
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 px-10 py-5 font-black text-lg rounded-2xl shadow-2xl hover:-translate-y-0.5 transition-all group"
                        style={{ background: '#fff', color: '#3730a3' }}
                    >
                        Start for Free — It's Quick
                        <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-ink py-10">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-teal-500 rounded-lg flex items-center justify-center">
                            <GraduationCap className="text-white" size={16} />
                        </div>
                        <span className="font-bold text-white">Xyzon LMS</span>
                    </div>
                    <p className="text-ink-faint text-sm font-medium">© 2025 Xyzon LMS. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
