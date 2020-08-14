const con = require('./db');

class Users{
  static addUser = (user, result) => {
    con.query('INSERT INTO users SET ?', user, (err, output) => {
      if(err){
        result(err, null);
      }
      result(null, output);
    })
  }
  
  static getUser = (user, result) => {
    con.query('SELECT * FROM users WHERE username ?', user.username, (err, output) => {
      if(err){
        result(err, null);
      }
      result(null, output);
    } )
  }
}