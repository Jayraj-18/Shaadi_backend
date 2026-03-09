const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.register = async (req, res) => {
    try {
        console.log('--- SIGNUP ATTEMPT ---');
        console.log('Request body:', req.body);
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        console.log('User exists check:', !!userExists);
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ name, email, password });
        console.log('User created successfully:', user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });

    } catch (error) {
        console.error('--- SIGNUP ERROR ---');
        console.error('Error message:', error.message);
        console.error('Stack trace:', error.stack);
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && (await user.comparePassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createGuest = async (req, res) => {
    try {
        const guestId = `guest_${Date.now()}`;
        const user = await User.create({
            name: 'Guest User',
            email: `${guestId}@shaadibio.com`,
            password: Math.random().toString(36).slice(-8),
            role: 'guest'
        });
        res.status(201).json({
            _id: user._id,
            name: user.name,
            role: user.role,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
