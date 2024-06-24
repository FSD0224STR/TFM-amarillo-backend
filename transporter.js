const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "fsd24amarillo@gmail.com",
        pass: process.env.EMAIL_APP_PASSWORD,
    },
});

module.exports = transporter