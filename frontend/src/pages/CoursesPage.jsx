import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, BookOpen, Clock, Star, Users, ChevronRight, Loader2, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const navigate = useNavigate();

    const categories = ['All', 'Development', 'Design', 'Data Science', 'Security', 'Marketing', 'Business'];

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/courses');
                setCourses(response.data);
                setFilteredCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    useEffect(() => {
        let result = courses;
        if (selectedCategory !== 'All') {
            result = result.filter(c => c.category === selectedCategory);
        }
        if (searchTerm) {
            result = result.filter(c =>
                c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredCourses(result);
    }, [searchTerm, selectedCategory, courses]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface-50">
                <Loader2 className="animate-spin text-primary-600" size={48} />
            </div>
        );
    }

    return (
        <div className="ui-shell">
            {/* Header */}
            <header className="ui-topbar shadow-sm">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <img src="/xyzon-logo.png" alt="Xyzon LMS" className="h-10 w-auto cursor-pointer" onClick={() => navigate('/')} />
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="flex items-center gap-2 text-ink-muted hover:text-primary-600 font-bold text-sm transition-colors"
                        >
                            <ArrowLeft size={18} />
                            Dashboard
                        </button>
                    </div>

                    <div className="hidden md:flex items-center gap-4 bg-surface-50 border border-surface-border px-4 py-2 rounded-2xl w-96">
                        <Search className="text-ink-muted" size={18} />
                        <input
                            type="text"
                            placeholder="Search for courses..."
                            className="bg-transparent border-none outline-none text-sm font-semibold w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="ui-btn-primary rounded-xl px-6 py-2.5">
                            Support
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* Hero Section */}
                <div className="mb-12">
                    <h1 className="text-4xl font-black text-ink mb-4">Explore Our Catalog</h1>
                    <p className="text-lg text-ink-muted font-semibold max-w-2xl">
                        Master new skills with our professional-led courses. From development to business, we've got everything you need to grow.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 mb-12">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-2.5 rounded-2xl font-bold text-sm transition-all border ${selectedCategory === cat
                                ? 'bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-100'
                                : 'bg-white text-ink-muted border-surface-border hover:border-primary-300 hover:text-primary-600'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Course Grid */}
                {filteredCourses.length === 0 ? (
                    <div className="text-center py-20 bg-white border border-dashed border-surface-border rounded-[2rem]">
                        <BookOpen className="mx-auto text-surface-200 mb-4" size={64} />
                        <h3 className="text-xl font-black text-ink">No courses found</h3>
                        <p className="text-ink-muted font-bold mt-2">Try adjusting your filters or search term.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.map(course => (
                            <div key={course.id} className="bg-white border border-surface-border rounded-[2.5rem] overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-100/50 transition-all group border-b-4 border-b-surface-100 hover:border-b-primary-500">
                                <div className="h-56 relative overflow-hidden">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-white shadow-sm">
                                        <Star size={14} className="text-amber-500 fill-amber-500" />
                                        <span className="text-xs font-black text-ink">{course.rating}</span>
                                    </div>
                                    <div className="absolute bottom-4 right-4 bg-primary-600 text-white px-4 py-1.5 rounded-xl font-black text-xs shadow-lg">
                                        ₹{course.price}
                                    </div>
                                </div>

                                <div className="p-8">
                                    <span className="inline-block px-3 py-1 bg-primary-50 text-primary-600 text-[10px] font-black uppercase tracking-wider rounded-lg mb-4">
                                        {course.category}
                                    </span>
                                    <h3 className="text-xl font-black text-ink mb-3 leading-snug group-hover:text-primary-600 transition-colors">
                                        {course.title}
                                    </h3>
                                    <p className="text-sm text-ink-muted font-semibold line-clamp-2 mb-6">
                                        {course.description}
                                    </p>

                                    <div className="flex items-center justify-between mb-8 border-t border-surface-50 pt-6">
                                        <div className="flex items-center gap-2 text-ink-muted">
                                            <Clock size={16} />
                                            <span className="text-xs font-bold">{course.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-ink-muted">
                                            <Users size={16} />
                                            <span className="text-xs font-bold">BY {course.instructor.toUpperCase()}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => navigate(`/courses/${course.id}`)}
                                        className="w-full py-4 bg-surface-50 border border-surface-border text-ink font-black rounded-2xl flex items-center justify-center gap-2 group-hover:bg-primary-600 group-hover:border-primary-600 group-hover:text-white transition-all shadow-sm hover:shadow-primary-200"
                                    >
                                        Explore Course <ChevronRight size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default CoursesPage;
