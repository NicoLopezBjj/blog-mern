const Usuario = require("../../models/Usuario")
const bcrypt = require("bcrypt")
const passport = require("passport")
const jwt = require ('jsonwebtoken')
require("dotenv").config()

const secretKey = process.env.SECRETKEYJWT

let user = null

const signup_post = async(req,res)=>{
    const {nombre, mail, password} = req.body
    if(nombre == "" || mail == "" || password == ""){
        res.json("Por favor, rellene todos los campos.")
    }else{
        try{
            const newUser = new Usuario({
                name: nombre,
                password: password,
                email: mail
            })
            newUser.save()
            res.json(newUser)
        }catch(err){
            res.json(err)
        }
    } 
}

const signin_get = async(req,res)=>{
    console.log("-1", req.isAuthenticated())
    console.log("User en el signin_get", req.user)
    res.json({ message: 'Ruta protegida accedida con éxito' });
}

const signin_post = async (req,res) =>{
    const { nombreOMail, password } = req.body; //obtengo info de req.body
    console.log(nombreOMail,password)

    try {
        const usuario = await Usuario.findOne({ //busca usuario
            $or:[
                {name: nombreOMail},
                {email: nombreOMail}
                     ] 
         });
        console.log('soy el siginpost',usuario)

        if (!usuario) { //si el usuario no está
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const match = await bcrypt.compare(password, usuario.password);

        if (match) {
            // Usuario autenticado, generar token
            user = usuario
            const token = jwt.sign({ sub: usuario._id, username: usuario.nombreOMail }, secretKey, { expiresIn: '1h' });
            console.log('verificando el token',token)
            console.log("0", req.isAuthenticated())
            return res.status(200).json({ token });
        } else {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

const get_user = (req, res)=>{
    console.log("1", req.isAuthenticated())
    console.log("User en el get_user", req.user)
    if(user != null){
        res.status(200).json({message:'User data', user: user})
    }else{
        res.status(401).json({message: 'No user found'})
    }
}

const update_profile = async(req, res)=>{
    
}

const add_comment = async(req,res)=>{

}

const edit_comment = async(req,res)=>{

}

const delete_comment = async(req,res)=>{
    
}

// const signin_post = (req,res, next)=>{
//     console.log("entré")
//     passport.authenticate("jwt", {session:false}, (err, user, info)=>{
//         if(err){ //si hay error en el autenticado
//             return res.status(401).json("Hubo un error", err)
//         }
    
//         console.log('vengo del singinPOST',user)
//         if(!user){ //si el usuario no está
//             return res.status(404).json("Usuario no encontrado")
//         }

//         req.logIn(usuario, (err)=>{
//             if(err){
//                 return res.status(500).json({ error: "Error interno del servidor", message: err.message })
//             }
//             console.log('vengo del logIN',user)
//             return res.status(200).json(user)
            
//         })
        
//     })(req,res,next)
//     console.log("salgo")
//     // const {nombreOMail, password} = req.body
//     // try{

//     //     const log = await Usuario.findOne({ //findOne!!! no find
//     //         $or:[
//     //             {name: nombreOMail},
//     //             {mail: nombreOMail}
//     //         ] //busca por nombre o por mail
//     //     })
        
//     //     if(log){
//     // const match = await bcrypt.compare(password, log.password)
//     //         if(match){
//     //             res.json(log)
//     //         }else{
//     //             res.json({error:"Contraseña incorrecta"})
//     //         }  
//     //     }else{
//     //         res.status(404).json("Usuario no encontrado")
//     //     }
        
//     // }catch(err){
//     //     res.status(404).json("Hubo un error", err)
//     // }
// }

const auth = (req,res)=>{
    const isAuth = req.isAuthenticated()
    res.json({situation:isAuth})
}

const sign_out = (req,res)=>{
    console.log("2", req.isAuthenticated())
    user = null
    req.logOut(function(err){
        if(err){
            return res.status(500).json({message:"Error en el logout", error:err})
        }
        console.log("no hay usuario", user, req.user)
        console.log("3", req.isAuthenticated())
        res.json("Logged out")
    })
}

module.exports = {
    signup_post,
    signin_get,
    signin_post,
    get_user,
    auth,
    update_profile,
    sign_out
}