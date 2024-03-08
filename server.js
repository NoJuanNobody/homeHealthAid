const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
const tasksRouter = require('./routes/tasks');

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// Database configuration
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'homeHealthAid',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Middleware for error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Define tasks management routes
app.use('/api/tasks', tasksRouter(pool));

// Define API endpoint to set user's password
app.post('/api/set-password', async (req, res) => {
  const plainTextPassword = req.body.password;

  try {
    // Hash the password using bcrypt
    const hash = await bcrypt.hash(plainTextPassword, 10);
    // Store 'hash' in your database
    console.log('Hashed password:', hash);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
