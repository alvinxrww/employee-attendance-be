const express = require('express');
const { authenticate } = require('../../middlewares/auth');
const { authorizeAdmin } = require('../../middlewares/authorize');
const Attendance = require('../../models/attendance');
const User = require('../../models/user');

const router = express.Router();

// Get all attendance records
router.get('/', authenticate, authorizeAdmin, async (req, res) => {
    try {
        const attendanceRecords = await Attendance.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name', 'position', 'department'],
                },
            ],
        });
        res.status(200).json({ attendance: attendanceRecords });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all attendance records of an employee
router.get('/:id', authenticate, authorizeAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const attendanceRecords = await Attendance.findAll({
            where: { user_id: id },
            include: [
                {
                    model: User,
                    attributes: ['name', 'position', 'department'],
                },
            ],
        });
        if (!attendanceRecords.length) {
            return res.status(404).json({ error: 'No attendance records found for this user' });
        }
        res.status(200).json({ attendance: attendanceRecords });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
