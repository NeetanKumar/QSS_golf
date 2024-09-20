const User = require('../models/User');
const { hashPassword, authenticateUser, generateToken } = require('../services/authService');

// User signup
exports.signup = async (req, res) => {
    try {
        const { name, email, password, isCoach } = req.body;

        // Check if the user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password using authService
        const hashedPassword = await hashPassword(password);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            isCoach
        });

        await user.save();

        // Generate token
        //const token = generateToken(user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isCoach: user.isCoach,
            //token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// User login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Authenticate user using authService
        const user = await authenticateUser(email, password);

        if (user) {
            const token = generateToken(user._id);
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isCoach: user.isCoach,
                token
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch user profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('purchasedLectures');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// View all lectures the user has booked
exports.getUserBookings = async (req, res) => {
    try {
        const userId = req.user._id; // Get the authenticated user's ID

        // Find the user and populate the purchasedLectures field with lecture details
        const user = await User.findById(userId).populate({
            path: 'purchasedLectures',
            select: 'title description course',
            populate: { path: 'course', select: 'title' }
        });

        if (!user || user.purchasedLectures.length === 0) {
            return res.status(404).json({ message: 'No bookings found for this user' });
        }

        res.status(200).json({
            lectures: user.purchasedLectures
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};