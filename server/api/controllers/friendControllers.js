const mongoose = require("mongoose")
const Usuario = require("../../models/Usuario")
const Post = require("../../models/Post")

const get_friend_info = async(req,res)=>{
    try{
        const userId = req.params.userId
        const user = await Usuario.findOne({_id:userId})
        if(user){
            res.json(user)
        }else{
            res.json("no hay usuario")
        }
    }catch(err){
        console.log(err)
    }
}

const get_friend_posts = async(req,res)=>{
    try{
        const userId = req.params.userId
        const posts = await Post.find({user:userId})
        if(posts){
            res.json(posts)
        }else{
            res.json("no hay posts")
        }
    }catch(err){
        console.log(err)
    }
}

const add_friend = async(req,res)=>{

}

const pull_friend = async(req,res)=>{

}

module.exports = {
    get_friend_info,
    get_friend_posts,
    add_friend,
    pull_friend
}