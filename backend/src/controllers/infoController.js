const addServiceModel = require('../models/addServiceModel');
const asyncHandler = require('../utils/asyncHandler');

function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// send paginated services with provider info
const allProvidersInfo = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = (req.query.search || "").trim();

    // make search service case in sensitive
    const query = {};
    if (search) {
        query.serviceName = { $regex: escapeRegex(search), $options: "i" };
    }

    // total number of services
    const total = await addServiceModel.countDocuments(query);

    // get limited number of services from database
    const services = await addServiceModel
        .find(query)
        .populate("adminId", "username")
        .skip(skip)
        .limit(limit);

    // display 10 services
    const formattedServices = services.map((item) => ({
        id: item.adminId?._id,
        name: item.adminId?.username || "Unknown Provider",
        service: item.serviceName,
        rate: item.charge,
        experience: item.experience,
    }));

    return res.json({
        success: true,
        message: "Get services data successfully",

        //send data of 10 services
        data: formattedServices,

        // sending pagination information
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit) || 1,
        },
    });
});

module.exports = { allProvidersInfo };
