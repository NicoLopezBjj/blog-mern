//página para preguntarle a los mods o solicitar ser mod
//página para agregar post

import { useState, useContext } from 'react';
import axios from 'axios';
import '../App.css';
import './css/clear.css'
import './css/dark.css'
import { User } from '../context/User';
import { DarkMode } from '../context/DarkMode';
import Header from './parts/Header';
import { Link, useNavigate } from 'react-router-dom';

function ModRequest() {
  const {user} = useContext(User)
  const {dark} = useContext(DarkMode)
  const [nombreOMail, setNOM] = useState("")
  const [body, setBody] = useState("")
  const navigate = useNavigate()

  const createRequest = async(e)=>{

  }

  return (
    <div className="bg-1">
        <Header/>
        <section className={dark ? "add-post dark-add-post" : "add-post clear-add-post"}>
            <h1>¿Quieres ser mod?</h1>
            <form className="add-post-form" onSubmit={createRequest}>
              <div className="add-post-form-section">
                <label htmlFor="">Nombre de usuario o mail:</label>
                <input type="text" className={dark ? "add-input dark-add-input" : "add-input clear-add-input"} value={nombreOMail} onChange={(e)=>{setNOM(e.target.value)}}/>
              </div>
              <div className="add-post-form-section">
                <label htmlFor="">Explica por qué quieres ser mod:</label>
                <textarea name="" id="" cols="30" rows="10" className={dark ? "add-textarea dark-add-textarea" : "add-textarea clear-add-textarea"}
                  value={body} onChange={(e)=>{setBody(e.target.value)}} ></textarea>
              </div>
              <div className="add-post-form-button">
                <button className="add-btn signin-btn">Enviar solicitud</button>
                <Link to="/dashboard"><button className="add-btn signup-btn">Cancelar</button></Link>
              </div>
            </form>
        </section>
    </div>
  );
}

export default ModRequest;