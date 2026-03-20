const { z } = require("zod");

const objectId = z
  .string()
  .trim()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId");

const listQueryFields = {
  search: z
    .string()
    .trim()
    .max(100, "Search must not exceed 100 characters")
    .optional(),

    // coerse to convert string to number
  page: z.coerce
    .number()
    .int()
    .min(1, "Page must be at least 1")
    .optional(),
  limit: z.coerce
    .number()
    .int()
    .min(1, "Limit must be at least 1")
    .max(100, "Limit must not exceed 100")
    .optional(),
};

  // validate add service schema by admin
const addServiceSchema = z.object({
  body: z.object({
    serviceName: z
      .string()
      .trim()
      .min(2, "Service name must be at least 2 characters long")
      .max(100, "Service name must not exceed 100 characters"),
    experience: z
      .string()
      .trim()
      .min(1, "Experience is required")
      .max(100, "Experience must not exceed 100 characters"),
    charge: z
      .string()
      .trim()
      .min(1, "Charge is required")
      .max(50, "Charge must not exceed 50 characters"),
  }).strict(),
});


// make it strict
const providersQuerySchema = z.object({
  query: z.object({
    ...listQueryFields,
  }).strict(),
});

// validate request status
const requestStatusSchema = z.object({
  body: z.object({
    _id: objectId,
    status: z.enum(["Pending", "Accepted", "Rejected"]),
  }).strict(),
});

module.exports = {
  addServiceSchema,
  providersQuerySchema,
  requestStatusSchema,
};
