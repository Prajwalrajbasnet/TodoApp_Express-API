const todoModel = require('../model/todo.model'),
  Todo = require('../model/todo');

const addTodo = (req, res) => {
  const newTodo = new Todo(req.body);
  todoModel.createNewTodo(newTodo, (err, output) => {
    if(err){
      res.send(err);
    }
    else{
      res.json(output);
    }
  })
}

const getTodo = (req, res) => {
  todoModel.readSingleTodo(req.params.id, (err, todo) => {
    if(err){
      res.send(err);
    }
    else{
      res.json(todo);
    }
  })
}

const createTodos = (req, res) => {
  todoModel.setTodos(req.body, (err, todo) => {
    if(err){
      res.send(err);
    }
    else{
      res.send(todo);
    }
  })
}

const getTodos = (req, res) => {
  todoModel.readTodos((err, todos) => {
    if(err){
      res.send(err);
    }
    else{
      res.send(todos);
    }
  })
}

const modifyTodo =  (req, res) => {
  todoModel.updateTodo(req.params.id, req.body, (err, output) => {
    if(err){
      res.send(err);
    }
    else{
      res.json(output);
    }
  })
}

const removeTodo =  (req, res) => {
  todoModel.deleteTodo(req.params.id, (err, output) => {
    if(err){
      res.send(err);
    }
    else{
      res.json(output);
    }
  })
}
module.exports = {
  addTodo,
  createTodos,
  getTodo,
  getTodos,
  removeTodo,
  modifyTodo
}