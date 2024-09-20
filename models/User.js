const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isCoach: {
        type: Boolean,
        default: false
    },
    purchasedLectures: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lecture'
    }]
}, {
    timestamps: true
});

// Password match method
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
