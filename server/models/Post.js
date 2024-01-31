const mongoose = require('mongoose')
const Usuario = require('./Usuario')

const postSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
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
    },
    visits:{
        type:Number
    }
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post