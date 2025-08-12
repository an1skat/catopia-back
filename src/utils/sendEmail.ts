import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendResetCodeEmail = async (to: string, code: string) => {
  const mailOptions = {
    from: "Catopia Support",
    to,
    subject: "Password Reset Code",
    text: `Your password reset code is: ${code}`,
  };

  await transporter.sendMail(mailOptions);
};
