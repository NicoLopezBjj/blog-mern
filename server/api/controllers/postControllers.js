const Post = require('../../models/Post')


// OBTENER TODOS LOS POSTS DEL USUARIO
const getAllPosts = async (req,res) => {
    const userId = req.params.userId
    try {
        const posts = await Post.find({ user : userId})
        res.json(posts)
    } catch (e) {
        console.log('error loading posts',e)
        res.json("Error")
    }
}

const getPost = async(req,res)=>{
    const userId = req.params.userId
    const postId = req.params.postId
}

// CREAR UN NUEVO POST PARA UN USUARIO 

const createPost = async (req,res) => {
    const userId = req.params.userId
    const {username, title, body} = req.body
    try{
        const newPost = new Post({
            user : userId,
            username: username,
            title: title,
            body: body,
            likes:0,
            visits:0,
        })
        const savedPost = await newPost.save()
        res.json(savedPost)
    } catch (e) {
        console.log('error when creating a new post', e)
    }
}

const allPosts = async (req, res) => {
    const all = await Post.find({})
    res.json(all)
}

module.exports = { getAllPosts, getPost, createPost, allPosts }