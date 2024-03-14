//página para editar perfil, habilitar modo oscuro y cambiar idioma de español a inglés

import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import './css/clear.css'
import './css/dark.css'
import Header from './parts/Header';
import PostThumbnail_onProfile from './parts/PostThumbnail_onProfile';
import { DarkMode } from '../context/DarkMode';
import { User } from '../context/User';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next"

function Profile() {
  const {user, setUser} = useContext(User)
  const {dark, setDark, set} = useContext(DarkMode)
  const [edit, setEdit] = useState(false)
  const [nombre,setNombre] = useState("")
  const [error,setError] = useState("")
  const [myPosts, setMyPosts] = useState([])
  const navigate = useNavigate()
  const storedbef = localStorage.getItem("user")
  const { t , i18n } = useTranslation("global")
  const [ language, setLanguage] = useState("es")
  console.log(dark)
  console.log(localStorage.getItem("dark"))

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

  const update = async(e) => { 
    e.preventDefault()
    if(nombre == ""){
      setError("Por favor rellene el campo.")
    }else{
      try{
        const newProfile = await axios.post("http://localhost:3001/update", {id: user._id, previousName: user.name, newName: nombre}, {withCredentials:true})
        if(newProfile.data.state === "ok"){
          const newUser = newProfile.data.user
          setError("")
          localStorage.setItem("user", JSON.stringify(newUser))
          setTimeout(()=>{window.location.reload()}, 100)
        }else{
          console.log(newProfile.data)
        }
      }catch(err){
        console.log(err)
      }
    }
  }

  useEffect(()=>{
    const darkSt = localStorage.getItem("dark")
    if(darkSt === "true"){
      setDark(true)
    }else{
      setDark(false)
    }
  },[dark])

  const toggleLanguage = (lang) =>{
    setLanguage(lang)
    i18n.changeLanguage(lang)
  }

  return (
    <div className="bg-4 font prof">
        <Header/>
        <section className={dark ? "profile dark-profile" : "profile clear-profile"}>
            <div className="profile-header">
              <h1>{user ? user.email : "No mail"} - {user ? user.role : "No role"}</h1>
              <img src={user ? user.image : "../../public/blank_user.png"} alt="User profile" />
            </div>
            <div className="profile-section">
              <div className="profile-name">
                <label>{t("profile.label")}</label>
                <input type="text" placeholder={user ? user.name : "No name"} value={nombre} onChange={(e)=>{setNombre(e.target.value)}} disabled={edit ? "" : "disabled"} maxLength="20"/>
                {edit && <button className="profile-btn save-profile-name bi bi-check-lg" onClick={update}></button>}
                <button className="profile-btn edit-profile-name bi bi-pencil-square" onClick={()=>{setEdit(!edit)}}></button>
              </div>
              <div className="profile-align">
                <p>{error}</p>
                <div className="profile-role">
                  <h3>{t("profile.messageMod")}</h3>
                  {user && user.role == "user" ? <Link className="profile-request underline" to="/mod">{t("profile.messageMod2")}</Link> : <Link className="profile-request underline" to="/mod">{t("profile.messageMod3")}</Link>}
                </div>
                <div className="profile-modes">
                  <button className="hero-btn signup-btn" onClick={set}>{dark ? "Habilitar modo claro" : "Habilitar modo oscuro"}</button>
                  {language === "es" ?
                  <button className="hero-btn signin-btn" onClick={() => toggleLanguage('en')}>Cambiar idioma a inglés</button>
                  :
                  <button className="hero-btn signin-btn" onClick={() => toggleLanguage('es')}>Change language to spanish</button>}
                </div>
              </div>
            </div>
        </section>
        <section className={dark ? "font userboard dark-dashboard" : "font userboard clear-dashboard"}>
            <div className="dashboard-header">
              <h1>{t("profile.friendTitle")}</h1>
              <Link to="/profile/friends"><button className="header-btn signup-btn">{t("profile.friendButton")}</button></Link>
            </div>
        </section>
        <div className={dark ? "profile-posts dark-profile-posts" : "profile-posts clear-profile-posts"}>
          <h2 style={{textDecoration:"underline"}}>{t("profile.postTitle")}</h2>
          {myPosts.length > 0 
            ? 
            myPosts.map((p)=>{
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
            <h2>{t("profile.postMessage")}</h2>}
        </div>
    </div>
  );
}

export default Profile;