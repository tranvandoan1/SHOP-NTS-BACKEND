
const nodemailer = require('nodemailer');
const mailHost = "smtp.gmail.com";
const mailPort = 465;
export const pushEmail = (req, res, text) => {
  console.log('đẫ vàp')
    let transporter = nodemailer.createTransport({
        host: mailHost,
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.PASS_EMAIL,
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    const otp = Math.floor((Math.random() * 1000000) + 1)
    // setup email data with unicode symbols
    let mailOptions = {
        from: 'Mã OTP', // sender address
        to: req.body.email, // list of receivers
        subject: 'Thông báo', // Subject line
        text: `Mã OTP của bạn là ${otp}`, // plain text body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        return res.json(otp);

    });
};
