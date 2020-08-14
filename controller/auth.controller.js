const usersModel = require('../model/users.model'),
  bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken'),
  authConfig = require('../config/auth.config');

  const createToken = (data) => {
    return jwt.sign(data, authConfig.secretKey);
  }

  exports.signupUser = (req, res, next) => {
  const user = {
    id: req.body.id,
    username: req.body.username,
    email: req.body.user,
    password: bcrypt.hashSync(req.body.password, 8),
    user: req.body.role || 'user',
  }
  usersModel.add(user, (err, output) => {
    if(err){
      res.send(err);
    }
    res.json({
      message: 'User Created Successfully',
      status: 200,
    })
  })
}

exports.loginUser = (req, res, next) => {
  const user;
  usersModel.loginUser(req.body.username, (err, userData) => {
    if(err){
      res.send(err);
    }
    user = userData;
  })
  const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  if(!passwordIsValid){
    res.status(401).send({
      accessToken: null,
      message: 'Invalid Password',
    })
  }
  const token = createToken(req.body);
  res.status(200).json({
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    accessToken: token,    
  })
}