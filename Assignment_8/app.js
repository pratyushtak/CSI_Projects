const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const uploadRoute = require('./routes/upload');
const apiRoute = require('./routes/api');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', apiRoute);
app.use('/upload', uploadRoute);

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
