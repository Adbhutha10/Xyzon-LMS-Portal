const express = require('express');
const router = express.Router();
const { signup, login, forgotPassword, resetPassword } = require('../controllers/authController');

// @route   POST /api/auth/signup
// @desc    Register student & get token
router.post('/signup', signup);

// @route   POST /api/auth/login
// @desc    Authenticate student & get token
router.post('/login', login);

// @route   POST /api/auth/forgot-password
// @desc    Generate a reset token for password reset
router.post('/forgot-password', forgotPassword);

// @route   POST /api/auth/reset-password
// @desc    Reset password using token
router.post('/reset-password', resetPassword);

module.exports = router;
