//página para editar perfil, habilitar modo oscuro y cambiar idioma de español a inglés

import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import './css/clear.css'
import './css/dark.css'
import Header from './parts/Header';
import PostThumbnail from './parts/PostThumbnail';
import { DarkMode } from '../context/DarkMode';
import { User } from '../context/User';
import { Link } from 'react-router-dom';

function Profile() {
  const {user} = useContext(User)
  const {dark} = useContext(DarkMode)
  const [edit, setEdit] = useState(false)
  const [nombre,setNombre] = useState("")
  const [imagen,setImagen] = useState("")
  const [myPosts, setMyPosts] = useState([])

  useEffect(()=>{
    console.log("get my posts")
    if(user){
      async function getMyPosts(){
        const petition = await axios.get(`http://localhost:3001/p/${user._id}/all-posts`)
        if(user && petition.data != null || "Error"){
          setMyPosts(petition.data)
        }
      }
      getMyPosts()
    }
  },[user])

  const update = () => { 

  }

  return (
    <div className="bg-4 prof">
        <Header/>
        <section className={dark ? "profile dark-profile" : "profile clear-profile"}>
            <div className="profile-header">
              <h1>{user ? user.email : "No mail"} - {user ? user.role : "No role"}</h1>
              <img src={user ? user.image : "../../public/blank_user.png"} alt="User profile" />
            </div>
            <div className="profile-section">
              <div className="profile-name">
                <label>Editar nombre:</label>
                <input type="text" placeholder={user ? user.name : "No name"} value={nombre} onChange={(e)=>{setNombre(e.target.value)}} disabled={edit ? "" : "disabled"} maxLength="20"/>
                {edit && <button className="profile-btn save-profile-name bi bi-check-lg" onClick={update}></button>}
                <button className="profile-btn edit-profile-name bi bi-pencil-square" onClick={()=>{setEdit(!edit)}}></button>
              </div>
              <div className="profile-align">
                <div className="profile-role">
                  {user && user.role == "user" ? <Link className="profile-request underline" to="/mod">Solicitar ser mod</Link> : <Link className="profile-request underline" to="/mod">Solicitar baja de mod</Link>}
                </div>
              </div>
            </div>
        </section>
        <div className={dark ? "profile-posts dark-profile-posts" : "profile-posts clear-profile-posts"}>
          <h2 style={{textDecoration:"underline"}}>Mis entradas</h2>
          {myPosts.length > 0 
            ? 
            myPosts.map((p)=>{
              const post = `/post/${p.user}/${p._id}`
              return (<Link to={post}><PostThumbnail key={p._id}
                  title={p.title} 
                  username={p.username} 
                  date={p.date.slice(0, 10)} 
                  body={p.body} 
                  likes={p.likes} 
                  visits={p.visits} 
                  comments={p.comments} /> 
            </Link>)})
            : 
            <h2>En este momento no tienes ninguna entrada publicada.</h2>}
        </div>
    </div>
  );
}

export default Profile;