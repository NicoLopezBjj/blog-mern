import { useContext, useState } from 'react';
import axios from "axios"
import '../../App.css';
import '../css/clear.css'
import '../css/dark.css'
import { Link, useNavigate } from 'react-router-dom';
import { DarkMode } from '../../context/DarkMode';
import { useTranslation } from "react-i18next"


function SignIn() {
  const [nombreOMail, setNombreOMail] = useState("")
  const [password, setPassword] = useState("")
  const {dark} = useContext(DarkMode)
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const { t } = useTranslation("global")


  const send = async (e) => {
    e.preventDefault()

    await axios.post("http://localhost:3001/signin", {nombreOMail, password}, {withCredentials: true}).then(resp => {console.log("r => " + resp); localStorage.setItem("token", resp.data.token); navigate("/dashboard")}).catch(err => {console.log("e => " + err)})
  }

  return (
    <div className="bg-1">
        <section className="font sign">
            <h1>{t("signin.signin-title")}</h1>
            <form onSubmit={send} className={dark ? "sign-form dark-sign-form" : "sign-form clear-sign-form"}>
              <h3>blog mern.</h3>
              <input type="text" placeholder="Nombre de usuario o e-mail" value={nombreOMail} onChange={(e)=>{setNombreOMail(e.target.value)}} maxLength="20"/>
              <input type="password" placeholder="Contraseña" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
              <button className="sign-btn signin-btn">{t("signin.signin-button")}</button>
            </form>
            <p>{t("signin.signin-text")} <Link to="/signup" className="underline">{t("signin.signin-text2")}</Link></p>
        </section>
    </div>
  );
}

export default SignIn;