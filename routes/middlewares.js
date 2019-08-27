const { User } = require('../models/database');
const jwt = require('jsonwebtoken');
const jwtSecrete = process.env.JWT_SECRET;

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash('error', '로그인이 필요합니다.');
        const articleNumber = req.params.number;
        if (articleNumber) {
            res.redirect('/articles/' + req.params.number);
        } else {
            res.redirect('/');
        }
    }
}

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
}

exports.isAdmin = async (req, res, next) => {
    const id = req.decoded.id;
    const user = await User.findOne({ id });
    if (user.authority === 'super') return next();
    req.flash('error', '권한이 없습니다.');
    res.redirect('/')
}

exports.verifyToken = (req, res, next) => {
    try {
        req.decoded = jwt.verify(req.cookies.token, jwtSecrete);
        return next();
    } catch (err) {
        return next();
    }
}