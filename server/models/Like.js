const mongoose = require("mongoose")
const Usuario = require("./Usuario")
const Post = require("./Post")

const likeSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Usuario",
        required:true
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
        required:true
    }
})

const Like = mongoose.model('like', likeSchema)

module.exports = Like