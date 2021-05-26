const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowerCase: true
    },
    password: {
        type: String
    }
})

const User = mongoose.model('user', userSchema);

module.exports = User;