function sendSuccess(res, { statusCode = 200, message = "Success", data = null, meta = null } = {}) {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
        errors: [],
        meta,
        requestId: res.getHeader('X-Request-Id') || null,
    });
}

module.exports = sendSuccess;
