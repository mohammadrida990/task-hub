import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
export const sendEmail = async (email, emailSubject, emailBody) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASSWORD, // your Gmail app password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: `"TaskHub" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: emailSubject,
      text: emailBody.replace(/<[^>]+>/g, ""),
      html: emailBody,
    });

    return true;
  } catch (error) {
    console.log("Error sending email", error);

    return false;
  }
};
