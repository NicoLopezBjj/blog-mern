const { Resend }= require('resend')
const Usuario = require('../models/Usuario')
require("dotenv").config()

const KEY_EMAIL_RESEND = process.env.KEY_EMAIL_RESEND

const resend = new Resend(KEY_EMAIL_RESEND)

async function sendEmailConfirmation(user,codeConfirmation){
  try{
    const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: 'devs.fullstack2023@gmail.com',
        subject: 'Confirmation code for Moderator',
        html: `<p>Hola ${user.name},</p><p>Utiliza el siguiente código para confirmar tu solicitud de ser moderador en nuestro blog: <strong>${codeConfirmation}</strong></p>`,
      });
      if (error) {
        return console.error({ error });
      }
    
      console.log('come from resend *****',{ data });
    }catch(e){
      console.log('error when sending email',e)
    }
    }

module.exports = sendEmailConfirmation