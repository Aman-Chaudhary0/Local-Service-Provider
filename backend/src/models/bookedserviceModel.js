const mongoose = require('mongoose')


// user book service schema
const bookedServiceSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },

    bookService: {
        type: String,
        required: true,
    },

    date: {
        type: String,
        required: true,
    },

    time: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true,
    }
})

const bookedServiceModel = mongoose.model("bookedService", bookedServiceSchema)

module.exports = bookedServiceModel;
