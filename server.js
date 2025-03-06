const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 8080;

// Middlewares
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Use third-party middlewares
app.use(morgan('dev')); // HTTP request logger

// Configure Helmet with less restrictive settings
app.use(
  helmet({
    contentSecurityPolicy: false, // Disable CSP to avoid blocking resources
    crossOriginEmbedderPolicy: false, // Allow loading resources from different origins
    crossOriginResourcePolicy: false // Allow resources to be shared cross-origin
  })
);

app.use(compression()); // Compress responses
app.use(cors()); // Enable CORS
app.use(cookieParser()); // Parse cookies

// Handle JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Handle favicon.ico requests
app.get('/favicon.ico', (req, res) => {
  res.status(204).end(); // No content response for favicon requests
});

// Custom middleware for logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} request to ${req.url}`);
  next();
});

// Import middleware functions
const { authenticateUser, checkRole } = require('./middleware/auth');

// Import routes
const authRoutes = require('./routes/auth');
const pageRoutes = require('./routes/pages');
const apiRoutes = require('./routes/api');

// Use routes
app.use('/', authRoutes);
app.use('/', pageRoutes);
app.use('/api', apiRoutes);

// Error handling middleware - must be after all routes
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).send('Something broke!');
});

// Catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'error.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});