const express = require('express');
const path = require('path');

const loginRouter = require('./routes/login');

const port = 3000;

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', loginRouter);


app.listen(port,() =>{
    console.log(`Server listening on port ${port}`);
});