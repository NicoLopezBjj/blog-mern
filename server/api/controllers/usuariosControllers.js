const Usuario = require("../../models/Usuario")
const bcrypt = require("bcrypt")
const passport = require("passport")
const jwt = require ('jsonwebtoken')
require("dotenv").config()

const secretKey = process.env.SECRETKEYJWT

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
}

const signin_post = async (req,res) =>{
    const { nombreOMail, password } = req.body;
    console.log(nombreOMail,password)

    try {
        const usuario = await Usuario.findOne({ 
            $or:[
                {name: nombreOMail},
                {email: nombreOMail}
                     ] 
         });
        console.log('soy el siginpost',usuario)

        if (!usuario) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const match = await bcrypt.compare(password, usuario.password);

        if (match) {
            // Usuario autenticado, generar token
            const token = jwt.sign({ sub: usuario._id, username: usuario.nombreOMail }, secretKey, { expiresIn: '1h' });
            console.log('verificando el token',token)
            return res.status(200).json({ token });
        } else {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
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

const sign_out = async(req,res)=>{
    
}

module.exports = {
    signup_post,
    signin_get,
    signin_post,
    sign_out
}