const addServiceModel = require('../models/addServiceModel');
const asyncHandler = require('../utils/asyncHandler');
const sendSuccess = require('../utils/sendSuccess');

function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


// sort providers info
function getSortStage(sort) {
    switch (sort) {
        case "oldest":
            return { _id: 1 };
        case "service_asc":
            return { serviceName: 1, _id: -1 };
        case "service_desc":
            return { serviceName: -1, _id: -1 };
        case "newest":
        default:
            return { _id: -1 };
    }
}

// send paginated services with provider info
const allProvidersInfo = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = (req.query.search || "").trim();
    const sort = req.query.sort || "newest";

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
        .sort(getSortStage(sort))
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

    return sendSuccess(res, {
        message: "Get services data successfully",
        data: formattedServices,
        meta: {
            total,
            page,
            limit,
            sort,
            totalPages: Math.ceil(total / limit) || 1,
        },
    });
});

module.exports = { allProvidersInfo };
