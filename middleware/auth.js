// Protects restricted routes after authentication.

const path = require('path');
const fs = require('fs');

// Enhanced authentication middleware 
const authenticateUser = (req, res, next) => {
  const userEmail = req.cookies.userEmail;
  
  if (!userEmail) {
    return res.redirect('/login');
  }
  
  const usersFilePath = path.join(__dirname, '..', 'public', 'users.json');
  
  if (!fs.existsSync(usersFilePath)) {
    return res.redirect('/login');
  }
  
  fs.readFile(usersFilePath, 'utf-8', (err, data) => {
    if (err || !data) {
      return res.redirect('/login');
    }

    try {
      const users = JSON.parse(data);
      const user = users.find(u => u.email === userEmail);

      if (user) {
        // Attach user to req object for use in route handlers
        req.user = user;
        next();
      } else {
        res.redirect('/login');
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      res.redirect('/login');
    }
  });
};

// Role-based middleware
const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.redirect('/login');
    }
    
    if (roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).sendFile(path.join(__dirname, '..', 'public', 'error.html'));
    }
  };
};

module.exports = {
  authenticateUser,
  checkRole
};
