const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';

app.use(cors());
app.use(express.json());

const USERS = [
    { email: 'admin@test.com', password: 'password123', role: 'admin' },
    { email: 'teacher1@test.com', password: 'password123', role: 'teacher' },
    { email: 'teacher2@test.com', password: 'password123', role: 'teacher' }
];

// Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Akses ditolak, token hilang' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token tidak valid atau kedaluwarsa' });
        req.user = user;
        next();
    });
};

// Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = USERS.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Email atau password salah' });
    }

    const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, role: user.role, email: user.email });
});

// Create Ticket
app.post('/api/tickets', authenticateToken, async (req, res) => {
    if (req.user.role !== 'teacher') {
        return res.status(403).json({ message: 'Hanya Teacher yang bisa membuat tiket' });
    }

    const { title, description, priority } = req.body;
    if (!title || !description || !priority) {
        return res.status(400).json({ message: 'Semua field wajib diisi' });
    }

    if (!['Low', 'Medium', 'High'].includes(priority)) {
        return res.status(400).json({ message: 'Nilai prioritas tidak valid' });
    }

    try {
        const newTicket = await prisma.ticket.create({
            data: { title, description, priority, authorEmail: req.user.email }
        });
        res.status(201).json(newTicket);
    } catch (error) {
        res.status(500).json({ message: 'Gagal membuat tiket', error: error.message });
    }
});

// Get Ticket
app.get('/api/tickets', authenticateToken, async (req, res) => {
    try {
        let tickets;
        if (req.user.role === 'admin') {
            tickets = await prisma.ticket.findMany({ orderBy: { createdAt: 'desc' } });
        } else {
            tickets = await prisma.ticket.findMany({
                where: { authorEmail: req.user.email },
                orderBy: { createdAt: 'desc' }
            });
        }
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data', error: error.message });
    }
});

// Update Status
app.patch('/api/tickets/:id/status', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Hanya Admin yang bisa mengubah status' });
    }

    const { id } = req.params;
    const { status } = req.body;

    if (!['Submitted', 'Ongoing', 'Done'].includes(status)) {
        return res.status(400).json({ message: 'Status tidak valid' });
    }

    try {
        const updatedTicket = await prisma.ticket.update({
            where: { id: parseInt(id) },
            data: { status }
        });
        res.json(updatedTicket);
    } catch (error) {
        res.status(500).json({ message: 'Gagal memperbarui status', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});