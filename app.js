require('dotenv').config();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const flash = require('connect-flash');
const path = require('path');
const MongoStore = require('connect-mongo')(session);


const authRouter = require('./routes/auth');
const articlesRouter = require('./routes/articles');
const indexRouter = require('./routes/index');

const {verifyToken} = require('./routes/middlewares')
const authorizer = require('./authorizer')

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))
app.use(flash());
app.use(verifyToken);
app.use(authorizer.initialize);


app.use('/', indexRouter);
app.use('/articles', articlesRouter);
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
    useCreateIndex: true,
    useNewUrlParser: true
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = app;