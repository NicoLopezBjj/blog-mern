const signup_get = async(req,res)=>{

}

const signup_post = async(req,res)=>{
    const {nombre, mail, password} = req.body
    console.log("req.body", nombre, mail, password)
    res.json("signup done")
}

const signin_get = async(req,res)=>{

}

const signin_post = async(req,res)=>{
    //usar $or de Mongoose
    const {nombreOMail, password} = req.body
    console.log("req.body signin", nombreOMail, password)
    res.json("signin done")
}

const sign_out = async(req,res)=>{
    
}

module.exports = {
    signup_get,
    signup_post,
    signin_get,
    signin_post,
    sign_out
}