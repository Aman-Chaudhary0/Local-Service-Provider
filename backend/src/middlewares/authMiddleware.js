const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

function getToken(req, cookieName) {
    const cookieToken = req.cookies?.[cookieName];
    if (cookieToken) return cookieToken;

    const authHeader = req.headers?.authorization || "";
    if (authHeader.startsWith("Bearer ")) {
        return authHeader.slice(7);
    }

    return null;
}

// access only to Admin
async function authAdmin(req, res, next) {

    // receive token
    const token = getToken(req, "admin_token");

    // if token is not received send message unauthorised
    if (!token) {
        return next(new AppError("Unauthorized", 401))
    }

    try {

        // if token received then verify it with jwt secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // if token is not of admin then user don't have access to add service
        if (decoded.role !== "admin") {
            return next(new AppError("You don't have access", 403))
        }

        // create new property in request named user can be accessed in serviceOffered.controller
        req.user = decoded;

        // to move forward in api creation line
        next()

    }
    // if find any error
    catch (err) {
        return next(new AppError("Unauthorized", 401))
    }

}


// Access only to user
async function authUser(req, res, next) {

    // receiving token 
    const token = getToken(req, "user_token");

    // if any token not received
    if (!token) {
        return next(new AppError("Unauthorized", 401))
    }

    try {
        // verify token is valid
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // verify token is of user
        if (decoded.role !== "user") {
            return next(new AppError("You don't have access", 403))
        }

        // create new property in request named user can be accessed
        req.user = decoded;

        // to move forward in api creation line
        next()

        // catch error
    } catch (err) {
        return next(new AppError("Unauthorized", 401))
    }

}

// export both
module.exports = { authAdmin, authUser }
