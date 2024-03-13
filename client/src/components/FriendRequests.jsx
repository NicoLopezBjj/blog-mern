//página para solicitudes de amigos en el perfil

import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import './css/clear.css'
import './css/dark.css'
import Header from './parts/Header';
import FriendRequestFromThumbnail from './parts/FriendRequestFromThumbnail';
import FriendRequestToThumbnail from './parts/FriendRequestToThumbnail';
import { DarkMode } from '../context/DarkMode';
import { User } from '../context/User';
import { Link, useNavigate, useParams } from 'react-router-dom';

function FriendRequests() {
  const {user, setUser} = useContext(User)
  const {dark, setDark} = useContext(DarkMode)
  const [sent, setSent] = useState([])
  const [received, setReceived] = useState([])
  const {requestId} = useParams()
  const id = JSON.parse(localStorage.getItem("user"))._id

  useEffect(()=>{
      async function getSentRequests(){
          const petition = await axios.get(`http://localhost:3001/u/${id}/get-sent-requests`)
          if(petition){
            setSent(petition.data)
          }
      }
      getSentRequests()
  },[user])

  useEffect(()=>{
      async function getReceivedRequests(){
          const petition = await axios.get(`http://localhost:3001/u/${id}/get-received-requests`)
          if(petition){
            setReceived(petition.data)
          }
      }
      getReceivedRequests()
  },[user])

  useEffect(()=>{
    const darkSt = localStorage.getItem("dark")
    if(darkSt === "true"){
      setDark(true)
    }else{
      setDark(false)
    }
  },[dark])

  return (
    <div className="bg-4 font prof">
        <Header/>
        <h1 className="request-title">Solicitudes de amistad</h1>
        <section className={dark ? "profile dark-profile" : "profile clear-profile"}>
            <div className="profile-header">
                <h2>Solicitudes recibidas: {received.length}</h2>
            </div>
            <div className="profile-section">
              {received.length > 0 ? 
              received.map((r)=>{
                return <FriendRequestFromThumbnail from={r.fromUser} request_id={r._id} to={r.toUser}/>
              })
              : null}
            </div>
        </section>
        <section className={dark ? "profile dark-profile" : "profile clear-profile"}>
            <div className="profile-header">
                <h2>Solicitudes enviadas: {sent.length}</h2>
            </div>
            <div className="profile-section">
            {sent.length > 0 ? 
              sent.map((r)=>{
                return <FriendRequestToThumbnail to={r.toUser} />
              })
              : null}
            </div>
        </section>
    </div>
  );
}

export default FriendRequests;