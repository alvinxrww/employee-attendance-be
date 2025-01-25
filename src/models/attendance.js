const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Attendance = sequelize.define('Attendance', {
    date: { type: DataTypes.DATEONLY, allowNull: false },
    time: { type: DataTypes.TIME, allowNull: false },
    photo_url: { type: DataTypes.STRING, allowNull: false },
});

Attendance.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Attendance;
