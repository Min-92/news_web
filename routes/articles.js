const express = require('express');
const { Article } = require('../models/database');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

router.get('/', (req, res, next) => {
    const pageNumber = req.query.page || 1;
    const skipCount = 10*(pageNumber-1);
    const user = req.isAuthenticated() ? req.session.passport.user : undefined;

    Article.find({hidden : false}).sort({number : -1}).skip(skipCount).limit(10).exec((err, articles) => {
        if(articles.length === 0) next(err);
        res.render('articles', {
            title : "News",
            articles,
            user
        });
    });

});

router.get('/:number', async (req, res, next) => {
    const number = req.params.number;
    const article = await Article.findOne({ number });

    if (!article) next();
    const user = req.isAuthenticated() ? req.session.passport.user : undefined;
    res.render('article', { 
        number,
        title: "News",
        articleTitle : article.title, 
        img : article.img, 
        mainText : article.main, 
        comments : article.comments, 
        like : article.like.length,
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

router.post('/like/:number', isLoggedIn, async (req, res, next) => {
    const number = req.params.number;
    const user = req.session.passport.user;
    const article = await Article.findOne({ number });
    const hasLiked = article.like.filter(obj => obj.user === user)[0];
    if(!hasLiked) {
        await article.like.push({user});
    }else{
        await article.like.pull(hasLiked._id);
    }
    await article.save();
    res.redirect(`/articles/${number}`);
});


module.exports = router;

