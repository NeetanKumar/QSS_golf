const Course = require('../models/Course');
const User = require('../models/User');
const Lecture = require('../models/Lecture');

// Coach creating a course
exports.createCourse = async (req, res) => {
    try {
        const { title, description } = req.body;
        const coach = req.user;

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
        res.status(500).json({ message: error.message });
    }
};

// Coach posting a lecture
exports.postLecture = async (req, res) => {
    try {
        const { courseId, title, description } = req.body;
        const coach = req.user;

        // Ensure the coach owns the course
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
        res.status(500).json({ message: error.message });
    }
};

// View bookings for a specific lecture
exports.viewBookings = async (req, res) => {
    try {
        const { lectureId } = req.params;
        const coachId = req.user._id;  // Get the authenticated coach's ID from the request

        // Find the lecture by ID and ensure the coach owns the lecture
        const lecture = await Lecture.findById(lectureId).populate('students', 'name email');
        if (!lecture) {
            return res.status(404).json({ message: 'Lecture not found' });
        }

        // Check if the authenticated coach is the owner of the lecture
        if (lecture.coach.toString() !== coachId.toString()) {
            return res.status(403).json({ message: 'You are not authorized to view bookings for this lecture' });
        }

        // Return the list of students who booked the lecture
        res.status(200).json({
            students: lecture.students
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// View all bookings for all lectures created by the coach
exports.viewAllBookings = async (req, res) => {
    try {
        const coachId = req.user._id;  // Get the authenticated coach's ID

        // Find all lectures created by the authenticated coach and populate the students
        const lectures = await Lecture.find({ coach: coachId }).populate('students', 'name email');

        // If no lectures found, return an appropriate message
        if (lectures.length === 0) {
            return res.status(404).json({ message: 'No lectures found for this coach' });
        }

        // Structure the response to include the lecture title and students who booked each lecture
        const response = lectures.map(lecture => ({
            lectureTitle: lecture.title,
            students: lecture.students
        }));

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
