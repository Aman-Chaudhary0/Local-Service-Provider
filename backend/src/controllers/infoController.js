const userModel = require('../models/userModel');

// send all providers info
async function allProvidersInfo(req, res) {
    try {

        // search category and remove extra spaces
        const search = (req.query.search || "").trim();
        const info = await userModel.find({ role: "admin" }).populate("servicesOffered");

        let filteredInfo = info;
        if (search) {

            // create case insensitive patterns
            const regex = new RegExp(search, "i");
            filteredInfo = info
                .map((provider) => ({

                    // convert mongoose document into normal object
                    ...provider.toObject(),

                    // regex.test check if it match to search text
                    servicesOffered: provider.servicesOffered.filter((s) => regex.test(s.serviceName)),

                })) // only those providers left who have atleats one filtered service
                .filter((provider) => provider.servicesOffered.length > 0);
        }

        return res.json({
            success: true,
            info: filteredInfo,
            message: "Get providers data successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = { allProvidersInfo };
