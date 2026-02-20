const Student = require('./models/Student');
const Course = require('./models/Course');
const AvailableCourse = require('./models/AvailableCourse');
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

        const availableCourseCount = await AvailableCourse.count();
        if (availableCourseCount === 0) {
            await AvailableCourse.bulkCreate([
                {
                    title: 'The Complete Web Developer 2026',
                    description: 'Learn everything from HTML/CSS to advanced React, Node.js, and Cloud deployment.',
                    category: 'Development',
                    instructor: 'Sarah Jenkins',
                    duration: '48h 30m',
                    price: 499.00,
                    rating: 4.8,
                    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800'
                },
                {
                    title: 'Advanced UI/UX Masterclass',
                    description: 'Master Figma, user research, and advanced prototyping techniques for mobile and web.',
                    category: 'Design',
                    instructor: 'Marcus Aurelius',
                    duration: '22h 15m',
                    price: 399.00,
                    rating: 4.9,
                    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800'
                },
                {
                    title: 'Data Science & Machine Learning',
                    description: 'Comprehensive guide to Python, Scikit-learn, TensorFlow, and advanced data visualization.',
                    category: 'Data Science',
                    instructor: 'Dr. Emily Chen',
                    duration: '56h 45m',
                    price: 599.00,
                    rating: 4.7,
                    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
                },
                {
                    title: 'Cybersecurity Fundamentals',
                    description: 'Protect systems and networks from digital attacks. Learn ethical hacking and risk management.',
                    category: 'Security',
                    instructor: 'Alex Rivera',
                    duration: '35h 20m',
                    price: 449.00,
                    rating: 4.6,
                    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
                },
                {
                    title: 'Digital Marketing Excellence',
                    description: 'Boost business with SEO, Social Media, Content Marketing, and Analytics.',
                    category: 'Marketing',
                    instructor: 'Jessica Alba',
                    duration: '28h 10m',
                    price: 299.00,
                    rating: 4.5,
                    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
                },
                {
                    title: 'Business Strategy & Leadership',
                    description: 'Learn to lead teams, manage projects, and scale organizations effectively.',
                    category: 'Business',
                    instructor: 'Michael Scott',
                    duration: '18h 40m',
                    price: 349.00,
                    rating: 4.8,
                    image: 'https://images.unsplash.com/photo-1507679799987-c7377be48656?auto=format&fit=crop&q=80&w=800'
                }
            ]);
            console.log('Global course catalog seeded successfully!');
        } else {
            // Force update all courses with new reliable images and INR prices
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

            // Update AvailableCourse prices
            await AvailableCourse.update({ price: 499 }, { where: { title: 'The Complete Web Developer 2026' } });
            await AvailableCourse.update({ price: 399 }, { where: { title: 'Advanced UI/UX Masterclass' } });
            await AvailableCourse.update({ price: 599 }, { where: { title: 'Data Science & Machine Learning' } });
            await AvailableCourse.update({ price: 449 }, { where: { title: 'Cybersecurity Fundamentals' } });
            await AvailableCourse.update({ price: 299 }, { where: { title: 'Digital Marketing Excellence' } });
            await AvailableCourse.update({ price: 349 }, { where: { title: 'Business Strategy & Leadership' } });

            console.log('Sample courses already exist, updated all images and low-cost INR prices.');
        }

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedStudent();
