const userModel = require('../models/userModel');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


// Register Api
async function registerUser(req, res) {

    const { username, email, password, role = "user" } = req.body;

    // check user available
    const isUserAlreadyExists = await userModel.findOne({

        $or: [
            { username },
            { email }
        ]
    })

    if (isUserAlreadyExists) {
        return res.json({ success: false, message: "User already exists" })
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
    res.json({
        success: true, message: "User registered successfully",
        token: token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        }
    })
}


// Login Api
async function loginUser(req, res) {

    const { username, email, password } = req.body;

    // check user registered or not
    const user = await userModel.findOne({

        $or: [
            { username },
            { email }
        ]
    })


    if (!user) {
        return res.json({ success: false, message: "Invalid credentials" })
    }


    // check password in database and received from frontend are same
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.json({ success: false, message: "Invalid credentials" })
    }

    // create a new token during login
    const token = jwt.sign({
        id: user._id,
        role: user.role,
    }, process.env.JWT_SECRET)

    const cookieName = user.role === "admin" ? "admin_token" : "user_token";
    res.cookie(cookieName, token)


    // response for login
    res.json({
        success: true, message: "User logged in successfully",
        token: token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    })
}


// Logout Api
async function logoutUser(req, res) {

    res.clearCookie("user_token")
    res.clearCookie("admin_token")

    res.json({ success: true, message: "User logged out successfully" })
}

module.exports = { registerUser, loginUser, logoutUser }
