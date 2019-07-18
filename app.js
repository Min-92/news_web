const express = require('express');
const path = require('path');
const logger = require('morgan');

const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');

const port = 3000;

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', loginRouter);
app.use('/signup', signupRouter);


app.listen(port,() =>{
    console.log(`Server listening on port ${port}`);
});