import { useEffect, useContext } from 'react';
import '../App.css';
import './css/clear.css'
import './css/dark.css'
import Header from './parts/Header';
import { DarkMode } from '../context/DarkMode';

function NoPage() {
  const {dark, setDark} = useContext(DarkMode)
  
  useEffect(()=>{
    const darkSt = localStorage.getItem("dark")
    if(darkSt === "true"){
      setDark(true)
    }else{
      setDark(false)
    }
  },[dark])

  return (
    <div className="bg-1">
        <Header/>
        <section className={dark ? "hero dark-hero" : "hero"}>
            <h1>¡Oh, no! Lo sentimos.</h1>
            <h2>La página por la que preguntaste no existe.</h2>
            <div className="hero-btns">
                {/* <a href="/signin"><button className="hero-btn signin-btn">Iniciar sesión</button></a> */}
                <a href="/dashboard"><button className="hero-btn signup-btn">Ir al muro</button></a>
            </div>
        </section>
    </div>
  );
}

export default NoPage;