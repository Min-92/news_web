const Strategy = require('passport-local').Strategy;
const { db, User } = require('../models/database');

module.exports = (passport) => {
    passport.use(new Strategy({
        usernameField: 'id',
        passwordField: 'pw'
    }, async (id, pw, done) => {
        await User.findOne({ id }, (err, user) => {
            if (err) return done(err);
            if (!user) return done(null, false, {
                message : 'Incorrect ID'
            });
            if (user.pw !== pw) return done(null, false, {
                message : 'Incorrect password'
            });
            return done(null, user);
        });
    }));

    //로그인떄 호출
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    //매 리퀘스트 마다 호출
    passport.deserializeUser(function (id, done) {
        User.findOne({ id }, (err, user) => {
            if (err) return done(err);
            done(null, user);
        })

    });
}
