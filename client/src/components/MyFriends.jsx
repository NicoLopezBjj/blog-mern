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
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from "react-i18next"

function MyFriends() {
  const {user} = useContext(User)
  const {dark, setDark} = useContext(DarkMode)
  const [friends, setFriends] = useState([])
  const {  } = useParams()
  const { t , i18n } = useTranslation("global")


  useEffect(()=>{
    const darkSt = localStorage.getItem("dark")
    if(darkSt === "true"){
      setDark(true)
    }else{
      setDark(false)
    }
  },[dark])

   useEffect(()=>{
     console.log("get my friends")
     console.log("soy el usuario del front",user._id)
        if(user){
          axios.get(`http://localhost:3001/u/${user._id}/get-my-friends`)
          .then(response => {
            console.log("info del back",response.data)
            if (response.data){
              setFriends(response.data)
            }
          })
          .catch(e =>{console.log("error when searching friends list of back",e)})
        }
   },[user])

  return (
    <div className="bg-4 font prof">
        <Header/>
        <h1 className="request-title">{t("friends.title")}</h1>
        <section className={dark ? "font userboard dark-dashboard" : "font userboard clear-dashboard"}>
            <div className="dashboard-header">
              <h1>{t("friends.subtitle")}</h1>
              <Link to="/profile/friends/requests"><button className="header-btn signup-btn">{t("friends.button")}</button></Link>
            </div>
        </section>
        <section className={dark ? "font dashboard dark-dashboard" : "font dashboard clear-dashboard"}>
            <div className="dashboard-header">
              <h1>{t("friends.myFriends")}</h1>
            </div>
            <div className="posts">
              {friends.length > 0 ? 
                friends.map((f)=>{
                  const friend = `/user/${f._id}`
                  return (<Link to={friend}>
                      <FriendThumbnail key={f._id}
                        name= {f.name}
                        img= {f.image} />
                      </Link>)})
                : <h1 style={{fontSize:"2rem",marginTop:"1em", marginLeft:"1.3em"}}>{t("friends.titleNoFriends")}</h1>
              }
            </div>
        </section>
    </div>
  );
}

export default MyFriends;