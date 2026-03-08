const userModel = require('../models/userModel')

// get all providers info
async function allProvidersInfo(req, res) {
    try {
        const info = await userModel.find({ role: "admin" });

        return res.json({
            success: true,
            info,
            message: "Get providers data successfully"
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = { allProvidersInfo};
