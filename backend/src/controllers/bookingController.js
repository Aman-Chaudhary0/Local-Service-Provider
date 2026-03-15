const bookedServiceModel = require('../models/bookedserviceModel')
const userModel = require('../models/userModel')

// controller to book a service
async function bookingService(req, res) {

    try {
        const { adminId, bookService, date, time, address } = req.body;
        const userId = req.user?.id;

        // if not a user
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        // if any field is empty
        if (!adminId || !bookService || !date || !time || !address) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            });
        }

        // get user
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const admin = await userModel.findById(adminId);
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found",
            });
        }

        // create service 
        const service = await bookedServiceModel.create({
            userId, adminId, bookService, date, time, address
        });

        // add service to user data
        user.bookedService.push(service._id);
        await user.save();

        res.json({
            success: true,
            message: "Service added successfully",
            user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// all booking of a particular user
async function getBookings(req, res) {

    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        // sending only required data
        const user = await userModel.findById(userId).populate({
            path: "bookedService",
            populate: {
                path: "adminId",
                select: "username"
            }
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.json({ success: true, message: "Bookings fetched successfully", user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}



// all bookings of a particular provider
async function adminBookings(req, res) {

    try {
        const adminId = req.user?.id;

        if (!adminId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        // sending only required data
        const data = await bookedServiceModel.find({ adminId: adminId }).populate('userId', 'username')

        res.json({ success: true, message: "Data fetched successfully", data })




    } catch (error) {

        res.status(500).json({ success: false, message: error.message });
    }

}

// function to update request status
async function requestStatus(req, res) {

    try {
        const { _id, status } = req.body;
        const adminId = req.user?.id;

        if (!adminId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        // it filter on basis of id of booking and id of admin
        const update = await bookedServiceModel.findOneAndUpdate(
            { _id, adminId },
            { status: status },
            { new: true }
        )

        if (!update) {
            return res.status(403).json({ success: false, message: "Forbidden" });
        }

        res.json(update)

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { bookingService, getBookings, adminBookings,requestStatus }
