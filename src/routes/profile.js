const express = require('express');
const { authenticate } = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const User = require('../models/user');

const router = express.Router();

// Endpoint untuk update profile (termasuk upload foto)
router.put('/', authenticate, upload.single('profile_photo'), async (req, res) => {
    try {
        const { id } = req.user; // Ambil user ID dari JWT
        const { name, address, phone } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // URL foto profil (path lokal)
        const profile_photo_url = req.file ? `/uploads/profiles/${req.file.filename}` : user.profile_photo_url;

        // Update data user
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
