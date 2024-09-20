const express = require('express');
const { createCourse } = require('../controllers/courseController');
const { viewBookings } = require('../controllers/coachController');
const { createLecture } = require('../controllers/lectureController');
const { protect, coachProtect } = require('../utils/authMiddleware');
const {viewAllBookings} = require('../controllers/coachController');

const router = express.Router();

// Route for creating a course (only accessible to coaches)
router.post('/createCourse', protect, coachProtect, createCourse);

// Route for posting a lecture to a specific course (only accessible to coaches)
router.post('/createLecture', protect, coachProtect, createLecture);

// Route to view bookings for a specific lecture
router.get('/viewBookings/:lectureId', protect, coachProtect, viewBookings);

// Route to view all bookings for all lectures created by the coach
router.get('/allBookings', protect, coachProtect, viewAllBookings);

module.exports = router;
