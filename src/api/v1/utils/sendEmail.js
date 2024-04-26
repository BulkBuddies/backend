import * as nodemailer from "nodemailer";

const sendEmail = async (recipient, token) => {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport("SMTP", {
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "alanis.feeney95@ethereal.email",
      pass: "cgnWXD5fdvUYjxwk99",
    },
  });

  let info = await transporter.sendMail({
    from: "bulkbuddies@bb.cl",
    to: recipient,
    subject: "I need you",
    text: `Click on the following link localhost:3000/password-reset/${token}`,
  });

  res.status(200).json(info);
};

export default sendEmail;
