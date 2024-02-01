import '../App.css';
import Header from './parts/Header';

function Dashboard() {
  return (
    <div className="bg-1">
        <Header/>
        <section className="hero">
            <h1>Soy el dashboard.</h1>
            <h2>Soy el dashboard</h2>
            <div className="hero-btns">
                {/* <a href="/signin"><button className="hero-btn signin-btn">Iniciar sesión</button></a> */}
                <a href="/signup"><button className="hero-btn signup-btn">Soy el dashboard</button></a>
            </div>
        </section>
    </div>
  );
}

export default Dashboard;