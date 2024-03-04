//página para mis amigos del perfil

import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import './css/clear.css'
import './css/dark.css'
import Header from './parts/Header';
import FriendThumbnail from './parts/FriendThumbnail';
import { DarkMode } from '../context/DarkMode';
import { User } from '../context/User';
import { Link, useNavigate } from 'react-router-dom';

function MyFriends() {
  const {user, setUser} = useContext(User)
  const {dark, set} = useContext(DarkMode)
  const [friends, setFriends] = useState([])

  useEffect(()=>{
    console.log("get my posts")
    if(user){
      async function getMyFriends(){
        const petition = await axios.get(`http://localhost:3001/p/${user._id}/all-posts`)
        if(user && petition.data != null || "Error"){
          setFriends(petition.data)
        }
      }
    }
  },[user])

  /*
  
    friends.map((f)=>{
        const friend = `/user/${f._id}`
      return (<Link to={friend}>
        <FriendThumbnail key={f._id}
            id?
          name= {f.name}
          img= {f.image} />
        </Link>)
  */

  return (
    <div className="bg-4 font prof">
        <Header/>
        <h1 className="request-title">Amigos</h1>
        <section className={dark ? "font userboard dark-dashboard" : "font userboard clear-dashboard"}>
            <div className="dashboard-header">
              <h1>Solicitudes de amistad</h1>
              <Link to="/profile/friends/requests"><button className="header-btn signup-btn">Ver</button></Link>
            </div>
        </section>
        <section className={dark ? "font dashboard dark-dashboard" : "font dashboard clear-dashboard"}>
            <div className="dashboard-header">
              <h1>Mis amigos</h1>
            </div>
            <div className="posts">
            <FriendThumbnail />
              {friends.length > 0 ? "Hay amigos" : <h1 style={{fontSize:"2rem",marginTop:"1em", marginLeft:"1.3em"}}>En este momento no tienes ningún amigo.</h1>}
            </div>
        </section>
    </div>
  );
}

export default MyFriends;