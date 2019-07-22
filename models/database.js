const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost/news';

mongoose.connect((mongoURI), { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
    console.log('mongodb connected');

});

const userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    pw: { type: String, required: true },
    date: { type: String, default: Date.now },
    authority: { type: String, default: "normal" }
})

const User = mongoose.model('User', userSchema);


module.exports = { db, User };