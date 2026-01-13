const express = require('express');
const reviews = require('../data/reviews'); // מערך דמה

const router = express.Router();

router.get('/', (req, res) => {
  const { productId } = req.query;
  if (productId) {
    const filtered = reviews.filter(r => r.productId == Number(productId));
    return res.json(filtered);
  }
  res.json(reviews);
});

router.get('/:id', (req, res) => {
  const review = reviews.find(r => r.id === req.params.id);
  if (!review) return res.status(404).end();
  res.json(review);
});

router.post('/', (req, res) => {
  const newReview = {
    id: Date.now().toString(),
    ...req.body,
  };
  reviews.push(newReview);
  res.status(201).json(newReview);
});

module.exports = router;
