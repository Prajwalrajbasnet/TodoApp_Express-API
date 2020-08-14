const con = require('../model/db'),
  jwt = require('jsonwebtoken'),
  authConfig = require('../config/auth.config'),
  usersModel = require('../model/users.model');

module.exports = (req, res, next) => {
  let token = '';
  if(req.headers['authorization']){
    token = req.headers['authorization'];
  }
  if(req.headers['x-access-token']){
    token = req.headers['x-access-token'];
  }
  if(req.headers['token']){
    token = req.headers['token'];
  }
  if(!token){
    res.status(401).send({
      message: 'Acess Token Not Found'
    })
  }
  jwt.verify(token, authConfig.secretKey, (err, decodedData) => {
    if(err){
      next(err);
    }
    const userId = decodedData.id;
    usersModel.getUser(userId, (err, user) => {
      if(err){
        next(err);
      }
      req.user = user;
      next();
    });
  });
}

