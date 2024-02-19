const randomString = require('randomstring')
const Usuario = require('../../models/Usuario')
const sendEmailConfirmation = require('../../config/email-resend')


const send_request = async(req, res)=>{
    
}

const acceptRequest = async (req,res)=>{
    const {userId} = req.params
    try{
        const user = Usuario.findById(userId)
        const code = randomString.generate(7)
        await sendEmailConfirmation(user,code)
        res.json({success : true})
    } catch(e){
        console.log('error when generate code',e)
    }
}

// const get_code = async(req, res)=>{
//     const userId = req.params
//     const user = Usuario.findById(userId)
//     const code = randomString.generate(7)
//     console.log('come from get_code and i am code :', code)
//     res.json({user,code})
// }

const get_all_users = async(req, res)=>{
    
}

const delete_profile = async(req, res)=>{

}

module.exports = { acceptRequest}