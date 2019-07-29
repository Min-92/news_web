const bcrypt = require('bcrypt');
const Strategy = require('passport-local').Strategy;
const { db, User } = require('../models/database');

const compare = async (pw, hash) => {
    const result = await bcrypt.compare(pw,hash);
    return result;
}

module.exports = (passport) => {
    passport.use(new Strategy({
        usernameField: 'id',
        passwordField: 'pw'
    }, async (id, pw, done) => {
        await User.findOne({ id }, async (err, user) => {
            if (err) return done(err);
            if (!user) return done(null, false, {
                message : 'Incorrect ID'
            });
            if (!await compare(pw, user.pw)) return done(null, false, {
                message : 'Incorrect password'
            });
            return done(null, user);
        });
    }));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findOne({ id }, (err, user) => {
            if (err) return done(err);
            done(null, user);
        })

    });
}
