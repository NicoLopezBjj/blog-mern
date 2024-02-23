//página para meter código y ser mod

import { useState, useContext } from 'react';
import axios from 'axios';
import '../App.css';
import './css/clear.css'
import './css/dark.css'
import { User } from '../context/User';
import { DarkMode } from '../context/DarkMode';
import Header from './parts/Header';
import { Link, useNavigate } from 'react-router-dom';

function ModCode() {
  const {user, setUser, LogOut} = useContext(User)
  const {dark} = useContext(DarkMode)
  const [code, setCode] = useState("")
  const [conf, setConf] = useState("")
  const [text, setText] = useState("Una vez que actualices el rol, deberás volver a iniciar sesión.")
  const navigate = useNavigate()

  const sendCode = async(e) => {
    e.preventDefault()
    if(code == "" || conf == ""){
        setText("Por favor, ingrese el código en ambos campos.")
    }else if(code === conf && code.length === 7){
        const send = await axios.post(`http://localhost:3001/role/${user._id}/verify-code`, {code:code})
        if(send.data.message === 'Code verified correctly. The user is now a Mod.'){
            setText("Rol actualizado. Muchas gracias por tu solicitud.")
            setTimeout(()=>{LogOut(); navigate("/")}, 3000)
        }
    }else{
        console.log("no hay código")
        setText("Error: Los códigos ingresados no coinciden. Por favor, escríbalos de manera adecuada.")
    }
  }

  return (
    <div className="bg-5">
        <Header/>
        <section className={dark ? "font add-code dark-add-post" : "font add-code clear-add-post"}>
            <h1>Inserción de código de mod</h1>
            <p className="add-code-text">Si estás en esta página significa que fuiste seleccionado para formar parte del equipo de mods de blog mern. Escribe el código que te ha sido enviado por mail para actualizar tu rol y convertirte en un nuevo moderador de la página.</p>
            <form className="add-post-form" onSubmit={sendCode}>
              <div className="add-post-form-section">
                <label>Inserte su código aquí:</label>
                <input type="password" className={dark ? "add-input dark-add-input" : "add-input clear-add-input"} value={code} onChange={(e)=>{setCode(e.target.value)}} maxLength="7"/>
              </div>
              <div className="add-post-form-section">
                <label>Confirme su código escribiéndolo de nuevo aquí:</label>
                <input type="password" className={dark ? "add-input dark-add-input" : "add-input clear-add-input"} value={conf} onChange={(e)=>{setConf(e.target.value)}} maxLength="7"/>
              </div>
              <p className="add-code-text">IMPORTANTE: <br /> Tener el rol de mod implica cumplir una cierta lista de reglas para mantener el orden de la página. Si haces algo que va en contra de las normas de blog mern se te revocará el rol.</p>
              <div className="add-post-form-button">
                <button className="add-btn signin-btn">Actualizar rol</button>
              </div>
              <p className="code-text">{text}</p>
            </form>
        </section>
    </div>
  );
}

export default ModCode;