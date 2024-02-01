const passport = require('passport')
const bcrypt = require("bcrypt")
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const jwt = require('jsonwebtoken')
const Usuario = require('../models/Usuario')
require("dotenv").config()

const secretKey = process.env.SECRETKEYJWT

const opts = {
    secretOrKey : secretKey,
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
}

module.exports.executeStrategy = function(passport) {
    console.log("entré a la estrategia")
    passport.use(new JwtStrategy( opts , async function(jwt_payload, done){ //función passport.use. no encerrar línea de passport.use en el try/catch
        console.log(jwt_payload)
        try{
            const usuario = await Usuario.findOne({_id:jwt_payload.sub})

            if (!usuario) {
                return done (null,false)
            }

            return done(null, usuario)

            // const usuario = await Usuario.findOne( {_id:jwt_payload.sub}, async function (err, usuario) { //función callback que busca el id en el payload de jwt
            //     if (err) { //si hay un error
            //         return done (err, false) // done es un callback error-first, por lo que el error siempre va como primer parámetro. Si no hay error, el primer parámetro es null.
            //     // }
            //     // if (usuario) { //si el usuario está
            //     //     const match = await bcrypt.compare(jwt_payload.password, usuario.password) //jwt_payload tiene al usuario entrante, acordate!!
            //     //     if(match){
            //     //         return done(null , usuario)
            //     //     }  
            //     } 
                
            //     else { //si el usuario NO está    
            //         return done (null, false)
            //     }
            // } )
        }catch(err){ //error en el try
            console.log(err)
            return done(err, false)
        }
    }))
    console.log("salí de la estrategia")
}
