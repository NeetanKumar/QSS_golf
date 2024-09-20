const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Generate JWT Token
exports.generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token validity
    });
};

// Hash password before saving to database
exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Authenticate user by checking email and password
exports.authenticateUser = async (email, password) => {
    const user = await User.findOne({ email });
    
    if (user && (await user.matchPassword(password))) {
        return user;
    } else {
        throw new Error('Invalid email or password');
    }
};
