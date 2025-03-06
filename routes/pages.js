const express = require('express');
const path = require('path');
const router = express.Router();
const { authenticateUser, checkRole } = require('../middleware/auth');

// Home route
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Contact page doesn't require login
router.get('/contactus', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'contactus.html'));
});

// Protected routes with role-based access
router.get('/adminDashboard', authenticateUser, checkRole(['admin']), (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'adminDashboard.html'));
});

router.get('/staffDashboard', authenticateUser, checkRole(['staff']), (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'staffDashboard.html'));
});

router.get('/studentDashboard', authenticateUser, checkRole(['student']), (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'studentDashboard.html'));
});

// Other protected routes
router.get('/courseMangmnt', authenticateUser, checkRole(['admin', 'staff']), (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'courseMangmnt.html'));
});

router.get('/attendance', authenticateUser, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'attendance.html'));
});

router.get('/anouncement', authenticateUser, checkRole(['admin', 'staff']), (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'anouncement.html'));
});

// Route parameters example
router.get('/user/:userId', authenticateUser, (req, res) => {
  res.status(200).send(`User profile for ID: ${req.params.userId}`);
});

module.exports = router;