const passport = require('passport')
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

passport.use(new JwtStrategy( opts , function(jwt_payload, done){
   const usuario = Usuario.findOne( {_id:jwt_payload}, function (err, usuario) {
        if (err) {
            return done (err, false)
        }
        if (usuario) {
            return done (null , usuario)
        } else {
            return done (null, false)
        }

    } )
}))


module.exports = passport-jwt