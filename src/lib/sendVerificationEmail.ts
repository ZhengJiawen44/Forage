import nodemailer from "nodemailer";

export async function sendVerificationEmail(
  userEmail: string,
  emailToken: string
): Promise<string | undefined> {
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
    <a href="http://localhost:3000/auth/verifyEmail/?token=${emailToken}">Verify Email</a>`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        resolve((error as Error).message);
      } else {
        console.log(info.response);
        resolve(undefined);
      }
    });
  });
}
