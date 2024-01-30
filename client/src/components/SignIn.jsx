import { useContext, useState } from 'react';
import axios from "axios"
import '../App.css';
import './css/clear.css'
import './css/dark.css'
import Header from './parts/Header';
import { DarkMode } from '../context/DarkMode';

function SignIn() {
  const [nombreOMail, setNombreOMail] = useState("")
  const [password, setPassword] = useState("")
  const {dark} = useContext(DarkMode)

  const send = (e) => {
    e.preventDefault()
    axios.post("http://localhost:3001/signin", {nombreOMail, password}, {withCredentials: true}).then(resp => {console.log(resp)}).catch(err => {console.log(err)})
  }

  return (
    <div className="bg-1">
        <section className="sign">
            <h1>bienvenido.</h1>
            <form onSubmit={send} className={dark ? "sign-form dark-sign-form" : "sign-form clear-sign-form"}>
              <h3>blog mern.</h3>
              <input type="text" placeholder="Nombre de usuario o e-mail" value={nombreOMail} onChange={(e)=>{setNombreOMail(e.target.value)}} maxLength="20"/>
              <input type="password" placeholder="Contraseña" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
              <button className="sign-btn signin-btn">Iniciar sesión</button>
            </form>
            <p>¿No tienes una cuenta? <a href="/signup" className="underline">Regístrate aquí</a></p>
        </section>
    </div>
  );
}

export default SignIn;