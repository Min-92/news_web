const { User } = require('../models/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSecrete = process.env.JWT_SECRET;
const saltRounds = 10;
const cookieMaxAge = 60 * 60 * 24 * 14;

const { getMessage } = require('./');

const compare = async (pw, hash) => {
    const result = await bcrypt.compare(pw, hash);
    return result;
}

const loginFail = (req, res, message) => {
    req.flash('error', message);
    return res.redirect('/auth/login');
}

module.exports = {

    getLogin: (req, res, next) => {
        const message = getMessage(req);
        res.render('login', { title: "Log In", message })
    },

    postLogin: async (req, res, next) => {
        const { id, pw } = req.body;
        if (!id) return loginFail(req, res, 'ID field is required');
        if (!pw) return loginFail(req, res, 'PW field is required');

        const user = await User.findOne({ id });
        if (!user) return loginFail(req, res, 'Invalid ID');
        if (!await compare(pw, user.pw)) return loginFail(req, res, 'Invalid password');

        const token = jwt.sign({ id }, jwtSecrete);
        res.cookie('token', token, { path: '/', httpOnly: true, maxAge: cookieMaxAge });
        res.redirect('/');
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