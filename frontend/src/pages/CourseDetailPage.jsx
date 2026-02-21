import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Star,
    Clock,
    Users,
    BookOpen,
    PlayCircle,
    CheckCircle2,
    Globe,
    Award,
    Loader2
} from 'lucide-react';
import axios from 'axios';

const CourseDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/courses/${id}`);
                setCourse(response.data);
            } catch (error) {
                console.error('Error fetching course details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface-50">
                <Loader2 className="animate-spin text-primary-600" size={48} />
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-surface-50">
                <BookOpen size={64} className="text-surface-200 mb-4" />
                <h2 className="text-2xl font-black text-ink">Course not found</h2>
                <button
                    onClick={() => navigate('/courses')}
                    className="mt-6 ui-btn-primary px-8 py-3"
                >
                    Back to Catalog
                </button>
            </div>
        );
    }

    const syllabus = [
        "Introduction to the course and industry",
        "Setting up your professional environment",
        "Core concepts and foundational principles",
        "Building your first major project",
        "Advanced techniques and optimizations",
        "Final assessment and industry certification"
    ];

    return (
        <div className="ui-shell">
            {/* Header */}
            <header className="ui-topbar shadow-sm">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/courses')}
                        className="flex items-center gap-2 text-ink-muted hover:text-primary-600 font-bold text-sm transition-colors"
                    >
                        <ArrowLeft size={18} />
                        Back to Catalog
                    </button>
                    <div className="flex items-center gap-4">
                        <button className="hidden sm:block ui-btn-secondary rounded-xl px-6 py-2.5">
                            Save for later
                        </button>
                        <button className="ui-btn-primary rounded-xl px-6 py-2.5">
                            Enroll Now
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                    {/* Left Column: Content */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Hero Section */}
                        <div className="space-y-6">
                            <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-600 text-xs font-black uppercase tracking-widest rounded-xl">
                                {course.category}
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-ink leading-tight">
                                {course.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-ink-muted">
                                <div className="flex items-center gap-2">
                                    <Star className="text-amber-500 fill-amber-500" size={18} />
                                    <span className="text-ink font-black">{course.rating}</span>
                                    <span>(1,240 ratings)</span>
                                </div>
                                <div className="flex items-center gap-2 border-l border-surface-200 pl-6">
                                    <Globe size={18} />
                                    <span>English, Spanish, French</span>
                                </div>
                                <div className="flex items-center gap-2 border-l border-surface-200 pl-6">
                                    <Award size={18} />
                                    <span>Certified Course</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white border border-surface-border rounded-[2.5rem] p-8 md:p-12 shadow-sm">
                            <h2 className="text-2xl font-black text-ink mb-6">Course Description</h2>
                            <p className="text-lg text-ink-muted font-semibold leading-relaxed mb-8">
                                {course.description} This comprehensive curriculum is designed to take you from a beginner level to advanced mastery. You'll work on real-world projects, learn industry best practices, and build a professional portfolio that stands out.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    "Hands-on project experience",
                                    "Lifetime access to materials",
                                    "Industry-recognized certificate",
                                    "Exclusive community access",
                                    "Live Q&A with mentors",
                                    "Resume and career support"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-ink font-bold text-sm">
                                        <CheckCircle2 className="text-teal-500" size={20} />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Syllabus */}
                        <div>
                            <h2 className="text-2xl font-black text-ink mb-8 flex items-center gap-3">
                                <PlayCircle className="text-primary-600" size={28} />
                                Course Curriculum
                            </h2>
                            <div className="space-y-4">
                                {syllabus.map((item, i) => (
                                    <div key={i} className="bg-white border border-surface-border rounded-2xl p-6 flex items-center justify-between hover:border-primary-400 transition-all cursor-pointer group">
                                        <div className="flex items-center gap-5">
                                            <div className="w-10 h-10 bg-surface-50 rounded-xl flex items-center justify-center text-ink-muted font-black group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors text-sm">
                                                0{i + 1}
                                            </div>
                                            <p className="font-bold text-ink group-hover:text-primary-600 transition-colors">
                                                {item}
                                            </p>
                                        </div>
                                        <Clock size={18} className="text-ink-muted" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sidebar info */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Image Preview */}
                        <div className="bg-white border border-surface-border rounded-[2.5rem] overflow-hidden shadow-xl sticky top-32">
                            <div className="h-64 relative overflow-hidden group">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <PlayCircle size={64} className="text-white fill-white/20 backdrop-blur-sm rounded-full" />
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="flex items-end gap-3 mb-8">
                                    <span className="text-4xl font-black text-ink">₹{course.price}</span>
                                    <span className="text-lg text-ink-muted line-through font-bold mb-1">₹999</span>
                                    <span className="text-teal-600 font-black text-sm mb-1 ml-auto">LIMITED OFFER</span>
                                </div>

                                <button className="w-full py-5 bg-primary-600 text-white font-black rounded-2xl text-lg hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 mb-4">
                                    Enroll Now
                                </button>
                                <button className="w-full py-5 bg-white border-2 border-primary-600 text-primary-600 font-black rounded-2xl text-lg hover:bg-primary-50 transition-all mb-8">
                                    Try for free
                                </button>

                                <div className="space-y-5 border-t border-surface-50 pt-8">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 text-ink-muted font-bold text-sm">
                                            <Clock size={18} />
                                            <span>Duration</span>
                                        </div>
                                        <span className="font-black text-ink">{course.duration}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 text-ink-muted font-bold text-sm">
                                            <Users size={18} />
                                            <span>Instructor</span>
                                        </div>
                                        <span className="font-black text-ink">{course.instructor}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 text-ink-muted font-bold text-sm">
                                            <Globe size={18} />
                                            <span>Language</span>
                                        </div>
                                        <span className="font-black text-ink">English</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default CourseDetailPage;
