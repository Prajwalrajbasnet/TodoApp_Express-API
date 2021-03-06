const router = require('express').Router(),
  todoController = require('../controller/todo.controller'),
  authRouter = require('./auth.routes');

  router.use('/auth', authRouter);

  router.route('/todos')
  .get(todoController.getTodos)
  .post(todoController.createTodos)

router.route('/todo/:id')
  .get(todoController.getTodo)
  .post(todoController.addTodo)
  .put(todoController.modifyTodo)
  .delete(todoController.removeTodo)

module.exports = router;