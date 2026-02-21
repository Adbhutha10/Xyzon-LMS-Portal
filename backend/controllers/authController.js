const Student = require('../models/Student');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { Op } = require('sequelize');

const signToken = (student) => {
    return jwt.sign(
        { id: student.id, email: student.email, role: student.role },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '1d' }
    );
};

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email and password are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const existingStudent = await Student.findOne({ where: { email } });
        if (existingStudent) {
            return res.status(409).json({ message: 'An account with this email already exists' });
        }

        const student = await Student.create({ name, email, password });
        const token = signToken(student);

        return res.status(201).json({
            token,
            student: {
                id: student.id,
                name: student.name,
                email: student.email,
                role: student.role,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check if student exists
        const student = await Student.findOne({ where: { email } });

        if (!student) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await student.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create Token
        const token = signToken(student);

        return res.json({
            token,
            student: {
                id: student.id,
                name: student.name,
                email: student.email,
                role: student.role,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const student = await Student.findOne({ where: { email } });

        if (!student) {
            return res.json({
                message: 'If an account exists with this email, a reset token has been generated.',
            });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        student.passwordResetToken = hashedResetToken;
        student.passwordResetExpires = new Date(Date.now() + 15 * 60 * 1000);
        await student.save();

        const response = {
            message: 'Password reset token generated. It expires in 15 minutes.',
        };

        if ((process.env.NODE_ENV || 'development') !== 'production') {
            response.resetToken = resetToken;
        }

        return res.json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

const resetPassword = async (req, res) => {
    const { token, password } = req.body;

    try {
        if (!token || !password) {
            return res.status(400).json({ message: 'Token and new password are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const hashedResetToken = crypto.createHash('sha256').update(token).digest('hex');

        const student = await Student.findOne({
            where: {
                passwordResetToken: hashedResetToken,
                passwordResetExpires: { [Op.gt]: new Date() },
            },
        });

        if (!student) {
            return res.status(400).json({ message: 'Reset token is invalid or expired' });
        }

        student.password = password;
        student.passwordResetToken = null;
        student.passwordResetExpires = null;
        await student.save();

        return res.json({
            message: 'Password reset successful. Please login with your new password.',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { signup, login, forgotPassword, resetPassword };
