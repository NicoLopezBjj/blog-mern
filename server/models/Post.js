const mongoose = require('mongoose')
const Usuario = require('./Usuario')

const userSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    date:{
        type:Date,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    likes:{
        type:Number
    }
})

const Post = mongoose.model('Post', userSchema)

module.exports = Post