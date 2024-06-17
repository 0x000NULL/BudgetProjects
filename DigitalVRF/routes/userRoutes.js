const express = require('express');
const { registerUser, authUser } = require('../controllers/userController');
const router = express.Router();

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', authUser);

module.exports = router;
