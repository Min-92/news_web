const Strategy = require('passport-local').Strategy;
const { db, User } = require('../models/database');

module.exports = (passport) => {
    passport.use(new Strategy({
        usernameField: 'id',
        passwordField: 'pw'
    }, async (id, pw, done) => {
        const user = await User.findOne({id}, (err, user) => {
            if(err) return done(err);
            if(!user) return done(null,false);
            if(user.pw !== pw) return done(null,false);
            return done(null, user);
        });
    }));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findOne({id}, (err, user) => {
            if(err) return done(err);
            done(null,user);
        })
    
    });
}
