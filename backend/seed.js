const Student = require('./models/Student');
const Course = require('./models/Course');
const { connectDB, sequelize } = require('./config/db');
require('dotenv').config();

const seedStudent = async () => {
    try {
        await connectDB();
        await sequelize.sync();

        let testStudent = await Student.findOne({ where: { email: 'student@example.com' } });

        if (!testStudent) {
            await Student.create({
                name: 'Test Student',
                email: 'student@example.com',
                password: 'password123',
            });
            testStudent = await Student.findOne({ where: { email: 'student@example.com' } });
            console.log('Test student created');
        } else {
            console.log('Test student already exists');
        }

        const courseCount = await Course.count({ where: { studentId: testStudent.id } });
        if (courseCount === 0) {
            await Course.bulkCreate([
                { title: 'Full Stack Web Development', category: 'Web Dev', progress: 65, duration: '2.5h left', color: 'from-primary-500 to-primary-700', studentId: testStudent.id },
                { title: 'UI/UX Design Fundamentals', category: 'Design', progress: 40, duration: '4h left', color: 'from-teal-500 to-teal-700', studentId: testStudent.id },
                { title: 'Data Structures & Algorithms', category: 'CS Core', progress: 82, duration: '1h left', color: 'from-amber-400 to-amber-600', studentId: testStudent.id },
            ]);
            console.log('Sample courses seeded successfully!');
        } else {
            console.log('Sample courses already exist');
        }

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedStudent();
