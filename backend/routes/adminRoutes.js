const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/admin');
const {
    getAdminOverview,
    getStudents,
    getCatalogCourses,
    createCatalogCourse,
} = require('../controllers/adminController');

router.use(auth, adminOnly);

router.get('/overview', getAdminOverview);
router.get('/students', getStudents);
router.get('/catalog-courses', getCatalogCourses);
router.post('/catalog-courses', createCatalogCourse);

module.exports = router;
