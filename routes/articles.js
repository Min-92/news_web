const express = require('express');
const { Article } = require('../models/database');
const router = express.Router();
const { isLoggedIn } = require('./middlewares');
const { getMessage } = require('../controller');

const numberOfArticlesInPage = 6;

router.get('/', async (req, res, next) => {
    const pageNumber = req.query.page || 1;
    const skipCount = numberOfArticlesInPage * (pageNumber - 1);
    const user = req.isAuthenticated() ? req.session.passport.user : undefined;

    const articles = await Article.find({ hidden: false }).sort({ number: -1 });

    const articlesInPage = articles.reduce((acc, value, index) => {
        if (index < skipCount) return acc;
        if (index >= skipCount + numberOfArticlesInPage) return acc;
        return [...acc, value];
    }, [])

    const maxPage = Math.ceil(articles.length / numberOfArticlesInPage)
    const pages = [];
    for (let i = 1; i <= maxPage; i++) {
        pages.push(i);
    }

    res.render('articles', {
        title: "News",
        articlesInPage,
        user,
        pageNumber,
        pages
    });

});

router.get('/:number', async (req, res, next) => {
    const number = req.params.number;
    const article = await Article.findOne({ number });

    if (!article) next();
    const user = req.isAuthenticated() ? req.session.passport.user : undefined;
    const hasLiked = article.like.filter(obj => obj.user === user)[0];
    const message = getMessage(req);

    res.render('article', {
        number,
        title: "News",
        articleTitle: article.title,
        img: article.img,
        mainText: article.main,
        comments: article.comments,
        like: article.like.length,
        user,
        message,
        hasLiked
    });

});

router.post('/comment/:number', isLoggedIn, async (req, res, next) => {
    const number = req.params.number;
    const { comment } = req.body;
    const user = req.session.passport.user;
    const article = await Article.findOne({ number });

    await article.comments.push({ user, comment });
    await article.save();

    res.redirect(`/articles/${number}`);
});

router.post('/like/:number', isLoggedIn, async (req, res) => {
    const number = req.params.number;
    const user = req.session.passport.user;
    const article = await Article.findOne({ number });
    const hasLiked = article.like.filter(obj => obj.user === user)[0];

    if (hasLiked) {
        await article.like.pull(hasLiked._id);
    } else {
        await article.like.push({ user });
    }
    await article.save();

    res.redirect(`/articles/${number}`);
});


module.exports = router;

