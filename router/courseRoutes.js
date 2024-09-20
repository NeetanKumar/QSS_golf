const express = require('express');
const { createCourse } = require('../controllers/courseController');
const { protect, coachProtect } = require('../utils/authMiddleware');
const router = express.Router();

router.post('/create', protect, coachProtect, createCourse); // Only coaches can create courses

module.exports = router;
