const session = require('express-session');
const mongoose = require('mongoose');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const passportConfig = require('./passport/index');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');

const port = 3000;
const mongoURI = 'mongodb://localhost/news';

const app = express();

passportConfig(passport);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: '#newssecret',
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());


app.use('/login', loginRouter);
app.use('/signup', signupRouter);

app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
})

mongoose.connect((mongoURI), { useNewUrlParser: true });

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});