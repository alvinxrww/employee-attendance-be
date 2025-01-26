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
const adminEmployeeRoutes = require('./routes/admin/employees');
const adminAttendanceRoutes = require('./routes/admin/attendance');

// Using routes
app.use('/auth', authRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/profile', profileRoutes);
app.use('/admin/employees', adminEmployeeRoutes); // CRUD karyawan
app.use('/admin/attendance', adminAttendanceRoutes); // View-only absensi

// Running the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
