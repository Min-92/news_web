const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const express = require('express');
const logger = require('morgan');
const flash = require('connect-flash');
const path = require('path');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const passportConfig = require('./passport/index');
const authRouter = require('./routes/auth');
const articlesRouter = require('./routes/articles');

const port = 3000;
const mongoURI = 'mongodb://localhost/news';

const app = express();

passportConfig(passport);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: '#newssecret',
    resave: false,
    saveUninitialized: true
}))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use('/', articlesRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
})

mongoose.connect((mongoURI), { 
    useCreateIndex :  true ,
    useNewUrlParser: true });

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});