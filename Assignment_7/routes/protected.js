const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: `Welcome, ${req.user.username}! This is a protected route.` });
});

module.exports = router;
