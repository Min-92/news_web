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