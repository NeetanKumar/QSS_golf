const Lecture = require('../models/Lecture');
const Course = require('../models/Course');
const User = require('../models/User');

// Creating a lecture under a course
exports.createLecture = async (req, res) => {
    try {
        const { courseId, title, description } = req.body;
        const coach = req.user;

        // Check if coach owns the course
        const course = await Course.findById(courseId);
        if (!course || course.coach.toString() !== coach._id.toString()) {
            return res.status(403).json({ message: "Unauthorized to add lectures to this course." });
        }

        const lecture = new Lecture({
            title,
            description,
            course: courseId,
            coach: coach._id
        });

        await lecture.save();
        course.lectures.push(lecture._id);
        await course.save();

        res.status(201).json(lecture);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Booking a lecture by user
exports.bookLecture = async (req, res) => {
    try {
        const { lectureId } = req.body;
        const user = req.user;

        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({ message: "Lecture not found." });
        }

        if (lecture.students.includes(user._id)) {
            return res.status(400).json({ message: "You have already booked this lecture." });
        }

        lecture.students.push(user._id);
        await lecture.save();

        user.purchasedLectures.push(lecture._id);
        await user.save();

        res.status(200).json({ message: "Lecture booked successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
