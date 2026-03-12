const mongoose = require('mongoose');

// Admin service Schema
const addServiceSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    serviceName: {
        type: String,
        required: true
    },

    experience: {
        type: String,
        required: true
    },

    charge: {
        type: String,
        required: true
    }
})


// userModel 
const addServiceModel = mongoose.model("addService", addServiceSchema)

module.exports = addServiceModel;
