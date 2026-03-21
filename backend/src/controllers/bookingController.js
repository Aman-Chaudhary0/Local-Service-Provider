const bookedServiceModel = require('../models/bookedserviceModel');
const userModel = require('../models/userModel');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');
const sendSuccess = require('../utils/sendSuccess');

// controller to book a service
const bookingService = asyncHandler(async (req, res) => {
    const { adminId, bookService, date, time, address } = req.body;
    const userId = req.user?.id;

    if (!userId) {
        throw new AppError("Unauthorized", 401);
    }

    const user = await userModel.findById(userId);
    if (!user) {
        throw new AppError("User not found", 404);
    }

    const admin = await userModel.findById(adminId);
    if (!admin) {
        throw new AppError("Admin not found", 404);
    }

    const service = await bookedServiceModel.create({
        userId,
        adminId,
        bookService,
        date,
        time,
        address,
    });

    user.bookedService.push(service._id);
    await user.save();

    return sendSuccess(res, {
        message: "Service added successfully",
        data: service,
    });
});

// all booking of a particular user
const getBookings = asyncHandler(async (req, res) => {
    const userId = req.user?.id;

    if (!userId) {
        throw new AppError("Unauthorized", 401);
    }

    const user = await userModel.findById(userId).populate({
        path: "bookedService",
        populate: {
            path: "adminId",
            select: "username",
        },
    });

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return sendSuccess(res, {
        message: "Bookings fetched successfully",
        data: user,
    });
});

// all bookings of a particular provider
const adminBookings = asyncHandler(async (req, res) => {
    const adminId = req.user?.id;

    if (!adminId) {
        throw new AppError("Unauthorized", 401);
    }

    const data = await bookedServiceModel
        .find({ adminId })
        .populate('userId', 'username');

    return sendSuccess(res, {
        message: "Data fetched successfully",
        data,
    });
});

// function to update request status
const requestStatus = asyncHandler(async (req, res) => {
    const { _id, status } = req.body;
    const adminId = req.user?.id;

    if (!adminId) {
        throw new AppError("Unauthorized", 401);
    }

    const update = await bookedServiceModel.findOneAndUpdate(
        { _id, adminId },
        { status },
        { new: true }
    );

    if (!update) {
        throw new AppError("Forbidden", 403);
    }

    return sendSuccess(res, {
        message: "Request status updated successfully",
        data: update,
    });
});

module.exports = { bookingService, getBookings, adminBookings, requestStatus };
