const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../controllers/dashboardController');
const auth = require('../middleware/auth');

// @route   GET /api/dashboard
// @desc    Get dashboard data
router.get('/', auth, getDashboardData);

module.exports = router;
