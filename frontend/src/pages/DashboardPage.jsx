import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Settings, LogOut, GraduationCap, Clock, ChevronRight, Flame, Trophy, Target } from 'lucide-react';

const courses = [
    { title: 'Full Stack Web Development', category: 'Web Dev', progress: 65, duration: '2.5h left', color: 'from-primary-500 to-primary-700' },
    { title: 'UI/UX Design Fundamentals', category: 'Design', progress: 40, duration: '4h left', color: 'from-teal-500 to-teal-700' },
    { title: 'Data Structures & Algorithms', category: 'CS Core', progress: 82, duration: '1h left', color: 'from-amber-400 to-amber-600' },
];

const statItems = [
    { icon: Flame, label: 'Day Streak', value: '7', color: 'text-orange-500', bg: 'bg-orange-50' },
    { icon: Trophy, label: 'Points Earned', value: '1,320', color: 'text-amber-500', bg: 'bg-amber-50' },
    { icon: Target, label: 'Goals Met', value: '5/6', color: 'text-teal-600', bg: 'bg-teal-50' },
];

const DashboardPage = () => {
    const [student, setStudent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const studentData = localStorage.getItem('student');
        if (!studentData) {
            navigate('/login');
        } else {
            setStudent(JSON.parse(studentData));
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    if (!student) return null;
    const initial = student.name ? student.name.charAt(0).toUpperCase() : 'S';

    return (
        <div className="min-h-screen bg-surface-50 text-ink font-sans flex">
            {/* Sidebar */}
            <aside className="w-72 border-r border-surface-border bg-white shadow-sm hidden lg:flex flex-col">
                <div className="p-8 border-b border-surface-border">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25">
                            <GraduationCap className="text-white" size={22} />
                        </div>
                        <span className="text-xl font-black text-ink">Xyzon <span className="text-primary-600">LMS</span></span>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    {[
                        { icon: LayoutDashboard, label: 'Dashboard', active: true },
                        { icon: BookOpen, label: 'My Courses', active: false },
                        { icon: Settings, label: 'Settings', active: false },
                    ].map(({ icon: Icon, label, active }) => (
                        <button key={label} className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl font-bold text-sm transition-all ${active ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25' : 'text-ink-muted hover:text-ink hover:bg-surface-100'}`}>
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
                            <p className="font-bold text-sm text-ink truncate">{student.name}</p>
                            <p className="text-xs text-ink-muted font-semibold truncate">{student.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-2xl font-bold text-sm transition-all"
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
                        <p className="text-sm text-ink-muted font-semibold mt-0.5">You have 3 ongoing courses. Keep it up!</p>
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
                            <button className="flex items-center gap-1 text-primary-600 font-bold text-sm hover:underline underline-offset-4">
                                View all courses <ChevronRight size={16} />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
                            {courses.map((course) => (
                                <div key={course.title} className="bg-white border border-surface-border rounded-[2rem] overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary-100/50 hover:border-primary-200 transition-all group cursor-pointer">
                                    {/* Course cover */}
                                    <div className={`h-36 bg-gradient-to-br ${course.color} relative flex items-center justify-center`}>
                                        <BookOpen className="text-white/30 h-20 w-20" />
                                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-white/30">
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
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
