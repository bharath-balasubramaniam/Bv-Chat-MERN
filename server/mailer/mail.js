const mailer = require("nodemailer");
const { Hello } = require("./mailTemplate");
const getEmailData = (to, name, template) => {
  let data = null;
  switch (template) {
    case "hello":
      data = {
        from: "BV Chats <bvourselves@gmail.com>",
        to,
        subject: `Password Reset`,
        html: Hello(),
      };
      break;
    default:
      data;
  }
  return data;
};

const sendEmail = (to, name, type) => {
  const smtpTransport = mailer.createTransport({
    host: "smtp.mail.google.com",
    secureConnection: false,
    port: 587,
    service: "Gmail",
    auth: {
      user: process.env.mailerUSER,
      pass: process.env.mailerPASS,
    },
    debug: false,
    logger: true,
  });

  const mail = getEmailData(to, name, type);

  smtpTransport.sendMail(mail, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log("email sent successfully");
    }
    smtpTransport.close();
  });
};
module.exports = { sendEmail };
