const express = require("express");
const serviceOfferedController = require("../controllers/serviceOfferedController")



const router = express.Router();

// Routes for addService
router.post("/service",serviceOfferedController.addservice );


module.exports = router;