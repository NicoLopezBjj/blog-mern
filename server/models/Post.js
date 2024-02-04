const mongoose = require('mongoose')
const Usuario = require('./Usuario')

const postSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    username:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
        default:new Date
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
    },
    comments:{
        type:Array,
        default:[]
    }
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post