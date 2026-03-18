const express = require("express");
const authController = require("../controllers/authController")
const validate = require("../middlewares/validate")
const { registerUserSchema, loginUserSchema } =require("../validators/auth.validation")



const router = express.Router();

// Routes for Authentication

router.post("/register",validate(registerUserSchema), authController.registerUser);
router.post("/login",validate(loginUserSchema), authController.loginUser)
router.post("/logout", authController.logoutUser)
router.post("/logout-admin", authController.logoutAdmin)



module.exports = router;
