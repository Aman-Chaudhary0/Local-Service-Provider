const express = require("express");
const serviceOfferedController = require("../controllers/serviceOfferedController")
const authMiddleware = require("../middlewares/authMiddleware")
const infoController = require('../controllers/infoController')
const bookingController = require('../controllers/bookingController')



const router = express.Router();

// Routes for addService
router.post("/service", authMiddleware.authAdmin, serviceOfferedController.addService);

// get info of all providers
router.get("/providers", authMiddleware.authUser, infoController.allProvidersInfo)

// route for user book service
router.post("/bookservice", authMiddleware.authUser, bookingController.bookingService)

// route to get all bookings of a particular user
router.get("/mybookings", authMiddleware.authUser, bookingController.getBookings)

// route to get all bookings of a particular admin in admin dashboard
router.get("/adminbookings", authMiddleware.authAdmin, bookingController.adminBookings)

// route for services offered by a particular admin
router.get("/adminservices", authMiddleware.authAdmin, serviceOfferedController.adminServices)



module.exports = router;
