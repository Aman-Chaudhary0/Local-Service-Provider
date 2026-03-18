const express = require("express");
const serviceOfferedController = require("../controllers/serviceOfferedController")
const authMiddleware = require("../middlewares/authMiddleware")
const infoController = require('../controllers/infoController')
const bookingController = require('../controllers/bookingController')
const validate = require("../middlewares/validate")
const {
    addServiceSchema,
    providersQuerySchema,
    requestStatusSchema,
} = require("../validators/service.validation")
const { bookingServiceSchema } = require("../validators/booking.validation")



const router = express.Router();

// Routes for addService
router.post("/service", authMiddleware.authAdmin, validate(addServiceSchema), serviceOfferedController.addService);

// get info of all providers
router.get("/providers", authMiddleware.authUser, validate(providersQuerySchema), infoController.allProvidersInfo)

// route for user book service
router.post("/bookservice", authMiddleware.authUser, validate(bookingServiceSchema), bookingController.bookingService)

// route to get all bookings of a particular user
router.get("/mybookings", authMiddleware.authUser, bookingController.getBookings)

// route to get all bookings of a particular admin in admin dashboard
router.get("/adminbookings", authMiddleware.authAdmin, bookingController.adminBookings)

// route for services offered by a particular admin
router.get("/adminservices", authMiddleware.authAdmin, serviceOfferedController.adminServices)

// route for update request status
router.post("/requeststatus", authMiddleware.authAdmin, validate(requestStatusSchema), bookingController.requestStatus)



module.exports = router;
