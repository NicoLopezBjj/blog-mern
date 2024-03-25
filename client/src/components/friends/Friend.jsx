//página de amigo

import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
import '../css/clear.css'
import '../css/dark.css'
import Header from '../parts/Header';
import PostThumbnail_onProfile from '../parts/PostThumbnail_onProfile';
import { DarkMode } from '../../context/DarkMode';
import { User } from '../../context/User';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Friend() {
  const {user} = useContext(User)
  const {dark, setDark} = useContext(DarkMode)
  const {userId} = useParams()
  const [thisUser, setUser] = useState([])
  const [userPosts, setUserPosts] = useState([])
  const [sent, setSent] = useState("Enviar solicitud de amistad")
  const navigate = useNavigate()

  useEffect(()=>{
    console.log("get my posts")
    async function getUser(){
        const petition = await axios.get(`http://localhost:3001/u/${userId}/get`)
        if(petition.data != null || "no hay usuario"){
            setUser(petition.data)
        }
    }
    async function getPosts(){
        const petition = await axios.get(`http://localhost:3001/u/${userId}/get-posts`)
        if(petition.data != null || "no hay posts"){
            setUserPosts(petition.data)
        }
    }
    getUser()
    getPosts()
  },[user])

  useEffect(()=>{
    const darkSt = localStorage.getItem("dark")
    if(darkSt === "true"){
      setDark(true)
    }else{
      setDark(false)
    }
  },[dark])

  const sentRequestFriend = async () => { 
      try{
        const response = await axios.post(`http://localhost:3001/u/${userId}/sent-request-friend`, {userFront : user._id, request : "Solicitud de amistad enviada" })
        setSent("Solicitud enviada")
        console.log(' i am RESPONSE', response.data)
        setTimeout(()=>{navigate("/profile")}, 1000)
      } catch (e){
        console.log('error when adding friend FRONT',e)
      }
  }

  const noFriend = () => {

  }

 /*userPosts.map((p)=>{
              const post = `/post/${p.user}/${p._id}`
              return (<Link to={post}><PostThumbnail key={p._id}
                  title={p.title} 
                  username={p.username} 
                  date={p.date.slice(0, 10)} 
                  body={p.body} 
                  likes={p.likes} 
                  visits={p.visits} 
                  comments={p.comments} /> 
            </Link>)})*/
// console.log(thisUser)
//onClick={addFriend} en linea 79
  return (
    <div className="bg-4 font prof">
        <Header/>
        <section className={dark ? "profile dark-profile" : "profile clear-profile"}>
            <div className="profile-header">
              <h1>{thisUser != [] ? thisUser.name : "//////"} - {thisUser != [] ? thisUser.role : "///////"}</h1>
              <img src={thisUser != [] ? thisUser.image : "../../public/blank_user.png"} alt="User profile" />
            </div>
            <div className="profile-section">
              <div className="profile-align">
                <div className="user-mail">
                  <h2>Mail: {thisUser != [] ? thisUser.email : "///////"}</h2>
                  <button onClick={sentRequestFriend} className="friend-btn signin-btn">{sent}</button>
                </div>
              </div>
            </div>
        </section>
        <div className={dark ? "profile-posts dark-profile-posts" : "profile-posts clear-profile-posts"}>
          <h2 style={{textDecoration:"underline"}}>Entradas de {thisUser != [] ? thisUser.name : "//////"}</h2>
          {userPosts.length > 0 
            ? 
            userPosts.map((p)=>{
                const post = `/post/${p.user}/${p._id}`
                return (<Link to={post}><PostThumbnail_onProfile key={p._id}
                    title={p.title} 
                    username={p.username} 
                    date={p.date.slice(0, 10)} 
                    body={p.body} 
                    likes={p.likes} 
                    visits={p.visits} 
                    comments={p.comments} /> 
              </Link>)})
            : 
            <h2>En este momento {thisUser != [] ? thisUser.name : "//////"} no tiene ninguna entrada publicada.</h2>}
        </div>
    </div>
  );
}

export default Friend;