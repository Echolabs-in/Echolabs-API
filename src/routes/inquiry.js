const express = require("express");
const { randomUUID } = require("node:crypto");
const { z } = require("zod");

const { appendInquiry } = require("../storage/inquiryStore");
const { sendInquiryEmail } = require("../services/mailer");

const HELP_WITH_OPTIONS = [
  "Improving My Existing Website",
  "Creating A New Website / Full-Redesign",
  "Generating More Website Traffic",
];

const BUDGET_OPTIONS = ["<$25k", "$25-50k", "$50-100k", ">$100k"];

const inquirySchema = z.object({
  firstName: z.string().trim().min(1, "First Name is required"),
  email: z.string().trim().email("Valid Email is required"),
  mobileNumber: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => !val || /^\+[1-9]\d{1,14}$/.test(val.replace(/\s/g, "")),
      "Mobile number must include country code (e.g., +1234567890 or +91 9876543210)",
    )
    .transform((val) => (val ? val.replace(/\s/g, "") : undefined)),
  company: z.string().trim().min(1, "Company is required"),
  projectDetails: z
    .string()
    .trim()
    .min(1, "Tell us about your project is required"),
  helpWith: z.enum(HELP_WITH_OPTIONS),
  budget: z.enum(BUDGET_OPTIONS),
  agreeToEmailCommunication: z.preprocess((v) => {
    if (v === true || v === "true" || v === "on" || v === 1 || v === "1") return true;
    return false;
  }, z.boolean()),
});

const inquiryRouter = express.Router();

inquiryRouter.post("/", async (req, res, next) => {
  try {
    const parsed = inquirySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        ok: false,
        error: "Validation failed",
        details: parsed.error.flatten(),
      });
    }

    const inquiry = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      ...parsed.data,
    };

    await appendInquiry(inquiry);
    let emailSent = true;
    let emailError = null;
    try {
      await sendInquiryEmail(inquiry);
    } catch (err) {
      emailSent = false;
      emailError = err?.message ? String(err.message) : "Email send failed";
      // Keep the API non-blocking for the website form; the inquiry is already stored locally.
      console.warn("Inquiry stored but email failed:", err);
    }

    return res.json({ ok: true, id: inquiry.id, emailSent, emailError });
  } catch (err) {
    return next(err);
  }
});

module.exports = { inquiryRouter, HELP_WITH_OPTIONS, BUDGET_OPTIONS };


