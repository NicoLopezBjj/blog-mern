const randomString = require('randomstring')
const Usuario = require('../../models/Usuario')
const sendEmailConfirmation = require('../../config/email-resend')


const send_request = async(req, res)=>{
    
}

const acceptRequest = async (req,res)=>{
    const {userId} = req.body
    try{
        console.log('i am ID from front', userId)
        const user = await Usuario.findById(userId)
        console.log('come front back acceptRequest',user)
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

const verify_code = async (req, res)=>{
    const { code } = req.body
    const { userId } = req.params
    try{
        const user = Usuario.findById(userId)
        if(!user){
            res.status(404).json({ success: false, message:'error when searching user'})
        }
        const codeCorrect = await user.verifyAndSetRole(code)
        if(codeCorrect){
            return res.json({ success:true, message:'Code verified correctly. The user is now a Mod.'})
        }else{
            return res.status(400).json({ success: false, message: 'Incorrect code'})
        }
    }catch(e){
        console.log('error when comparing codes',e)
    }
}

const get_all_users = async(req, res)=>{
    
}

const delete_profile = async(req, res)=>{

}

module.exports = { acceptRequest, verify_code}