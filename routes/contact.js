const express = require('express');
const router = express.Router();
require('dotenv').config();

const nodemailer = require('nodemailer');
const MAIL_ADDRESS = process.env.MAIL_ADDRESS;
const MAIL_PASSWORD = process.env.MAIL_PW;

//const transporter = nodemailer.createTransport({
//    host: 'smtp.gmail.com',
//    //secure: true,  //다른 포트를 사용해야 되면 false값을 주어야 합니다.
//    //secure: false,  //다른 포트를 사용해야 되면 false값을 주어야 합니다.
//    port: 587,   //다른 포트를 사용시 여기에 해당 값을 주어야 합니다.
//    auth: {
//        user: mailAddress,
//        pass: mailPassword
//    }
//})

const transporter = nodemailer.createTransport({
	service: 'gmail',
    auth: {
        user: MAIL_ADDRESS,
        pass: MAIL_PASSWORD
    }
})

router.get('/', async (req, res) => {
	res.render('contact')
})

router.post('/', async (req, res) => {
	const {subject, content} = req.body;
	await sendMail(subject, content);

	res.redirect('/')
})


async function sendMail(subject, content) {
	return await transporter.sendMail({
		from: MAIL_ADDRESS,
		to: ['greyhairchooselife@gmail.com'],
		subject: String(subject),
		text: String(content),
	})
}

module.exports = router; 
