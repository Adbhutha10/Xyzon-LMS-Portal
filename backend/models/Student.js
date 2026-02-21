const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const bcrypt = require('bcryptjs');

const Student = sequelize.define('Student', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    passwordResetToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    passwordResetExpires: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    passwordChangedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    hooks: {
        beforeCreate: async (student) => {
            if (student.password) {
                const salt = await bcrypt.genSalt(10);
                student.password = await bcrypt.hash(student.password, salt);
                student.passwordChangedAt = new Date();
            }
        },
        beforeUpdate: async (student) => {
            if (student.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                student.password = await bcrypt.hash(student.password, salt);
                student.passwordChangedAt = new Date();
            }
        },
    },
});

Student.prototype.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = Student;
