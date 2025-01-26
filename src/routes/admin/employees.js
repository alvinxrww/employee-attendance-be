const express = require('express');
const { authenticate } = require('../../middlewares/auth');
const { authorizeAdmin } = require('../../middlewares/authorize');
const User = require('../../models/user');
const bcrypt = require('bcrypt');

const router = express.Router();

// New employee
router.post('/', authenticate, authorizeAdmin, async (req, res) => {
    try {
        const { name, email, password, position, department, joined_at, status } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newEmployee = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'employee',
            position,
            department,
            joined_at,
            status: status || 'active',
        });
        res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update employee
router.put('/:id', authenticate, authorizeAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, position, department, joined_at, status } = req.body;
        const employee = await User.findByPk(id);
        if (!employee) return res.status(404).json({ error: 'Employee not found' });
        await employee.update({ name, position, department, joined_at, status });
        res.status(200).json({ message: 'Employee updated successfully', employee });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all employees
router.get('/', authenticate, authorizeAdmin, async (req, res) => {
    try {
        const employees = await User.findAll({
            where: { role: 'employee' },
            attributes: { exclude: ['password'] },
        });
        res.status(200).json({ employees });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Deactivate employee
// router.delete('/:id', authenticate, authorizeAdmin, async (req, res) => {
//     try {
//         const { id } = req.params;
//         const employee = await User.findByPk(id);
//         if (!employee) return res.status(404).json({ error: 'Employee not found' });
//         await employee.update({ status: 'inactive' });
//         res.status(200).json({ message: 'Employee deactivated successfully', employee });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

module.exports = router;
