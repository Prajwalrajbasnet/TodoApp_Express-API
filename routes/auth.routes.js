const { route } = require('./app.routes');

const router = require('express').Router(),
  authController = require('../controller/auth.controller');

router.get('/', (req, res) => {
  res.send({
    message: 'from auth root',
  })
})
router.post('/signup', authController.signupUser);
router.post('/login', authController.loginUser);

module.exports = router;