const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    }

})

// userModel 
const userModel = mongoose.model("user", userSchema)

module.exports = userModel;