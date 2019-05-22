const mongoose = require('mongoose');
const db = require('../models/testsFunctions');
mongoose.set('useFindAndModify', false);

module.exports.getTests = function (req, res) {
    db.gets().then(results => res.json(results))
        .catch(err => res.status(400).json({err: err.message}))
};

module.exports.getTest = function (req, res) {
    db.getById(req.params.id)
        .then(results => results ? res.json(results) : res.status(404).json({err: 'Test not found'}))
        .catch(err => res.status(400).json({err: err.message}))
};

module.exports.addTest = function (req, res) {
    db.add(req.body)
        .then(results => res.status(201).json(results))
        .catch(err => res.status(400).json({err: err.message}))
};

module.exports.editTest = function (req, res) {
    db.update(req.body, req.params.id)
        .then(results => results ? res.json(results) : res.status(400).json({err: 'Test not found'}))
        .catch(err => res.status(400).json({err: err.message}))
};

module.exports.deleteTest = function (req, res) {
    db.delete(req.params.id)
        .then(results => results ? res.json(results) : res.status(400).json({err: 'Test not found'}))
        .catch(err => res.status(400).json({err: err.message}))
};