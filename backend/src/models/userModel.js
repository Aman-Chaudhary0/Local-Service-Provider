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
    },

    // services offered by providers
    servicesOffered: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "addService",
    }],

    // service book by user 
    bookedService: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "bookedService",
    }]

})

// userModel 
const userModel = mongoose.model("user", userSchema)

module.exports = userModel;
