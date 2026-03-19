const todoModel = require('../models/todoModel.js')

module.exports.listTodos = (req, res, next) => {
    const todos = todoModel.list();
    res.send(todos);
}


// TODO: GET /api/todos/:id
// Response: 200, single todo object
// Error: 404 if no todo with that id

module.exports.findTodo = (req, res, next) => {
  const { id } = req.params;
  
  const todo = todoModel.find(id);

  if (!todo) {
     return res.status(404).send({ message: `No todo task with the id ${id}` });
  }

  res.send(todo);
}


// TODO: POST /api/todos
// Request body: { task }
// Response: 201, the newly created todo object
// Error: 400 if task is missing from the request body

module.exports.createTodo = (req, res, next) => {
  const { task } = req.body;

  if (!task) {
    res.status(400).send({ message: 'Invalid Task' });
  }

  const newTodo = todoModel.create(task);
  res.status(201).send(newTodo);
}


// TODO: PATCH /api/todos/:id
// Request body: { isDone }
// Response: 200, the updated todo object
// Error: 404 if no todo with that id

module.exports.updateTodo = (req, res, next) => {
  const { id } = req.params;
  const { isDone } = req.body;
  
  const todo = todoModel.update(id, { isDone } )
  console.log(isDone)

  if (!todo) {
    return res.status(404).send({
      message: `No todo task with the id ${id}`
    });
  }
  res.send(todo);
}


// TODO: DELETE /api/todos/:id
// Response: 204, no content
// Error: 404 if no todo with that id

module.exports.deleteTodo = (req, res, next) => {
  const { id } = req.params;
  const todoDeleted = todoModel.destroy(id);

  if (!todoDeleted) {
    return res.status(404).send({ message: `No todo task with the id ${id}` });
  }
  res.sendStatus(204);
}


