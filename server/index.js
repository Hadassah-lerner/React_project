const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/products', require('./routes/products.routes'));
app.use('/api/reviews', require('./routes/reviews.routes'));
app.use('/api/users', require('./routes/users.routes'));

app.listen(3001, '0.0.0.0', () => {
  console.log('Server running on http://13.48.55.220:3001');
});