const addServiceModel = require('../models/addServiceModel')
const userModel = require('../models/userModel')

// In this providers add their service
async function addService(req, res) {

    try {
        const { id, serviceName, experience, charge } = req.body;

        // find admin
        const user = await userModel.findById(id);

        const service = await addServiceModel.create({
            serviceName, experience, charge
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

module.exports = { addService }