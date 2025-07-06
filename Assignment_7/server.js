const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const authMiddleware = require('./middleware/auth');
const protectedRoute = require('./routes/protected');

dotenv.config();

const app = express();
app.use(express.json());

const users = [
  { id: 1, username: 'john', password: '1234' } // Dummy user
];

// Login route: generates JWT
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ token });
});

// Protected route
app.use('/protected', authMiddleware, protectedRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
