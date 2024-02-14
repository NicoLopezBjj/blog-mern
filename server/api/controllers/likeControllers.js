const mongoose = require("mongoose")
const Like = require("../../models/Like")
const CommentLike = require("../../models/CommentLike")

const get_post_like = async(req,res)=>{
    const {userId, postId} = req.params
    const like = await Like.findOne({
        $and:[
            {userId:userId},
            {postId:postId}
        ]
    })
    if(like){
        res.json("found")
    }else{
        res.json("not found")
    }
}

const get_comment_like = async(req,res)=>{
    const {userId, postId,commentId} = req.params
    const like = await CommentLike.findOne({
        $and:[
            {userId:userId},
            {postId:postId},
            {commentId:commentId}
        ]
    })
    if(like){
        res.json("found")
    }else{
        res.json("not found")
    }
}

module.exports= {
    get_post_like,
    get_comment_like
}