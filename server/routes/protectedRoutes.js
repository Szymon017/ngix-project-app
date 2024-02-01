// routes/protectedRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/protected', authMiddleware, (req, res) => {
  // Ten endpoint wymaga poprawnego tokenu JWT
  res.json({ message: 'Dostęp do chronionego zasobu' });
});

module.exports = router;
