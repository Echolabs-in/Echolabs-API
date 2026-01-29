const nodemailer = require("nodemailer");

function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = String(process.env.SMTP_SECURE || "false").toLowerCase() === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    const err = new Error(
      "SMTP is not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS (and optionally SMTP_PORT/SMTP_SECURE).",
    );
    err.status = 500;
    throw err;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

async function sendInquiryEmail(inquiry) {
  const to = process.env.INQUIRY_TO_EMAIL;
  const from = process.env.MAIL_FROM || process.env.SMTP_USER;
  const subjectPrefix = process.env.INQUIRY_SUBJECT_PREFIX || "[New Inquiry]";

  if (!to) {
    const err = new Error("INQUIRY_TO_EMAIL is not set.");
    err.status = 500;
    throw err;
  }

  const transporter = getTransport();

  const subject = `${subjectPrefix} ${inquiry.firstName} (${inquiry.email})`;
  const text = [
    `New website inquiry`,
    ``,
    `First Name: ${inquiry.firstName}`,
    `Email: ${inquiry.email}`,
    ...(inquiry.mobileNumber ? [`Mobile Number: ${inquiry.mobileNumber}`] : []),
    `Company: ${inquiry.company}`,
    `Project Details: ${inquiry.projectDetails}`,
    `Need Help With: ${inquiry.helpWith}`,
    `Budget: ${inquiry.budget}`,
    `Agreed to email communication: ${inquiry.agreeToEmailCommunication ? "Yes" : "No"}`,
    ``,
    `Submitted At: ${inquiry.createdAt}`,
    `Inquiry ID: ${inquiry.id}`,
  ].join("\n");

  await transporter.sendMail({
    from,
    to,
    replyTo: inquiry.email,
    subject,
    text,
  });
}

module.exports = { sendInquiryEmail };


