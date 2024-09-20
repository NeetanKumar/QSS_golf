const express = require('express');
const { signup, login, getUserProfile } = require('../controllers/userController');
const { getUserBookings } = require('../controllers/userController');
const { protect } = require('../utils/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', protect, getUserProfile); // User profile with authentication
// Route to view all lectures the user has booked
router.get('/bookedLectures', protect, getUserBookings);

module.exports = router;
