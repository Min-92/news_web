const bcrypt = require('bcrypt');
const passport = require('passport');
const express = require('express');
const { User } = require('../models/database');

const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const saltRounds = 10;
const getMessage = (req) => {
    const fmsg = req.flash();
    let message;
    if (fmsg.error) message = fmsg.error[0];
    return message
}

router.get('/login', isNotLoggedIn, (req, res, next) => {
    const message  = getMessage(req);
    res.render('login', { title: "Log In", message });
});

router.post('/login', isNotLoggedIn,
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true
    }));
router.get('/signup', (req, res, next) => {
    const message  = getMessage(req);
    res.render('signup', { title: "Sign Up", message });
});

router.post('/signup', isNotLoggedIn, async (req, res, next) => {
    const { id, pw } = req.body;
    try {
        const exUser = await User.findOne({ id });
        if (exUser) {
            req.flash('error', 'Existing ID')
            return res.redirect('/auth/signup');
        }
        const hash = await bcrypt.hash(pw, saltRounds);
        await User.create({ id, pw:hash });
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
