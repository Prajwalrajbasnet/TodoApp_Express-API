const { route } = require('./app.routes');

const router = require('express').Router(),
  authController = require('../controller/auth.controller');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;