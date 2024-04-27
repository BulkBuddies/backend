import * as nodemailer from "nodemailer";
import { APP_PASSWORD, EMAIL } from "../../../../config/constants.js";
import Handlebars from "handlebars";
import fs from "fs";
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.Gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: EMAIL,
    pass: APP_PASSWORD,
  },
  from: EMAIL,
});

const sendEmail = async (name, recipient, token) => {
  const source = fs
    .readFileSync("public/emailTemplate.html", "utf-8")
    .toString();
  const template = Handlebars.compile(source);
  const replacement = {
    firstName: name,
    token: token,
  };
  const htmlToSend = template(replacement);
  const emailOptions = {
    from: {
      name: "BulkBuddies",
      address: "bulkbuddies@bb.cl",
    },
    to: recipient,
    subject: "Recuperación de contraseña",
    text: "Hello World",
    html: htmlToSend,
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
