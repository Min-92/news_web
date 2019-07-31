const passport = require('passport');
const express = require('express');
const {getLogin, postLogin, getSignup, postSignup, postLogout} = require('../controller/authController');

const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');


router.get('/login', isNotLoggedIn, getLogin);
router.post('/login', isNotLoggedIn, postLogin(passport));

router.get('/signup', getSignup);
router.post('/signup', isNotLoggedIn, postSignup);

router.post('/logout', isLoggedIn, postLogout );

module.exports = router;
