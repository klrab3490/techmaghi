
// Express & MongoDB

const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Fake Data
let users = [
  { id: 1, name: 'John Doe', age: 22 },
  { id: 2, name: 'Jane Doe', age: 25 }
];

// Add User
app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    age: req.body.age
  };
  users.push(newUser);
  res.status(201).send(newUser);
});

// Read
app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  res.json(user);
});

// Update
app.put("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  user.name = req.body.name;
  user.age = req.body.age;
  res.json(user);
});

// Delete
app.delete("/users/:id", (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.json({ message: 'User deleted successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
