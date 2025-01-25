const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Importing routes
const authRoutes = require('./routes/auth');
const attendanceRoutes = require('./routes/attendance');
const profileRoutes = require('./routes/profile');

// Using routes
app.use('/auth', authRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/profile', profileRoutes);

// Running the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
