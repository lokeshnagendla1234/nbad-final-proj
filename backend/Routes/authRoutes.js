const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');

// POST route to register a user
router.post('/register', authController.registerUser);

// POST route to log in a user
router.post('/login', authController.loginUser);

module.exports = router;
