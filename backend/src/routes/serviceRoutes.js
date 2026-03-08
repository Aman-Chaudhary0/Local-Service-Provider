const express = require("express");
const serviceOfferedController = require("../controllers/serviceOfferedController")
const authMiddleware = require("../middlewares/authMiddleware")
const infoController = require('../controllers/infoController')



const router = express.Router();

// Routes for addService
router.post("/service", authMiddleware.authAdmin,  serviceOfferedController.addservice );

// get info of all providers
router.get("/providers", infoController.allProvidersInfo )


module.exports = router;
