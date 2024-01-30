import '../../App.css';

function Header() {
  return (
    <header>
        <h1>blog mern.</h1>
        <div className="header-btns">
            <a href="/signin"><button className="header-btn signin-btn">Iniciar sesión</button></a>
            <a href="/signup"><button className="header-btn signup-btn">Crear cuenta</button></a>
        </div>
    </header>
  );
}

export default Header;