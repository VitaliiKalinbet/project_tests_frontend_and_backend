const resultsModel = require('../models/resultsModel');

module.exports.getAllResults = function (req, res) {
    return resultsModel.find();
};

module.exports.getUserResults = function (req, res) {
    console.log('getUserResults - req: ', req);
    res.end('This is response');
};
