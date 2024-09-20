const express = require('express');
const { createLecture, bookLecture } = require('../controllers/lectureController');
const { protect, coachProtect } = require('../utils/authMiddleware');
const router = express.Router();

router.post('/create', protect, coachProtect, createLecture); // Only coaches can create lectures
router.post('/book', protect, bookLecture); // Users can book lectures

module.exports = router;
