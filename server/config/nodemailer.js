const nodemailer = require('nodemailer')
require("dotenv").config()

const NODEMAILER_USER = process.env.NODEMAILER_USER
const NODEMAILER_PASS = process.env.NODEMAILER_PASS

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth : {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASS
    }
})

async function sendEmail(user,codeConfirmation){
    const info = await transporter.sendMail({
        from:'"Blog-Mern"<devs.fullstack2023@gmail.com>',
        to: `${user.email}`,
        subject:"Code Confirmation for Moderator",
        html: `<p>Hola ${user.name},</p><p>Utiliza el siguiente código para confirmar tu solicitud de ser moderador en nuestro blog: <strong>${codeConfirmation}</strong></p>`,
    })
}

module.exports = sendEmail