const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('admin', 'employee'), defaultValue: 'employee' },
    position: { type: DataTypes.STRING },
    department: { type: DataTypes.STRING },
    joined_at: { type: DataTypes.DATEONLY },
    status: { type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active' },
    address: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    profile_photo_url: { type: DataTypes.STRING },
});

module.exports = User;
