const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// תיקיית uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ה-API 
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/products', require('./routes/products.routes'));
app.use('/api/reviews', require('./routes/reviews.routes'));
app.use('/api/users', require('./routes/users.routes'));

// **הוספת הגשת build של React**
app.use(express.static(path.join(__dirname, '../build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(3001, '0.0.0.0', () => {
  console.log('Server running on http://13.48.55.220:3001');
});
