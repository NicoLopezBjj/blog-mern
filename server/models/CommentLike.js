const mongoose = require("mongoose")
const Usuario = require("./Usuario")
const Post = require("./Post")

const commentLikeSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Usuario",
        required:true
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
        required:true
    },
    commentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
        required:true,
        default:null
    }
})

const CommentLike = mongoose.model('comment-like', commentLikeSchema)

module.exports = CommentLike