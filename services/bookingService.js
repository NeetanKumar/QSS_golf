const Lecture = require('../models/Lecture');
const User = require('../models/User');

exports.bookLectureService = async (user, lectureId) => {
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
        throw new Error("Lecture not found.");
    }

    if (lecture.students.includes(user._id)) {
        throw new Error("Lecture already booked.");
    }

    lecture.students.push(user._id);
    await lecture.save();

    user.purchasedLectures.push(lecture._id);
    await user.save();

    return lecture;
};
