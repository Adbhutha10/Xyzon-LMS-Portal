import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Settings, LogOut, GraduationCap, Clock, ChevronRight } from 'lucide-react';

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
        <div className="min-h-screen bg-lms-light text-lms-black flex">
            {/* Sidebar */}
            <aside className="w-72 border-r border-lms-mint/50 bg-white/70 backdrop-blur-xl p-8 hidden lg:flex flex-col">
                <div className="flex items-center gap-3 mb-12 px-2">
                    <GraduationCap className="text-lms-cascades" size={32} />
                    <span className="text-2xl font-bold tracking-tight">Xyzon LMS</span>
                </div>

                <nav className="space-y-3 flex-1">
                    <button className="w-full flex items-center gap-4 px-5 py-4 bg-lms-black rounded-[1.25rem] font-bold text-white transition-all shadow-xl shadow-lms-black/10">
                        <LayoutDashboard size={22} />
                        Dashboard
                    </button>
                    <button className="w-full flex items-center gap-4 px-5 py-4 text-lms-charon hover:text-lms-black hover:bg-lms-mint/20 rounded-[1.25rem] font-bold transition-all">
                        <BookOpen size={22} />
                        My Courses
                    </button>
                    <button className="w-full flex items-center gap-4 px-5 py-4 text-lms-charon hover:text-lms-black hover:bg-lms-mint/20 rounded-[1.25rem] font-bold transition-all">
                        <Settings size={22} />
                        Settings
                    </button>
                </nav>

                <div className="mt-auto">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-5 py-4 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-[1.25rem] font-bold transition-all group"
                    >
                        <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-12 overflow-y-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-extrabold mb-2">Welcome back, {student.name}! 👋</h1>
                        <p className="text-lms-charon font-medium text-lg">Pick up right where you left off.</p>
                    </div>
                    <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-2xl border border-lms-mint/50 shadow-sm">
                        <div className="w-14 h-14 bg-gradient-to-br from-lms-cascades to-lms-smoke rounded-xl flex items-center justify-center font-bold text-xl text-white shadow-lg">
                            {student.name.charAt(0)}
                        </div>
                        <div>
                            <p className="font-bold text-sm leading-tight text-lms-black">{student.name}</p>
                            <p className="text-xs font-medium text-lms-charon uppercase tracking-wider">Student ID #1732</p>
                        </div>
                    </div>
                </header>

                {/* Dashboard Stats / Grid */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold">Your Active Courses</h2>
                        <button className="text-lms-cascades font-bold text-sm hover:underline underline-offset-4 flex items-center gap-1">
                            View all <ChevronRight size={16} />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {[1, 2, 3].map((id) => (
                            <div key={id} className="bg-white border border-lms-mint/50 rounded-[2.5rem] p-8 hover:border-lms-cascades transition-all group shadow-sm hover:shadow-2xl hover:-translate-y-2">
                                <div className="aspect-video bg-lms-light rounded-[1.5rem] mb-6 overflow-hidden relative border border-lms-mint/30">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-lms-cascades/5 to-transparent"></div>
                                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
                                        <Clock size={14} className="text-lms-smoke" />
                                        <span className="text-[10px] font-bold text-lms-black uppercase tracking-widest">2.5h left</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-lms-cascades transition-colors leading-tight">Mastering Full Stack Architecture with React & Node</h3>
                                <p className="text-lms-charon text-sm font-medium mb-6 line-clamp-2">Deep dive into enterprise scaling, database optimization, and high-performance UI patterns.</p>

                                <div className="space-y-4 pt-6 border-t border-lms-light">
                                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                                        <span className="text-lms-cascades px-3 py-1 bg-lms-cascades/10 rounded-lg">Web Dev</span>
                                        <span className="text-lms-black">65% Done</span>
                                    </div>
                                    <div className="w-full h-2.5 bg-lms-light rounded-full overflow-hidden">
                                        <div className="h-full bg-lms-cascades rounded-full" style={{ width: '65%' }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default DashboardPage;
