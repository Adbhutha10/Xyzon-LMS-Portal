const Course = require('../models/Course');

const getConsecutiveDayStreak = (dates) => {
    if (!dates.length) {
        return 0;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dateSet = new Set(
        dates.map((dateValue) => {
            const normalized = new Date(dateValue);
            normalized.setHours(0, 0, 0, 0);
            return normalized.getTime();
        })
    );

    let streak = 0;
    const cursor = new Date(today);

    while (dateSet.has(cursor.getTime())) {
        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
    }

    return streak;
};

const getDashboardData = async (req, res) => {
    try {
        const studentId = req.user.id; // User ID from JWT middleware

        const courses = await Course.findAll({ where: { studentId } });

        const totalCourses = courses.length;
        const progressValues = courses.map((course) => Number(course.progress) || 0);
        const totalProgress = progressValues.reduce((sum, progress) => sum + progress, 0);
        const completedCourses = progressValues.filter((progress) => progress >= 100).length;

        const activityDates = courses
            .flatMap((course) => [course.createdAt, course.updatedAt])
            .filter(Boolean);

        const dayStreak = getConsecutiveDayStreak(activityDates);
        const pointsEarned = Math.round(totalProgress * 10);
        const goalsMet = `${completedCourses}/${totalCourses || 0}`;

        const stats = [
            { label: 'Day Streak', value: String(dayStreak), color: 'text-orange-500', bg: 'bg-orange-50' },
            { label: 'Points Earned', value: pointsEarned.toLocaleString(), color: 'text-amber-500', bg: 'bg-amber-50' },
            { label: 'Goals Met', value: goalsMet, color: 'text-teal-600', bg: 'bg-teal-50' },
        ];

        res.json({ courses, stats });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getDashboardData };
