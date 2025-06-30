const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let todos = [];
let nextId = 1;

// GET semua to-do
app.get('/api/todos', (req, res) => {
  res.json({
    status: "success",
    message: "Data retrieved successfully",
    data: todos
  });
});

// POST to-do baru
app.post('/api/todos', (req, res) => {
  const todo = {
    id: nextId++,
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed || false,
    dueDate: req.body.dueDate,
    createdAt: new Date().toISOString()
  };
  todos.push(todo);
  res.json({
    status: "success",
    message: "To-do created",
    data: todo
  });
});

// GET to-do by ID
app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  if (!todo) {
    return res.status(404).json({
      status: "error",
      message: "To-do with the given ID not found"
    });
  }
  res.json({
    status: "success",
    message: "Data retrieved successfully",
    data: todo
  });
});

// PUT update to-do by ID
app.put('/api/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id == req.params.id);
  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: "To-do with the given ID not found"
    });
  }
  todos[index] = { ...todos[index], ...req.body };
  res.json({
    status: "success",
    message: "To-do updated",
    data: todos[index]
  });
});

// DELETE to-do by ID
app.delete('/api/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id == req.params.id);
  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: "To-do with the given ID not found"
    });
  }
  const deleted = todos.splice(index, 1);
  res.json({
    status: "success",
    message: "To-do deleted",
    data: deleted[0]
  });
});

// Jalankan server lokal dulu untuk testing
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

});