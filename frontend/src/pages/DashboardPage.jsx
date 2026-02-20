import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Settings, LogOut } from 'lucide-react';

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

    return (
        <div className="min-h-screen bg-slate-950 text-white flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/5 bg-slate-900/50 backdrop-blur-md p-6 hidden md:block">
                <div className="flex items-center gap-2 mb-10 px-2">
                    <BookOpen className="text-purple-500" size={28} />
                    <span className="text-xl font-bold tracking-tight">Xyzon LMS</span>
                </div>

                <nav className="space-y-2">
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-purple-600 rounded-xl font-medium text-white transition-all shadow-lg shadow-purple-500/20">
                        <LayoutDashboard size={20} />
                        Dashboard
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all">
                        <BookOpen size={20} />
                        My Courses
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all">
                        <Settings size={20} />
                        Settings
                    </button>
                </nav>

                <div className="absolute bottom-10 left-6 right-6">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-400/5 rounded-xl font-medium transition-all"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <header className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold">Welcome back, {student.name}!</h1>
                        <p className="text-slate-400">Check out your learning progress.</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-full flex items-center justify-center font-bold text-lg border-2 border-white/20 shadow-xl">
                        {student.name.charAt(0)}
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Placeholder Course Cards */}
                    {[1, 2, 3].map((id) => (
                        <div key={id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-all group">
                            <div className="aspect-video bg-slate-800 rounded-xl mb-4 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                            </div>
                            <h3 className="text-lg font-bold mb-2 group-hover:text-purple-400 transition-colors">Introduction to Full Stack Development</h3>
                            <p className="text-slate-400 text-sm mb-4 line-clamp-2">Learn the essentials of building modern web applications from scratch.</p>
                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                <span className="text-xs font-semibold px-2 py-1 bg-purple-500/20 text-purple-400 rounded uppercase tracking-wider">In Progress</span>
                                <span className="text-slate-500 text-sm font-medium">45% Complete</span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
