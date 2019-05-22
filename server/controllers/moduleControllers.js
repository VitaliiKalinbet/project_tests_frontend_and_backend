const mongoose = require('mongoose');
const db = require('../models/modulesFunctions');
mongoose.set('useFindAndModify', false);

module.exports.getModules = function (req, res) {
    db.gets().then(results => res.json(results))
        .catch(err => res.status(400).json({err: err.message}))
};

module.exports.getModule = function (req, res) {
    db.getById(req.params.id)
        .then(results => results ? res.json(results) : res.status(404).json({err: 'Module not found'}))
        .catch(err => res.status(400).json({err: err.message}))
};

module.exports.addModule = function (req, res) {
    db.add(req.body)
        .then(results => res.status(201).json(results))
        .catch(err => res.status(400).json({err: err.message}))
};

module.exports.editModule = function (req, res) {
    db.update(req.body, req.params.id)
        .then(results => results ? res.json(results) : res.status(400).json({err: 'Module not found'}))
        .catch(err => res.status(400).json({err: err.message}))
};

module.exports.deleteModule = function (req, res) {
    db.delete(req.params.id)
        .then(results => results ? res.json(results) : res.status(400).json({err: 'Module not found'}))
        .catch(err => res.status(400).json({err: err.message}))
};