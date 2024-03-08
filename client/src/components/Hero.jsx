import '../App.css';
import Header from './parts/Header';
import { useTranslation } from "react-i18next"


function Hero() {
    const { t , i18n } = useTranslation("global")

  return (
    <div className="bg-1">
        <Header/>
        <section className="hero">
            <h1>{t("hero.hero-title")}</h1>
            <h2>{t("hero.hero-title2")}</h2>
            <div className="hero-btns">
                {/* <a href="/signin"><button className="hero-btn signin-btn">Iniciar sesión</button></a> */}
                <a href="/signup"><button className="hero-btn signup-btn">{t("hero.hero-button")}</button></a>
            </div>
        </section>
    </div>
  );
}

export default Hero;