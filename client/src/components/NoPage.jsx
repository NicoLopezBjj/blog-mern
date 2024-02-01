import '../App.css';
import Header from './parts/Header';

function NoPage() {
  return (
    <div className="bg-1">
        <Header/>
        <section className="hero">
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