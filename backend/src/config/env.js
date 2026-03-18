const requiredEnvVars = ["JWT_SECRET", "MONGO_URI"];

const missingEnvVars = requiredEnvVars.filter(
    (key) => !process.env[key] || !process.env[key].trim()
);

// check if environment variables are not available
if (missingEnvVars.length > 0) {
    throw new Error(`Missing required environment variables`);
}

module.exports = {
    JWT_SECRET: process.env.JWT_SECRET,
    MONGO_URI: process.env.MONGO_URI,
};
