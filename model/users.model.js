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
  
  static getUser = (username, result) => {
    con.query('SELECT * FROM users WHERE username = ?', username, (err, output) => {
      if(err){
        result(err, null);
      }
      result(null, output);
    })
  }
}
module.exports = Users;