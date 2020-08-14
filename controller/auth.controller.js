const usersModel = require('../model/users.model'),
  bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken'),
  authConfig = require('../config/auth.config');

  const createToken = (data) => {
    return jwt.sign(data, authConfig.secretKey);
  }

  exports.signupUser = (req, res, next) => {
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    user: req.body.role || 'user',
  }
  usersModel.addUser(user, (err, output) => {
    if(err){
      res.send(err);
    }
    res.json({
      message: 'User Created Successfully',
      status: 200,
      output,
    })
  })
}

exports.loginUser = (req, res, next) => {
  let user = {};
  usersModel.getUser(req.body.username, (err, userData) => {
    if(err){
      return res.send(err);
    }
    if(userData.length == 0){
      return res.status(401).send({
        token: null,
        message: 'Invalid Credentials'
      })
    }
    user = userData[0];
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if(!passwordIsValid){
      return res.status(401).send({
        token: null,
        message: 'Invalid Credentials',
      })
    }
    const token = createToken(req.body);
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      token,    
    })
  })
}