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
                {
                    title: 'Full Stack Web Development',
                    category: 'Web Dev',
                    progress: 65,
                    duration: '2.5h left',
                    color: 'from-primary-500 to-primary-700',
                    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
                    studentId: testStudent.id
                },
                {
                    title: 'UI/UX Design Fundamentals',
                    category: 'Design',
                    progress: 40,
                    duration: '4h left',
                    color: 'from-teal-500 to-teal-700',
                    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800',
                    studentId: testStudent.id
                },
                {
                    title: 'Data Structures & Algorithms',
                    category: 'CS Core',
                    progress: 82,
                    duration: '1h left',
                    color: 'from-amber-400 to-amber-600',
                    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
                    studentId: testStudent.id
                },
            ]);
            console.log('Sample courses seeded successfully!');
        } else {
            // Force update all courses with new reliable images
            await Course.update(
                { image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800' },
                { where: { title: 'Full Stack Web Development' } }
            );
            await Course.update(
                { image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800' },
                { where: { title: 'UI/UX Design Fundamentals' } }
            );
            await Course.update(
                { image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800' },
                { where: { title: 'Data Structures & Algorithms' } }
            );
            console.log('Sample courses already exist, updated all images with reliable URLs.');
        }

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedStudent();
