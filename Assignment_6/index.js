const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory "database"
let users = [
    { id: 1, name: 'Pratyush', email: 'pratyush@example.com' },
    { id: 2, name: 'Alice', email: 'alice@example.com' }
];

// READ all users
app.get('/users', (req, res) => {
    res.json(users);
});

// READ a single user
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
});

// CREATE a user
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const newUser = {
        id: users.length + 1,
        name,
        email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// UPDATE a user
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { name, email } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;

    res.json(user);
});

// DELETE a user
app.delete('/users/:id', (req, res) => {
    users = users.filter(u => u.id !== parseInt(req.params.id));
    res.json({ message: 'User deleted' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
