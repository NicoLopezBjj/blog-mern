const Resend = require('resend')
const Usuario = require('../models/Usuario')
require("dotenv").config()

const KEY_EMAIL_RESEND = process.env.KEY_EMAIL_RESEND

const email = new Resend(KEY_EMAIL_RESEND)

(async function sendEmailConfirmation(usuario,codeConfirmation){
    const { data, error } = await email.emails.send({
        from: '<devs.fullstack2023@gmail.com>',
        to: [usuario.email],
        subject: 'Confirmation code for Moderator',
        html: `<p>Hola ${usuario.name},</p><p>Utiliza el siguiente código para confirmar tu solicitud de ser moderador en nuestro blog: <strong>${codeConfirmation}</strong></p>`,
      });
      console.log(data,usuario)
      if (error) {
        return console.error({ error });
      }
    
      console.log({ data });
    })();


module.exports = sendEmailConfirmation