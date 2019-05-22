const passport = require('passport');
const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../server/models/usersmodel');
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

const params = {
    secretOrKey: "secret",
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(
    'loginUsers',
    new LocalStrategy(
        {usernameField: 'email'},
        (username, password, done) => {
        User.findOne({ email: username })
            .then(user => {
                if (user.validPassword(password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
            .catch(err => {
                console.log(err);
                done(err);
            });
    })
);

const strategy = new Strategy(params, function(payload, done) {
    const User = mongoose.model('User');
    User.find({ id: payload.id })
        .then(user => {
            if (user) {
                return done(null, {
                    id: user._id
                });
            } else {
                // return done(new Error('User not found'), null);
                return done(null, new Error('User not found')); // ??
            }
        })
        .catch(err => {
            console.log(err);
            done(err);
            // done(err, null) // ??
        });
});

passport.use('jwt', strategy);
