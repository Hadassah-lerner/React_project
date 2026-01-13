const express = require('express');
const users = require('../data/users');

const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const { password: _, ...safeUser } = user;
  res.json(safeUser);
});

module.exports = router;