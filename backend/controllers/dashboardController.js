const Course = require('../models/Course');

const getDashboardData = async (req, res) => {
    try {
        const studentId = req.user.id; // User ID from JWT middleware

        const courses = await Course.findAll({ where: { studentId } });

        // Mock stats for now
        const stats = [
            { label: 'Day Streak', value: '7', color: 'text-orange-500', bg: 'bg-orange-50' },
            { label: 'Points Earned', value: '1,320', color: 'text-amber-500', bg: 'bg-amber-50' },
            { label: 'Goals Met', value: '5/6', color: 'text-teal-600', bg: 'bg-teal-50' },
        ];

        res.json({ courses, stats });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getDashboardData };
