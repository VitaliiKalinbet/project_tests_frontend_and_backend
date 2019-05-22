const express = require('express');
const router = express.Router();
const ResultsController = require('../controllers/resultsController');
const passport = require('passport');

let auth = passport.authenticate('jwt', {
    session: false
});


// router.get('/all', auth, ResultsController.getAllResults);
// router.get('/', auth, ResultsController.getUserResults);

module.exports = router;