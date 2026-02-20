const AvailableCourse = require('../models/AvailableCourse');

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

module.exports = { getAllCourses, getCourseById };
