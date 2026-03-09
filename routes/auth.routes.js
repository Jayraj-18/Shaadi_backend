const express = require('express');
const { register, login, createGuest } = require('../controllers/auth.controller');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/guest', createGuest);

module.exports = router;
