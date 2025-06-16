const express = require('express');
const app = express();
const PORT = 3000;

// ===== Middleware Example =====
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next(); // continue to the next handler
});

// ===== Route: Home =====
app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});

// ===== Route: About =====
app.get('/about', (req, res) => {
    res.send('This is the About Page.');
});

// ===== 404 Handler =====
app.use((req, res) => {
    res.status(404).send('404 - Page Not Found');
});

// ===== Start Server =====
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
