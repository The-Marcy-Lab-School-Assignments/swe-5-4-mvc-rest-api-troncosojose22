# Short Response Questions

Answer each question below in your own words. Aim for 3–5 sentences per answer. Be specific — use exact terms and concepts from the lesson.

Your responses will each be evaluated out of 3 points for writing quality and 3 points for technical accuracy (6 points per question, 30 points total).

---

## Question 1 — REST Principles

The Todo Tracker API is a **RESTful** API. Identify at least **3 specific design decisions** in the API that make it RESTful, and explain what each one communicates to a client developer. Consider the URL structure, HTTP methods, and status codes used.

**Your answer here**:
First thing is that in order to retrieve the collection of **todos** the **endpoint** is `'/api/todos'`, which uses a plural noun as its name, we can also see that all of the endpoints use the proper **method** according to the action they are doing, for example the endpoint `app.post('/api/todos', todoControllers.createTodo);` uses the post method properly to add a new todo task. And lastly we can see that all the **controllers** respond with the appropriate **status code** for successful or failed requests, for example the `createTodo` controller, responds with a status code of `201` when a new todo is created, or `400` when no task was given to it.

---

## Question 2 — Separation of Concerns

What problem is caused by mixing data logic and request/response logic in a single file? What does separating them into a model and controller enable? Be specific about what gets harder and what gets easier.

**Your answer here**:

Mixing data logic with **request/response logic** in one file creates tight coupling, making the code harder to maintain, **test**, and **reuse** because changes to **database** behavior can break **request handling**, and logic gets duplicated across endpoints; separating them into **models** and **controllers** enforces clear responsibilities, allowing models to **encapsulate** data access and validation while controllers focus on handling requests and responses, which makes testing easier, improves reusability across different parts of the app, and reduces risk when making changes, though it adds a bit of upfront structure and requires jumping between files when debugging.

---

## Question 3 — Request Lifecycle

Walk through what happens, step by step, when the user clicks a checkbox to toggle a todo's `isDone` field. Name each file and function in your MVC structure that gets involved, in the order it runs, and describe what it does.

**Your answer here**:

First the **frontend** makes a `PATCH` **http** request to our server, then inside our `index.js` file, the `app.patch('/api/todos/:id', todoControllers.updateTodo);` will run since a `PATCH` request with that **endpoint** was received, then the `todoControllers.updateTodo` will be executed, which is a **function** imported from our `todoControllers.js` file, this function calls `todoModel.update` which is a function defined inside our `todoModel.js` file, this function interacts with the database and returns a copy of the updated todo, if it was successful, otherwise it returns **null**, the result is then passed down to the `todoControllers.updateTodo` function, and it will send an **http** response back accordingly.

---

## Question 4 — Code Sorting

Below is a `createTodo` function that does everything in one place. For each numbered line, identify whether it belongs in the **model** or the **controller**, and explain why.

```js
const createTodo = (req, res) => {
  /* 1 */ const { task } = req.body;
  /* 2 */ if (!task)
    return res.status(400).send({ message: "task is required" });
  /* 3 */ const newTodo = { id: getId(), task, isDone: false };
  /* 4 */ todos.push(newTodo);
  /* 5 */ res.status(201).send(newTodo);
};
```

**Your answer here**:

- Lines 1-2 belong in the **controllers**, because it handles the content of the **request** and sends back a **response** if no task was provided;
- Lines 3-4 belong in the **model** since it is handling the creation of a todo, and adding it to our **database**
- Line 5 belongs to the controller since it sends back a response with the correct **status code** and the newly created todo.
