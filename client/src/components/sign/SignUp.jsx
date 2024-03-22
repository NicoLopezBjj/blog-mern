import { useContext, useState } from 'react';
import axios from "axios"
import '../../App.css';
import '../css/clear.css'
import '../css/dark.css'
import { Link, useNavigate } from 'react-router-dom';
import { DarkMode } from '../../context/DarkMode';
import { useTranslation } from "react-i18next"


function SignUp() {
  const [nombre, setNombre] = useState("")
  const [mail, setMail] = useState("")
  const [password, setPassword] = useState("")
  const {dark} = useContext(DarkMode)
  const navigate = useNavigate()
  const { t , i18n } = useTranslation("global")


  const create = (e) => {
    e.preventDefault()
    axios.post("http://localhost:3001/signup", {nombre, mail, password}, {withCredentials: true}).then(resp => {console.log(resp);navigate("/signin")}).catch(err => {console.log(err)})
  }

  return (
    <div className="bg-2">
        <section className="font sign">
            <h1>{t("signup.title")}</h1>
            <form onSubmit={create} className={dark ? "sign-form dark-sign-form" : "sign-form clear-sign-form"}>
              <h3>{t("signup.subtitle")}</h3>
              <input type="text" placeholder={t("signup.ph-name")} value={nombre} onChange={(e)=>{setNombre(e.target.value)}} maxLength="20"/>
              <input type="text" placeholder={t("signup.ph-email")} value={mail} onChange={(e)=>{setMail(e.target.value)}} />
              <input type="password" placeholder={t("signup.ph-password")} value={password} onChange={(e)=>{setPassword(e.target.value)}} maxLength="20"/>
              <button className="sign-btn signin-btn">{t("signup.button")}</button>
            </form>
            <p>{t("signup.message1")} <Link to="/signin" className="underline">{t("signup.message1")}</Link></p>
        </section>
    </div>
  );
}

export default SignUp;