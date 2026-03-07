const userModel = require('../models/userModel');

// to add service on admin dashboard
async function addservice(req,res) {
    try {
        const { id, serviceName, experience, charge } = req.body;

        // find user 
        const admin = await userModel.findById(id);

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            });
        }


        // push service 
        admin.servicesOffered.push({ serviceName, experience, charge });
        await admin.save();

        return res.status(201).json({ success: true, message: "service added successfully" });
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

module.exports= {addservice}
