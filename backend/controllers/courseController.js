const AvailableCourse = require('../models/AvailableCourse');
const Course = require('../models/Course');

const getCourseColor = (category) => {
    const key = (category || '').toLowerCase();

    if (key.includes('design')) return 'from-teal-500 to-teal-700';
    if (key.includes('data')) return 'from-amber-400 to-amber-600';
    if (key.includes('security')) return 'from-rose-500 to-rose-700';
    if (key.includes('marketing')) return 'from-fuchsia-500 to-fuchsia-700';
    if (key.includes('business')) return 'from-indigo-500 to-indigo-700';

    return 'from-primary-500 to-primary-700';
};

const getAllCourses = async (req, res) => {
    try {
        const courses = await AvailableCourse.findAll();
        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getCourseById = async (req, res) => {
    try {
        const course = await AvailableCourse.findByPk(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(course);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getMyEnrollments = async (req, res) => {
    try {
        const studentId = req.user.id;

        const courses = await Course.findAll({
            where: { studentId },
            attributes: ['id', 'title', 'sourceCourseId', 'progress', 'updatedAt'],
            order: [['updatedAt', 'DESC']],
        });

        const enrolledCourseIds = courses
            .map((course) => course.sourceCourseId)
            .filter((id) => id !== null && id !== undefined);

        return res.json({ enrolledCourseIds, courses });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

const enrollInCourse = async (req, res) => {
    try {
        const studentId = req.user.id;
        const sourceCourseId = Number(req.params.id);

        const availableCourse = await AvailableCourse.findByPk(sourceCourseId);
        if (!availableCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const existingEnrollment = await Course.findOne({ where: { studentId, sourceCourseId } });
        if (existingEnrollment) {
            return res.status(409).json({ message: 'You are already enrolled in this course', course: existingEnrollment });
        }

        const enrolledCourse = await Course.create({
            title: availableCourse.title,
            category: availableCourse.category,
            progress: 0,
            duration: availableCourse.duration,
            color: getCourseColor(availableCourse.category),
            image: availableCourse.image,
            studentId,
            sourceCourseId,
        });

        return res.status(201).json({ message: 'Enrollment successful', course: enrolledCourse });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getAllCourses, getCourseById, getMyEnrollments, enrollInCourse };
