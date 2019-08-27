const { User } = require('../models/database');
const bcrypt = require('bcrypt');
const { getMessage } = require('./');

const saltRounds = 10;

const failMessage = {
    emptyID: 'ID field is required',
    emptyPW: 'PW field is required',
    wrongID: 'Invalid ID',
    wrongPW: 'Invalid password'
};


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
        if (!id) return loginFail(req, res, failMessage.emptyID);
        if (!pw) return loginFail(req, res, failMessage.emptyPW);

        const user = await User.findOne({ id });
        if (!user) return loginFail(req, res, failMessage.wrongID);
        if (!(await compare(pw, user.pw))) return loginFail(req, res, failMessage.wrongPW);

        req.login(id);
        return res.redirect('/');
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

            req.login(id);
            return res.redirect('/');
        } catch (error) {
            console.error(error);
            return next(error);
        }
    },

    postLogout: (req, res) => {
        req.logout();
        res.redirect('/');
    },

}