const express = require('express');
const { Article } = require('../models/database');
const router = express.Router();
const { isLoggedIn, isAdmin } = require('./middlewares');
const { getMessage, getUser, isHasLiked } = require('../controller');

const numberOfArticlesInPage = 6;

router.get('/', async (req, res, next) => {
    const pageNumber = req.query.page || 1;
    const skipCount = numberOfArticlesInPage * (pageNumber - 1);
    const user = await getUser(req);
    const message = getMessage(req);

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
        pages,
        message
    });

});
router.get('/form', isLoggedIn, isAdmin, async (req, res, next) => {
    const user = await getUser(req);
    res.render('articleForm', { user });
});

router.get('/form/:number', isLoggedIn, isAdmin, async (req, res, next) => {
    const number = req.params.number;
    const article = await Article.findOne({ number });
    if(!article) return next();

    const {title, img, main} = article;

    const user = await getUser(req);
    res.render('articleForm', { user, title, img, main, number });
});

router.patch('/:number', isLoggedIn, isAdmin, async (req,res,next)=> {
    const number = req.params.number;
    const { title, body, img } = req.body;
    await Article.find({number}).update({
        title,
        main:body,
        img
    });
    res.redirect('/');
})

router.delete('/:number', isLoggedIn, isAdmin, async (req,res,next)=> {
    const number = req.params.number;
    await Article.find({number}).update({
        hidden:true
    });
    res.redirect('/');
})

router.get('/:number', async (req, res, next) => {
    const number = req.params.number;
    const article = await Article.findOne({ number });

    if (!article) return next();
    const user = await getUser(req);
    const hasLiked = isHasLiked(article,user);
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

router.post('/', async (req, res) => {
    const { title, body, img } = req.body;
    const articles = await Article.find();
    const article = new Article({
        title,
        main: body,
        img,
        number: articles.length + 1
    })
    article.save();

    res.redirect('/');

})

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
    const user = await getUser(req);
    const article = await Article.findOne({ number });
    const hasLiked = isHasLiked(article,user);
    
    if (hasLiked) {
        await article.like.pull(hasLiked._id);
    } else {
        await article.like.push( user._id );
    }
    await article.save();

    res.redirect(`/articles/${number}`);
});


module.exports = router;

