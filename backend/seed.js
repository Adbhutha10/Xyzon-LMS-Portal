const Student = require('./models/Student');
const { connectDB, sequelize } = require('./config/db');
require('dotenv').config();

const seedStudent = async () => {
    try {
        await connectDB();
        await sequelize.sync();

        const existingStudent = await Student.findOne({ where: { email: 'student@example.com' } });
        if (existingStudent) {
            console.log('Test student already exists');
            process.exit();
        }

        await Student.create({
            name: 'Test Student',
            email: 'student@example.com',
            password: 'password123',
        });

        console.log('Test student created successfully!');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedStudent();
