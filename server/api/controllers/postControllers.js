const Post = require('../../models/Post')


// OBTENER TODOS LOS POSTS DEL USUARIO
const getAllPosts = async (req,res) => {
    const userId = req.params.userId
    try {
        const posts = await Post.find({ user : userId})
        res.json(posts)
    } catch (e) {
        console.log('error loading posts',e)
    }
}

// CREAR UN NUEVO POST PARA UN USUARIO 

const createPost = async (req,res) => {
    const userId = req.params.userId
    const {title,date,body} = req.body
    try{
        const newPost = new Post({
            user : userId,
            title,
            date,
            body,
            likes:0,
            visits:0
        })
        const savedPost = await newPost.save()
        res.json(savedPost)
    } catch (e) {
        console.log('error when creating a new post', e)
    }
}

module.exports = { getAllPosts, createPost}