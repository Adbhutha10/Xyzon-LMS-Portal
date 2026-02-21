const Student = require('../models/Student');
const Course = require('../models/Course');
const AvailableCourse = require('../models/AvailableCourse');

const getAdminOverview = async (req, res) => {
    try {
        const [students, enrolledCourses, catalogCourses] = await Promise.all([
            Student.count(),
            Course.count(),
            AvailableCourse.count(),
        ]);

        return res.json({
            stats: {
                students,
                enrolledCourses,
                catalogCourses,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

const getStudents = async (req, res) => {
    try {
        const students = await Student.findAll({
            attributes: ['id', 'name', 'email', 'role', 'passwordChangedAt', 'createdAt'],
            order: [['createdAt', 'DESC']],
        });

        return res.json(students);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

const getCatalogCourses = async (req, res) => {
    try {
        const courses = await AvailableCourse.findAll({ order: [['createdAt', 'DESC']] });
        return res.json(courses);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

const createCatalogCourse = async (req, res) => {
    const { title, description, category, instructor, duration, price, image, rating } = req.body;

    try {
        if (!title || !description || !category || !instructor || !duration || !price) {
            return res.status(400).json({ message: 'Title, description, category, instructor, duration and price are required' });
        }

        const newCourse = await AvailableCourse.create({
            title,
            description,
            category,
            instructor,
            duration,
            price,
            image: image || null,
            rating: rating || 0,
        });

        return res.status(201).json(newCourse);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getAdminOverview,
    getStudents,
    getCatalogCourses,
    createCatalogCourse,
};
