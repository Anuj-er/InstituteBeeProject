const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const { authenticateUser, checkRole } = require('../middleware/auth');

// API route to get current user data
router.get('/current-user', authenticateUser, (req, res) => {
  // User is already attached to req by authenticateUser middleware
  const { password, ...userInfo } = req.user;
  res.json(userInfo);
});

// API routes example
router.get('/courses', (req, res) => {
  res.status(200).json({
    courses: [
      { id: 1, name: 'Computer Science' },
      { id: 2, name: 'Information Technology' },
      { id: 3, name: 'Electronics Engineering' }
    ]
  });
});

// API route to get users (admin only)
router.get('/users', authenticateUser, checkRole(['admin']), (req, res) => {
  const usersFilePath = path.join(__dirname, '..', 'public', 'users.json');
  
  fs.readFile(usersFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading user data:', err);
      return res.status(500).send('Internal Server Error');
    }

    try {
      const users = JSON.parse(data);
      // Remove passwords from the response
      const safeUsers = users.map(user => {
        const { password, ...safeUser } = user;
        return safeUser;
      });
      
      res.json(safeUsers);
    } catch (error) {
      console.error('Error parsing user data:', error);
      res.status(500).send('Internal Server Error');
    }
  });
});

module.exports = router;