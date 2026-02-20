const express = require('express');
const router = express.Router();
const { getAllCourses, getCourseById } = require('../controllers/courseController');

// @route   GET /api/courses
// @desc    Get all available courses
router.get('/', getAllCourses);

// @route   GET /api/courses/:id
// @desc    Get course by ID
router.get('/:id', getCourseById);

module.exports = router;
