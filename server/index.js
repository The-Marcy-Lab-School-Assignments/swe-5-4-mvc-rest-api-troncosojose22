const express = require('express');
const path = require('path');

const app = express();
const pathToFrontend = path.join(__dirname, '../frontend');

////////////////////////
// Middleware
////////////////////////

const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

app.use(logRoutes);
app.use(express.static(pathToFrontend));
app.use(express.json());

////////////////////////
// In-Memory Database
////////////////////////


// Increments and returns a unique id each time it is called.
let id = 1;
const getId = () => id++;

// Seed data — do not remove
const todos = [
  { id: getId(), task: 'Buy groceries', isDone: false },
  { id: getId(), task: 'Walk the dog', isDone: true },
  { id: getId(), task: 'Read a book', isDone: false },
];

////////////////////////
// Endpoints
////////////////////////

// TODO: GET /api/todos
// Response: 200, array of all todos
const serveTodos = (req, res, next) => {
  res.send(todos);
}


// TODO: GET /api/todos/:id
// Response: 200, single todo object
// Error: 404 if no todo with that id

const singleTodo = (req, res, next) => {
  const { id } = req.params;
  
  const todo = todos.find((todo) => todos.id === Number(id));

  if (!todo) {
     return res.status(404).send({ message: `No todo task with the id ${id}` });
  }

  res.send(todo);
}


// TODO: POST /api/todos
// Request body: { task }
// Response: 201, the newly created todo object
// Error: 400 if task is missing from the request body

const createTodo = (req, res, next) => {
  const { task } = req.body;

  if (!task) {
    res.status(400).send({ message: 'Invalid Task' });
  }

  const newTodo = { task, id: getId(), isDone: false };
  todos.push(newTodo);
  res.status(201).send(newTodo);
}


// TODO: PATCH /api/todos/:id
// Request body: { isDone }
// Response: 200, the updated todo object
// Error: 404 if no todo with that id

const updateTodo = (req, res, next) => {
  const { id } = req.params;
  const { isDone } = req.body;

  if (!isDone) {
    return res.status(400).send({ message: 'Task completion is required' });
  }

  const todo = todos.find((todo) => todo.id === Number(id));

  if (!todo) {
    return res.status(404).send({ message: `No todo task with the id ${id}` });
  }

  todo.isDone = isDone;
  res.send(todo);
}


// TODO: DELETE /api/todos/:id
// Response: 204, no content
// Error: 404 if no todo with that id

const deleteTodo = (req, res, next) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex((todo) => todo.id === Number(id));

  if (todoIndex < 0) {
    return res.status(404).send({ message: `No todo task with the id ${id}` });
  }

  todos.splice(todoIndex, 1);
  res.sendStatus(204);
}


// TODO: Catch-all handler — send a 404 JSON error for unmatched /api routes,
// or serve index.html for all other routes (SPA fallback)

app.get('/api/todos', serveTodos);
app.get('/api/todos/:id', singleTodo);
app.post('/api/todos', createTodo);
app.patch('/api/todos/:id', updateTodo);
app.delete('/api/todos/:id', deleteTodo);

app.use('*', (req, res, next) => {
  res.status(404).send({ message: `Error: Not found ${req.originalUrl}` })
})


const port = 8080;
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
