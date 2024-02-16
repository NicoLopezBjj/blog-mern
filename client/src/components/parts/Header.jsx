import '../../App.css';
import '../css/clear.css'
import '../css/dark.css'
import axios from 'axios'
import { User } from '../../context/User';
import { DarkMode } from '../../context/DarkMode';
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const {user, setUser} = useContext(User)
  const {dark} = useContext(DarkMode)
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const LogOut = async () => {
    localStorage.removeItem("token")
    setUser(null)
    console.log("usuario en logout front", user)
    const out = await axios.get("http://localhost:3001/signout")
    if(out.data == "Logged out"){
      console.log("se fue del back... creeemos")
    }
  }

  useEffect(()=>{
    async function getUser(){
      try{
        if(token != null){
          async function auth(){
            await axios.get("http://localhost:3001/signin", {headers:{'Authorization':`Bearer ${token}`}}).then(resp=>{console.log("Gr => " + resp)}).catch(err => {console.log("Ge => " + err)})
          }
          auth()
          const response = await axios.get("http://localhost:3001/user",{withCredentials:true, headers:{'Authorization':`Bearer ${token}`}})
          console.log(response)
          if(token && response.data.user != null){
            setUser(response.data.user)
          }
        }
      }catch(err){
        console.log(err)
        if(err.response.status == '401'){
          console.log("No autorizado")
        }
      }
    }
    getUser()
  },[]) //user talvez en dependencias? => Al final No!

  useEffect(()=>{
    if(user){
      localStorage.setItem("user",JSON.stringify(user))
    }else{
      localStorage.removeItem("user")
    }
  },[user])

  return (
    <header className={dark ? "dark-header" : "clear-header"}>
        <h1>blog mern.</h1>
        {user ? 
          <div className="header-btns">
              <a href="/profile"><button className="header-btn signin-btn">{user.name}</button></a>
              <a href="/dashboard"><button className={window.location.href=="http://localhost:3000/dashboard" ? "header-btn signup-btn" : "header-btn signin-btn"} 
                disabled={window.location.href=="http://localhost:3000/dashboard" ? "disabled" : ""}>
                {window.location.href=="http://localhost:3000/dashboard" ? "En el muro" : "Ir al muro"}</button>
              </a>
              <a href="/"><button className="header-btn signup-btn" onClick={LogOut}>Salir</button></a>
          </div> 
        : 
          <div className="header-btns">
              <a href="/signin"><button className="header-btn signin-btn">Iniciar sesión</button></a>
              <a href="/signup"><button className="header-btn signup-btn">Crear cuenta</button></a>
          </div>
        }
        
    </header>
  );
}

export default Header;