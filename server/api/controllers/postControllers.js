const Post = require('../../models/Post')
const mongoose = require("mongoose")

// OBTENER TODOS LOS POSTS DE UN USUARIO
const getUserPosts = async (req,res) => {
    const userId = req.params.userId
    try {
        const posts = await Post.find({ user : userId})
        res.json(posts)
    } catch (e) {
        console.log('error loading posts',e)
        res.json("Error")
    }
}

// OBTENER UN POST PARA /post
const getPost = async(req,res)=>{
    const postId = req.params.postId
    try{
        const post = await Post.find({_id: postId})
        res.json(post)
    }catch (err){
        console.log('error getting the post', e)
        res.json("Error")
    }
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

// MOSTRAR TODOS LOS POSTS EN EL DASHBOARD

const allPosts = async (req, res) => {
    const all = await Post.find({})
    res.json(all)
}

// INCREMENTAR NÚMERO DE VISITAS

const visit = async(req, res) => {
    const postId = req.params.postId
    try{
        const post = await Post.findById(postId)
        post.visits ++
        const visitedPost = await post.save()
        res.status(200).json(visitedPost)
    }catch(err){
        console.log('error when visiting the new post', err)
        res.json('Error')
    }
}

// Likes

// LIKE

const like = async(req, res) => {
    const postId = req.params.postId
    try{
        const post = await Post.findById(postId)
        post.likes ++
        const likedPost = await post.save()
        res.status(200).json(likedPost)
    }catch(err){
        console.log('error when liking the new post', err)
        res.json('Error')
    }
}

// QUITAR LIKE

const no_like = async(req, res) => {
    const postId = req.params.postId
    try{
        const post = await Post.findById(postId)
        if(post.likes > 0){
            post.likes --
            const noLikedPost = await post.save()
            res.status(200).json(noLikedPost)
        }
    }catch(err){
        console.log('error when no liking the new post', err)
        res.json('Error')
    }
}


// Comentarios

const get_comments = async(req,res)=>{
    const postId = req.params.postId
    try{
        const post = await Post.findById(postId)
        res.json(post.comments)
    }catch(err){
        console.log("error",err)
        res.json("Error")
    }
}

// AGREGAR COMENTARIO 

const add_comment = async(req,res)=>{
    const postId = req.params.postId
    const {username, comment} = req.body
    try{
        const post = await Post.findById(postId)
        post.comments.push({
            _id: new mongoose.Types.ObjectId(),
            username:username,
            comment:comment,
            date: new Date,
            likes:0
        })
        const commentedPost = await post.save()
        res.status(200).json(commentedPost)
    }catch(err){
        console.log('error when commenting the new post', err)
        res.json('Error')
    }
}

// EDITAR COMENTARIO

const edit_comment = async(req,res)=>{
    const postId = req.params.postId
    const commentId = req.params.commentId
    const {editedComment} = req.body
    try{
        console.log(commentId)
        const post = await Post.findById(postId)
        const index = post.comments.findIndex(com => com._id == commentId) //busca en comments[] comment._id que coincida con commentId del req.body. Importante == ya que req.body es string, no ObjectId
        if(index != -1){
            post.comments[index].comment = editedComment //la propiedad comment del objeto comment encontrado pasa a tener el contenido de editedComment
            post.markModified("comments") //markModified para marcar en que propiedad del modelo se hizo una modificación
            const editedPost = await post.save()
            console.log(editedPost)
            console.log("P", post)
            res.status(200).json(editedPost)
        }else{
            res.status(404).json("Comentario no encontrado")
        }
    }catch(err){
        console.log('error when commenting the new post', err)
        res.json('Error')
    }
}

const like_comment = async(req,res)=>{
    const postId = req.params.postId
    const commentId = req.params.commentId
    console.log('come for like_comment i am post',postId)
    console.log('come for like_comment i am comment',commentId)

    try{
        const post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({ error : 'the post does not exist'})
        }
        const comment = post.comments.find(comment => comment._id.toString() === commentId)
        if(!comment){
            return res.status(404).json({ error : 'the comment does not exist'})
        }
        comment.likes ++
        const likedComment = await Post.findByIdAndUpdate(postId, { 'comments.$[elem].likes': comment.likes }, { arrayFilters: [{ 'elem._id': commentId }], new: true });
        await post.save()
        res.status(200).json(likedComment)
    } catch (e){
        console.log('error when liking comment',e)
    }
}

const no_like_comment = async(req,res)=>{
    const postId = req.params.postId
    const commentId = req.params.commentId
    try{
        const post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({ error : 'the post does not exist'})
        }
        const comment = post.comments.find(comment => comment._id.toString() === commentId)
        if(!comment){
            return res.status(404).json({ error : 'the comment does not exist'})
        }
        comment.likes--
        const noLikedComment = await post.save()
        res.status(200).json(noLikedComment)
    } catch (e){
        console.log('error when removing like from comment',e)
    }
}

// ELIMINAR COMENTARIO

const delete_comment = async(req,res)=>{
    const postId = req.params.postId
    const commentId = req.params.commentId
    try{
        const commentObjectId = new mongoose.Types.ObjectId(commentId)
        const updatedPost = await Post.findByIdAndUpdate(postId, {$pull:{comments:{_id: commentObjectId}}}, { new: true })
        console.log(typeof(updatedPost._id))
        res.status(200).json(updatedPost)
    }catch(err){
        console.log(err)
    }
}

module.exports = { getUserPosts, getPost, createPost, allPosts, visit, like, no_like, get_comments, add_comment, edit_comment, delete_comment, like_comment, no_like_comment }