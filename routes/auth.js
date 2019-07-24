const express = require('express');
const passport = require('passport');
const { User } = require('../models/database');

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

router.post('/signup', isNotLoggedIn, async (req, res, next) => {
    const { id, pw } = req.body;
    try {
        const exUser = await User.findOne({ id });
        if (exUser) {
            return res.redirect('/signup');
        }
        await User.create({ id, pw });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.post('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
