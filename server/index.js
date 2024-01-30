const express = require("express")
const cors = require("cors")
const passport = require('passport')
require("dotenv").config()

const app = express()

// CONNECTION DATABASE
const connectDB = require('./db/connection')
const DB_URL = process.env.DB_URL
const PORT = process.env.PORT

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

app.use(passport.initialize())

app.use(cors({credentials:true}))