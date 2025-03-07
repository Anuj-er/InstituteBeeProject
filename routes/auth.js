// Handles user login, registration, and logout.

const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Login and register page routes
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'register.html'));
});

// Logout route
router.get('/logout', (req, res) => {
  res.clearCookie('userEmail');
  res.redirect('/login');
});

// POST route for registration
router.post('/register', (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  if (!firstName || !lastName || !email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newUser = { firstName, lastName, email, password, role };
  const usersFilePath = path.join(__dirname, '..', 'public', 'users.json');

  fs.readFile(usersFilePath, 'utf-8', (err, data) => {
    let users = [];
    if (!err) {
      try {
        users = JSON.parse(data);
      } catch (parseErr) {
        console.error('Error parsing user data:', parseErr);
        // If the file exists but is empty or malformed, initialize with empty array
        users = [];
      }
    } else if (err.code !== 'ENOENT') {
      console.error('Error reading user data:', err);
      return res.status(500).send('Internal Server Error');
    }

    if (users.some(user => user.email === email)) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    users.push(newUser);
    
    // Ensure directory exists
    const dir = path.dirname(usersFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), err => {
      if (err) {
        console.error('Error saving user data:', err);
        return res.status(500).send('Internal Server Error');
      }
      res.redirect('/login');
    });
  });
});

// POST route for login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const usersFilePath = path.join(__dirname, '..', 'public', 'users.json');
  
  // Check if users.json exists
  if (!fs.existsSync(usersFilePath)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  
  fs.readFile(usersFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading user data:', err);
      return res.status(500).send('Internal Server Error');
    }

    try {
      const users = JSON.parse(data);
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        // Set a cookie with the user's email
        res.cookie('userEmail', email, { 
          maxAge: 24 * 60 * 60 * 1000, // 24 hours
          httpOnly: true 
        });
        
        const role = user.role || 'student';
        res.redirect(`/${role}Dashboard`);
      } else {
        res.status(401).json({ error: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      res.status(500).send('Internal Server Error');
    }
  });
});

module.exports = router;
