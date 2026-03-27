const nodemailer = require("nodemailer");

const shouldSkipMail = () => {
  const host = process.env.MAIL_HOST;
  if (!host) return true;
  // Common placeholder that will fail DNS
  if (host === "smtp.example.com") return true;
  return false;
};

const getTransporter = () =>
  nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT || 587),
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

const sendMail = async ({ to, subject, html }) => {
  if (shouldSkipMail()) {
    return { skipped: true };
  }
  try {
    const transporter = getTransporter();
    return await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject,
      html,
    });
  } catch (err) {
    console.error("Email send failed", err.message);
    return { skipped: true, error: err.message };
  }
};

module.exports = { sendMail };
