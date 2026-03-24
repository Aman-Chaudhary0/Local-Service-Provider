const addServiceModel = require('../models/addServiceModel')
const userModel = require('../models/userModel');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');
const sendSuccess = require('../utils/sendSuccess');

// In this providers add their service
const addService = asyncHandler(async (req, res) => {

    const { serviceName, experience, charge } = req.body;

    const adminId = req.user?.id;
    if (!adminId) {
        throw new AppError("Unauthorized", 401);
    }
    // find admin
    const user = await userModel.findById(adminId);
    if (!user) {
        throw new AppError("Admin not found", 404)
    }

    const service = await addServiceModel.create({
        adminId, serviceName, experience, charge
    });

    // add service in admin data
    user.servicesOffered.push(service._id);
    await user.save();

    return sendSuccess(res, {
        statusCode: 201,
        message: "Service added successfully",
        data: user
    });

});

// function to display services add by admin
const adminServices = asyncHandler(async (req, res) => {


    const adminId = req.user?.id;
    if (!adminId) {
        throw new AppError("Unauthorized", 401);
    }
    const services = await addServiceModel.find({ adminId });

    return sendSuccess(res, {
        message: "Services fetched successfully",
        data: services
    });

});

module.exports = { addService, adminServices }
