const { z } = require("zod");

const objectId = z
  .string()
  .trim()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId");


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

const providersQuerySchema = z.object({
  query: z.object({
    search: z
      .string()
      .trim()
      .max(100, "Search must not exceed 100 characters")
      .optional(),
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
