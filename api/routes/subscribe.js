const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');


router.post('/', (req, res, next) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'YourEmail@custom.com',
            pass: 'Password@123'
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: "'Admin' <YourEmail@custom.com> ", // sender address
        to: "participant@custom.com", // list of receivers
        subject: `Hello`, // Subject line
        text: `Hello`, // plain text body
        html: `<h1>Hello</h1>` // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log('err: ', err);
        }
        else {
            console.log('success: ', info);
            res.status(201).json({
                message: 'Email sent successfully'
            });
        }
    });

});

module.exports = router;