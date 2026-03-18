
const AppError = require("../utils/AppError");

function validate(schema) {

    // validate data and return validated data
    return (req, res, next) => {
        const result = schema.safeParse({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        // if data is not validate
        if (!result.success) {
            return next(new AppError(
                "Validation failed",
                400,
                result.error.issues.map((issue) => ({
                    path: issue.path.join("."),
                    message: issue.message,
                }))
            ));
        }
        
        req.body = result.data.body ?? req.body;
        req.query = result.data.query ?? req.query;
        req.params = result.data.params ?? req.params;

        next();
    };
}

module.exports = validate;
