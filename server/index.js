// Dependencies
const express = require("express")
const expressSession = require("express-session")
const cors = require("cors")
const passport = require('passport')
require("dotenv").config()

// Files
const connectDB = require('./db/connection')
const strategy = require("./config/passport-jwt")
const usuariosRoutes = require("./api/routes/usuariosRoutes")
const friendRoutes = require("./api/routes/friendRoutes")
const postRoutes = require('./api/routes/postRoutes')
const modRoutes = require('./api/routes/modRoutes')


// Environment Variables
const DB_URL = process.env.DB_URL
const PORT = process.env.PORT
const SECRET_SESSION = process.env.SECRET_SESSION

const app = express()

// Static files
app.use(express.static("../client/public"))

// Data transfer on (URL Encoded and JSON)
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// CORS
app.use(cors({origin:"http://localhost:3000", methods: "GET, POST, DELETE, PUT", credentials:true}))

// Session
app.use(expressSession({
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized:true,
    cookie: {maxAge: 3 * 60 * 60 * 1000}
}))

// Passport Strategy
app.use(passport.initialize())
app.use(passport.session())
strategy.executeStrategy(passport) //const.export-func(param:passport dependency)

// Routes
app.use(usuariosRoutes)
app.use("/u",friendRoutes)
app.use("/p",postRoutes)
app.use("/role",modRoutes)

// DB Connection & Port Listen
const connectDataBase = async () =>{
    try {
        await connectDB(DB_URL)
        console.log('connection to the database successful')
        app.listen(PORT, console.log('server running'))
    } catch (e) {
        console.log('error connecting to the database',e)
    }
}

connectDataBase()

