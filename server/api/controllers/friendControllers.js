const mongoose = require("mongoose")
const Usuario = require("../../models/Usuario")
const Post = require("../../models/Post")
const RequestFriend = require("../../models/RequestFriend")


const get_requests_friend = async (req,res) =>{
    try{
        const requestFriend = RequestFriend.find({})
        res.json(requestFriend)
    } catch(e){
        console.log("error when searching request of friends",e)
    }
}

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

const create_request_friend = async (req,res) =>{
    const { userId } = req.params
    const { request } = req.body
    console.log('i am userId from create_request_friend',userId)
    try{
        const user = await Usuario.findById(userId)
        if(!user){
            return res.status(404).json({ message: "user not found" })
        }
        const newRequest = new RequestFriend({
            userId : userId,
            request : request
        })

        await newRequest.save()

        return res.status(201).json({ message: "friend request sent successfully"})
    } catch (e){
        console.log("error when sent friend request",e)
    }
}

const accept_request_friend = async (req,res) =>{
    const { requestId } = req.params
    try {
        const request = await RequestFriend.findById(requestId)
        if(!request){
            return res.status(404).json({ message:"friend request not found" })
        }
        const user = await Usuario.findById(request.userId)
        if(!user){
            return res.status(404).json({ message:"user not found" })
        }

        user.friends.push(request.userId)
        await user.save()
        await request.remove()
        return res.status(200).json({ message: "friend request accept successfully"})
    } catch(e){
        console.log("error when accepting request",e)
    }
}

// const add_friend = async(req,res)=>{
//     const { userId } = req.params
//     const { userFront } = req.body
//     console.log('from BACK, i am USER', userFront)
//     console.log('from BACK, i am FRIEND', userId)
//     try{
//         const user = await Usuario.findById(userFront)
//         if(!user){
//             return res.status(404).json({ message: "user not found"})
//         }

//         const friend = await Usuario.findById(userId)
//         if(!friend){
//             return res.status(404).json({ message: "friend not found" })
//         }

//         // if(user.friends.includes(friendId){   check if they are already friends
//         //     res.status(404).json({message:"Already friends"})
//         // })

//         user.friends.push(userId)  // add friend to list
//         await user.save()    
//     } catch (e){
//         console.log("error when adding friend")
//     }
// }

const pull_friend = async(req,res)=>{

}

module.exports = {
    get_friend_info,
    get_friend_posts,
    pull_friend,
    get_requests_friend,
    create_request_friend,
    accept_request_friend
}