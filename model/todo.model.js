const con = require('./db');
  // Todo = require('./todo');
class Todos {

  static createNewTodo = (todo, result) => {
    con.query('INSERT INTO todos SET ?', todo, (err, output) => {
      if(err) {
        console.log(err);
        result(err, null);
      }
      else{
        result(null, output.insertId);
      }
    })
  }

  static readSingleTodo = (id, result) => {
    con.query('SELECT * FROM todos where id = ?', [id], (err, todo) => {
      if(err){
        result(err, null);
      }
      else{
        result(null, todo);
      }
    })
  }

  static readTodos = (result) => {
    con.query('SELECT * FROM todos', (err, todos) => {
      if(err){
        result(err, null);
      }
      else{
        result(null, todos);
      }
    })
  }

  static updateTodo = (id, todo, result) => {
    con.query('UPDATE todos SET task= ?, completed= ?, deadline= ? WHERE id= ? ', [todo.task, todo.completed, todo.deadline, id], (err, output) => {
      if(err){
        result(err, null);
      }
      else{
        result(null, output);
      }
    })
  }

  static deleteTodo = (id, result) => {
    con.query('DELETE FROM todos WHERE id= ? ', [id], (err, output) => {
      if(err){
        result(err, null);
      }
      else{
        result(null, output);
      }
    })
  }

  static setTodos = (todos, result) => {
    const responses = [];
    todos.forEach(todo => {
      this.createNewTodo(todo, (err, status) => {
        if(err){
          result(err, null);
        }
        else{
          responses.push(status);
        }
      })
    });
    result(responses, null);
  }
}
module.exports = Todos;