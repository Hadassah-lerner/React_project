

const express = require('express');
const products = require('../data/products'); // מערך במחשב (memory)
const multer = require('multer');
const path = require('path');

const router = express.Router();

// הגדרת multer לאחסון תמונות
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + unique + ext);
  }
});
const upload = multer({ storage });

// GET /api/products?page=&limit=&category=
router.get('/', (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const { category } = req.query;

  let filtered = products;
  if (category) filtered = filtered.filter(p => p.category === category);

  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);

  res.json({
    data,
    meta: {
      page,
      limit,
      totalItems: filtered.length,
      totalPages: Math.ceil(filtered.length / limit),
      hasNext: page < Math.ceil(filtered.length / limit)
    }
  });
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id.toString() === req.params.id.toString());
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// POST /api/products
router.post('/', upload.single('image'), (req, res) => {
  const { name, category, price } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : ''; // כבר נכון
  const newProduct = { id: Date.now().toString(), name, category, price, image };

  products.push(newProduct); // אם את שומרת ב-memory
  res.status(201).json(newProduct);
});

// DELETE /api/products/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = products.findIndex(p => p.id.toString() === id.toString());
  if (index === -1) return res.status(404).json({ message: 'Product not found' });

  const deleted = products.splice(index, 1)[0];
  res.json(deleted);
});

module.exports = router;
