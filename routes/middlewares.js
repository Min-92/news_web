const User = require('../models/database');

exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    }else {
        req.flash('error', '로그인이 필요합니다.');
        res.redirect('/articles/'+req.params.number);
    }
}

exports.isNotLoggedIn = (req, res, next) => {
    if( !req.isAuthenticated()) {
        next();
    }else{
        res.redirect('/');
    }
}

exports.isAdmin = async (req,res,next) => {
    const id = req.session.passport.user;
    const user = await User.find({ id });
    if(user.authority === "super") next();
    req.flash('error', '권한이 없습니다.');
    res.redirect('/')
}