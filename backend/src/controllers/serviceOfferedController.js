const addServiceModel = require('../models/addServiceModel')
const userModel = require('../models/userModel');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

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

    res.json({
        success: true,
        message: "Service added successfully",
        user
    });

});

// function to display services add by admin
const adminServices = asyncHandler(async (req, res) => {


    const adminId = req.user?.id;
    if (!adminId) {
        throw new AppError("Unauthorized", 401);
    }
    const services = await addServiceModel.find({ adminId });

    res.json({
        success: true,
        message: "Services fetched successfully",
        services
    });

});

module.exports = { addService, adminServices }
