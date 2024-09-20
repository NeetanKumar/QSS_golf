const Course = require('../models/Course');
const User = require('../models/User');

exports.createCourse = async (req, res) => {
    try {
        const { title, description } = req.body;
        const coach = req.user; // Assumes coach is authenticated

        if (!coach.isCoach) {
            return res.status(403).json({ message: "Only coaches can create courses." });
        }

        const course = new Course({
            title,
            description,
            coach: coach._id
        });

        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
