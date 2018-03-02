let nodemailer = require('nodemailer'),
    config = require('../config/email.js');

let transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure, // true for 465
    auth: {
        user: config.user,
        pass: config.password
    }
});

let service = {
    sendDonationCode: sendDonationCode
};

function sendDonationCode(code, email) {
    let mailOptions = {
        from: '"Caring Currency" <no-reply@caringcurrency.com>',
        to: email,
        subject: 'Your donation code',
        text: code,
        html: '<b>' + code + '</b>'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Donation code %s sent to %s. Message id: %s', code, email, info.messageId);
        }
    });
}

module.exports = service;
