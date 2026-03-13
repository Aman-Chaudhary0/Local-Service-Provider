const express = require("express");
const authController = require("../controllers/authController")



const router = express.Router();

// Routes for Authentication

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser)
router.post("/logout", authController.logoutUser)
router.post("/logout-admin", authController.logoutAdmin)



module.exports = router;
