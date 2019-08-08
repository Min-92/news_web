const mongoose = require('mongoose');
const db = mongoose.connection;

const userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    pw: { type: String, required: true },
    authority: { type: String, default: "normal" }
},{ timestamps: { createdAt: 'created_at' }})

const User = new mongoose.model('User', userSchema);

const articleSchema = new mongoose.Schema({
    title: { type: String, required : true},
    number : {type : Number, required: true},
    main: {type: String, required: true},
    img : {type:String},
    comments : [{comment : String, user : String}],
    like : [{user : String}],
    hidden : {type : Boolean, default: false}
}, { timestamps: { createdAt: 'created_at' }})

const Article = new mongoose.model('Article', articleSchema);

module.exports = { db, User, Article };