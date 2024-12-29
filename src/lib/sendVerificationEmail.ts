import nodemailer from "nodemailer";

export function sendVerificationEmail(userEmail: string, emailToken: string) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  const mailOptions = {
    to: "kingbilyger@gmail.com",
    subject: "email verification",
    html: `
    <h1>Verify your account</h1>
    <p>Please click the button below to confirm your email address and finish setting up your account. This link is valid for 24 hours</p>
    <a href="http://localhost:3000/Auth/VerifyEmail/?token=${emailToken}">Verify Email</a>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(info.response);
    }
  });
}
