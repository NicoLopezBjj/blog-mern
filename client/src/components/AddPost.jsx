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

function AddPost() {
  const {user} = useContext(User)
  const {dark} = useContext(DarkMode)
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const navigate = useNavigate()

  const createPost = async(e)=>{
    e.preventDefault()
    await axios.post(`http://localhost:3001/p/${user._id}/create-post`, {username:user.name, title, body}, {withCredentials:true})
    .then(resp => {console.log("APostr => ", resp);setTimeout(()=>{navigate("/profile")}, 1000)})
    .catch(err => {console.log("APoste =>", err)})
  }

  return (
    <div className="bg-3">
        <Header/>
        <section className={dark ? "add-post dark-add-post" : "add-post clear-add-post"}>
            <h1>Agregar entrada</h1>
            <form className="add-post-form" onSubmit={createPost}>
              <div className="add-post-form-section">
                <label htmlFor="">Título:</label>
                <input type="text" className={dark ? "add-input dark-add-input" : "add-input clear-add-input"} value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
              </div>
              <div className="add-post-form-section">
                <label htmlFor="">Mensaje:</label>
                <textarea name="" id="" cols="30" rows="10" className={dark ? "add-textarea dark-add-textarea" : "add-textarea clear-add-textarea"}
                  value={body} onChange={(e)=>{setBody(e.target.value)}} ></textarea>
              </div>
              <div className="add-post-form-button">
                <button className="add-btn signin-btn">Subir</button>
                <Link to="/dashboard"><button className="add-btn signup-btn">Cancelar</button></Link>
              </div>
            </form>
        </section>
    </div>
  );
}

export default AddPost;