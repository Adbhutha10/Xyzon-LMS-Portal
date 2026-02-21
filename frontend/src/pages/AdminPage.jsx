import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShieldCheck, Users, BookOpen, Layers, Plus } from 'lucide-react';

const AdminPage = () => {
    const [student, setStudent] = useState(null);
    const [overview, setOverview] = useState({ students: 0, enrolledCourses: 0, catalogCourses: 0 });
    const [students, setStudents] = useState([]);
    const [catalogCourses, setCatalogCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [newCourse, setNewCourse] = useState({
        title: '',
        description: '',
        category: '',
        instructor: '',
        duration: '',
        price: '',
        image: '',
    });

    const navigate = useNavigate();
    const apiBase = useMemo(() => {
        const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const normalizedApiUrl = rawApiUrl.replace(/\/+$/, '');
        return normalizedApiUrl.endsWith('/api') ? normalizedApiUrl : `${normalizedApiUrl}/api`;
    }, []);

    useEffect(() => {
        const studentData = localStorage.getItem('student');
        const token = localStorage.getItem('token');

        if (!studentData || !token) {
            navigate('/login');
            return;
        }

        const parsedStudent = JSON.parse(studentData);
        setStudent(parsedStudent);

        if (parsedStudent.role !== 'admin') {
            navigate('/dashboard');
            return;
        }

        const fetchAdminData = async () => {
            try {
                const headers = { Authorization: `Bearer ${token}` };
                const [overviewRes, studentsRes, catalogRes] = await Promise.all([
                    axios.get(`${apiBase}/admin/overview`, { headers }),
                    axios.get(`${apiBase}/admin/students`, { headers }),
                    axios.get(`${apiBase}/admin/catalog-courses`, { headers }),
                ]);

                setOverview(overviewRes.data.stats);
                setStudents(studentsRes.data);
                setCatalogCourses(catalogRes.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load admin data');
            } finally {
                setLoading(false);
            }
        };

        fetchAdminData();
    }, [apiBase, navigate]);

    const handleCourseChange = (event) => {
        const { name, value } = event.target;
        setNewCourse((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateCourse = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(
                `${apiBase}/admin/catalog-courses`,
                {
                    ...newCourse,
                    price: Number(newCourse.price),
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setCatalogCourses((prev) => [response.data, ...prev]);
            setOverview((prev) => ({ ...prev, catalogCourses: prev.catalogCourses + 1 }));
            setNewCourse({
                title: '',
                description: '',
                category: '',
                instructor: '',
                duration: '',
                price: '',
                image: '',
            });
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create catalog course');
        }
    };

    if (!student || loading) {
        return <div className="ui-shell flex items-center justify-center">Loading admin panel...</div>;
    }

    return (
        <div className="ui-shell">
            <header className="ui-topbar border-b border-surface-border">
                <div className="ui-section h-20 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-ink flex items-center gap-3">
                            <ShieldCheck className="text-primary-600" />
                            Admin Panel
                        </h1>
                        <p className="text-ink-muted font-semibold text-sm">Manage students and course catalog</p>
                    </div>
                    <button className="ui-btn-secondary" onClick={() => navigate('/dashboard')}>
                        Back to Dashboard
                    </button>
                </div>
            </header>

            <main className="ui-section py-10 space-y-8">
                {error && <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 font-semibold">{error}</div>}

                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="ui-card p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center"><Users className="text-primary-600" /></div>
                        <div><p className="text-2xl font-black text-ink">{overview.students}</p><p className="text-sm text-ink-muted font-semibold">Total Students</p></div>
                    </div>
                    <div className="ui-card p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center"><BookOpen className="text-teal-600" /></div>
                        <div><p className="text-2xl font-black text-ink">{overview.enrolledCourses}</p><p className="text-sm text-ink-muted font-semibold">Enrolled Courses</p></div>
                    </div>
                    <div className="ui-card p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center"><Layers className="text-amber-600" /></div>
                        <div><p className="text-2xl font-black text-ink">{overview.catalogCourses}</p><p className="text-sm text-ink-muted font-semibold">Catalog Courses</p></div>
                    </div>
                </section>

                <section className="ui-card p-6">
                    <h2 className="text-xl font-black text-ink mb-4">Create Catalog Course</h2>
                    <form onSubmit={handleCreateCourse} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input className="ui-input" name="title" value={newCourse.title} onChange={handleCourseChange} placeholder="Title" required />
                        <input className="ui-input" name="category" value={newCourse.category} onChange={handleCourseChange} placeholder="Category" required />
                        <input className="ui-input" name="instructor" value={newCourse.instructor} onChange={handleCourseChange} placeholder="Instructor" required />
                        <input className="ui-input" name="duration" value={newCourse.duration} onChange={handleCourseChange} placeholder="Duration" required />
                        <input className="ui-input" name="price" type="number" min="0" step="0.01" value={newCourse.price} onChange={handleCourseChange} placeholder="Price" required />
                        <input className="ui-input" name="image" value={newCourse.image} onChange={handleCourseChange} placeholder="Image URL (optional)" />
                        <textarea className="ui-input md:col-span-2 min-h-28" name="description" value={newCourse.description} onChange={handleCourseChange} placeholder="Description" required />
                        <button type="submit" className="ui-btn-primary md:col-span-2"><Plus size={16} /> Add Course</button>
                    </form>
                </section>

                <section className="ui-card p-6">
                    <h2 className="text-xl font-black text-ink mb-4">Students</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="text-left border-b border-surface-border text-ink-muted">
                                    <th className="py-3 pr-4">Name</th>
                                    <th className="py-3 pr-4">Email</th>
                                    <th className="py-3 pr-4">Role</th>
                                    <th className="py-3">Last Password Change</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((s) => (
                                    <tr key={s.id} className="border-b border-surface-100">
                                        <td className="py-3 pr-4 font-semibold text-ink">{s.name}</td>
                                        <td className="py-3 pr-4 text-ink-muted">{s.email}</td>
                                        <td className="py-3 pr-4">
                                            <span className={`ui-pill ${s.role === 'admin' ? 'bg-primary-50 text-primary-700' : 'bg-surface-100 text-ink-muted'}`}>{s.role}</span>
                                        </td>
                                        <td className="py-3 text-ink-muted">{s.passwordChangedAt ? new Date(s.passwordChangedAt).toLocaleString() : 'Not available'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="ui-card p-6">
                    <h2 className="text-xl font-black text-ink mb-4">Catalog Courses ({catalogCourses.length})</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {catalogCourses.slice(0, 8).map((course) => (
                            <div key={course.id} className="rounded-2xl border border-surface-border p-4 bg-surface-50">
                                <p className="font-bold text-ink">{course.title}</p>
                                <p className="text-xs text-ink-muted font-semibold mt-1">{course.category} • {course.instructor}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminPage;
