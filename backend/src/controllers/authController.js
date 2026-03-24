const userModel = require('../models/userModel');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const AppError = require("../utils/AppError")
const asyncHandler = require("../utils/asyncHandler")
const sendSuccess = require('../utils/sendSuccess')


// Register Api
const registerUser = asyncHandler(async (req, res) => {

    const { username, email, password, role = "user" } = req.body;

    // check user available
    const isUserAlreadyExists = await userModel.findOne({

        $or: [
            { username },
            { email }
        ]
    })

    if (isUserAlreadyExists) {
        throw new AppError("User already exists", 409)
    }

    // hash the password
    const hash = await bcrypt.hash(password, 10);

    // create a new user
    const user = await userModel.create({
        username,
        email,
        password: hash,
        role
    })

    // provide token to user
    const token = jwt.sign({
        id: user._id,
        role: user.role,
    }, process.env.JWT_SECRET)

    // cookie on the basis user admin or user
    const cookieName = user.role === "admin" ? "admin_token" : "user_token";
    res.cookie(cookieName, token)

    // message registered user successfully
    return sendSuccess(res, {
        statusCode: 201,
        message: "User registered successfully",
        data: {
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            }
        }
    })
})


// Login Api
const loginUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body;

    // check user registered or not
    const user = await userModel.findOne({

        $or: [
            { username },
            { email }
        ]
    })


    if (!user) {
        throw new AppError("Invalid credentials", 401)
    }


    // check password in database and received from frontend are same
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        throw new AppError("Invalid credentials", 401)
    }

    // create a new token during login
    const token = jwt.sign({
        id: user._id,
        role: user.role,
    }, process.env.JWT_SECRET)

    const cookieName = user.role === "admin" ? "admin_token" : "user_token";
    res.cookie(cookieName, token)


    // response for login
    return sendSuccess(res, {
        message: "User logged in successfully",
        data: {
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        }
    })
})


// Logout Api (user)
const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("user_token")
    return sendSuccess(res, { message: "User logged out successfully" })
})

// Logout Api (admin)
const logoutAdmin = asyncHandler(async (req, res) => {
    res.clearCookie("admin_token")
    return sendSuccess(res, { message: "Admin logged out successfully" })
})

module.exports = { registerUser, loginUser, logoutUser, logoutAdmin }
