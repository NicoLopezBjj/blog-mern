//página para preguntarle a los mods o solicitar ser mod

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
  const [mail, setMail] = useState("")
  const [body, setBody] = useState("")
  const [text, setText] = useState("Ambos campos son obligatorios para su solicitud.")
  const navigate = useNavigate()

  const createRequest = async(e)=>{
    e.preventDefault()
    if(mail == "" || body == ""){
      setText("Por favor, rellene todos los campos.")
    }else{
      if(mail != user.email){
        setText(`Por favor, ponga el mail de su usuario: ${user.email}`)
      }else{
        const send = await axios.post("http://localhost:3001/role/request", {id:user._id, mail:mail, body:body})
        if(send.data == "done"){
          setText("Su solicitud ha sido enviada. Muchas gracias por contactarte.")
          setTimeout(()=>{navigate("/dashboard")}, 1000)
        }else{
          setText("Hubo un error en su solicitud. Por favor, intente más tarde.")
        }
      }
    }
    
  }

  return (
    <div className="bg-1">
        <Header/>
        <section className={dark ? "font add-post dark-add-post" : "font add-post clear-add-post"}>
            <h1>¿Quieres ser mod?</h1>
            <form className="add-post-form">
              <div className="add-post-form-section">
                <label htmlFor="">Mail:</label>
                <input type="text" className={dark ? "add-input dark-add-input" : "add-input clear-add-input"} value={mail} onChange={(e)=>{setMail(e.target.value)}}/>
              </div>
              <div className="add-post-form-section">
                <label htmlFor="">Explica por qué quieres ser mod:</label>
                <textarea name="" id="" cols="30" rows="10" className={dark ? "add-textarea dark-add-textarea" : "add-textarea clear-add-textarea"}
                  value={body} onChange={(e)=>{setBody(e.target.value)}} ></textarea>
              </div>
              <p className="request-text">{text}</p>
              <div className="add-post-form-button">
                <Link><button className="add-btn signin-btn" onClick={createRequest}>Enviar solicitud</button></Link>
                <Link to="/dashboard"><button type="button" className="add-btn signup-btn">Cancelar</button></Link>
              </div>
            </form>
        </section>
    </div>
  );
}

export default ModRequest;