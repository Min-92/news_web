const { User } = require('../models/database');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const {getMessage} = require('./');

module.exports = {
    getLogin: (req, res, next) => {
        console.log(req.url);
        const message = getMessage(req);
        res.render('login', { title: "Log In", message })
    },

    postLogin: (passport) => {
        return passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/auth/login',
            failureFlash: true
        })
    },

    getSignup: (req, res, next) => {
        const message = getMessage(req);
        res.render('signup', { title: "Sign Up", message });
    },

    postSignup: async (req, res, next) => {
        const { id, pw } = req.body;
        try {
            const exUser = await User.findOne({ id });
            if (exUser) {
                req.flash('error', 'Existing ID')
                return res.redirect('/auth/signup');
            }
            const hash = await bcrypt.hash(pw, saltRounds);
            await User.create({ id, pw: hash });
            return res.redirect('/');
        } catch (error) {
            console.error(error);
            return next(error);
        }
    },

    postLogout: (req, res) => {
        req.logout();
        req.session.destroy();
        res.redirect('/');
    },

}