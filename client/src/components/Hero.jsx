import '../App.css';
import Header from './parts/Header';

function Hero() {
  return (
    <div className="bg-1">
        <Header/>
        <section className="hero">
            <h1>Escribe lo que quieras y gratis.</h1>
            <h2>Bienvenido a tu blog.</h2>
            <div className="hero-btns">
                {/* <a href="/signin"><button className="hero-btn signin-btn">Iniciar sesión</button></a> */}
                <a href="/signup"><button className="hero-btn signup-btn">Haz tu primera entrada</button></a>
            </div>
        </section>
    </div>
  );
}

export default Hero;