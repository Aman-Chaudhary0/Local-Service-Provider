const userModel = require('../models/userModel');
const asyncHandler = require('../utils/asyncHandler');

function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// send all providers info
const allProvidersInfo = asyncHandler(async (req, res) => {
    // search category and remove extra spaces
    const search = (req.query.search || "").trim();
    const info = await userModel.find({ role: "admin" }).populate("servicesOffered");

    let filteredInfo = info;
    if (search) {

        // create case insensitive patterns
        const escapedSearch = escapeRegex(search);
        const regex = new RegExp(escapedSearch, "i");
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
        message: "Get providers data successfully",
        data: filteredInfo,
    });
});

module.exports = { allProvidersInfo };
