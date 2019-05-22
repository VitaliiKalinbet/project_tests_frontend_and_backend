const express = require('express');
const router = express.Router();
const ModuleControllers = require('../controllers/moduleControllers');
const passport = require('passport');

let auth = passport.authenticate('jwt', {
    session: false
});


router.get('/', ModuleControllers.getModules);

router.get('/:id', auth, ModuleControllers.getModule);

router.post('/', auth, ModuleControllers.addModule);

router.put('/:id', auth, ModuleControllers.editModule);

router.delete('/:id', auth, ModuleControllers.deleteModule);

module.exports = router;