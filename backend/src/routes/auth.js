const express = require('express');
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { login, logout } = require('../controllers/auth');

const router = express.Router();

router.post('/login', isNotLoggedIn, login);

router.get('/logout', isLoggedIn, logout);

module.exports = router;
