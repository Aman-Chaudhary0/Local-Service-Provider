const addServiceModel = require('../models/addServiceModel')
const userModel = require('../models/userModel')

// In this providers add their service
async function addService(req, res) {

    try {
        const { serviceName, experience, charge } = req.body;

        const adminId = req.user?.id;
        if (!adminId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // find admin
        const user = await userModel.findById(adminId);

        const service = await addServiceModel.create({
            adminId,serviceName, experience, charge
        });

        // add service in admin data
        user.servicesOffered.push(service._id);
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

// function to display services add by admin
async function adminServices(req, res) {
    
    try {
        const adminId = req.user?.id;
        if (!adminId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const services = await addServiceModel.find({ adminId});

        res.json({
            success: true,
            message: "Services fetched successfully",
            services
        });
    } catch (error) {
         res.status(500).json({ error: error.message });
    }
} 

module.exports = { addService, adminServices }
