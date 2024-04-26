import * as nodemailer from "nodemailer";
import { APP_PASSWORD, EMAIL } from "../../../../config/constants.js";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.Gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL,
    pass: APP_PASSWORD,
  },
});

const sendEmail = async (recipient, token) => {
  let message = "email enviado";
  const emailOptions = {
    from: "bulkbuddies@bb.cl",
    to: recipient,
    subject: "Recuperación de contraseña",
    text: `Click on the following link http://localhost:3000/api/v1/password-reset/${token}`,
  };
  await transporter.sendMail(emailOptions, (err, info) => {
    if (err) {
      console.log("Error sending email", err);
    } else {
      console.log("Email sent", info.response);
      return info.response;
    }
  });
};

export default sendEmail;
