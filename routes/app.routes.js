const router = require('express').Router(),
  todoController = require('../controller/todo.controller');

router.route('/todos')
  .get(todoController.getTodos)
  .post(todoController.createTodos)

router.route('/todo/:id')
  .get(todoController.getTodo)
  .put(todoController.modifyTodo)
  .delete(todoController.removeTodo)

module.exports = router;