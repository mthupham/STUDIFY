require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('GMAIL_USER:', process.env.GMAIL_USER);
console.log('PASS length:', process.env.GMAIL_APP_PASSWORD?.length);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

transporter.sendMail(
  {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: 'Test OTP email',
    text: 'Đây là email test từ Nodemailer',
  },
  (err, info) => {
    if (err) {
      console.error('Lỗi gửi mail:', err);
    } else {
      console.log('Gửi thành công:', info.response);
    }
  },
);