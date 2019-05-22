const express = require('express');
const router = express.Router();
const TestControllers = require('../controllers/testControllers');
const passport = require('passport');

let auth = passport.authenticate('jwt', {
    session: false
});


router.get('/', TestControllers.getTests);

router.get('/:id', auth, TestControllers.getTest);

router.post('/', auth, TestControllers.addTest);

router.put('/:id', auth, TestControllers.editTest);

router.delete('/:id', auth, TestControllers.deleteTest);

module.exports = router;