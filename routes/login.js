const express = require('express');
const passport = require('passport');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

router.get('/', isNotLoggedIn, (req, res, next) => {
    res.render('login');
});

router.post('/', isNotLoggedIn,
    passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/');
    });
module.exports = router;
