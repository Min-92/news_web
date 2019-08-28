const express = require('express');
const { getLogin, postLogin, getSignup, postSignup, postLogout } = require('../controller/authController');

const { User } = require('../models/database');


const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');


router.get('/github-login', (req, res) => {
    res.redirect('https://github.com/login/oauth/authorize?client_id=3c03ba40890c68e92ddb&scope=user');
});
router.get('/github/callback', (req, res) => {
    const client_id = '3c03ba40890c68e92ddb';
    const client_secret = '30f7501e65f3eed30a959dc159662cdcfaf1aa9a';
    const code = req.query.code;
    const request = require('request');

    const options = {
        uri: 'https://github.com/login/oauth/access_token?' + `client_id=${client_id}&client_secret=${client_secret}&code=${code}`,
        method: 'POST',
        json: true
    };

    request.post(options, async (err, response, body) => {
        console.log(body);
        const token = body.access_token;
        console.log(token);

        request.get({ headers: { 'Authorization': `token ${token}`, 'User-Agent': `wangmin-news`, }, url: 'https://api.github.com/user' }, async (err, innerRes, innerBody) => {
            const userData = JSON.parse(innerBody);
            const id = userData.login+'@github'
            console.log(userData);
            console.log(id);

            const user = await User.findOne({id});
            if (!user) await User.create({id, token});

            req.login(id);
            return res.redirect('/');
        });

        if (err) { return console.log(err); }
    })

});
router.get('/login', isNotLoggedIn, getLogin);
router.post('/login', isNotLoggedIn, postLogin);

router.get('/signup', getSignup);
router.post('/signup', isNotLoggedIn, postSignup);

router.post('/logout', isLoggedIn, postLogout);

module.exports = router;
// github-login

