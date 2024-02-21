const mongoose = require("mongoose")
const Usuario = require("./Usuario")

const codeSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usuario"
    },
    code:{
        type:String,
        required:true,
        unique:true
    }
})

//const Code = mongoose.model("code", codeSchema)

//module.exports = Code