const express = require('express');
const router = express.Router();
const { addUser, loginUser, dashboard} = require('../controller/userController');
router.post('/signup', addUser);
router.post('/login', loginUser);
router.get('/dashboard', dashboard);
module.exports = router;