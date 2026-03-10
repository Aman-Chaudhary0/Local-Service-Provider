const mongoose = require('mongoose');

// Admin service Schema
const addServiceSchema = new mongoose.Schema({

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
