const express = require('express');
const upload = require('../middlewares/upload'); // Middleware for file upload
const { authenticate } = require('../middlewares/auth'); // Middleware for authentication
const Attendance = require('../models/attendance');

const router = express.Router();

router.post('/', authenticate, upload.single('photo'), async (req, res) => {
    try {
        // Retrieve user_id from JWT payload
        const user_id = req.user.id;

        // Date and time now
        const date = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
        const time = new Date().toISOString().split('T')[1].split('.')[0]; // Format HH:mm:ss

        const photo_url = req.file?.path;

        if (!photo_url) {
            return res.status(400).json({ error: 'Photo is required' });
        }

        // Save attendance record to database
        const attendance = await Attendance.create({
            user_id,
            date,
            time,
            photo_url,
        });

        res.status(201).json({
            message: 'Attendance recorded successfully',
            attendance,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
