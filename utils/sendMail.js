const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config()

const sendMail = async (sent_from, send_to, reply_to, subject, message) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        pool: true,
    port: 465,
    secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    })

    const options = {
        from: sent_from,
        to: send_to,
        cc: reply_to,
        subject,
        html: message
    }

    transporter.sendMail(options, function(err, info){
        if (err) {
            console.log(err)
            console.log(options)
        } else {
            console.log(options)
        }

    })

};

module.exports = sendMail;