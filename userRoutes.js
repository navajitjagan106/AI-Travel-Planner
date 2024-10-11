const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

let users = []; // In-memory user storage

// Register route
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Simple validation to ensure all fields are provided
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    // Check if user already exists
    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before storing the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and store new user
    const newUser = { id: users.length + 1, name, email, password: hashedPassword };
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Simple validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    try {
        // Find the user by email
        const user = users.find(user => user.email === email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Login successful without JWT
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error during login:', error); // Log the error
        res.status(500).json({ message: 'Server error during login' });
    }
});

module.exports = router;
