import { useContext, useState } from 'react';
import axios from "axios"
import '../App.css';
import './css/clear.css'
import './css/dark.css'
import { Link, useNavigate } from 'react-router-dom';
import { DarkMode } from '../context/DarkMode';

function SignUp() {
  const [nombre, setNombre] = useState("")
  const [mail, setMail] = useState("")
  const [password, setPassword] = useState("")
  const {dark} = useContext(DarkMode)
  const navigate = useNavigate()

  const create = (e) => {
    e.preventDefault()
    axios.post("http://localhost:3001/signup", {nombre, mail, password}, {withCredentials: true}).then(resp => {console.log(resp);navigate("/signin")}).catch(err => {console.log(err)})
  }

  return (
    <div className="bg-2">
        <section className="sign">
            <h1>escribe sin problemas.</h1>
            <form onSubmit={create} className={dark ? "sign-form dark-sign-form" : "sign-form clear-sign-form"}>
              <h3>blog mern.</h3>
              <input type="text" placeholder="Nombre de usuario" value={nombre} onChange={(e)=>{setNombre(e.target.value)}} maxLength="20"/>
              <input type="text" placeholder="E-mail" value={mail} onChange={(e)=>{setMail(e.target.value)}} />
              <input type="password" placeholder="Contraseña" value={password} onChange={(e)=>{setPassword(e.target.value)}} maxLength="20"/>
              <button className="sign-btn signin-btn">Crear cuenta</button>
            </form>
            <p>¿Ya tienes una cuenta? <Link to="/signin" className="underline">Inicia sesión aquí</Link></p>
        </section>
    </div>
  );
}

export default SignUp;