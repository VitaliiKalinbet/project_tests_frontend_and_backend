const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const passport = require('passport');
const jwt = require("jwt-simple");

const db = require('../models/usersFunctions');
const config = require('../config/config');

module.exports.getUsers = function (req, res) {
    db.gets().then(results => res.json(results))
        .catch(err => res.status(400).json({err: err.message}))
};

module.exports.getUser = function (req, res) {
    db.getById(req.params.id)
        .then(results => results ? res.json(results) : res.status(404).json({err: 'User not found'}))
        .catch(err => res.status(400).json({err: err.message}))
};

module.exports.addUser = function (req, res) {
    db.add(req.body)
        .then(results => res.status(201).json(results))
        .catch(err => {console.log(err); res.status(400).json({err: 'User exists'})})
};

module.exports.editUser = function (req, res) {
    db.update(req.body, req.params.id)
        .then(user => user ? res.json(user) : res.status(400).json({err: 'User not found'}))
        .catch(err => res.status(400).json({err: err.message}))
};

module.exports.deleteUser = function (req, res) {
    req.session.result = {};
    db.delete(req.params.id)
        .then(results => results ? res.json(results) : res.status(400).json({err: 'User not found'}))
        .catch(err => res.status(400).json({err: err.message}))
};

module.exports.loginUser = function (req, res) {
    // console.log('req.payload:', req.payload);
    passport.authenticate('loginUsers', (err, user) => {
        if (err) {
            return res.status(401).json({err: 'Ошибка аутентификации!'});
        }
        // console.log(err, user);
        if (!user) {
            console.log('Укажите правильный логин и пароль!');
            return res.status(401).json({err: 'Укажите правильный логин и пароль!'});
        }
        req
            .logIn(user, function (err) {
                if (err) {
                    // console.log(err);
                    res.status(401).json({err: 'Not Authorized!'});
                }
                let payload = {
                    id: user._id,
                    email: user.email
                };
                console.log('payload: ', payload);
                let token = jwt.encode(payload, config.jwtsecret); // line 10 passport-config
                res.json({token: token});
            });
    })(req, res);
};
