import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Settings, LogOut, Clock, ChevronRight, Flame, Trophy, Target, Loader2, ShieldCheck } from 'lucide-react';
import axios from 'axios';

const DashboardPage = () => {
    const [student, setStudent] = useState(null);
    const [courses, setCourses] = useState([]);
    const [statItems, setStatItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const studentData = localStorage.getItem('student');
        const token = localStorage.getItem('token');

        if (!studentData || !token) {
            navigate('/login');
            return;
        }

        const parsedStudent = JSON.parse(studentData);
        setStudent(parsedStudent);

        const fetchDashboardData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/dashboard', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // Map API stats to include icons
                const iconMap = { 'Day Streak': Flame, 'Points Earned': Trophy, 'Goals Met': Target };
                const apiStats = response.data.stats.map(s => ({
                    ...s,
                    icon: iconMap[s.label] || Trophy
                }));

                setCourses(response.data.courses);
                setStatItems(apiStats);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError('Failed to load dashboard data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    if (!student || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface-50">
                <Loader2 className="animate-spin text-primary-600" size={48} />
            </div>
        );
    }

    const initial = student.name ? student.name.charAt(0).toUpperCase() : 'S';

    return (
        <div className="ui-shell flex">
            {/* Sidebar */}
            <aside className="w-72 border-r border-surface-border bg-white shadow-sm hidden lg:flex flex-col">
                <div className="p-8 border-b border-surface-border">
                    <img src="/xyzon-logo.png" alt="Xyzon LMS" className="h-10 w-auto object-contain" />
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    {[
                        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', active: true },
                        { icon: BookOpen, label: 'Browse Courses', path: '/courses', active: false },
                        ...(student?.role === 'admin' ? [{ icon: ShieldCheck, label: 'Admin Panel', path: '/admin', active: false }] : []),
                        { icon: Settings, label: 'Settings', path: '#', active: false },
                    ].map(({ icon: Icon, label, path, active }) => (
                        <button
                            key={label}
                            onClick={() => path !== '#' && navigate(path)}
                            className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl font-bold text-sm transition-all ${active ? 'text-ink bg-primary-50 border border-primary-100' : 'text-ink-muted hover:text-primary-600'}`}
                        >
                            <Icon size={20} />
                            {label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-surface-border">
                    <div className="flex items-center gap-4 bg-surface-50 rounded-2xl p-4 mb-4">
                        <div className="w-11 h-11 bg-gradient-to-br from-primary-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md">
                            {initial}
                        </div>
                        <div className="overflow-hidden">
                            <p className="font-bold text-sm truncate text-ink-muted">{student.name}</p>
                            <p className="text-xs font-semibold truncate text-ink-muted">{student.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold text-sm transition-all text-ink-muted hover:text-primary-600"
                    >
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 overflow-y-auto">
                {/* Top Header */}
                <div className="bg-white border-b border-surface-border px-10 py-6 flex items-center justify-between sticky top-0 z-10 shadow-sm">
                    <div>
                        <h1 className="text-2xl font-black text-ink">Good evening, {student.name.split(' ')[0]}! 👋</h1>
                        <p className="text-sm text-ink-muted font-semibold mt-0.5">You have {courses.length} ongoing courses. Keep it up!</p>
                    </div>
                    <div className="flex items-center gap-3 bg-surface-50 rounded-2xl px-4 py-3 border border-surface-border">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md">
                            {initial}
                        </div>
                        <div>
                            <p className="font-bold text-sm text-ink leading-tight">{student.name}</p>
                            <p className="text-[11px] text-primary-600 font-bold uppercase tracking-wider">Pro Student</p>
                        </div>
                    </div>
                </div>

                <div className="p-10 space-y-10">
                    {error && (
                        <div className="p-6 bg-red-50 border border-red-200 rounded-3xl text-red-700 font-bold text-center">
                            {error}
                        </div>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {statItems.map(({ icon: Icon, label, value, color, bg }) => (
                            <div key={label} className="bg-white border border-surface-border rounded-3xl p-6 flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow">
                                <div className={`w-14 h-14 ${bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                                    <Icon className={`${color} h-7 w-7`} />
                                </div>
                                <div>
                                    <p className="text-2xl font-black text-ink leading-tight">{value}</p>
                                    <p className="text-sm text-ink-muted font-semibold">{label}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Courses */}
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-black text-ink">Continue Learning</h2>
                            <button
                                onClick={() => navigate('/courses')}
                                className="flex items-center gap-1 text-primary-600 font-bold text-sm hover:underline underline-offset-4"
                            >
                                View all courses <ChevronRight size={16} />
                            </button>
                        </div>

                        {courses.length === 0 && !error ? (
                            <div className="p-10 text-center bg-white border border-dashed border-surface-border rounded-3xl text-ink-muted font-bold">
                                You haven't enrolled in any courses yet.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
                                {courses.map((course) => (
                                    <div key={course.id} className="bg-white border border-surface-border rounded-[2rem] overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary-100/50 hover:border-primary-200 transition-all group cursor-pointer">
                                        <div className={`h-36 relative flex items-center justify-center overflow-hidden`}>
                                            {course.image ? (
                                                <>
                                                    <img
                                                        src={course.image}
                                                        alt={course.title}
                                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                    <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-60`} />
                                                </>
                                            ) : (
                                                <div className={`absolute inset-0 bg-gradient-to-br ${course.color}`} />
                                            )}
                                            <BookOpen className="text-white/30 h-20 w-20 relative z-10" />
                                            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-white/30 z-10">
                                                <Clock size={12} className="text-white" />
                                                <span className="text-[10px] font-black text-white uppercase tracking-wider">{course.duration}</span>
                                            </div>
                                        </div>

                                        <div className="p-7">
                                            <span className="inline-block text-[10px] font-black uppercase tracking-wider text-primary-600 bg-primary-50 px-3 py-1 rounded-lg mb-3">
                                                {course.category}
                                            </span>
                                            <h3 className="font-black text-ink text-lg leading-snug mb-5 group-hover:text-primary-600 transition-colors">{course.title}</h3>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-bold text-ink-muted uppercase tracking-wider">Progress</span>
                                                    <span className="text-sm font-black text-ink">{course.progress}%</span>
                                                </div>
                                                <div className="w-full h-3 bg-surface-100 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full bg-gradient-to-r ${course.color} rounded-full shadow-sm`}
                                                        style={{ width: `${course.progress}%` }}
                                                    />
                                                </div>
                                            </div>
                                            <button className="mt-6 w-full py-3 bg-surface-50 hover:bg-primary-50 border border-surface-border hover:border-primary-200 text-ink hover:text-primary-700 font-bold rounded-2xl text-sm transition-all">
                                                Continue Course →
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
