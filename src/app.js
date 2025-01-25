const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Importing routes
const authRoutes = require('./routes/auth');

// Using routes
app.use('/auth', authRoutes);

// Running the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
