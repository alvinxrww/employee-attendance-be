const express = require('express');
const { authenticate } = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Get user profile
router.get('/', authenticate, async (req, res) => {
    try {
        const { id } = req.user;

        const user = await User.findByPk(id, {
            attributes: {
                exclude: ['password'], // Exclude password from the result
            },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Update user profile
router.put('/', authenticate, upload.single('profile_photo'), async (req, res) => {
    try {
        const { id } = req.user;
        const { name, address, phone } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Profile picture URL
        const oldPhotoPath = user.profile_photo_url
            ? path.join(__dirname, '../../', user.profile_photo_url)
            : null;
        const profile_photo_url = req.file ? `/uploads/${req.file.filename}` : user.profile_photo_url;

        // Delete old profile picture
        if (oldPhotoPath && fs.existsSync(oldPhotoPath)) {
            fs.unlinkSync(oldPhotoPath);
        }

        // Update the user profile
        await user.update({
            name,
            address,
            phone,
            profile_photo_url,
        });

        res.status(200).json({
            message: 'Profile updated successfully',
            user,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
