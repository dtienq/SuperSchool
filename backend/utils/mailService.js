const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "phanthanhvi1996@gmail.com",
    pass: "phanthanhvi",
  },
});

exports.sendOTPRegister = async (emailPayload) => {
  try {
    await transport.sendMail({
      from: "superschool",
      to: emailPayload.to,
      subject: emailPayload.subject,
      html: emailPayload.html,
    });
    return {
      status: true,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
};
