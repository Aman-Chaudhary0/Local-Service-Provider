const { z } = require("zod");

// validate object id 
const objectId = z
  .string()
  .trim()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId");

  //validate booking service form
const bookingServiceSchema = z.object({
  body: z.object({
    adminId: objectId,
    bookService: z
      .string()
      .trim()
      .min(2, "Booked service must be at least 2 characters long")
      .max(100, "Booked service must not exceed 100 characters"),
    date: z
      .string()
      .trim()
      .min(1, "Date is required"),
    time: z
      .string()
      .trim()
      .min(1, "Time is required"),
    address: z
      .string()
      .trim()
      .min(5, "Address must be at least 5 characters long")
      .max(300, "Address must not exceed 300 characters"),
  }).strict(),
});

module.exports = {
  bookingServiceSchema,
};
