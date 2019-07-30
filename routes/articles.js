const express = require('express');
const { Article } = require('../models/database');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

router.get('/', (req, res, next) => {
    res.render('articles');
});

router.get('/:number', async (req, res, next) => {
    const number = req.params.number;
    const article = await Article.findOne({ number });

    if (!article) next();
    const user = req.isAuthenticated() ? req.session.passport.user : undefined;
    res.render('article', { 
        title: "News",
        articleTitle : article.title, 
        img : article.img, 
        mainText : article.main, 
        comments : article.comments, 
        actionURL : `/articles/comment/${number}`, 
        user
    });

});

router.post('/comment/:number', isLoggedIn, async (req, res, next) => {
    const number = req.params.number;
    const {comment} = req.body;
    const user = req.session.passport.user;
    const article = await Article.findOne({ number });
    await article.comments.push({user,comment});
    await article.save();
    res.redirect(`/articles/${number}`);
});


module.exports = router;

