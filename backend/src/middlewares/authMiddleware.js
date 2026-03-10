const jwt = require("jsonwebtoken");


// access only to Admin
async function authAdmin(req, res, next) {

    // receive token
    const token = req.cookies.token;

    // if token is not received send message unauthorised
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {

        // if token received then verify it with jwt secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // if token is not of admin then user don't have access to add service
        if (decoded.role !== "admin") {
            return res.status(403).json({ message: "You don't have access" })
        }

        // create new property in request named user can be accessed in serviceOffered.controller
        req.user = decoded;

        // to move forward in api creation line
        next()

    }
    // if find any error
    catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Unauthorized" })
    }

}


// Access only to user
async function authUser(req, res, next) {

    // receiving token 
    const token = req.cookies.token;

    // if any token not received
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        // verify token is valid
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // verify token is of user
        if (decoded.role !== "user") {
            return res.status(403).json({ message: "You don't have access" })
        }

        // create new property in request named user can be accessed
        req.user = decoded;

        // to move forward in api creation line
        next()

        // catch error
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Unauthorized" })
    }

}

// export both
module.exports = { authAdmin, authUser }
