//página para post completo con comentarios, likes y visitas

import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import './css/clear.css'
import './css/dark.css'
import Header from './parts/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { User } from '../context/User';
import Comment from './parts/Comment';

function Post() {
    const [post, setPost] = useState([])
    const [like, setLike] = useState(false)
    const [comments, setComments] = useState([]) //lista de comentarios
    const [comment, setComment] = useState("") //caja de comentario
    const {user} = useContext(User)
    const {userId, postId} = useParams()
    const navigate = useNavigate()
    //si el usuario es admin, tiene la opción de editar o eliminar posts.

    useEffect(()=>{
      async function getPost(){
        const petition = await axios.get(`http://localhost:3001/p/${postId}/get-post`)
        //console.log(petition.data)
        if(userId && petition.data != null || "Error"){
          setPost(petition.data)
          //setLike(petition.data.likes > 0)  actualiza el estado de like basado en los likes del post
          //setComments(petition.data.comments)
          async function visited(){
            const visit = await axios.get(`http://localhost:3001/p/${postId}/visit`)
            console.log(visit)
          }
          //visited()
        }
      }
      getPost()
    },[userId,postId])

    useEffect(()=>{
      async function getLike(){
        const petition = await axios.get(`http://localhost:3001/p/${userId}/${postId}/get-like`)
        if(petition.data == "found"){
          setLike(true)
        }else{
          setLike(false)
        }
      }
      getLike()
    },[])

    useEffect(()=>{
      async function comments(){
        const petition = await axios.get(`http://localhost:3001/p/${postId}/comments`)
        if(petition.data != null || "Error"){
          setComments(petition.data)
        }
      }
      comments()
    },[])

    const liked = async () => {
      try {
        await axios.get(`http://localhost:3001/p/${userId}/${postId}/like`)
        setLike(true); // Actualiza el estado de "like" a true después de dar like
        setPost(prevPost => ({
          ...prevPost,
          likes :prevPost.likes +1  //incrementa el contador de likes en el estado del post
        }))
        window.location.reload()
    } catch (err) {
        console.log('Error al dar like al post', err);
    }
}
    
    
    const no_liked = async () => {
      try {
        await axios.get(`http://localhost:3001/p/${userId}/${postId}/no-like`)
        setLike(false); // Actualiza el estado de "like" a true después de dar like
        setPost(prevPost => ({
          ...prevPost,
          likes :prevPost.likes -1  //incrementa el contador de likes en el estado del post
        }))
        window.location.reload()
      } catch (err) {
        console.log('Error al dar like al post', err);
      }
    }

    const sendComment = async(e) => {
      e.preventDefault()
      await axios.post(`http://localhost:3001/p/${postId}/add-comment`, {username:user.name, comment:comment}, {withCredentials: true})
      .then(resp => {console.log("ACr => ", resp); setTimeout(()=>{window.location.reload()}, 100)})
      .catch(err => {console.log("ACe => ", err)})
    }

  return (
    <>
        <Header/>
        <>
            {post.length > 0 ? 
            <>
              <section className="post">
                  <div className="post-header">
                    <h1>{post[0].title}</h1>
                    <h1>{post[0].username} | {post[0].date.slice(0,10)}, <span>{post[0].date.slice(11,16)}</span></h1>
                  </div>
                  <p className="post-body">{post[0].body}</p>
                  <div className="post-buttons">
                      <div className="post-like">
                        <button className={like ? "like liked" : "like not-liked"} onClick={like ? no_liked : liked}>{like ? <i class="fa-solid fa-thumbs-up"></i> : <i class="fa-regular fa-thumbs-up"></i>}</button>
                        <p>{post[0].likes}</p>
                      </div>
                      {/* {user.role == "admin" && // button delete post
                        <button className="admin-delete-post"></button>} */}
                      <h3>{post[0].visits} {post[0].visits === 1 ? "visit" : "visits"}</h3>
                  </div>
              </section>
              <section className="comments">
                <h1>Comments</h1>
                <hr />
                <div className="comment-list">
                  {comments.length > 0 ? 
                    comments.map((c)=>{
                      return <Comment key={c._id} id={c._id} username={c.username} comment={c.comment} date={c.date.slice(0,10)} time={c.date.slice(11,16)} likes={c.likes}/>
                    })
                  : 
                    <h1>Todavía no hay comentarios. ¡Sé el primero en dejar un mensaje!</h1>
                  }
                </div>
                <form action="" className="comment-form" onSubmit={sendComment}>
                  <textarea name="" id="" cols="30" rows="10" className="add-textarea comment-textarea" value={comment} onChange={(e)=>{setComment(e.target.value)}}></textarea>
                  <button className="add-btn signin-btn">Enviar comentario</button>
                </form>
              </section>
            </>
            : 
            <p>"cargando"</p>}
        </>
    </>
  );
}

export default Post;