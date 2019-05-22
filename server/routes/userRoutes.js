const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');
const passport = require('passport');

let auth = passport.authenticate('jwt', {
    session: false
});

router.get('/', userControllers.getUsers);

router.get('/:id', auth, userControllers.getUser);

router.post('/', userControllers.addUser);

router.put('/:id', userControllers.editUser);

router.delete('/:id', auth, userControllers.deleteUser);

router.post('/login', userControllers.loginUser);

module.exports = router;