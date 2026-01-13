const express = require('express');
const users = require('../data/users');

const router = express.Router();

// GET /api/users?email=...
router.get('/', (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.json(users);
  }

  const user = users.find(u => u.email === email);
  res.json(user ? [user] : []);
});

router.post('/', (req, res) => {
  const newUser = {
    id: Date.now().toString(),
    ...req.body,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /api/users/:id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users[userIndex] = { ...users[userIndex], ...req.body };
  res.json(users[userIndex]);
});

module.exports = router;
