class Todo{
  constructor(rawTodo){
    this.task = rawTodo.task;
    this.completed = rawTodo.completed;
    this.deadline = rawTodo.deadline;
  }
}
module.exports = Todo;