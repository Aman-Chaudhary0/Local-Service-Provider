const { randomUUID } = require('crypto');

function logStructured(level, payload) {
    const entry = {
        level,
        timestamp: new Date().toISOString(),
        ...payload,
    };

    const message = JSON.stringify(entry);
    if (level === 'error') {
        console.error(message);
        return;
    }

    console.log(message);
}

function requestLogger(req, res, next) {
    const requestId = randomUUID();
    const start = Date.now();

    req.id = requestId;
    res.setHeader('X-Request-Id', requestId);

    res.on('finish', () => {
        logStructured('info', {
            requestId,
            method: req.method,
            path: req.originalUrl,
            statusCode: res.statusCode,
            durationMs: Date.now() - start,
            ip: req.ip,
        });
    });

    next();
}

module.exports = {
    requestLogger,
    logStructured,
};
