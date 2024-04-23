import * as nodemailer from "nodemailer";

const sendEmail = async (req, res, next) => {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "alanis.feeney95@ethereal.email",
      pass: "cgnWXD5fdvUYjxwk99",
    },
  });

  let info = await transporter.sendMail({
    from: "Cristiano Ronaldo cr7@world.pr",
    to: "barworld@ex.cl",
    subject: "I need you",
    html: `<section>
    <h1> We need your world </h1>
    <p> We are looking for new worlds and 
    we have stumbled upon yours </p>
    <br>
    <p> Let us know if you are interested
    in our endeavour</p>
    <h3> Regards, CR7 <h3/>
    </section>`,
  });

  res.status(200).json(info);
};

export default sendEmail;
