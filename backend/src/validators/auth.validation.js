const { z } = require('zod');

// validate user registration data
const registerUserSchema = z.object({
    body: z.object({
        username: z
            .string()
            .trim()
            .min(4, "Username must be at least 4 characters")
            .max(15, "Username must not exceed 15 characters"),

        password: z
            .string()
            .min(4, "Password must include at least 4 characters")
            .max(20, "Password must not exceed 20 characters")
            .regex(/[a-z]/, "Must include a lowercase letter")
            .regex(/[A-Z]/, "Must include an uppercase letter")
            .regex(/[0-9]/, "Must include a number")
            .regex(/[!@#$%^&*]/, "Must include a special character"),

        email: z
            .string()
            .trim()
            .email("Invalid email address"),
        role: z.enum(["user", "admin"]).optional(),
    }).strict(),
});

// validate user login data
const loginUserSchema = z.object({
    body: z.object({
        password: z
            .string()
            .min(4, "Password is required")
            .max(20, "Password must not exceed 20 characters"),

        email: z
            .string()
            .trim()
            .email("Invalid email address")
            .optional(),
        username: z
            .string()
            .trim()
            .min(4, "Username must be at least 4 characters")
            .max(15, "Username must not exceed 15 characters")
            .optional(),
    }).strict().refine(
        (data) => data.email || data.username,
        {
            message: "Either email or username is required",
            path: ["email"],
        }
    ),
});

module.exports = {
    registerUserSchema,
    loginUserSchema
}
