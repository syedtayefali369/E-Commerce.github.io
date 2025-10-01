const User = require('../models/User');

class UserController {
    async register(req, res) {
        const { username, email, password } = req.body;
        try {
            const newUser = new User({ username, email, password });
            await newUser.save();
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(400).json({ error: 'Error registering user' });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user || !(await user.comparePassword(password))) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            res.status(200).json({ message: 'Login successful', user });
        } catch (error) {
            res.status(500).json({ error: 'Error logging in' });
        }
    }

    async getUser(req, res) {
        const userId = req.params.id;
        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching user' });
        }
    }
}

module.exports = new UserController();