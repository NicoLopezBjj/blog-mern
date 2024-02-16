//comentarios

import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
import '../css/clear.css'
import '../css/dark.css'
import { useParams } from 'react-router-dom';
import { User } from '../../context/User';

function Comment({id, username, comment, date, time, likes}) {
  const [like, setLike] = useState(false)
  const [comentario,setComments] = useState([])
  const [editedComment, setEditedComment] = useState("")
  const [edit, setEdit] = useState(false)
  const [dlt, setDelete] = useState(false)
  const {user} = useContext(User)
  const {userId, postId, commentId} = useParams()

  useEffect(()=>{
    console.log("lo hace!!!")
    async function getCommentLike(){
      const petition = await axios.get(`http://localhost:3001/p/${userId}/${postId}/${commentId}/get-c-like`)
      if(petition.data == "found"){
        console.log("lo hizo")
        setLike(true)
      }else{
        setLike(false)
      }
    }
    //getCommentLike()
  },[])

  const liked = async () => {
      const commentId = {id}
      console.log('come liked front',commentId)
      try{
        await axios.get(`http://localhost:3001/p/${userId}/${postId}/${commentId.id}/like-comment`,{withCredentials:true})
        setLike(true)
        setComments(prevComments => ({
          ...prevComments,
          likes :prevComments.likes +1
        }))
        window.location.reload()
      } catch(e){
        console.log('error when like comment',e)
      }
    }
    
  const no_liked = async () => {
    const commentId = {id}
    try{
      await axios.get(`http://localhost:3001/p/${userId}/${postId}/${commentId.id}/no_like-comment`,{withCredentials:true})
      setLike(false)
    } catch(e){
      console.log('error when removing like from comment',e)
    }
  }

  const exit = () => {
    if(edit){
      setEdit(false)
    }else if(dlt){
      setDelete(false)
    }
  }

  const editComment = async(e)=>{
    e.preventDefault()
    const commentId = {id}
    await axios.post(`http://localhost:3001/p/${postId}/${commentId.id}/edit-comment`,{editedComment:editedComment},{withCredentials:true})
    .then(resp => {if(resp.data != "Error"){console.log("ECr => ", resp); setTimeout(()=>{window.location.reload()}, 500)}else{console.log("ECrE => ",resp)}})
    .catch(err => {console.log("ECE => ",err)})
  }

  const deleteComment = async()=>{
    const commentId = {id}
    await axios.delete(`http://localhost:3001/p/${postId}/${commentId.id}/delete-comment`, {withCredentials:true})
    .then(resp => {if(resp.data != "Error"){console.log("DCr => ", resp); setTimeout(()=>{window.location.reload()}, 1000)}else{console.log("DCrE => ",resp)}})
    .catch(err => {console.log("DCE => ",err)})
  }

  return (
    <>
      {edit ? 
      <div className="comment">
        <div className="thumbnail-header">
          <h1>{username}</h1>
          <button className="like not-liked close" onClick={exit}><i class="bi bi-x-lg"></i></button>
        </div>
        <form action="" className="comment-form" onSubmit={editComment}>
          <textarea name="" id="" cols="30" rows="10" className="add-textarea comment-textarea" 
          style={{marginTop:"1em",marginLeft:"1em", width:"97%"}} value={editedComment} onChange={(e)=>{setEditedComment(e.target.value)}}
          placeholder={comment}></textarea>
          <button className="add-btn signin-btn">Editar comentario</button>
        </form>
      </div>
      : 
      <div className="comment">
        <div className="thumbnail-header">
          <h1>{username}</h1>
          <h1>{date}, <span>{time}</span></h1>
        </div>
        <h3 className="comment-body">{comment}</h3>
        <div className="comment-footer">
          <div className="comment-likes">
          <button className={like ? "like liked" : "like not-liked"} onClick={like ? no_liked : liked}>{like ? <i class="fa-solid fa-thumbs-up"></i> : <i class="fa-regular fa-thumbs-up"></i>}</button>
          <h3>{likes}</h3>
          </div>
          {username === user.name && <div className="comment-edit">
            <button className="like liked comment-edition" onClick={()=>{setEdit(true)}}><i class="bi bi-pencil-square"></i></button>
            <button className="like liked comment-edition" onClick={()=>{setDelete(true)}}><i class="bi bi-trash3"></i></button>
          </div>}
          {user.role == "admin" && username != user.name && <button className="like liked comment-edition" onClick={()=>{setDelete(true)}}><i class="bi bi-trash3"></i></button>}
        </div>
        {dlt && <div className="dlt">
            <h3>¿Está seguro de que quiere eliminar este comentario?</h3>
            <div className="dlt-btn">
              <button className="hero-btn signin-btn" onClick={deleteComment}>Si</button>
              <button className="hero-btn signup-btn" onClick={exit}>No</button>
            </div>
          </div>}
     </div>}
  </>
  );
}

export default Comment;