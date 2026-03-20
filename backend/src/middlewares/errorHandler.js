const { logStructured } = require('./requestLogger');

const errorHandler = (err,req, res, next) => {
    const statusCode = err.statusCode || 500;

    logStructured('error', {
        requestId: req.id,
        method: req.method,
        path: req.originalUrl,
        statusCode,
        message: err.message || "Internal server error",
        errors: err.errors || [],
    });

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal server error",
        errors: err.errors || [],
        requestId: req.id,
    });
};

module.exports = errorHandler;
