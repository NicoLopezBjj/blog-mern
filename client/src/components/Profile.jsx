//página para editar perfil, habilitar modo oscuro y cambiar idioma de español a inglés

import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import './css/clear.css'
import './css/dark.css'
import Header from './parts/Header';
import { User } from '../context/User';

function Profile() {
  const {user} = useContext(User)
  const [myPosts, setMyPosts] = useState([])

  useEffect(()=>{
    console.log("get my posts")
    async function getMyPosts(){
      const petition = await axios.get(`http://localhost:3001/p/${user._id}/all-posts`)
      if(user && petition.data != null || "Error"){
        setMyPosts(petition.data.posts)
      }
    }
  },[])

  return (
    <div className="bg-1">
        <Header/>
        <section className="hero">
            <h1>Perfil: {user ? user.name : "No name"}</h1>
            <h2>{user ? user.email : "No mail"} / {user ? user.role : "No role"}</h2>
            <img src={user ? user.image : "../../public/blank_user.png"} alt="User profile" />
            <div className="hero-btns">
                {myPosts.length > 0 ? "hay posts" : "no hay posts"}
                {/* <PostThumbnail> */}
            </div>
        </section>
    </div>
  );
}

export default Profile;