const express = require('express');
const router = express.Router();
const { getAllCourses, getCourseById, getMyEnrollments, enrollInCourse } = require('../controllers/courseController');
const auth = require('../middleware/auth');

// @route   GET /api/courses
// @desc    Get all available courses
router.get('/', getAllCourses);

// @route   GET /api/courses/my-enrollments
// @desc    Get enrolled courses for current student
router.get('/my-enrollments', auth, getMyEnrollments);

// @route   GET /api/courses/:id
// @desc    Get course by ID
router.get('/:id', getCourseById);

// @route   POST /api/courses/:id/enroll
// @desc    Enroll current student in selected course
router.post('/:id/enroll', auth, enrollInCourse);

module.exports = router;
