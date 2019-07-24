const express = require('express');
const passport = require('passport');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

router.get('/login', isNotLoggedIn, (req, res, next) => {
    res.render('login');
});

router.post('/login', isNotLoggedIn,
    passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/');
    });

router.get('/signup', (req, res, next) => {
    res.render('signup');
});

router.post('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/auth/login');
})
module.exports = router;
