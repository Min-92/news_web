const express = require('express');
const { getLogin, postLogin, getSignup, postSignup, postLogout } = require('../controller/authController');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const githubOauth = require('../authorizer/github_oauth')

const router = express.Router();

router.get('/github-login', (req, res, next) => {
    const code = req.query.code;
    if(!code) return res.redirect(githubOauth.requestCodeURL);
 
    githubOauth.login(req,res,next,code);
});

router.get('/login', isNotLoggedIn, getLogin);
router.post('/login', isNotLoggedIn, postLogin);

router.get('/signup', getSignup);
router.post('/signup', isNotLoggedIn, postSignup);

router.post('/logout', isLoggedIn, postLogout);

module.exports = router;
