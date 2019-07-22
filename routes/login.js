const express = require('express');
const router = express.Router();
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');

router.get('/', isNotLoggedIn, (req, res, next)=> {
    res.render('login');
});

module.exports = router;